// Static, public landing-page content shared by the MCP tools.
// Mirrors what is rendered on the AKA Conect landing page.

export const services = [
  {
    title: "Redes que no fallan",
    description:
      "Diseño e instalación de infraestructura de red estable, segura y escalable para tu operación diaria.",
  },
  {
    title: "Seguridad primero",
    description:
      "Protección de datos, respaldos automáticos y monitoreo continuo contra amenazas.",
  },
  {
    title: "Rendimiento medible",
    description:
      "Optimizamos equipos y sistemas para reducir tiempos muertos y aumentar tu productividad.",
  },
  {
    title: "Soporte cercano",
    description:
      "Un equipo real que responde rápido, en tu idioma y sin tecnicismos innecesarios.",
  },
] as const;

export const processSteps = [
  {
    step: 1,
    title: "Diagnóstico gratuito",
    description:
      "Analizamos tu infraestructura actual y detectamos los puntos críticos que frenan tu operación.",
  },
  {
    step: 2,
    title: "Propuesta a medida",
    description: "Recibes un plan claro con alcance, tiempos y costos. Sin letra pequeña ni sorpresas.",
  },
  {
    step: 3,
    title: "Implementación",
    description:
      "Nuestro equipo ejecuta la instalación y configuración con mínima interrupción para tu negocio.",
  },
  {
    step: 4,
    title: "Soporte continuo",
    description:
      "Monitoreo, mantenimiento y acompañamiento permanente para que todo siga funcionando.",
  },
] as const;

export const faqs = [
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
] as const;

export const company = {
  name: "AKA Conect",
  tagline: "Conectamos tecnología, impulsamos tu negocio",
  description:
    "Empresa de soluciones TI: infraestructura, redes, ciberseguridad y soporte técnico para empresas de todos los tamaños.",
  website: "https://akaconect.cl",
  contactPage: "https://akaconect.cl/#contacto",
  country: "Chile",
  languages: ["es"],
} as const;
