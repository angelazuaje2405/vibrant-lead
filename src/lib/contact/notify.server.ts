// Server-only: delivers a contact request to the AKA Conect inbox.
import { sendLovableEmail, EmailAPIError } from "@lovable.dev/email-js";
import { escapeHtml } from "./security.server";

export const INBOX = "info@akaconect.cl";
const SENDER_DOMAIN = "cotizacion.akaconect.cl";
const FROM = `AKA Conect <no-reply@${SENDER_DOMAIN}>`;

export interface ContactPayload {
  fullName: string;
  email: string;
  company: string | null;
  requirement: string;
  ip: string;
  submissionId: string;
}

export async function sendContactNotification(payload: ContactPayload): Promise<boolean> {
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) {
    console.error("[contact] LOVABLE_API_KEY missing; cannot deliver notification");
    return false;
  }

  const company = payload.company ?? "No indicada";
  const subject = `Nuevo requerimiento web — ${payload.fullName}`;
  const text = [
    "Nueva solicitud desde akaconect.cl",
    "",
    `Nombre y apellido: ${payload.fullName}`,
    `Correo de contacto: ${payload.email}`,
    `Empresa: ${company}`,
    "",
    "Requerimiento:",
    payload.requirement,
    "",
    `IP de origen: ${payload.ip}`,
    `ID de solicitud: ${payload.submissionId}`,
  ].join("\n");

  const html = `<!doctype html><html lang="es"><body style="margin:0;background:#ffffff;font-family:Arial,Helvetica,sans-serif;color:#0b1220">
    <div style="max-width:600px;margin:0 auto;padding:24px">
      <h1 style="font-size:20px;margin:0 0 16px">Nueva solicitud desde akaconect.cl</h1>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        <tr><td style="padding:6px 0;color:#5b6779">Nombre y apellido</td><td style="padding:6px 0"><strong>${escapeHtml(payload.fullName)}</strong></td></tr>
        <tr><td style="padding:6px 0;color:#5b6779">Correo de contacto</td><td style="padding:6px 0">${escapeHtml(payload.email)}</td></tr>
        <tr><td style="padding:6px 0;color:#5b6779">Empresa</td><td style="padding:6px 0">${escapeHtml(company)}</td></tr>
      </table>
      <h2 style="font-size:16px;margin:20px 0 8px">Requerimiento</h2>
      <p style="white-space:pre-wrap;font-size:14px;line-height:1.6;margin:0">${escapeHtml(payload.requirement)}</p>
      <hr style="border:none;border-top:1px solid #e5e9f0;margin:24px 0" />
      <p style="font-size:12px;color:#5b6779;margin:0">IP de origen: ${escapeHtml(payload.ip)}<br/>ID de solicitud: ${escapeHtml(payload.submissionId)}</p>
    </div>
  </body></html>`;

  try {
    await sendLovableEmail(
      {
        to: INBOX,
        from: FROM,
        sender_domain: SENDER_DOMAIN,
        reply_to: payload.email,
        subject,
        html,
        text,
        idempotency_key: `contact-${payload.submissionId}`,
        purpose: "transactional",
        label: "contact-form",
      },
      { apiKey },
    );
    return true;
  } catch (error) {
    if (error instanceof EmailAPIError) {
      console.error(`[contact] email not delivered (${error.code ?? "unknown"}):`, error.message);
    } else {
      console.error("[contact] email not delivered:", error);
    }
    return false;
  }
}

/** Confirmation copy sent back to the requester with a summary of their query. */
export async function sendContactConfirmation(payload: ContactPayload): Promise<boolean> {
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) return false;

  const company = payload.company ?? "No indicada";
  const subject = "Recibimos tu solicitud — AKA Conect";
  const text = [
    `Hola ${payload.fullName},`,
    "",
    "Gracias por contactar a AKA Conect. Recibimos tu solicitud y nuestro equipo te responderá a la brevedad.",
    "",
    "Resumen de tu consulta:",
    `Nombre: ${payload.fullName}`,
    `Correo: ${payload.email}`,
    `Empresa: ${company}`,
    "",
    "Requerimiento:",
    payload.requirement,
    "",
    `ID de solicitud: ${payload.submissionId}`,
    "",
    "AKA Conect — info@akaconect.cl",
  ].join("\n");

  const html = `<!doctype html><html lang="es"><body style="margin:0;background:#ffffff;font-family:Arial,Helvetica,sans-serif;color:#0b1220">
    <div style="max-width:600px;margin:0 auto;padding:24px">
      <h1 style="font-size:20px;margin:0 0 12px">Recibimos tu solicitud</h1>
      <p style="font-size:14px;line-height:1.6;margin:0 0 20px">Hola <strong>${escapeHtml(payload.fullName)}</strong>, gracias por contactar a <strong>AKA Conect</strong>. Nuestro equipo revisará tu requerimiento y te responderá a la brevedad.</p>
      <h2 style="font-size:16px;margin:0 0 8px">Resumen de tu consulta</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        <tr><td style="padding:6px 0;color:#5b6779">Nombre</td><td style="padding:6px 0"><strong>${escapeHtml(payload.fullName)}</strong></td></tr>
        <tr><td style="padding:6px 0;color:#5b6779">Correo</td><td style="padding:6px 0">${escapeHtml(payload.email)}</td></tr>
        <tr><td style="padding:6px 0;color:#5b6779">Empresa</td><td style="padding:6px 0">${escapeHtml(company)}</td></tr>
      </table>
      <h2 style="font-size:16px;margin:20px 0 8px">Requerimiento</h2>
      <p style="white-space:pre-wrap;font-size:14px;line-height:1.6;margin:0">${escapeHtml(payload.requirement)}</p>
      <hr style="border:none;border-top:1px solid #e5e9f0;margin:24px 0" />
      <p style="font-size:12px;color:#5b6779;margin:0">ID de solicitud: ${escapeHtml(payload.submissionId)}<br/>Si necesitas agregar información, responde a este correo o escríbenos a ${INBOX}.</p>
    </div>
  </body></html>`;

  try {
    await sendLovableEmail(
      {
        to: payload.email,
        from: FROM,
        sender_domain: SENDER_DOMAIN,
        reply_to: INBOX,
        subject,
        html,
        text,
        idempotency_key: `contact-confirm-${payload.submissionId}`,
        purpose: "transactional",
        label: "contact-confirmation",
      },
      { apiKey },
    );
    return true;
  } catch (error) {
    if (error instanceof EmailAPIError) {
      console.error(`[contact] confirmation not delivered (${error.code ?? "unknown"}):`, error.message);
    } else {
      console.error("[contact] confirmation not delivered:", error);
    }
    return false;
  }
}
