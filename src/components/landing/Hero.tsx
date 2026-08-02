import heroImg from "@/assets/hero-tech.jpg";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-ink text-ink-foreground">
      <div className="absolute inset-0 grid-tech opacity-60" aria-hidden="true" />
      <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-primary/30 blur-3xl" aria-hidden="true" />
      <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-cyan/25 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28">
        <div className="min-w-0">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan/40 bg-cyan/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-cyan">
            Soluciones TI para empresas
          </span>
          <h1 className="mt-6 text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
            Conectamos tecnología,{" "}
            <span className="text-gradient-brand">impulsamos tu negocio</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-foreground/70 sm:text-lg">
            Infraestructura, redes, soporte y desarrollo a la medida. En AKA Conect diseñamos
            sistemas confiables que hacen que tu operación crezca sin fricciones ni caídas.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#contacto"
              className="rounded-full bg-gradient-accent px-8 py-4 text-center text-base font-semibold text-primary-foreground shadow-elegant transition-transform hover:-translate-y-0.5"
            >
              Solicitar asesoría gratis
            </a>
            <a
              href="#como-funciona"
              className="rounded-full border border-ink-foreground/25 px-8 py-4 text-center text-base font-semibold text-ink-foreground transition-colors hover:bg-ink-foreground/10"
            >
              Ver cómo funciona
            </a>
          </div>
          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6">
            {[
              ["+180", "Proyectos entregados"],
              ["99.9%", "Uptime garantizado"],
              ["24/7", "Soporte técnico"],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="text-2xl font-bold text-cyan sm:text-3xl">{value}</dt>
                <dd className="mt-1 text-xs text-ink-foreground/60 sm:text-sm">{label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative min-w-0">
          <div className="absolute inset-0 rounded-3xl bg-gradient-accent opacity-30 blur-2xl" aria-hidden="true" />
          <img
            src={heroImg}
            alt="Ilustración de infraestructura tecnológica conectada"
            width={1200}
            height={1008}
            className="relative w-full rounded-3xl border border-ink-foreground/10 shadow-elegant"
          />
        </div>
      </div>
    </section>
  );
}
