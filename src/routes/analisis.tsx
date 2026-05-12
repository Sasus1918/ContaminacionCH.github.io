import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader, Section, H2 } from "@/components/SiteLayout";

export const Route = createFileRoute("/analisis")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Análisis por Punto · P1 a P5" },
      { name: "description", content: "Caracterización detallada de los cinco puntos de medición y su evolución a lo largo de las tres semanas del estudio." },
    ],
  }),
});

const ANALYSIS = [
  {
    id: "P5",
    title: "Foco de mayor contaminación",
    LAeq: 92.26,
    body: "Punto más crítico del campus, con un nivel sostenido de 92.26 dBA. Comportamiento ruidoso en todas las jornadas y semanas evaluadas, sin excepción. Durante la Semana 4 se observó una degradación significativa: el ruido de fondo (L₉₀) ascendió a 62.19 dBA, valor que casi iguala el límite máximo. Sus niveles pico (L₁₀) alcanzaron los 96.01 dBA, sugiriendo fuentes de ruido industriales o tráfico pesado extremadamente cercanas.",
    badges: ["Sostenido", "Tráfico pesado", "Alerta inmediata"],
    tone: "destructive",
  },
  {
    id: "P3",
    title: "Máximos históricos al mediodía",
    LAeq: 89.33,
    body: "Aunque su promedio global es de 89.33 dBA, P3 destaca por registrar el valor más alto documentado en todo el estudio: 98.08 dBA durante la jornada de las 12:00 en la Semana 3, con un margen de sobrepaso de +33.08 dBA. La variabilidad es extrema, con diferencias entre ruido pico y fondo que superan los 40 dB —un entorno acústico caótico dominado por ruidos impulsivos.",
    badges: ["Pico 98.08 dBA", "Caótico", "Impulsivo"],
    tone: "destructive",
  },
  {
    id: "P1",
    title: "Saturación crónica y fondo elevado",
    LAeq: 86.01,
    body: "Contaminación constante con LAeq de 86.01 dBA. Presenta los niveles de ruido de fondo (L₉₀) más altos del campus, oscilando entre 58.69 y 65.99 dBA. En P1 nunca se alcanza un nivel de silencio aceptable; la comunidad está sometida a un 'zumbido' constante de alta intensidad, posiblemente derivado de sistemas de ventilación masivos o proximidad a ejes viales de flujo ininterrumpido.",
    badges: ["Fondo alto", "Crónico", "Ventilación/vías"],
    tone: "warning",
  },
  {
    id: "P2",
    title: "Intermitencia de alta intensidad",
    LAeq: 83.96,
    body: "Con 83.96 dBA, P2 ejemplifica el ruido intermitente. En la Semana 2 registró un fondo de 52.3 dBA frente a picos de 84.3 dBA. La situación se agravó en Semana 4: en la jornada de la tarde (15:00) alcanzó los 91.95 dBA, evidenciando un deterioro progresivo de la calidad acústica conforme avanza la semana laboral.",
    badges: ["Intermitente", "Deterioro semanal"],
    tone: "warning",
  },
  {
    id: "P4",
    title: "El punto 'silencioso' en incumplimiento",
    LAeq: 76.56,
    body: "Comparativamente el sector menos ruidoso, con 76.56 dBA. Es el único sitio que mostró periodos de cumplimiento normativo: mañanas de todas las semanas y mediodía de la Semana 3 (62.54 dBA). No obstante, su exposición vespertina eleva el promedio muy por encima de 65 dBA, invalidando su uso como zona de tranquilidad.",
    badges: ["Cumple en mañanas", "Falla en tarde"],
    tone: "amber",
  },
] as const;

const WEEKS = [
  { n: "2", t: "Semana 2", d: "Picos aislados de gran intensidad pero con ruido de fondo relativamente contenido en ciertos sectores." },
  { n: "3", t: "Semana 3", d: "Máximos absolutos de presión sonora al mediodía, sugiriendo eventos extraordinarios de ruido durante esta fase." },
  { n: "4", t: "Semana 4", d: "Aumento generalizado del ruido de fondo (L₉₀). La 'contaminación base' del campus subió, eliminando los valles de silencio." },
];

