import { createServerFn } from "@tanstack/react-start";
import { getRequestIP } from "@tanstack/react-start/server";
import { z } from "zod";

const submissionSchema = z.object({
  fullName: z.string().trim().min(3).max(100),
  email: z.string().trim().email().max(254),
  company: z.string().trim().max(120).optional().default(""),
  requirement: z.string().trim().min(10).max(2000),
  challengeToken: z.string().min(10).max(300),
  challengeAnswer: z.string().trim().max(4),
  // Honeypot: must stay empty. Real users never see this field.
  website: z.string().max(200).optional().default(""),
});

export const getContactChallenge = createServerFn({ method: "GET" }).handler(async () => {
  const { createChallenge } = await import("./contact/security.server");
  return createChallenge();
});

export const submitContactRequest = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => submissionSchema.parse(input))
  .handler(async ({ data }) => {
    const {
      sanitizeLine,
      sanitizeText,
      verifyChallenge,
      isRateLimited,
    } = await import("./contact/security.server");

    const ip = getRequestIP({ xForwardedFor: true }) ?? "unknown";

    if (data.website.trim() !== "") {
      // Bot filled the hidden field: pretend success, send nothing.
      return { ok: true as const };
    }

    const answer = Number(data.challengeAnswer);
    if (!Number.isInteger(answer)) {
      return { ok: false as const, error: "Responde la verificación humana." };
    }

    const check = verifyChallenge(data.challengeToken, answer);
    if (check === "expired") {
      return { ok: false as const, error: "La verificación expiró. Inténtalo nuevamente.", refresh: true };
    }
    if (check === "too-fast") {
      return { ok: false as const, error: "Envío demasiado rápido. Vuelve a intentarlo.", refresh: true };
    }
    if (check !== "ok") {
      return { ok: false as const, error: "Verificación humana incorrecta.", refresh: true };
    }

    if (isRateLimited(ip)) {
      return { ok: false as const, error: "Demasiadas solicitudes. Intenta más tarde." };
    }

    const fullName = sanitizeLine(data.fullName, 100);
    const email = sanitizeLine(data.email, 254).toLowerCase();
    const company = sanitizeLine(data.company, 120);
    const requirement = sanitizeText(data.requirement, 2000);

    if (!/^[^@\s]+@[^@\s.]+\.[^@\s]{2,}$/.test(email)) {
      return { ok: false as const, error: "Correo inválido.", refresh: true };
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("contact_submissions")
      .insert({
        full_name: fullName,
        email,
        company: company || null,
        requirement,
        ip_address: ip,
        user_agent: null,
      })
      .select("id")
      .single();

    if (error || !row) {
      console.error("[contact] could not store submission:", error);
      return { ok: false as const, error: "No pudimos registrar tu solicitud. Inténtalo nuevamente.", refresh: true };
    }

    const { sendContactNotification } = await import("./contact/notify.server");
    const sent = await sendContactNotification({
      fullName,
      email,
      company: company || null,
      requirement,
      ip,
      submissionId: row.id,
    });

    if (sent) {
      await supabaseAdmin
        .from("contact_submissions")
        .update({ email_sent: true })
        .eq("id", row.id);
    }

    return { ok: true as const };
  });
