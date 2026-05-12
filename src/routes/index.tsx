import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { POINTS, LIMIT } from "@/data/acoustic";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Caracterización Acústica · Campus Chía · Universidad El Bosque" },
      {
        name: "description",
        content:
          "Estudio integral de contaminación sonora en el Campus Chía bajo la Resolución 0627 de 2006. 100% de incumplimiento normativo en 5 puntos durante 3 semanas.",
      },
    ],
  }),
});

function Index() {
  const max = Math.max(...POINTS.map((p) => p.LAeq));
  const min = Math.min(...POINTS.map((p) => p.LAeq));
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative bg-primary text-primary-foreground overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, oklch(0.65 0.15 160) 0, transparent 45%), radial-gradient(circle at 80% 70%, oklch(0.45 0.12 250) 0, transparent 55%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8 py-20 md:py-32 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium tracking-wide uppercase backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              Investigación · Ciencias para la vida
            </div>
            <h1 className="mt-6 text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight">
              Caracterización Acústica del{" "}
              <span className="text-accent">Campus Chía</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/85">
              Evaluación de la contaminación sonora generada por el flujo vehicular de la
              Autopista Norte y las actividades académicas, conforme a la{" "}
              <strong className="text-white">Resolución 0627 de 2006</strong>.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/resultados"
                className="inline-flex items-center gap-2 rounded-md bg-accent text-accent-foreground px-5 py-3 font-semibold hover:opacity-90 transition shadow-lg shadow-accent/20"
              >
                Ver resultados
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link
                to="/metodologia"
                className="inline-flex items-center rounded-md border border-white/30 bg-white/5 px-5 py-3 font-semibold hover:bg-white/10 transition backdrop-blur"
              >
                Metodología
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/70">
              <div><span className="text-accent font-bold">5</span> puntos de medición</div>
              <div><span className="text-accent font-bold">3</span> semanas de monitoreo</div>
              <div><span className="text-accent font-bold">5,366</span> registros analizados</div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-white/60">
                  Resumen ejecutivo
                </span>
                <span className="text-[10px] font-bold rounded-full bg-destructive px-2 py-0.5">
                  ALERTA
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Stat value="100%" label="Incumplimiento normativo" />
                <Stat value={`${max}`} label="LAeq máx · dBA (P5)" accent />
                <Stat value={`${min}`} label="LAeq mín · dBA (P4)" />
                <Stat value="65" label="Límite legal · dBA" />
              </div>
              <div className="mt-5 pt-5 border-t border-white/10 text-xs text-white/70">
                Sector B · Universidades, colegios y centros de investigación.
                Jornada diurna 07:01 a.m. – 09:00 p.m.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTRODUCCIÓN */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-20">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <div className="text-xs font-mono tracking-[0.2em] text-accent uppercase">
              · Introducción
            </div>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">
              Un campus expuesto a un{" "}
              <span className="text-primary">ambiente sonoro degradado</span>
            </h2>
          </div>
          <div className="lg:col-span-8 space-y-5 text-foreground/85 leading-relaxed">
            <p>
              La calidad ambiental de los espacios educativos influye directamente en el
              bienestar y rendimiento de las personas. En el Campus Chía de la Universidad
              El Bosque se identificó una problemática crítica de contaminación acústica
              que afecta la concentración, el descanso y el ambiente adecuado para el
              aprendizaje.
            </p>
            <p>
              Durante tres semanas consecutivas se realizaron mediciones sistemáticas en
              cinco puntos del campus, utilizando sonómetros calibrados y procesamiento
              algorítmico en Python. Los resultados se contrastan con los límites
              establecidos por la normativa colombiana para el Sector B.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 pt-4">
              <MiniCard k="3" v="semanas" />
              <MiniCard k="5" v="puntos · P1–P5" />
              <MiniCard k="3" v="franjas: 07·12·15 h" />
            </div>
          </div>
        </div>
      </section>

      {/* DATOS RÁPIDOS */}
      <section className="bg-secondary border-y border-border">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-16">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <div>
              <div className="text-xs font-mono tracking-[0.2em] text-accent uppercase">
                · Resultados destacados
              </div>
              <h2 className="mt-2 text-3xl font-bold tracking-tight">
                Niveles LAeq globales por punto
              </h2>
            </div>
            <Link
              to="/resultados"
              className="text-sm font-semibold text-primary hover:text-accent transition inline-flex items-center gap-1"
            >
              Ver dashboard completo →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {POINTS.map((p) => {
              const critical = p.LAeq >= 90;
              return (
                <div
                  key={p.id}
                  className={`rounded-xl border p-5 shadow-sm transition hover:shadow-lg hover:-translate-y-0.5 ${
                    critical
                      ? "border-destructive bg-destructive/5"
                      : "border-border bg-card"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold tracking-wider text-muted-foreground">
                      {p.id}
                    </span>
                    {critical && (
                      <span className="rounded-full bg-destructive px-2 py-0.5 text-[10px] font-bold uppercase text-destructive-foreground">
                        Crítico
                      </span>
                    )}
                  </div>
                  <div className="mt-3 text-3xl font-bold text-primary">
                    {p.LAeq}
                    <span className="text-sm font-normal text-muted-foreground"> dBA</span>
                  </div>
                  <div className="mt-1 text-xs text-foreground/70">{p.label}</div>
                  <div className="mt-3 text-[11px] font-semibold text-destructive">
                    +{p.margin.toFixed(2)} dB sobre límite ({LIMIT})
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECCIONES DEL ESTUDIO */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-20">
        <div className="text-xs font-mono tracking-[0.2em] text-accent uppercase">
          · Estructura del estudio
        </div>
        <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">
          Recorre el informe completo
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <NavCard
            to="/marco-normativo"
            n="01"
            title="Marco Normativo"
            text="Resolución 0627 de 2006, clasificación del Sector B y parámetros de medida."
          />
          <NavCard
            to="/metodologia"
            n="02"
            title="Metodología"
            text="Algoritmo LAeq, gestión de outliers (IQR + umbral 110 dBA) y descriptores estadísticos."
          />
          <NavCard
            to="/resultados"
            n="03"
            title="Resultados"
            text="Dashboard de datos por punto, percentiles L10/L50/L90 y comparación normativa."
          />
          <NavCard
            to="/analisis"
            n="04"
            title="Análisis por Punto"
            text="Caracterización detallada P1–P5, jornadas horarias y evolución semanal."
          />
          <NavCard
            to="/conclusiones"
            n="05"
            title="Conclusiones"
            text="Hallazgos críticos, implicaciones bioenergéticas y recomendaciones de mitigación."
          />
          <div className="rounded-2xl border-2 border-dashed border-border bg-secondary/40 p-6 flex flex-col justify-center">
            <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Equipo</div>
            <div className="mt-2 font-semibold">Camila Romero · Paula Suárez · François Tromp</div>
            <div className="mt-1 text-sm text-muted-foreground">Universidad El Bosque · 2026</div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Stat({ value, label, accent = false }: { value: string; label: string; accent?: boolean }) {
  return (
    <div>
      <div className={`text-3xl font-bold ${accent ? "text-accent" : "text-primary-foreground"}`}>
        {value}
      </div>
      <div className="text-xs text-white/70 mt-1">{label}</div>
    </div>
  );
}

function MiniCard({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="text-2xl font-bold text-primary">{k}</div>
      <div className="text-xs text-muted-foreground mt-1">{v}</div>
    </div>
  );
}

function NavCard({ to, n, title, text }: { to: string; n: string; title: string; text: string }) {
  return (
    <Link
      to={to}
      className="group rounded-2xl border border-border bg-card p-6 hover:border-accent hover:shadow-lg transition"
    >
      <div className="flex items-start justify-between">
        <span className="text-xs font-mono font-bold text-accent">{n}</span>
        <svg className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h3 className="mt-3 text-lg font-bold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{text}</p>
    </Link>
  );
}
