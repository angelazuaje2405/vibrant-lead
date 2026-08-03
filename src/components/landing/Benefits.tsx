import { Wifi, Gauge, Headset, Network } from "lucide-react";

const items = [
  {
    icon: Network,
    title: "Redes que no fallan",
    text: "Diseño e instalación de infraestructura de red estable, segura y escalable para tu operación diaria.",
  },
  {
    icon: Wifi,
    title: "Redes inalámbricas empresariales",
    text: "Diseño e instalación de redes WiFi corporativas de alto rendimiento, cobertura estable y gestión centralizada.",
  },
  {
    icon: Gauge,
    title: "Rendimiento medible",
    text: "Optimizamos equipos y sistemas para reducir tiempos muertos y aumentar tu productividad.",
  },
  {
    icon: Headset,
    title: "Soporte técnico y manos remotas",
    text: "Ingenieros en campo para implementaciones, soporte presencial y actividades de manos remotas FE, con respuesta ágil y acompañamiento real.",
  },
];

export function Benefits() {
  return (
    <section id="beneficios" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">Beneficios</span>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Tecnología que trabaja para ti</h2>
          <p className="mt-4 text-muted-foreground">
            Cada solución se implementa pensando en la continuidad de tu negocio, no solo en el equipo.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, title, text }) => (
            <article
              key={title}
              className="group rounded-2xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-elegant"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-accent text-primary-foreground shadow-soft">
                <Icon className="h-6 w-6" strokeWidth={1.8} />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
