import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { useState } from "react";

const NAV = [
  { to: "/", label: "Inicio" },
  { to: "/marco-normativo", label: "Marco Normativo" },
  { to: "/metodologia", label: "Metodología" },
  { to: "/resultados", label: "Resultados" },
  { to: "/analisis", label: "Análisis por Punto" },
  { to: "/conclusiones", label: "Conclusiones" },
] as const;

export function SiteLayout() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/85 border-b border-border">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-bold shadow-sm">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M3 12h3l3-8 4 16 3-8h5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="leading-tight">
              <div className="font-bold text-sm tracking-tight">Acústica Campus Chía</div>
              <div className="text-[11px] text-muted-foreground">Universidad El Bosque</div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((n) => {
              const active = pathname === n.to;
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground/70 hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>

          <button
            onClick={() => setOpen((o) => !o)}
            className="lg:hidden p-2 rounded-md hover:bg-secondary"
            aria-label="Menú"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? (
                <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
        {open && (
          <div className="lg:hidden border-t border-border bg-background">
            <div className="mx-auto max-w-7xl px-5 py-3 flex flex-col gap-1">
              {NAV.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === n.to
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-secondary"
                  }`}
                >
                  {n.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-primary text-primary-foreground/90 mt-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-12 grid gap-10 md:grid-cols-3">
          <div>
            <div className="font-bold text-lg text-primary-foreground">
              Caracterización Acústica · Campus Chía
            </div>
            <p className="mt-2 text-sm opacity-80">
              Estudio de contaminación sonora bajo la Resolución 0627 de 2006.
              Ciencias para la vida — Universidad El Bosque, 2026.
            </p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider font-semibold opacity-70 mb-3">Autores</div>
            <ul className="space-y-1 text-sm">
              <li>Camila Romero</li>
              <li>Paula Suárez</li>
              <li>François Tromp</li>
            </ul>
            <div className="mt-3 text-xs opacity-70">Profesor: Yadira Murcia</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider font-semibold opacity-70 mb-3">Navegación</div>
            <ul className="space-y-1 text-sm">
              {NAV.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="hover:text-accent transition">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="mx-auto max-w-7xl px-5 lg:px-8 py-4 text-xs opacity-70 flex flex-col sm:flex-row gap-2 justify-between">
            <span>© 2026 Universidad El Bosque · Ciencias para la vida</span>
            <span>Marco normativo: Resolución 0627 de 2006 · Sector B</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="relative bg-primary text-primary-foreground overflow-hidden">
      <div className="absolute inset-0 opacity-25" style={{
        backgroundImage:
          "radial-gradient(circle at 15% 20%, oklch(0.65 0.15 160) 0, transparent 45%), radial-gradient(circle at 85% 80%, oklch(0.45 0.1 250) 0, transparent 50%)",
      }} />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8 py-16 md:py-20">
        <div className="text-xs font-mono tracking-[0.2em] text-accent uppercase">{eyebrow}</div>
        <h1 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight max-w-4xl">{title}</h1>
        {description && (
          <p className="mt-5 max-w-3xl text-base md:text-lg text-white/80">{description}</p>
        )}
      </div>
    </section>
  );
}

export function Section({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`mx-auto max-w-7xl px-5 lg:px-8 py-14 md:py-20 ${className}`}>
      {children}
    </section>
  );
}

export function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl md:text-3xl font-bold tracking-tight border-b border-border pb-3">
      {children}
    </h2>
  );
}
