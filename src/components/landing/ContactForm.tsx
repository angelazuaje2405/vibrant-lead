import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { AlertTriangle, CheckCircle2, ShieldCheck, Loader2, RefreshCw } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { getContactChallenge, submitContactRequest } from "@/lib/contact.functions";

const schema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, "Ingresa tu nombre y apellido")
    .max(100, "Nombre demasiado largo"),
  email: z.string().trim().email("Correo de contacto inválido").max(254, "Correo demasiado largo"),
  company: z.string().trim().max(120, "Nombre de empresa demasiado largo"),
  requirement: z
    .string()
    .trim()
    .min(10, "Cuéntanos brevemente tu requerimiento")
    .max(2000, "Máximo 2000 caracteres"),
  challengeAnswer: z.string().trim().min(1, "Responde la verificación humana"),
});

const fullNameSchema = schema.shape.fullName;
const emailSchema = schema.shape.email;

const inputClass =
  "w-full rounded-xl border border-ink-foreground/20 bg-ink-foreground/10 px-4 py-3 text-sm text-ink-foreground placeholder:text-ink-foreground/45 outline-none focus:border-cyan";

const inputErrorClass =
  "border-cyan focus:border-cyan";

const errorTextClass = "mt-1.5 flex items-center gap-1.5 text-xs font-medium text-cyan";

