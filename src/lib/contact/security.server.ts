// Server-only helpers for the contact form: human verification challenge,
// input sanitising and best-effort rate limiting.
import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

const CHALLENGE_TTL_MS = 10 * 60 * 1000; // 10 minutes
const MIN_FILL_TIME_MS = 3000; // bots submit instantly

// Falls back to a per-process random key so a missing secret degrades the
// challenge (tokens invalid after restart) instead of blanking the page.
let fallbackSecret: string | null = null;

function secret(): string {
  const value = process.env["CONTACT_CHALLENGE_SECRET"];
  if (value) return value;
  if (!fallbackSecret) {
    console.warn("[contact] CONTACT_CHALLENGE_SECRET missing; using ephemeral key");
    fallbackSecret = randomBytes(32).toString("base64url");
  }
  return fallbackSecret;
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

export interface Challenge {
  question: string;
  token: string;
  /** false when CONTACT_CHALLENGE_SECRET is missing (ephemeral key in use). */
  configured: boolean;
}

export function isChallengeSecretConfigured(): boolean {
  return Boolean(process.env["CONTACT_CHALLENGE_SECRET"]);
}

/** Builds a signed arithmetic challenge. The answer never travels to the browser. */
export function createChallenge(): Challenge {
  const a = 1 + Math.floor(Math.random() * 9);
  const b = 1 + Math.floor(Math.random() * 9);
  const answer = a + b;
  const issuedAt = Date.now();
  const nonce = randomBytes(9).toString("base64url");
  const payload = `${issuedAt}.${nonce}.${answer}`;
  return {
    question: `¿Cuánto es ${a} + ${b}?`,
    token: `${issuedAt}.${nonce}.${sign(payload)}`,
    configured: isChallengeSecretConfigured(),
  };
}

export type ChallengeResult = "ok" | "expired" | "too-fast" | "invalid";

export function verifyChallenge(token: string, answer: number): ChallengeResult {
  const parts = token.split(".");
  if (parts.length !== 3) return "invalid";
  const [issuedAtRaw, nonce, signature] = parts as [string, string, string];
  const issuedAt = Number(issuedAtRaw);
  if (!Number.isFinite(issuedAt) || !nonce || !signature) return "invalid";

  const age = Date.now() - issuedAt;
  if (age > CHALLENGE_TTL_MS || age < 0) return "expired";
  if (age < MIN_FILL_TIME_MS) return "too-fast";

  const expected = sign(`${issuedAt}.${nonce}.${answer}`);
  const given = Buffer.from(signature);
  const want = Buffer.from(expected);
  if (given.length !== want.length || !timingSafeEqual(given, want)) return "invalid";
  return "ok";
}

/** Strips control characters (header-injection vector) and trims length. */
export function sanitizeLine(value: string, max: number): string {
  return value
    .replace(/[\r\n\t\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

export function sanitizeText(value: string, max: number): string {
  return value
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "")
    .replace(/\r\n/g, "\n")
    .trim()
    .slice(0, max);
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Best-effort in-memory throttle per client IP (per server instance).
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 3;

export function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return false;
}

// ---------------------------------------------------------------------------
// Anti-spam heuristics
// ---------------------------------------------------------------------------

/** Throttle per email address too: bots rotate IPs but reuse addresses. */
const emailHits = new Map<string, number[]>();
const EMAIL_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_PER_EMAIL = 3;

export function isEmailRateLimited(email: string): boolean {
  const key = email.toLowerCase();
  const now = Date.now();
  const recent = (emailHits.get(key) ?? []).filter((t) => now - t < EMAIL_WINDOW_MS);
  if (recent.length >= MAX_PER_EMAIL) {
    emailHits.set(key, recent);
    return true;
  }
  recent.push(now);
  emailHits.set(key, recent);
  if (emailHits.size > 5000) emailHits.clear();
  return false;
}

/** Blocks throwaway inboxes commonly used by spam bots. */
const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com",
  "yopmail.com",
  "guerrillamail.com",
  "sharklasers.com",
  "10minutemail.com",
  "tempmail.com",
  "temp-mail.org",
  "trashmail.com",
  "getnada.com",
  "dispostable.com",
  "fakeinbox.com",
  "throwawaymail.com",
  "maildrop.cc",
  "mailnesia.com",
  "spam4.me",
  "moakt.com",
  "emailondeck.com",
  "mohmal.com",
]);

const SPAM_KEYWORDS = [
  "seo services",
  "backlink",
  "buy now",
  "casino",
  "crypto investment",
  "bitcoin profit",
  "forex",
  "viagra",
  "cialis",
  "porn",
  "loan offer",
  "make money fast",
  "click here now",
  "telegram @",
  "posicionamiento web garantizado",
  "aumenta tus ventas ya",
  "préstamo rápido",
];

export type SpamCheck = { spam: false } | { spam: true; reason: string };

export interface SpamInput {
  fullName: string;
  email: string;
  company: string;
  requirement: string;
}

function countLinks(value: string): number {
  return (value.match(/https?:\/\/|www\.|\[url|<a\s|\bbit\.ly\b/gi) ?? []).length;
}

/**
 * Content heuristics on top of the honeypot + signed challenge.
 * Conservative on purpose: a real customer message must never be rejected.
 */
export function detectSpam(input: SpamInput): SpamCheck {
  const name = input.fullName.trim();
  const email = input.email.trim().toLowerCase();
  const message = input.requirement.trim();
  const haystack = `${name} ${input.company} ${message}`.toLowerCase();

  const domain = email.split("@")[1] ?? "";
  if (DISPOSABLE_DOMAINS.has(domain)) {
    return { spam: true, reason: "disposable-email" };
  }

  // Names never contain links, markup or long digit runs.
  if (/https?:\/\/|www\.|<|>|\{|\}|\[|\]/.test(name) || /\d{4,}/.test(name)) {
    return { spam: true, reason: "name-pattern" };
  }

  // Real requests rarely carry several links.
  if (countLinks(message) >= 2 || countLinks(name + " " + input.company) > 0) {
    return { spam: true, reason: "links" };
  }

  // HTML/BBCode markup injected into the message body.
  if (/<\s*(a|script|img|iframe|form)\b/i.test(message) || /\[\/?(url|link|img)\b/i.test(message)) {
    return { spam: true, reason: "markup" };
  }

  if (SPAM_KEYWORDS.some((word) => haystack.includes(word))) {
    return { spam: true, reason: "keyword" };
  }

  // Keyboard mashing / filler: the same character repeated many times.
  if (/(.)\1{9,}/.test(message)) {
    return { spam: true, reason: "repetition" };
  }

  // Messages with no whitespace at all (single random token).
  if (message.length >= 15 && !/\s/.test(message)) {
    return { spam: true, reason: "single-token" };
  }

  // Shouting-only content.
  const letters = message.replace(/[^A-Za-zÁÉÍÓÚÑáéíóúñ]/g, "");
  if (letters.length >= 30 && letters === letters.toUpperCase()) {
    return { spam: true, reason: "all-caps" };
  }

  // Non-latin scripts are a strong bot signal for a Chilean B2B form.
  if (/[\u0400-\u04ff\u0600-\u06ff\u4e00-\u9fff]/.test(haystack)) {
    return { spam: true, reason: "script" };
  }

  return { spam: false };
}

