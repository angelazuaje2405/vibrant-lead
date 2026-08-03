# AKA Conect — Landing Page + Servidor MCP

Landing page de alto impacto para **AKA Conect**, construida con [Lovable](https://lovable.dev) usando TanStack Start, React, TypeScript y Tailwind CSS.

## Desarrollo local

```sh
git clone <this-repository-url>
cd <repository-name>
bun install
bun run dev
```

## Build para exportación estática

La landing está pensada para exportarse como sitio estático y subirse a WordPress:

```sh
bun run build
```

Los archivos estáticos resultantes se encuentran en `dist/`.

## Tecnologías

- TanStack Start
- TypeScript
- React
- Tailwind CSS

---

## 🤖 Integración MCP (Model Context Protocol)

Esta app expone un servidor MCP público en `/mcp` para que asistentes como **Claude**, **ChatGPT** o **Cursor** puedan consultar información oficial de AKA Conect.

> **Nota de seguridad:** el servidor es **público y sin autenticación**. Solo expone contenido estático de marketing que ya es visible en la landing (datos de la empresa, servicios, proceso de trabajo y preguntas frecuentes). No expone bases de datos, cuentas de usuario ni información privada.

### Endpoint del servidor

```text
https://akaconect.cl/mcp
```

También disponible en la URL publicada de Lovable:

```text
https://vibrant-lead.lovable.app/mcp
```

### Herramientas disponibles

| Herramienta | Entrada | Descripción |
|-------------|---------|-------------|
| `company_info` | Sin parámetros | Información pública de AKA Conect: nombre, eslogan, descripción, sitio web y página de contacto. |
| `list_services` | Sin parámetros | Lista de servicios y beneficios ofrecidos (redes, seguridad, rendimiento y soporte). |
| `how_it_works` | Sin parámetros | Proceso de trabajo paso a paso, desde el diagnóstico gratuito hasta el soporte continuo. |
| `search_faq` | `query` (opcional) | Busca en las preguntas frecuentes. Si se omite `query`, devuelve todas las preguntas. |

### Configuración para clientes MCP

La mayoría de los clientes MCP usan un objeto `mcpServers` con la URL del servidor. A continuación ejemplos para los clientes más comunes.

#### 1. Claude Desktop

Edita el archivo de configuración de Claude Desktop:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%/Claude/claude_desktop_config.json`

Añade o actualiza la sección `mcpServers`:

```json
{
  "mcpServers": {
    "aka-conect": {
      "url": "https://akaconect.cl/mcp"
    }
  }
}
```

Reinicia Claude Desktop para que cargue el servidor.

#### 2. Cursor

En Cursor puedes añadir el servidor MCP de dos formas:

- **Opción A:** Archivo de configuración del proyecto `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "aka-conect": {
      "url": "https://akaconect.cl/mcp"
    }
  }
}
```

- **Opción B:** Ve a **Settings → MCP → Add new MCP server** y usa:
  - **Name:** `aka-conect`
  - **Type:** `HTTP`
  - **URL:** `https://akaconect.cl/mcp`

#### 3. ChatGPT (aplicación de escritorio)

En la app de escritorio de ChatGPT, dirígete a **Settings → Connect apps → Add MCP server** y proporciona la URL:

```text
https://akaconect.cl/mcp
```

Si tu cliente usa un archivo de configuración `mcpServers`, el JSON es el mismo que el de Claude Desktop.

---

## 🧪 Ejemplos de uso

A continuación se muestran preguntas o comandos que puedes usar en el chat de tu asistente MCP. El asistente elegirá automáticamente la herramienta correcta.

### `company_info`

**Pregunta de ejemplo:**

```text
¿Qué es AKA Conect y cuál es su sitio web?
```

**Respuesta esperada:** datos generales de la empresa, eslogan y enlaces de contacto.

---

### `list_services`

**Pregunta de ejemplo:**

```text
¿Qué servicios ofrece AKA Conect?
```

**Respuesta esperada:** lista con títulos y descripciones de los servicios de redes, seguridad, rendimiento y soporte.

---

### `how_it_works`

**Pregunta de ejemplo:**

```text
¿Cómo es el proceso de trabajo con AKA Conect?
```

**Respuesta esperada:** los 4 pasos del proceso: diagnóstico gratuito, propuesta a medida, implementación y soporte continuo.

---

### `search_faq`

**Pregunta de ejemplo:**

```text
¿Cuánto tardan en implementar una red?
```

El asistente llamará a `search_faq` con un `query` similar a:

```json
{
  "query": "tiempo implementación red"
}
```

**Respuesta esperada:** la pregunta frecuente sobre plazos de implementación (3 a 10 días hábiles) y su respuesta completa.

**Pregunta de ejemplo sin término de búsqueda:**

```text
Muéstrame todas las preguntas frecuentes de AKA Conect.
```

En este caso el asistente llamará a `search_faq` sin parámetros y devolverá todas las FAQs.

---

## 📝 Notas para mantenedores

- El contenido expuesto por las herramientas MCP vive en `src/lib/mcp/content.ts`. Cualquier cambio en la landing debe reflejarse allí para que los asistentes respondan con información consistente.
- Tras modificar herramientas o `src/lib/mcp/index.ts`, regenera el manifiesto MCP con el extractor del proyecto para que el panel de integraciones de Lovable refleje los cambios.
