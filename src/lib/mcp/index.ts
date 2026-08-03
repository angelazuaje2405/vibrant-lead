import { defineMcp } from "@lovable.dev/mcp-js";
import companyInfoTool from "./tools/company-info";
import howItWorksTool from "./tools/how-it-works";
import listServicesTool from "./tools/list-services";
import searchFaqTool from "./tools/search-faq";

export default defineMcp({
  name: "aka-conect",
  title: "AKA Conect",
  version: "0.1.0",
  instructions:
    "Herramientas públicas de AKA Conect, empresa chilena de soluciones TI (redes, ciberseguridad, infraestructura y soporte). Usa `company_info` para datos generales y contacto, `list_services` para los servicios ofrecidos, `how_it_works` para el proceso de trabajo y `search_faq` para responder dudas frecuentes de clientes.",
  tools: [companyInfoTool, listServicesTool, howItWorksTool, searchFaqTool],
});
