import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { faqs } from "../content";

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export default defineTool({
  name: "search_faq",
  title: "Buscar en preguntas frecuentes",
  description:
    "Busca en las preguntas frecuentes públicas de AKA Conect (plazos, cobertura, soporte, migración, facturación y seguridad). Sin término de búsqueda devuelve todas.",
  inputSchema: {
    query: z
      .string()
      .optional()
      .describe("Término o pregunta a buscar. Si se omite, devuelve todas las preguntas."),
  },
  outputSchema: {
    results: z.array(z.object({ question: z.string(), answer: z.string() })),
    count: z.number(),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ query }) => {
    const term = query ? normalize(query.trim()) : "";
    const results = term
      ? faqs.filter(
          (f) => normalize(f.question).includes(term) || normalize(f.answer).includes(term),
        )
      : [...faqs];

    return {
      content: [
        {
          type: "text",
          text: results.length
            ? JSON.stringify(results, null, 2)
            : `Sin coincidencias para "${query}". Usa la herramienta sin parámetros para ver todas las preguntas.`,
        },
      ],
      structuredContent: { results, count: results.length },
    };
  },
});
