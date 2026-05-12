import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader, Section, H2 } from "@/components/SiteLayout";

export const Route = createFileRoute("/metodologia")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Metodología · Procesamiento de Datos en Python" },
      { name: "description", content: "Algoritmo LAeq, gestión de outliers y descriptores estadísticos del estudio acústico." },
    ],
  }),
});

function Page() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="02 · Metodología"
        title="Procesamiento riguroso de datos acústicos en Python"
        description="La precisión de un estudio acústico depende de la calidad del tratamiento de los datos. Se desarrolló un script en Python con lógica de ingeniería robusta para normalización, limpieza y cálculo de descriptores logarítmicos."
      />

      {/* MÉTODO CIENTÍFICO */}
      <Section>
        <H2>Estructura del método científico</H2>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            { n: "1", t: "Observación", d: "Identificación de altos niveles de ruido en el Campus Chía debido al flujo vehicular de la Autopista Norte y a las actividades académicas." },
            { n: "2", t: "Pregunta problema", d: "¿La contaminación acústica presente en la sede Chía afecta el bienestar y la salud de los estudiantes?" },
            { n: "3", t: "Hipótesis", d: "La exposición constante a niveles superiores a 65 dBA activa el eje HPA, generando estrés metabólico y fatiga cognitiva." },
            { n: "4", t: "Experimentación", d: "Monitoreo durante 3 semanas en 5 puntos (P1–P5) usando sonómetros y procesamiento de datos en Python." },
          ].map((c) => (
            <div key={c.n} className="group relative rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground font-bold">{c.n}</div>
              <h3 className="mt-4 font-semibold text-lg">{c.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.d}</p>
              <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-accent to-transparent opacity-0 group-hover:opacity-100 transition" />
            </div>
          ))}
        </div>
      </Section>

      {/* VARIABLES */}
      <Section className="!pt-0">
        <H2>Variables de la investigación</H2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <VarCard tag="Independiente" tone="bg-primary text-primary-foreground" items={[
            "Ubicación geográfica (Puntos P1–P5)",
            "Franja horaria: 07:00, 12:00, 15:00",
          ]} />
          <VarCard tag="Dependiente" tone="bg-accent text-accent-foreground" items={[
            "Nivel de Presión Sonora Continuo Equivalente (LAeq, dBA)",
          ]} />
          <VarCard tag="Controladas" tone="bg-secondary text-secondary-foreground border border-border" items={[
            "Calibración de equipos",
            "Condiciones de clima seco y viento <3 m/s",
            "Cumplimiento del Sector B (Norma 0627)",
          ]} />
        </div>
      </Section>

      {/* CAJA NEGRA */}
      <Section className="!pt-0">
        <H2>Diagrama de caja negra · Modelo funcional</H2>
        <p className="mt-4 text-foreground/80 max-w-3xl">
          Representación sistémica de las entradas, procesos, salidas y retroalimentación
          que caracterizan el funcionamiento del Campus Chía como entorno académico
          afectado por contaminación acústica.
        </p>
        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_auto_1fr] items-stretch">
          <BBox title="Entradas" tone="primary" items={["Estudiantes y docentes", "Transporte vehicular", "Ruido ambiental (Autopista Norte)"]} />
          <Arrow d="→" />
          <BBox title="Procesos" tone="dark" items={["Clases y cátedras", "Investigación y laboratorio", "Alimentación y descanso"]} />
          <div className="lg:col-span-3 flex justify-center text-3xl text-muted-foreground">↓</div>
          <BBox title="Salidas" tone="accent" items={["Estudiantes formados", "Proyectos de investigación", "Fatiga y estrés (no deseado)"]} />
          <Arrow d="←" />
          <BBox title="Retroalimentación" tone="muted" items={["Encuestas de percepción", "Nuevas mediciones acústicas", "Ajustes metodológicos"]} />
        </div>
      </Section>

      {/* ALGORITMO */}
      <Section className="!pt-0">
        <H2>Algoritmo de promedio logarítmico</H2>
        <p className="mt-4 text-foreground/80 max-w-3xl leading-relaxed">
          Dado que la escala de decibelios es logarítmica, el script descarta el uso de
          promedios aritméticos simples —que subestimarían gravemente el ruido real en
          presencia de eventos sonoros de alta intensidad. La función{" "}
          <code className="bg-secondary px-1.5 py-0.5 rounded text-sm font-mono">Laeq(serie)</code>{" "}
          implementada en Python sigue rigurosamente la física del sonido:
        </p>
        <div className="mt-8 grid md:grid-cols-3 gap-5">
          <Step n="1" t="Conversión lineal" d="Cada registro Lᵢ en dB se convierte a magnitud de presión sonora relativa: 10^(Lᵢ/10)." />
          <Step n="2" t="Agregación" d="Se calcula la media aritmética de los valores de presión lineal del intervalo." />
          <Step n="3" t="Conversión logarítmica" d="El resultado vuelve a la escala logarítmica mediante 10·log₁₀(promedio)." />
        </div>
      </Section>

      {/* OUTLIERS */}
      <Section className="!pt-0">
        <H2>Gestión de outliers</H2>
        <p className="mt-4 text-foreground/80 max-w-3xl leading-relaxed">
          Uno de los mayores desafíos en mediciones de ruido ambiental es la presencia de
          eventos espurios (golpes accidentales al sonómetro, interferencias). El script
          implementa un enfoque híbrido de detección con confirmación interactiva.
        </p>
        <div className="mt-8 grid md:grid-cols-2 gap-5">
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="text-xs font-mono uppercase tracking-wider text-accent">Método 1</div>
            <h3 className="mt-1 font-bold text-lg">Umbral físico · 110 dBA</h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Cualquier valor que iguale o supere los 110 dBA se marca automáticamente como
              outlier sospechoso. Niveles de esta magnitud son inusuales en un campus y
              sugieren proximidad excesiva a una fuente puntual o error de medición.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="text-xs font-mono uppercase tracking-wider text-accent">Método 2</div>
            <h3 className="mt-1 font-bold text-lg">Rango Intercuartílico (IQR)</h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Se calcula IQR = Q₃ − Q₁. Los límites se definen como 1.5·IQR sobre Q₃ y bajo
              Q₁. Este método estadístico identifica picos que no alcanzan los 110 dBA
              pero se desvían del comportamiento acústico predominante del sitio.
            </p>
          </div>
        </div>
      </Section>

      {/* PERCENTILES */}
      <Section className="!pt-0">
        <H2>Descriptores estadísticos · L₁₀ · L₅₀ · L₉₀</H2>
        <p className="mt-4 text-foreground/80 max-w-3xl leading-relaxed">
          Para una comprensión profunda de la dinámica sonora, el estudio integra
          percentiles que revelan la "huella digital" del ruido en cada punto.
        </p>
        <div className="mt-8 grid md:grid-cols-3 gap-5">
          <PercentileCard k="L₁₀" t="Niveles pico" d="Nivel superado el 10% del tiempo. Asociado a eventos transitorios e intermitentes (tráfico pesado, recreación)." />
          <PercentileCard k="L₅₀" t="Nivel medio" d="Mediana de la serie de datos. Mide la tendencia central sin afectarse por valores extremos." />
          <PercentileCard k="L₉₀" t="Ruido de fondo" d="Nivel ambiental base que persiste cuando cesan los ruidos destacados. Indicador crítico de degradación crónica." />
        </div>
        <div className="mt-6 rounded-xl bg-secondary/60 border border-border p-5 text-sm text-foreground/80">
          La diferencia <strong className="text-primary">L₁₀ − L₉₀</strong> mide la
          estabilidad sonora. Una brecha amplia es característica de ambientes con ruidos
          impulsivos, los cuales tienen un impacto psicológico y bioenergético superior a
          un ruido constante de la misma intensidad energética.
        </div>
      </Section>
    </SiteLayout>
  );
}

function VarCard({ tag, tone, items }: { tag: string; tone: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${tone}`}>{tag}</span>
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

function BBox({ title, tone, items }: { title: string; tone: "primary" | "accent" | "dark" | "muted"; items: string[] }) {
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
        {items.map((i) => <li key={i}>• {i}</li>)}
      </ul>
    </div>
  );
}

function Arrow({ d }: { d: string }) {
  return <div className="hidden lg:flex items-center justify-center text-3xl text-muted-foreground">{d}</div>;
}

function Step({ n, t, d }: { n: string; t: string; d: string }) {
  return (
    <div className="rounded-2xl border-l-4 border-accent bg-card p-6 shadow-sm">
      <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Paso {n}</div>
      <div className="mt-1 font-bold">{t}</div>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d}</p>
    </div>
  );
}

function PercentileCard({ k, t, d }: { k: string; t: string; d: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="text-3xl font-bold text-primary">{k}</div>
      <div className="mt-1 font-semibold">{t}</div>
      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{d}</p>
    </div>
  );
}
