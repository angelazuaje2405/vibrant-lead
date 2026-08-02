import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Benefits } from "@/components/landing/Benefits";
import { Testimonials } from "@/components/landing/Testimonials";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { FAQ } from "@/components/landing/FAQ";
import { ContactForm } from "@/components/landing/ContactForm";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AKA Conect | Soluciones TI, redes y soporte para empresas" },
      {
        name: "description",
        content:
          "Conectamos tecnología, impulsamos tu negocio. Infraestructura, redes, seguridad y soporte 24/7 para empresas. Solicita tu asesoría gratuita.",
      },
      { property: "og:title", content: "AKA Conect | Conectamos tecnología, impulsamos tu negocio" },
      {
        property: "og:description",
        content:
          "Infraestructura, redes, seguridad y soporte técnico 24/7 para empresas que quieren crecer sin caídas.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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
