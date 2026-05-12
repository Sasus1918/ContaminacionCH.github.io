import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { SiteLayout, PageHeader, Section, H2 } from "@/components/SiteLayout";

export const Route = createFileRoute("/conclusiones")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Conclusiones y Recomendaciones · Mitigación Acústica" },
      { name: "description", content: "Hallazgos críticos y propuestas de mitigación: barreras vivas, doble acristalamiento y auditoría de fuentes internas." },
    ],
  }),
});

const CONCLUSIONS = [
  { n: "01", t: "Falla normativa absoluta", d: "Ningún punto de medición cumple con el estándar de 65 dBA de la Resolución 0627 en su promedio global." },
  { n: "02", t: "Punto crítico P5", d: "Con 92.26 dBA, este sector requiere intervención inmediata: sus niveles se acercan a umbrales de daño auditivo ocupacional." },
  { n: "03", t: "Tendencia de degradación", d: "El aumento del ruido de fondo en la Semana 4 indica que las fuentes de ruido se están volviendo más constantes y menos episódicas." },
  { n: "04", t: "Limitación tecnológica", d: "El script no aplica factores de corrección por tonalidad o impulsividad, por lo que la molestia real percibida es probablemente mayor a la reportada." },
];

const RECOMMENDATIONS = [
  { icon: "🌿", t: "Barreras vivas (vegetación)", d: "Implementación de vegetación densa perimetral hacia la Autopista Norte como aislante acústico natural y sumidero de partículas.", priority: "Alta" },
  { icon: "🪟", t: "Doble acristalamiento", d: "Las zonas cercanas con P3 y P5 deben reforzarse con sistemas de ventanería de doble acristalamiento (aislamiento termo-acústico) para proteger el ambiente interno de las aulas.", priority: "Alta" },
  { icon: "🔧", t: "Auditoría de fuentes internas", d: "Investigar la causa del elevado ruido de fondo en P1: equipos de climatización o mantenimiento que puedan ser insonorizados o reemplazados por tecnologías eficientes.", priority: "Media" },
  { icon: "📡", t: "Actualización del script de monitoreo", d: "Integrar en Python la capacidad de detectar componentes tonales e impulsos para cumplir al 100% con la metodología de la Resolución 0627.", priority: "Media" },
  { icon: "📍", t: "Completar georreferenciación", d: "Obtener coordenadas GPS de los puntos P1–P5 para generar mapas IDW y priorizar zonas de intervención arquitectónica.", priority: "Media" },
];

function Page() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="05 · Conclusiones"
        title="Evidencia irrefutable y rutas de mitigación"
        description="El estudio proporciona evidencia irrefutable de un ambiente sonoro degradado que contraviene la legislación nacional y pone en riesgo el bienestar de la comunidad universitaria."
      />

      <Section>
        <H2>Conclusiones principales</H2>
        <div className="mt-10 grid md:grid-cols-2 gap-5">
          {CONCLUSIONS.map((c) => (
            <div key={c.n} className="group relative rounded-2xl border border-border bg-card p-6 md:p-8 hover:shadow-lg transition">
              <div className="flex items-start gap-5">
                <div className="text-4xl font-black text-accent/40 font-mono">{c.n}</div>
                <div>
                  <h3 className="font-bold text-lg">{c.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.d}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section className="!pt-0">
        <div className="rounded-3xl bg-destructive text-destructive-foreground p-8 md:p-12 grid md:grid-cols-3 gap-8 items-center">
          <div className="text-center md:text-left">
            <div className="text-7xl md:text-8xl font-black leading-none">100%</div>
            <div className="mt-2 text-sm uppercase tracking-wider opacity-90">de incumplimiento normativo</div>
          </div>
          <div className="md:col-span-2">
            <p className="text-lg leading-relaxed">
              La comunidad universitaria del Campus Chía está expuesta de manera permanente
              a niveles que superan en algunos casos los <strong>27 decibelios</strong> por
              encima de lo permitido. Cada incremento de 3 dB representa la duplicación de
              la energía sonora: una excedencia de 27 dB significa una presión sonora{" "}
              <strong>exponencialmente superior</strong> al umbral de seguridad para
              actividades académicas.
            </p>
          </div>
        </div>
      </Section>

      <Section className="!pt-0">
        <H2>Recomendaciones y mitigación</H2>
        <p className="mt-3 text-foreground/70 max-w-3xl">
          Propuestas de intervención técnica organizadas por prioridad para reducir la
          exposición acústica y restaurar condiciones adecuadas para el aprendizaje.
        </p>
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {RECOMMENDATIONS.map((r) => (
            <div key={r.t} className="rounded-2xl border border-border bg-card p-6 hover:border-accent transition flex flex-col">
              <div className="flex items-start justify-between">
                <div className="text-3xl">{r.icon}</div>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  r.priority === "Alta" ? "bg-destructive/15 text-destructive" : "bg-accent/15 text-accent"
                }`}>
                  Prioridad {r.priority}
                </span>
              </div>
              <h3 className="mt-4 font-bold">{r.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">{r.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="!pt-0">
        <H2>Bibliografía principal</H2>
        <ol className="mt-8 space-y-4 text-sm text-foreground/80">
          <li className="flex gap-3">
            <span className="font-mono font-bold text-accent shrink-0">[1]</span>
            <span>
              Ministerio de Ambiente, Vivienda y Desarrollo Territorial. (2006).
              <em> Resolución 627 de 2006 — Norma nacional de emisión de ruido y ruido ambiental.</em>{" "}
              <a href="https://www.minambiente.gov.co/documento-normativa/resolucion-627-de-2006/" className="text-primary underline underline-offset-2 hover:text-accent" target="_blank" rel="noopener noreferrer">
                minambiente.gov.co
              </a>
            </span>
          </li>
          <li className="flex gap-3">
            <span className="font-mono font-bold text-accent shrink-0">[2]</span>
            <span>
              Cornare. <em>Resolución 627 de 2006 (texto completo).</em>{" "}
              <a href="https://www.cornare.gov.co/SIAR/aire/RUIDO/NORMATIVA/Resolucion_0627_de_2006.pdf" className="text-primary underline underline-offset-2 hover:text-accent" target="_blank" rel="noopener noreferrer">
                cornare.gov.co
              </a>
            </span>
          </li>
          <li className="flex gap-3">
            <span className="font-mono font-bold text-accent shrink-0">[3]</span>
            <span>
              Universidad Distrital Francisco José de Caldas — Facultad del Medio
              Ambiente y Recursos Naturales. <em>Tecnología en Saneamiento Ambiental.</em>
            </span>
          </li>
        </ol>
      </Section>

      <Section className="!pt-0">
        <div className="rounded-3xl bg-primary text-primary-foreground p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold">Explora el informe completo</h3>
          <p className="mt-3 max-w-2xl mx-auto text-white/80">
            Recorre la metodología, los resultados técnicos y el análisis detallado por
            punto de muestreo.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link to="/resultados" className="rounded-md bg-accent text-accent-foreground px-5 py-3 font-semibold hover:opacity-90 transition">
              Ver resultados
            </Link>
            <Link to="/metodologia" className="rounded-md border border-white/30 px-5 py-3 font-semibold hover:bg-white/10 transition">
              Ver metodología
            </Link>
          </div>
        </div>
      </Section>
    </SiteLayout>
  );
}
