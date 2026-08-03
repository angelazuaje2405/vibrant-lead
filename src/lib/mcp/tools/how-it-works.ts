import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { processSteps } from "../content";

export default defineTool({
  name: "how_it_works",
  title: "Cómo funciona",
  description:
    "Devuelve el proceso de trabajo de AKA Conect paso a paso, desde el diagnóstico gratuito hasta el soporte continuo.",
  inputSchema: {},
  outputSchema: {
    steps: z.array(z.object({ step: z.number(), title: z.string(), description: z.string() })),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(processSteps, null, 2) }],
    structuredContent: { steps: processSteps },
  }),
});
