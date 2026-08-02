import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "¿Cuánto tarda implementar una solución de red o soporte TI?",
    answer:
      "La mayoría de las implementaciones estándar se completan entre 3 y 10 días hábiles, dependiendo del tamaño de la infraestructura. Antes de iniciar te entregamos un cronograma claro para que sepas exactamente qué esperar.",
  },
  {
    question: "¿Trabajan con empresas pequeñas o solo con grandes organizaciones?",
    answer:
      "Trabajamos con empresas de todos los tamaños. Diseñamos planes escalables que crecen contigo, desde pymes que necesitan soporte puntual hasta organizaciones que requieren monitoreo 24/7.",
  },
  {
    question: "¿Qué incluye exactamente el soporte técnico?",
    answer:
      "Incluye atención de incidentes, mantenimiento preventivo, monitoreo de redes, respaldos automatizados, seguridad perimetral y asesoría para mejorar el rendimiento de tus equipos y sistemas.",
  },
  {
    question: "¿Puedo migrar desde mi proveedor de TI actual?",
    answer:
      "Sí. Gestionamos la transición de forma ordenada para evitar interrupciones. Auditamos tu infraestructura actual, planificamos la migración y te acompañamos durante todo el proceso.",
  },
  {
    question: "¿Cómo se facturan los servicios?",
    answer:
      "Ofrecemos planes mensuales flexibles y proyectos por cotización cerrada. No hay cargos ocultos: antes de comenzar recibes una propuesta detallada con el alcance y los costos.",
  },
  {
    question: "¿Mi información y la de mis clientes están seguras?",
    answer:
      "Sí. Aplicamos buenas prácticas de ciberseguridad, respaldos cifrados, control de accesos y monitoreo continuo. La protección de tus datos es parte fundamental de cada solución que entregamos.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  function toggle(index: number) {
    setOpenIndex((current) => (current === index ? null : index));
  }

  return (
    <section id="faq" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
            <HelpCircle className="h-4 w-4" strokeWidth={2} />
            Preguntas frecuentes
          </span>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Resolvemos tus dudas antes de que decidas
          </h2>
          <p className="mt-4 text-muted-foreground">
            Si no encuentras la respuesta que buscas, escríbenos en el formulario de contacto.
          </p>
        </div>

        <div className="mt-14 space-y-4">
          {faqs.map(({ question, answer }, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={question}
                className={`rounded-2xl border transition-all ${
                  isOpen
                    ? "border-primary/40 bg-card shadow-soft"
                    : "border-border bg-card hover:border-primary/25"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
                >
                  <span className="text-base font-semibold sm:text-lg">{question}</span>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-transform duration-300 ${
                      isOpen
                        ? "rotate-180 border-primary bg-primary text-primary-foreground"
                        : "border-border bg-muted text-muted-foreground"
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" strokeWidth={2.5} />
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground sm:px-6 sm:pb-6 sm:text-base">
                      {answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
