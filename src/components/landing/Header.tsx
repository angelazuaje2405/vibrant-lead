import logo400 from "@/assets/logo-400w.webp.asset.json";
import logo800 from "@/assets/logo-800w.webp.asset.json";
import logo1200 from "@/assets/logo-1200w.webp.asset.json";
import logoFallback from "@/assets/logo-sin-fondo.png.asset.json";

const links = [
  { href: "#beneficios", label: "Beneficios" },
  { href: "#como-funciona", label: "Cómo funciona" },
  { href: "#testimonios", label: "Testimonios" },
  { href: "#contacto", label: "Contacto" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-2 px-4 py-2 sm:gap-4 sm:px-6 sm:py-2.5">
        <a href="#top" className="flex min-w-0 items-center">
          <picture>
            <source
              srcSet={`${logo400.url} 400w, ${logo800.url} 800w, ${logo1200.url} 1200w`}
              sizes="(max-width: 640px) 96px, 128px"
              type="image/webp"
            />
            <img
              src={logoFallback.url}
              alt="AKA Conect"
              className="h-12 w-auto sm:h-16"
              width={220}
              height={148}
              loading="eager"
              decoding="async"
            />
          </picture>
        </a>
        <nav className="flex items-center gap-6">
          <ul className="hidden items-center gap-6 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contacto"
            className="shrink-0 rounded-full bg-gradient-accent px-3.5 py-1.5 text-xs font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5 sm:px-5 sm:py-2 sm:text-sm"
          >
            Cotizar ahora
          </a>
        </nav>
      </div>
    </header>
  );
}