function Page() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="04 · Análisis por punto"
        title="Caracterización detallada P1 – P5 y evolución semanal"
        description="La contaminación acústica en el Campus Chía no es estática: presenta patrones claros vinculados a la dinámica diaria de la universidad y a la progresión del calendario académico."
      />

      <Section>
        <H2>Análisis individual por punto de muestreo</H2>
        <div className="mt-10 space-y-6">
          {ANALYSIS.map((p) => {
            const toneCls = {
              destructive: "border-destructive/40 bg-destructive/5",
              warning: "border-orange-500/40 bg-orange-500/5",
              amber: "border-amber-500/40 bg-amber-500/5",
            }[p.tone];
            const numCls = {
              destructive: "text-destructive",
              warning: "text-orange-700",
              amber: "text-amber-700",
            }[p.tone];
            return (
              <article key={p.id} className={`rounded-2xl border-2 ${toneCls} p-6 md:p-8 grid lg:grid-cols-12 gap-6 items-start`}>
                <div className="lg:col-span-3">
                  <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Punto</div>
                  <div className={`text-5xl font-black ${numCls} mt-1`}>{p.id}</div>
                  <div className="mt-3 text-3xl font-bold text-foreground">{p.LAeq}<span className="text-sm font-normal text-muted-foreground"> dBA</span></div>
                  <div className="mt-1 text-xs text-muted-foreground">LAeq global</div>
                </div>
                <div className="lg:col-span-9">
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight">{p.title}</h3>
                  <p className="mt-3 text-foreground/85 leading-relaxed">{p.body}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.badges.map((b) => (
                      <span key={b} className="text-xs font-semibold px-2.5 py-1 rounded-full bg-background border border-border">{b}</span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      <Section className="!pt-0">
        <H2>Dinámica de las semanas 2, 3 y 4</H2>
        <div className="mt-10 grid md:grid-cols-3 gap-5">
          {WEEKS.map((w) => (
            <div key={w.n} className="rounded-2xl border border-border bg-card p-6 shadow-sm relative overflow-hidden">
              <div className="absolute -top-6 -right-4 text-9xl font-black text-secondary select-none">{w.n}</div>
              <div className="relative">
                <div className="text-xs font-mono uppercase tracking-wider text-accent">Fase</div>
                <h3 className="mt-1 text-lg font-bold">{w.t}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{w.d}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section className="!pt-0">
        <H2>Auditoría e integridad de la información</H2>
        <div className="mt-8 grid lg:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-bold">Verificación de muestreo</h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              En P1 se confirmó integridad del 100% en jornadas de mañana y mediodía
              (60 registros/hora). Se detectaron truncamientos en reportes de soporte
              para 15:00, donde la documentación visual sólo alcanza 13 registros en
              algunos casos. Las métricas calculadas en Python sugieren que el set
              completo fue procesado exitosamente.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-bold">Discrepancia técnica detectada</h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Semana 2, jornada 07:00, registro N°1 de P1: el archivo de datos brutos
              marca <strong className="text-foreground">70.2 dBA</strong> mientras que el
              PDF de soporte registra <strong className="text-foreground">59.6 dBA</strong>.
              Diferencia &gt;10 dB que sugiere errores de transcripción manual o
              configuraciones distintas de ponderación temporal (Fast/Slow). Se otorga
              primacía a los datos algorítmicos del script <code className="bg-secondary px-1 rounded text-xs font-mono">jvnoss.py</code>.
            </p>
          </div>
        </div>
      </Section>

      <Section className="!pt-0">
        <H2>Implicaciones bioenergéticas y de salud académica</H2>
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-primary text-primary-foreground p-6 md:p-8">
            <h3 className="font-bold text-lg">Respuesta de estrés y metabolismo</h3>
            <p className="mt-3 text-sm opacity-90 leading-relaxed">
              El ruido activa el eje hipotalámico-pituitario-adrenal (HPA). Los niveles
              registrados en P3 y P5 son suficientes para inducir una respuesta de
              "lucha o huida" permanente.
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex gap-2"><span className="text-accent">▸</span> <span><strong>Elevación de glucemia:</strong> el cuerpo moviliza energía, alterando el balance metabólico durante el estudio sentado.</span></li>
              <li className="flex gap-2"><span className="text-accent">▸</span> <span><strong>Fatiga cognitiva:</strong> el cerebro dedica recursos al filtrado auditivo, reduciendo energía para funciones ejecutivas.</span></li>
            </ul>
          </div>
          <div className="rounded-2xl bg-accent text-accent-foreground p-6 md:p-8">
            <h3 className="font-bold text-lg">Deterioro de la inteligibilidad</h3>
            <p className="mt-3 text-sm opacity-95 leading-relaxed">
              Niveles &gt; 75 dBA en espacios cercanos a aulas provocan enmascaramiento del
              habla. Para que una lección sea inteligible la relación señal-ruido debe
              ser ≥ +15 dB.
            </p>
            <div className="mt-5 rounded-xl bg-black/15 p-4">
              <p className="text-sm">
                Si el ruido ambiente en P1 es de <strong>86 dBA</strong>, un docente
                necesitaría hablar a más de <strong>100 dBA</strong> para ser escuchado
                con claridad — físicamente imposible y peligroso para la salud vocal y
                auditiva.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </SiteLayout>
  );
}