export function ContactForm() {
  const fetchChallenge = useServerFn(getContactChallenge);
  const submit = useServerFn(submitContactRequest);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [requirement, setRequirement] = useState("");
  const [challengeAnswer, setChallengeAnswer] = useState("");
  const [challenge, setChallenge] = useState<{
    question: string;
    token: string;
    configured: boolean;
  } | null>(null);
  const [challengeError, setChallengeError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    fullName?: string;
    email?: string;
  }>({});
  const [touched, setTouched] = useState<{ fullName?: boolean; email?: boolean }>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const honeypot = useRef<HTMLInputElement>(null);
  const honeypotUrl = useRef<HTMLInputElement>(null);

  const loadChallenge = useCallback(async () => {
    try {
      const next = await fetchChallenge();
      setChallenge(next);
      setChallengeAnswer("");
      setChallengeError(
        next.configured
          ? null
          : "La verificación humana está funcionando en modo temporal porque falta CONTACT_CHALLENGE_SECRET.\n\nPasos para configurarla:\n1. Abre la configuración de secretos del proyecto.\n2. Crea la variable CONTACT_CHALLENGE_SECRET con un valor aleatorio de al menos 32 caracteres (ej. openssl rand -hex 32).\n3. Guarda el secreto y reinicia el servidor.\n\n¿Cómo saber que ya está cargada? Recarga esta página: este aviso desaparecerá y aquí verás el mensaje 'Verificación segura activada'.",
      );
    } catch {
      setChallenge(null);
      setChallengeError(
        "No pudimos cargar la verificación humana. Recárgala con el botón de refrescar o escríbenos a info@akaconect.cl.",
      );
    }
  }, [fetchChallenge]);

  useEffect(() => {
    void loadChallenge();
  }, [loadChallenge]);

  function validateFullName(value: string) {
    const result = fullNameSchema.safeParse(value);
    return result.success ? undefined : result.error.issues[0]?.message;
  }

  function validateEmail(value: string) {
    const result = emailSchema.safeParse(value);
    return result.success ? undefined : result.error.issues[0]?.message;
  }

  function updateFieldError(field: "fullName" | "email", value: string) {
    const validator = field === "fullName" ? validateFullName : validateEmail;
    const message = validator(value);
    setFieldErrors((prev) => ({ ...prev, [field]: message }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (loading) return;

    setTouched({ fullName: true, email: true });

    const nameError = validateFullName(fullName);
    const emailError = validateEmail(email);
    setFieldErrors({
      fullName: nameError ?? "",
      email: emailError ?? "",
    });

    const parsed = schema.safeParse({ fullName, email, company, requirement, challengeAnswer });
    if (!parsed.success || nameError || emailError) {
      // Field-level errors for name/email are already shown under each input.
      // Only show the general alert for other validation failures.
      const firstIssue = parsed.success ? null : parsed.error.issues[0];
      const isNameOrEmailIssue =
        firstIssue && (firstIssue.path[0] === "fullName" || firstIssue.path[0] === "email");
      setError(
        parsed.success || isNameOrEmailIssue ? null : (firstIssue?.message ?? "Revisa los datos del formulario"),
      );
      return;
    }
    if (!challenge) {
      setError("Verificación no disponible. Recárgala e inténtalo de nuevo.");
      return;
    }

    setError(null);
    setLoading(true);
    try {
      const result = await submit({
        data: {
          fullName,
          email,
          company,
          requirement,
          challengeToken: challenge.token,
          challengeAnswer,
          website: honeypot.current?.value ?? "",
          companyUrl: honeypotUrl.current?.value ?? "",
        },
      });

      if (result.ok) {
        setSent(true);
      } else {
        setError(result.error);
        if (result.refresh) await loadChallenge();
      }
    } catch {
      setError("No pudimos enviar tu solicitud. Inténtalo nuevamente en unos minutos.");
      await loadChallenge();
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setSent(false);
    setFullName("");
    setEmail("");
    setCompany("");
    setRequirement("");
    setFieldErrors({});
    setTouched({});
    setError(null);
    void loadChallenge();
  }

  return (
    <section id="contacto" className="relative overflow-hidden bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-brand px-6 py-14 text-ink-foreground shadow-elegant sm:px-12">
          <div className="absolute inset-0 grid-tech opacity-30" aria-hidden="true" />
          <div className="relative mx-auto max-w-xl text-center">
            {sent ? (
              <div className="animate-in fade-in zoom-in-95 duration-500">
                <CheckCircle2 className="mx-auto h-16 w-16 text-cyan" strokeWidth={1.5} />
                <h2 className="mt-5 text-3xl font-bold">¡Requerimiento enviado!</h2>
                <p className="mt-3 text-ink-foreground/75">
                  Gracias, {fullName.split(" ")[0]}. Recibimos tu solicitud y un especialista de AKA
                  Conect te responderá a {email}.
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="mt-7 rounded-full border border-ink-foreground/30 px-6 py-3 text-sm font-semibold transition-colors hover:bg-ink-foreground/10"
                >
                  Enviar otra solicitud
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-3xl font-bold sm:text-4xl">Cuéntanos tu requerimiento</h2>
                <p className="mt-4 text-ink-foreground/75">
                  Completa el formulario y recibe una asesoría gratuita para conectar tu negocio con
                  la tecnología correcta.
                </p>
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  autoComplete="on"
                  className="mt-9 space-y-4 text-left"
                >
                  {/* Honeypots anti-bots: ocultos para personas, invisibles para lectores de pantalla */}
                  <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                    <label htmlFor="website">No completar</label>
                    <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" ref={honeypot} />
                    <label htmlFor="companyUrl">No completar</label>
                    <input
                      id="companyUrl"
                      name="companyUrl"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      ref={honeypotUrl}
                    />
                  </div>


                  <div>
                    <label htmlFor="fullName" className="mb-2 block text-sm font-medium">
                      Nombre:
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      value={fullName}
                      maxLength={100}
                      autoComplete="name"
                      aria-invalid={touched.fullName ? !!fieldErrors.fullName : undefined}
                      aria-describedby={fieldErrors.fullName ? "fullName-error" : undefined}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (touched.fullName) updateFieldError("fullName", e.target.value);
                      }}
                      onBlur={() => {
                        setTouched((prev) => ({ ...prev, fullName: true }));
                        updateFieldError("fullName", fullName);
                      }}
                      placeholder="Ej. María González"
                      className={`${inputClass} ${touched.fullName && fieldErrors.fullName ? inputErrorClass : ""}`}
                    />
                    {touched.fullName && fieldErrors.fullName && (
                      <p id="fullName-error" role="alert" className={errorTextClass}>
                        <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                        {fieldErrors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium">
                      Correo de contacto
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      maxLength={254}
                      autoComplete="email"
                      aria-invalid={touched.email ? !!fieldErrors.email : undefined}
                      aria-describedby={fieldErrors.email ? "email-error" : undefined}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (touched.email) updateFieldError("email", e.target.value);
                      }}
                      onBlur={() => {
                        setTouched((prev) => ({ ...prev, email: true }));
                        updateFieldError("email", email);
                      }}
                      placeholder="tucorreo@empresa.com"
                      className={`${inputClass} ${touched.email && fieldErrors.email ? inputErrorClass : ""}`}
                    />
                    {touched.email && fieldErrors.email && (
                      <p id="email-error" role="alert" className={errorTextClass}>
                        <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                        {fieldErrors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="company" className="mb-2 block text-sm font-medium">
                      Empresa <span className="text-ink-foreground/55">(opcional)</span>
                    </label>
                    <input
                      id="company"
                      name="company"
                      value={company}
                      maxLength={120}
                      autoComplete="organization"
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Nombre de tu empresa"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="requirement" className="mb-2 block text-sm font-medium">
                      Requerimiento
                    </label>
                    <textarea
                      id="requirement"
                      name="requirement"
                      value={requirement}
                      maxLength={2000}
                      rows={5}
                      onChange={(e) => setRequirement(e.target.value)}
                      placeholder="Describe qué necesitas: soporte TI, redes, ciberseguridad, cloud…"
                      className={`${inputClass} resize-y`}
                    />
                    <p className="mt-1 text-right text-xs text-ink-foreground/50">
                      {requirement.length}/2000
                    </p>
                  </div>

                  <div className="rounded-xl border border-ink-foreground/20 bg-ink-foreground/5 p-4">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <ShieldCheck className="h-4 w-4 text-cyan" />
                      Verificación humana
                    </div>
                    <div className="mt-3 flex items-center gap-3">
                      <span className="text-sm text-ink-foreground/80">
                        {challenge?.question ??
                          (challengeError ? "Verificación no disponible" : "Cargando verificación…")}
                      </span>

                      <input
                        id="challengeAnswer"
                        name="challengeAnswer"
                        inputMode="numeric"
                        autoComplete="off"
                        maxLength={4}
                        value={challengeAnswer}
                        onChange={(e) => setChallengeAnswer(e.target.value.replace(/\D/g, ""))}
                        aria-label="Respuesta de la verificación humana"
                        className="w-20 rounded-lg border border-ink-foreground/20 bg-ink-foreground/10 px-3 py-2 text-center text-sm text-ink-foreground outline-none focus:border-cyan"
                      />
                      <button
                        type="button"
                        onClick={() => void loadChallenge()}
                        aria-label="Generar otra verificación"
                        className="rounded-lg border border-ink-foreground/20 p-2 transition-colors hover:bg-ink-foreground/10"
                      >
                        <RefreshCw className="h-4 w-4" />
                      </button>
                    </div>

                    {challengeError ? (
                      <div role="status" className="mt-3 flex gap-2 rounded-lg border border-cyan/30 bg-cyan/10 p-3 text-xs text-cyan">
                        <AlertTriangle className="mt-px h-4 w-4 shrink-0" />
                        <span className="whitespace-pre-line">{challengeError}</span>
                      </div>
                    ) : challenge?.configured ? (
                      <div role="status" className="mt-3 flex items-center gap-2 text-xs text-emerald-400">
                        <CheckCircle2 className="h-4 w-4 shrink-0" />
                        <span>Verificación segura activada</span>
                      </div>
                    ) : null}
                  </div>

                  {error && (
                    <p role="alert" className="text-sm font-medium text-cyan">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-ink-foreground px-8 py-4 text-base font-bold text-ink transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {loading && <Loader2 className="h-5 w-5 animate-spin" />}
                    {loading ? "Enviando…" : "Enviar requerimiento"}
                  </button>
                  <p className="text-center text-xs text-ink-foreground/55">
                    Solo texto: no se aceptan archivos adjuntos. Tus datos viajan cifrados y se
                    envían únicamente a info@akaconect.cl.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
