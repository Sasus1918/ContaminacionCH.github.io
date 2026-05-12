import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Caracterización Acústica · Campus Chía · Universidad El Bosque" },
      {
        name: "description",
        content:
          "Estudio de contaminación sonora en el Campus Chía de la Universidad El Bosque según la Resolución 0627 de 2006.",
      },
    ],
  }),
});

const points = [
  { id: "P1", value: 86.01, label: "Acceso Principal" },
  { id: "P2", value: 83.96, label: "Plazoleta Central" },
  { id: "P3", value: 89.33, label: "Bloque Académico" },
  { id: "P4", value: 76.56, label: "Zona Verde Interior" },
  { id: "P5", value: 92.26, label: "Frente Autopista (Crítico)" },
];
const LIMIT = 65;
const maxVal = 100;

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HERO */}
      <header className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, oklch(0.65 0.15 160) 0, transparent 40%), radial-gradient(circle at 80% 70%, oklch(0.45 0.1 250) 0, transparent 50%)",
        }} />
        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium tracking-wide uppercase backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            Investigación · Universidad El Bosque
          </div>
          <h1 className="mt-6 text-4xl md:text-6xl font-bold leading-tight tracking-tight">
            Caracterización Acústica y Evaluación de la{" "}
            <span className="text-accent">Contaminación Sonora</span>{" "}
            en el Campus Chía
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-white/80">
            Evaluación del impacto del ruido —principalmente proveniente de la Autopista
            Norte— sobre la salud y el rendimiento académico de los estudiantes, conforme a
            la <strong className="text-white">Resolución 0627 de 2006</strong>.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-sm">
            {["Camila Romero", "Paula Suárez", "François Tromp"].map((a) => (
              <span key={a} className="rounded-md bg-white/10 px-3 py-1.5 backdrop-blur">
                {a}
              </span>
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-16 space-y-24">
        {/* MÉTODO CIENTÍFICO */}
        <section>
          <SectionHeader eyebrow="01" title="Método Científico" />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4 mt-10">
            <MethodCard
              n="1"
              title="Observación"
              text="Identificación de altos niveles de ruido en el Campus Chía debido al flujo vehicular de la Autopista Norte y a las actividades académicas."
            />
            <MethodCard
              n="2"
              title="Pregunta Problema"
              text="¿La contaminación acústica presente en la sede Chía afecta el bienestar y la salud de los estudiantes?"
            />
            <MethodCard
              n="3"
              title="Hipótesis"
              text="La exposición constante a niveles superiores a 65 dBA activa el eje HPA, generando estrés metabólico y fatiga cognitiva."
            />
            <MethodCard
              n="4"
              title="Experimentación"
              text="Monitoreo durante 3 semanas en 5 puntos (P1–P5) usando sonómetros y procesamiento de datos en Python."
            />
          </div>
        </section>

        {/* VARIABLES */}
        <section>
          <SectionHeader eyebrow="02" title="Variables de la Investigación" />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <VarCard
              tag="Independiente"
              color="bg-primary text-primary-foreground"
              items={[
                "Ubicación geográfica (P1–P5)",
                "Franja horaria: 07:00, 12:00, 15:00",
              ]}
            />
            <VarCard
              tag="Dependiente"
              color="bg-accent text-accent-foreground"
              items={["Nivel de Presión Sonora Continuo Equivalente (LAeq, dBA)"]}
            />
            <VarCard
              tag="Controladas"
              color="bg-secondary text-secondary-foreground border border-border"
              items={[
                "Calibración de equipos",
                "Condiciones de clima seco",
                "Cumplimiento del Sector B (Norma 0627)",
              ]}
            />
          </div>
        </section>

        {/* FÓRMULA LAeq */}
        <section>
          <SectionHeader eyebrow="03" title="Formulación Matemática · LAeq" />
          <div className="mt-10 rounded-2xl border border-border bg-card p-8 md:p-12 shadow-sm">
            <p className="text-sm text-muted-foreground mb-6">
              El Nivel de Presión Sonora Continuo Equivalente con ponderación A se calcula
              mediante integración logarítmica de la presión sonora instantánea:
            </p>
            <div
              className="overflow-x-auto py-4 text-2xl"
              dangerouslySetInnerHTML={{
                __html: `
<math xmlns="http://www.w3.org/1998/Math/MathML" display="block" style="font-size:1.6rem">
  <mrow>
    <msub><mi>L</mi><mrow><mi>A</mi><mi>e</mi><mi>q</mi><mo>,</mo><mi>T</mi></mrow></msub>
    <mo>=</mo><mn>10</mn><mo>·</mo><msub><mi>log</mi><mn>10</mn></msub><mo>(</mo>
    <mfrac><mn>1</mn><mi>T</mi></mfrac>
    <msubsup><mo>∫</mo><mn>0</mn><mi>T</mi></msubsup>
    <mfrac>
      <msup><mrow><msub><mi>p</mi><mi>A</mi></msub><mo>(</mo><mi>t</mi><mo>)</mo></mrow><mn>2</mn></msup>
      <msup><msub><mi>p</mi><mn>0</mn></msub><mn>2</mn></msup>
    </mfrac>
    <mi>d</mi><mi>t</mi><mo>)</mo><mtext> dBA</mtext>
  </mrow>
</math>`,
              }}
            />

            <div className="mt-6 grid gap-3 sm:grid-cols-2 text-sm text-muted-foreground">
              <div><strong className="text-foreground">p<sub>A</sub>(t):</strong> presión sonora ponderada A</div>
              <div><strong className="text-foreground">p<sub>0</sub>:</strong> presión de referencia (20 µPa)</div>
              <div><strong className="text-foreground">T:</strong> intervalo de tiempo de medición</div>
              <div><strong className="text-foreground">Procesamiento:</strong> Python · limpieza de outliers (IQR) · integración logarítmica</div>
            </div>
          </div>
        </section>

        {/* CAJA NEGRA */}
        <section>
          <SectionHeader eyebrow="04" title="Diagrama de Caja Negra · Modelo Funcional" />
          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_auto_1fr] items-stretch">
            <BBox title="Entradas" tone="primary" items={[
              "Estudiantes y docentes",
              "Transporte vehicular",
              "Ruido ambiental (Autopista Norte)",
            ]} />
            <div className="hidden lg:flex items-center justify-center text-3xl text-muted-foreground">→</div>
            <BBox title="Procesos" tone="dark" items={[
              "Clases y cátedras",
              "Investigación y laboratorio",
              "Alimentación y descanso",
            ]} />
            <div className="lg:col-span-3 flex justify-center text-3xl text-muted-foreground">↓</div>
            <BBox title="Salidas" tone="accent" items={[
              "Estudiantes formados",
              "Proyectos de investigación",
              "Fatiga y estrés (no deseado)",
            ]} />
            <div className="hidden lg:flex items-center justify-center text-3xl text-muted-foreground">←</div>
            <BBox title="Retroalimentación" tone="muted" items={[
              "Encuestas de percepción",
              "Nuevas mediciones acústicas",
              "Ajustes metodológicos",
            ]} />
          </div>
        </section>

        {/* DASHBOARD */}
        <section>
          <SectionHeader eyebrow="05" title="Resultados Técnicos · Dashboard" />
          <p className="mt-4 text-muted-foreground max-w-3xl">
            Datos consolidados tras limpieza de outliers (método IQR) e integración
            logarítmica en Python. Línea roja: límite normativo 65 dBA · Sector B.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {points.map((p) => {
              const critical = p.value >= 90;
              return (
                <div
                  key={p.id}
                  className={`rounded-xl border p-5 shadow-sm transition hover:shadow-lg ${
                    critical
                      ? "border-destructive bg-destructive/5"
                      : "border-border bg-card"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold tracking-wider text-muted-foreground">
                      {p.id}
                    </span>
                    {critical && (
                      <span className="rounded-full bg-destructive px-2 py-0.5 text-[10px] font-bold uppercase text-destructive-foreground">
                        Crítico
                      </span>
                    )}
                  </div>
                  <div className="mt-3 text-3xl font-bold text-primary">
                    {p.value}
                    <span className="text-sm font-normal text-muted-foreground"> dBA</span>
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">{p.label}</div>
                  <div className="mt-3 text-[11px] font-medium text-destructive">
                    +{(p.value - LIMIT).toFixed(2)} sobre el límite
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bar chart */}
          <div className="mt-10 rounded-2xl border border-border bg-card p-6 md:p-8">
            <h3 className="font-semibold">LAeq por punto vs. límite normativo (65 dBA)</h3>
            <div className="mt-8 flex items-end gap-4 h-64 relative">
              <div
                className="absolute left-0 right-0 border-t-2 border-dashed border-destructive z-10"
                style={{ bottom: `${(LIMIT / maxVal) * 100}%` }}
              >
                <span className="absolute -top-5 right-0 text-[11px] font-semibold text-destructive">
                  Límite 65 dBA
                </span>
              </div>
              {points.map((p) => (
                <div key={p.id} className="flex-1 flex flex-col items-center gap-2">
                  <div className="text-xs font-semibold text-foreground">{p.value}</div>
                  <div
                    className={`w-full rounded-t-md ${
                      p.value >= 90
                        ? "bg-destructive"
                        : "bg-gradient-to-t from-primary to-accent"
                    }`}
                    style={{ height: `${(p.value / maxVal) * 100}%` }}
                  />
                  <div className="text-xs font-medium text-muted-foreground">{p.id}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONCLUSIONES */}
        <section>
          <SectionHeader eyebrow="06" title="Conclusiones y Mitigación" />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl bg-destructive/10 border border-destructive/30 p-6">
              <div className="text-5xl font-bold text-destructive">100%</div>
              <p className="mt-3 text-sm text-foreground">
                de incumplimiento de la norma en los 5 puntos monitoreados durante las 3
                semanas de medición.
              </p>
            </div>
            <div className="rounded-2xl bg-accent/10 border border-accent/30 p-6">
              <div className="text-2xl font-semibold text-accent-foreground/90">🌿 Barreras Vivas</div>
              <p className="mt-3 text-sm text-muted-foreground">
                Implementación de vegetación densa perimetral hacia la Autopista Norte
                como aislante acústico natural.
              </p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="text-2xl font-semibold text-primary">🪟 Doble Acristalamiento</div>
              <p className="mt-3 text-sm text-muted-foreground">
                Adecuación de aulas con vidrios laminados de doble cámara para reducir la
                transmisión sonora interior.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-primary text-primary-foreground/80 mt-16">
        <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center text-sm">
          <div>
            <div className="font-semibold text-primary-foreground">Universidad El Bosque · Campus Chía</div>
            <div className="mt-1">Camila Romero · Paula Suárez · François Tromp</div>
          </div>
          <div className="text-xs opacity-70">
            Marco normativo: Resolución 0627 de 2006 — Sector B
          </div>
        </div>
      </footer>
    </div>
  );
}

function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="flex items-end gap-4 border-b border-border pb-4">
      <span className="text-sm font-mono text-accent font-bold">{eyebrow}</span>
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h2>
    </div>
  );
}

function MethodCard({ n, title, text }: { n: string; title: string; text: string }) {
  return (
    <div className="group relative rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition">
      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground font-bold">
        {n}
      </div>
      <h3 className="mt-4 font-semibold text-lg">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{text}</p>
      <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-accent to-transparent opacity-0 group-hover:opacity-100 transition" />
    </div>
  );
}

function VarCard({
  tag,
  color,
  items,
}: {
  tag: string;
  color: string;
  items: string[];
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${color}`}>
        {tag}
      </span>
      <ul className="mt-4 space-y-2">
        {items.map((it) => (
          <li key={it} className="flex gap-2 text-sm">
            <span className="text-accent mt-1">▸</span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function BBox({
  title,
  tone,
  items,
}: {
  title: string;
  tone: "primary" | "accent" | "dark" | "muted";
  items: string[];
}) {
  const styles: Record<string, string> = {
    primary: "bg-primary text-primary-foreground border-primary",
    accent: "bg-accent text-accent-foreground border-accent",
    dark: "bg-foreground text-background border-foreground",
    muted: "bg-secondary text-secondary-foreground border-border",
  };
  return (
    <div className={`rounded-2xl border-2 p-6 shadow-md ${styles[tone]}`}>
      <h4 className="font-bold text-lg uppercase tracking-wide">{title}</h4>
      <ul className="mt-3 space-y-1.5 text-sm opacity-95">
        {items.map((i) => (
          <li key={i}>• {i}</li>
        ))}
      </ul>
    </div>
  );
}
