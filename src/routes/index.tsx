import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Benefits } from "@/components/landing/Benefits";
import { Testimonials } from "@/components/landing/Testimonials";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { FAQ, faqs } from "@/components/landing/FAQ";
import { ContactForm } from "@/components/landing/ContactForm";
import { Footer } from "@/components/landing/Footer";

const pageTitle = "AKA Conect | Soluciones TI, redes y soporte para empresas";
const pageDescription =
  "Conectamos tecnología, impulsamos tu negocio. Infraestructura, redes, seguridad y soporte técnico 24/7 para empresas que quieren crecer sin caídas.";
const pageUrl = "/";
const ogImageUrl = "https://akaconect.cl/og-image.png";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: {
      "@type": "Answer",
      text: answer,
    },
  })),
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "AKA Conect",
  url: pageUrl,
  description: pageDescription,
  inLanguage: "es",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "/?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: pageTitle },
      { name: "description", content: pageDescription },
      {
        name: "keywords",
        content:
          "soporte TI, redes empresariales, seguridad informática, infraestructura tecnológica, soporte técnico, consultoría TI, monitoreo 24/7, respaldos, empresas, pymes",
      },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:title", content: pageTitle },
      { property: "og:description", content: pageDescription },
      { property: "og:type", content: "website" },
      { property: "og:url", content: pageUrl },
      { property: "og:locale", content: "es_ES" },
      { property: "og:site_name", content: "AKA Conect" },
      { property: "og:image", content: ogImageUrl },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:alt", content: "AKA Conect - Soluciones TI, redes y soporte para empresas" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: pageTitle },
      { name: "twitter:description", content: pageDescription },
      { name: "twitter:image", content: ogImageUrl },
      { name: "twitter:image:alt", content: "AKA Conect - Soluciones TI, redes y soporte para empresas" },
    ],
    links: [{ rel: "canonical", href: pageUrl }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd) },
      { type: "application/ld+json", children: JSON.stringify(websiteJsonLd) },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Benefits />
        <Testimonials />
        <HowItWorks />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
