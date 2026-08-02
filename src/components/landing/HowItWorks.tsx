const steps = [
  {
    n: "01",
    title: "Diagnóstico gratuito",
    text: "Analizamos tu infraestructura actual y detectamos los puntos críticos que frenan tu operación.",
  },
  {
    n: "02",
    title: "Propuesta a medida",
    text: "Recibes un plan claro con alcance, tiempos y costos. Sin letra pequeña ni sorpresas.",
  },
  {
    n: "03",
    title: "Implementación",
    text: "Nuestro equipo ejecuta la instalación y configuración con mínima interrupción para tu negocio.",
  },
  {
    n: "04",
    title: "Soporte continuo",
    text: "Monitoreo, mantenimiento y acompañamiento permanente para que todo siga funcionando.",
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="relative overflow-hidden bg-ink py-20 text-ink-foreground sm:py-28">
      <div className="absolute inset-0 grid-tech opacity-40" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-cyan">Cómo funciona</span>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Cuatro pasos, cero complicaciones</h2>
          <p className="mt-4 text-ink-foreground/70">
            Un proceso transparente diseñado para que sepas siempre en qué etapa está tu proyecto.
          </p>
        </div>

        <ol className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <li
              key={s.n}
              className="relative rounded-2xl border border-ink-foreground/12 bg-ink-foreground/5 p-7 backdrop-blur"
            >
              <span className="text-4xl font-bold text-gradient-brand">{s.n}</span>
              <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-foreground/65">{s.text}</p>
              <span className="mt-6 block h-px w-full bg-gradient-accent opacity-60" aria-hidden="true" />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
