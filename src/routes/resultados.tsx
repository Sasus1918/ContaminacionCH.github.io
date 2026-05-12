import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader, Section, H2 } from "@/components/SiteLayout";
import { POINTS, LIMIT } from "@/data/acoustic";

export const Route = createFileRoute("/resultados")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Resultados · Dashboard Acústico" },
      { name: "description", content: "Niveles LAeq, percentiles L10/L50/L90 y comparación con el límite normativo de 65 dBA en los 5 puntos del Campus Chía." },
    ],
  }),
});

const maxScale = 100;

function Page() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="03 · Resultados"
        title="Dashboard de datos acústicos"
        description="Resultados consolidados de 5,366 registros tras tres semanas de monitoreo, procesados con limpieza de outliers (IQR + umbral 110 dBA) e integración logarítmica en Python."
      />

      {/* KPI BANNER */}
      <Section>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <Kpi value="100%" label="Incumplimiento" tone="destructive" />
          <Kpi value="92.26" label="LAeq máx · dBA (P5)" tone="accent" />
          <Kpi value="76.56" label="LAeq mín · dBA (P4)" />
          <Kpi value="+27.26" label="Mayor excedencia · dB" tone="destructive" />
        </div>
      </Section>

      {/* BAR CHART */}
      <Section className="!pt-0">
        <H2>LAeq global por punto vs. límite normativo</H2>
        <div className="mt-8 rounded-2xl border border-border bg-card p-6 md:p-10">
          <div className="flex items-end gap-3 md:gap-6 h-72 relative">
            <div
              className="absolute left-0 right-0 border-t-2 border-dashed border-destructive z-10"
              style={{ bottom: `${(LIMIT / maxScale) * 100}%` }}
            >
              <span className="absolute -top-5 right-0 text-[11px] font-semibold text-destructive bg-background px-2">
                Límite 65 dBA
              </span>
            </div>
            {POINTS.map((p) => {
              const critical = p.LAeq >= 90;
              return (
                <div key={p.id} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  <div className="text-xs font-bold">{p.LAeq}</div>
                  <div
                    className={`w-full rounded-t-md transition hover:opacity-90 ${
                      critical
                        ? "bg-destructive"
                        : "bg-gradient-to-t from-primary to-accent"
                    }`}
                    style={{ height: `${(p.LAeq / maxScale) * 100}%` }}
                  />
                  <div className="text-xs font-semibold text-muted-foreground">{p.id}</div>
                </div>
              );
            })}
          </div>
          <div className="mt-6 text-xs text-muted-foreground">
            Línea roja: límite Sector B diurno (65 dBA) según Resolución 0627 de 2006.
            Barras rojas: puntos críticos con LAeq ≥ 90 dBA.
          </div>
        </div>
      </Section>

      {/* TABLA COMPLETA */}
      <Section className="!pt-0">
        <H2>Tabla técnica completa</H2>
        <div className="mt-8 rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-primary text-primary-foreground">
                <tr>
                  {["Punto", "n", "LAeq", "L₁₀", "L₅₀", "L₉₀", "Mín", "Máx", "Prom. arit.", "Excede", "Margen"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left font-semibold whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {POINTS.map((p, i) => (
                  <tr key={p.id} className={i % 2 === 0 ? "bg-card" : "bg-secondary/40"}>
                    <td className="px-4 py-3 font-bold text-primary">{p.id}</td>
                    <td className="px-4 py-3 text-muted-foreground">{p.n}</td>
                    <td className="px-4 py-3 font-bold">{p.LAeq}</td>
                    <td className="px-4 py-3">{p.L10}</td>
                    <td className="px-4 py-3">{p.L50}</td>
                    <td className="px-4 py-3">{p.L90}</td>
                    <td className="px-4 py-3 text-muted-foreground">{p.min}</td>
                    <td className="px-4 py-3 text-muted-foreground">{p.max}</td>
                    <td className="px-4 py-3 text-muted-foreground">{p.prom}</td>
                    <td className="px-4 py-3">
                      <span className="inline-block rounded-full bg-destructive/15 text-destructive px-2 py-0.5 text-xs font-bold">Sí</span>
                    </td>
                    <td className="px-4 py-3 font-bold text-destructive">+{p.margin.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 text-xs text-muted-foreground bg-secondary/30 border-t border-border">
            Datos en dBA. Total de registros: {POINTS.reduce((s, p) => s + p.n, 0).toLocaleString()}.
            Procesamiento: jvnoss.py (Python) · IQR + integración logarítmica.
          </div>
        </div>
      </Section>

      {/* COMPORTAMIENTO POR JORNADA */}
      <Section className="!pt-0">
        <H2>Comportamiento por franjas horarias</H2>
        <div className="mt-8 grid md:grid-cols-3 gap-5">
          <JornadaCard
            time="07:00"
            title="Inicio de jornada"
            desc="Niveles moderados. Puntos P2, P3 y P4 suelen estar bajo los 65 dBA."
            kpi="60%"
            kpiLabel="cumplimiento"
            tone="accent"
          />
          <JornadaCard
            time="12:00"
            title="Mediodía"
            desc="Incremento drástico de energía. Valores críticos en P3 (98.08 dBA) y P5 (96.76 dBA)."
            kpi="90%"
            kpiLabel="incumplimiento"
            tone="warning"
          />
          <JornadaCard
            time="15:00"
            title="Tarde · jornada más crítica"
            desc="Máxima saturación sonora. Todos los puntos superan los 85 dBA sostenidamente."
            kpi="100%"
            kpiLabel="incumplimiento"
            tone="destructive"
          />
        </div>
      </Section>

      {/* PERCENTILES VISUAL */}
      <Section className="!pt-0">
        <H2>Distribución de percentiles por punto</H2>
        <p className="mt-3 text-foreground/70 max-w-3xl text-sm">
          Comparación L₁₀ (picos) · L₅₀ (mediana) · L₉₀ (fondo). Una brecha amplia entre
          L₁₀ y L₉₀ indica un ambiente con ruidos impulsivos de alto impacto fisiológico.
        </p>
        <div className="mt-8 space-y-5">
          {POINTS.map((p) => {
            const range = p.L10 - p.L90;
            return (
              <div key={p.id} className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-primary text-lg">{p.id}</span>
                    <span className="text-xs text-muted-foreground">{p.label}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Brecha L₁₀−L₉₀: <strong className="text-foreground">{range.toFixed(1)} dB</strong>
                  </div>
                </div>
                <div className="relative h-8 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 bottom-0 bg-primary/20"
                    style={{
                      left: `${(p.L90 / 110) * 100}%`,
                      width: `${((p.L10 - p.L90) / 110) * 100}%`,
                    }}
                  />
                  <Marker label="L₉₀" v={p.L90} color="bg-muted-foreground" />
                  <Marker label="L₅₀" v={p.L50} color="bg-primary" />
                  <Marker label="L₁₀" v={p.L10} color="bg-accent" />
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-destructive"
                    style={{ left: `${(LIMIT / 110) * 100}%` }}
                    title="Límite 65 dBA"
                  />
                </div>
                <div className="mt-2 flex justify-between text-[10px] font-mono text-muted-foreground">
                  <span>0</span>
                  <span>55</span>
                  <span className="text-destructive font-semibold">65</span>
                  <span>85</span>
                  <span>110 dBA</span>
                </div>
              </div>
            );
          })}
        </div>
      </Section>
    </SiteLayout>
  );
}

function Kpi({ value, label, tone }: { value: string; label: string; tone?: "destructive" | "accent" }) {
  const cls =
    tone === "destructive"
      ? "border-destructive/30 bg-destructive/5"
      : tone === "accent"
      ? "border-accent/40 bg-accent/5"
      : "border-border bg-card";
  const num =
    tone === "destructive" ? "text-destructive" : tone === "accent" ? "text-primary" : "text-primary";
  return (
    <div className={`rounded-2xl border p-6 ${cls}`}>
      <div className={`text-4xl font-bold ${num}`}>{value}</div>
      <div className="mt-2 text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

function JornadaCard({ time, title, desc, kpi, kpiLabel, tone }: { time: string; title: string; desc: string; kpi: string; kpiLabel: string; tone: "accent" | "warning" | "destructive" }) {
  const cls = {
    accent: "border-accent/40 bg-accent/5 text-accent",
    warning: "border-yellow-500/40 bg-yellow-500/5 text-yellow-700",
    destructive: "border-destructive/40 bg-destructive/5 text-destructive",
  }[tone];
  return (
    <div className={`rounded-2xl border-2 p-6 ${cls}`}>
      <div className="font-mono text-xs uppercase tracking-wider opacity-80">{time}</div>
      <div className="mt-1 font-bold text-lg text-foreground">{title}</div>
      <p className="mt-3 text-sm text-foreground/75 leading-relaxed">{desc}</p>
      <div className="mt-5 pt-5 border-t border-current/20 flex items-baseline gap-2">
        <span className="text-3xl font-bold">{kpi}</span>
        <span className="text-xs uppercase tracking-wider opacity-80">{kpiLabel}</span>
      </div>
    </div>
  );
}

function Marker({ label, v, color }: { label: string; v: number; color: string }) {
  return (
    <div
      className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full ${color} ring-2 ring-background`}
      style={{ left: `calc(${(v / 110) * 100}% - 6px)` }}
      title={`${label}: ${v} dBA`}
    />
  );
}
