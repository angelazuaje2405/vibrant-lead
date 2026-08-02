import { Star } from "lucide-react";

const testimonials = [
  {
    name: "María Fernanda Ruiz",
    role: "Gerente de Operaciones, Distribuidora Andes",
    initials: "MR",
    text: "Migramos toda nuestra red con AKA Conect y las caídas desaparecieron. El soporte responde en minutos.",
  },
  {
    name: "Carlos Medina",
    role: "Director, Clínica Vitalis",
    initials: "CM",
    text: "Profesionales de verdad. Nos explicaron todo sin tecnicismos y el proyecto se entregó antes de lo previsto.",
  },
  {
    name: "Laura Sánchez",
    role: "Fundadora, Estudio Nova",
    initials: "LS",
    text: "Pasamos de improvisar con la tecnología a tener un sistema ordenado. Fue el mejor cambio del año.",
  },
];

export function Testimonials() {
  return (
    <section id="testimonios" className="bg-secondary/50 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">Testimonios</span>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Clientes que ya están conectados</h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex h-full flex-col rounded-2xl border border-border bg-card p-7 shadow-soft"
            >
              <div className="flex gap-1 text-accent" aria-label="5 de 5 estrellas">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/80">
                “{t.text}”
              </blockquote>
              <figcaption className="mt-6 flex min-w-0 items-center gap-3 border-t border-border pt-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-accent text-sm font-bold text-primary-foreground">
                  {t.initials}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold">{t.name}</span>
                  <span className="block truncate text-xs text-muted-foreground">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
