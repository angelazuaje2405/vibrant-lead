import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { company } from "../content";

export default defineTool({
  name: "company_info",
  title: "Información de la empresa",
  description:
    "Devuelve la información pública de AKA Conect: nombre, eslogan, descripción, sitio web y página de contacto.",
  inputSchema: {},
  outputSchema: { company: z.record(z.string(), z.unknown()) },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(company, null, 2) }],
    structuredContent: { company },
  }),
});
