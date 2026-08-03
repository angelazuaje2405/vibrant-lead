import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { services } from "../content";

export default defineTool({
  name: "list_services",
  title: "Listar servicios",
  description:
    "Lista los servicios y beneficios que AKA Conect ofrece (redes, seguridad, rendimiento y soporte).",
  inputSchema: {},
  outputSchema: {
    services: z.array(z.object({ title: z.string(), description: z.string() })),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(services, null, 2) }],
    structuredContent: { services },
  }),
});
