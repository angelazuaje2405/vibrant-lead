import { Facebook, Instagram, Linkedin } from "lucide-react";
import logo from "@/assets/logo.png.asset.json";

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="min-w-0">
            <img src={logo.url} alt="AKA Conect" className="h-12 w-auto" width={220} height={148} loading="lazy" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Conectamos tecnología, impulsamos tu negocio. Soluciones de infraestructura, redes y
              soporte para empresas que quieren crecer.
            </p>
          </div>
          <nav aria-label="Legal">
            <h3 className="text-sm font-semibold">Legal</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li><a href="#" className="transition-colors hover:text-primary">Política de privacidad</a></li>
              <li><a href="#" className="transition-colors hover:text-primary">Términos de servicio</a></li>
              <li><a href="#" className="transition-colors hover:text-primary">Política de cookies</a></li>
            </ul>
          </nav>
          <nav aria-label="Empresa">
            <h3 className="text-sm font-semibold">Empresa</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li><a href="#beneficios" className="transition-colors hover:text-primary">Beneficios</a></li>
              <li><a href="#como-funciona" className="transition-colors hover:text-primary">Cómo funciona</a></li>
              <li><a href="#contacto" className="transition-colors hover:text-primary">Contacto</a></li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} AKA Conect. Todos los derechos reservados.
          </p>
          <div className="flex gap-3">
            {[
              { Icon: Facebook, label: "Facebook" },
              { Icon: Instagram, label: "Instagram" },
              { Icon: Linkedin, label: "LinkedIn" },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
