import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader, Section, H2 } from "@/components/SiteLayout";

export const Route = createFileRoute("/marco-normativo")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Marco Normativo · Resolución 0627 de 2006" },
      { name: "description", content: "Clasificación del Sector B y límites máximos de ruido permitidos en el Campus Chía bajo la normativa colombiana." },
    ],
  }),
});

function Page() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="01 · Marco normativo"
        title="Resolución 0627 de 2006 y exigencias legales en Colombia"
        description="La evaluación de la contaminación acústica en Colombia está regulada por la Resolución 0627 de 2006 del Ministerio de Ambiente, Vivienda y Desarrollo Territorial, que define límites máximos de emisión y ruido ambiental por sector y horario."
      />

      <Section>
        <H2>Clasificación del Sector</H2>
        <div className="mt-8 grid lg:grid-cols-2 gap-8">
          <div className="space-y-4 text-foreground/85 leading-relaxed">
            <p>
              El Campus Chía de la Universidad El Bosque se clasifica dentro del{" "}
              <strong className="text-primary">Sector B: Tranquilidad y Ruido Moderado</strong>,
              específicamente en el subsector de universidades, colegios, escuelas y
              centros de investigación.
            </p>
            <p>
              Esta es una de las categorías más estrictas de la norma, ya que reconoce la
              importancia de mantener ambientes acústicamente adecuados para el aprendizaje,
              la concentración y el desarrollo de actividades académicas.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-4">
              Límites máximos permisibles · Sector B
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="py-2 font-semibold">Jornada</th>
                  <th className="py-2 font-semibold">Horario</th>
                  <th className="py-2 font-semibold text-right">Límite</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/50">
                  <td className="py-3 font-semibold">Diurna</td>
                  <td className="py-3 text-muted-foreground">07:01 a.m. – 09:00 p.m.</td>
                  <td className="py-3 text-right font-bold text-primary">65 dBA</td>
                </tr>
                <tr>
                  <td className="py-3 font-semibold">Nocturna</td>
                  <td className="py-3 text-muted-foreground">09:01 p.m. – 07:00 a.m.</td>
                  <td className="py-3 text-right font-bold text-primary">55 dBA</td>
                </tr>
              </tbody>
            </table>
            <div className="mt-5 pt-5 border-t border-border text-xs text-muted-foreground">
              Este estudio se enfocó en la jornada diurna, con mediciones a las
              <strong className="text-foreground"> 07:00, 12:00 y 15:00</strong>.
            </div>
          </div>
        </div>
      </Section>

      <Section className="!pt-0">
        <H2>Condiciones de medición</H2>
        <p className="mt-6 text-foreground/85 max-w-3xl leading-relaxed">
          Según el artículo 17 de la Resolución 627 de 2006, las mediciones deben
          realizarse bajo condiciones ambientales controladas, ya que estos factores
          pueden alterar los resultados y comprometer la validez del estudio.
        </p>
        <div className="mt-8 grid sm:grid-cols-3 gap-4">
          {[
            { i: "☀", t: "Clima seco", d: "Sin precipitación durante la medición" },
            { i: "🛣", t: "Pavimento seco", d: "Superficies sin acumulación de agua" },
            { i: "💨", t: "Viento < 3 m/s", d: "Velocidades bajas para evitar interferencia" },
          ].map((c) => (
            <div key={c.t} className="rounded-xl border border-border bg-card p-6">
              <div className="text-3xl">{c.i}</div>
              <div className="mt-3 font-semibold">{c.t}</div>
              <div className="mt-1 text-sm text-muted-foreground">{c.d}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section className="!pt-0">
        <H2>Parámetro de medida: LAeq</H2>
        <div className="mt-8 rounded-2xl border border-border bg-card p-6 md:p-10">
          <p className="text-foreground/85 leading-relaxed">
            La norma exige el uso del{" "}
            <strong className="text-primary">
              Nivel de Presión Sonora Continuo Equivalente Ponderado A (L<sub>Aeq,T</sub>)
            </strong>{" "}
            como parámetro principal. No es un promedio aritmético: es una integración
            logarítmica de la energía sonora durante un periodo de tiempo determinado, lo
            que permite capturar el impacto energético real del ruido sobre el receptor.
          </p>
          <div
            className="mt-8 overflow-x-auto py-4 text-center bg-secondary/40 rounded-xl px-6"
            dangerouslySetInnerHTML={{
              __html: `
<math xmlns="http://www.w3.org/1998/Math/MathML" display="block" style="font-size:1.55rem">
  <mrow>
    <msub><mi>L</mi><mrow><mi>A</mi><mi>e</mi><mi>q</mi><mo>,</mo><mi>T</mi></mrow></msub>
    <mo>=</mo><mn>10</mn><mo>·</mo><msub><mi>log</mi><mn>10</mn></msub><mo>(</mo>
    <mfrac><mn>1</mn><mi>T</mi></mfrac>
    <msubsup><mo>∫</mo><mn>0</mn><mi>T</mi></msubsup>
    <mfrac>
      <msup><mrow><msub><mi>p</mi><mi>A</mi></msub><mo>(</mo><mi>t</mi><mo>)</mo></mrow><mn>2</mn></msup>
      <msup><msub><mi>p</mi><mn>0</mn></msub><mn>2</mn></msup>
    </mfrac>
    <mi>d</mi><mi>t</mi><mo>)</mo><mtext>&#xA0;dBA</mtext>
  </mrow>
</math>`,
            }}
          />
          <div className="mt-6 grid sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
            <div><strong className="text-foreground">p<sub>A</sub>(t):</strong> presión sonora ponderada A</div>
            <div><strong className="text-foreground">p<sub>0</sub>:</strong> presión de referencia (20 µPa)</div>
            <div><strong className="text-foreground">T:</strong> intervalo de tiempo de medición</div>
            <div><strong className="text-foreground">K<sub>t</sub>, K<sub>i</sub>:</strong> correcciones por tonalidad e impulsividad</div>
          </div>
        </div>
      </Section>
    </SiteLayout>
  );
}
