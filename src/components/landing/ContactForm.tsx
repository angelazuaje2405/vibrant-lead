import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(2, "Ingresa tu nombre").max(100, "Nombre demasiado largo"),
  email: z.string().trim().email("Correo inválido").max(255, "Correo demasiado largo"),
});

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const result = schema.safeParse({ name, email });
    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "Revisa los datos");
      return;
    }
    setError(null);
    setSent(true);
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
                <h2 className="mt-5 text-3xl font-bold">¡Solicitud enviada!</h2>
                <p className="mt-3 text-ink-foreground/75">
                  Gracias, {name.split(" ")[0]}. Un especialista de AKA Conect te contactará muy pronto
                  al correo {email}.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSent(false);
                    setName("");
                    setEmail("");
                  }}
                  className="mt-7 rounded-full border border-ink-foreground/30 px-6 py-3 text-sm font-semibold transition-colors hover:bg-ink-foreground/10"
                >
                  Enviar otra solicitud
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-3xl font-bold sm:text-4xl">Da el siguiente paso</h2>
                <p className="mt-4 text-ink-foreground/75">
                  Déjanos tus datos y recibe una asesoría gratuita para conectar tu negocio con la
                  tecnología correcta.
                </p>
                <form onSubmit={handleSubmit} noValidate className="mt-9 space-y-4 text-left">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium">
                      Nombre
                    </label>
                    <input
                      id="name"
                      name="name"
                      value={name}
                      maxLength={100}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Tu nombre completo"
                      className="w-full rounded-xl border border-ink-foreground/20 bg-ink-foreground/10 px-4 py-3 text-sm text-ink-foreground placeholder:text-ink-foreground/45 outline-none focus:border-cyan"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium">
                      Correo electrónico
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      maxLength={255}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tucorreo@empresa.com"
                      className="w-full rounded-xl border border-ink-foreground/20 bg-ink-foreground/10 px-4 py-3 text-sm text-ink-foreground placeholder:text-ink-foreground/45 outline-none focus:border-cyan"
                    />
                  </div>
                  {error && (
                    <p role="alert" className="text-sm font-medium text-cyan">
                      {error}
                    </p>
                  )}
                  <button
                    type="submit"
                    className="w-full rounded-full bg-ink-foreground px-8 py-4 text-base font-bold text-ink transition-transform hover:-translate-y-0.5"
                  >
                    Quiero mi asesoría gratis
                  </button>
                  <p className="text-center text-xs text-ink-foreground/55">
                    Sin compromiso. Respetamos tu privacidad.
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
