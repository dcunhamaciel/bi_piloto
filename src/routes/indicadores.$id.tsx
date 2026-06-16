import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Sparkles, Send, TrendingUp } from "lucide-react";
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  BarChart,
  Bar,
  Line,
  Legend,
} from "recharts";
import { CHART } from "../lib/mock-data";

export const Route = createFileRoute("/indicadores/$id")({
  head: ({ params }) => ({
    meta: [{ title: `${decodeURIComponent(params.id)} — i.Maq BI` }],
  }),
  component: IndicadorDetalhe,
});

const hist = [
  { ano: "2021", aplicado: 26.2, projetado: null as number | null },
  { ano: "2022", aplicado: 26.8, projetado: null },
  { ano: "2023", aplicado: 27.1, projetado: null },
  { ano: "2024", aplicado: 27.5, projetado: null },
  { ano: "2025", aplicado: 27.8, projetado: 27.8 },
  { ano: "2026", aplicado: null, projetado: 28.4 },
  { ano: "2027", aplicado: null, projetado: 29.0 },
];

const comparativo = [
  { ano: "2023", valor: 245 },
  { ano: "2024", valor: 278 },
  { ano: "2025", valor: 305 },
];

const perguntas = [
  "Por que houve crescimento?",
  "Compare com anos anteriores.",
  "Quais secretarias mais impactaram esse resultado?",
];

function IndicadorDetalhe() {
  const { id } = Route.useParams();
  const nome = decodeURIComponent(id);
  const [pergunta, setPergunta] = useState("");

  return (
    <div className="space-y-6">
      <div>
        <Link to="/biblioteca" className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
          <ArrowLeft className="h-3 w-3" /> Voltar à Biblioteca
        </Link>
        <h1 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">{nome}</h1>
        <p className="text-sm text-muted-foreground">Análise detalhada · Exercício 2025</p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Stat label="Valor aplicado" value="R$ 305,4M" />
        <Stat label="Percentual aplicado" value="27,8%" tone="success" />
        <Stat label="Mínimo constitucional" value="25,0%" />
        <Stat label="Folga em relação ao mínimo" value="+2,8 p.p." tone="success" />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2 space-y-6">
          <Card title="Evolução Histórica e Tendência Futura" subtitle="Linha tracejada representa projeção da IA">
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={hist}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={CHART.primary} stopOpacity={0.4} />
                    <stop offset="100%" stopColor={CHART.primary} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 250)" />
                <XAxis dataKey="ano" fontSize={12} />
                <YAxis fontSize={12} domain={[24, 30]} />
                <Tooltip />
                <Legend />
                <ReferenceLine y={25} stroke={CHART.destructive} strokeDasharray="5 3" label={{ value: "Mínimo 25%", fill: CHART.destructive, fontSize: 11, position: "right" }} />
                <Area type="monotone" dataKey="aplicado" name="Aplicado" stroke={CHART.primary} fill="url(#g1)" strokeWidth={2.5} />
                <Line type="monotone" dataKey="projetado" name="Projeção IA" stroke={CHART.accent} strokeWidth={2.5} strokeDasharray="6 3" dot={{ r: 4 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </Card>

          <Card title="Comparativo Anual" subtitle="Valor absoluto aplicado (R$ milhões)">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={comparativo}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 250)" />
                <XAxis dataKey="ano" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Bar dataKey="valor" fill={CHART.primary} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <aside className="space-y-4">
          <div className="rounded-xl border border-primary/30 bg-gradient-to-br from-primary-soft to-card p-5 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-primary">
              <Sparkles className="h-4 w-4" /> Análise da IA
            </div>
            <p className="mt-3 text-sm leading-relaxed text-foreground">
              O município aplicou <strong>27,8%</strong> em Educação, ficando <strong>acima do mínimo constitucional de 25%</strong>.
              Observa-se estabilidade nos últimos anos, com tendência de crescimento moderado.
            </p>
            <div className="mt-3 flex items-center gap-2 rounded-lg bg-success/10 p-2.5 text-xs text-success">
              <TrendingUp className="h-3.5 w-3.5" />
              Projeção 2027: 29,0% · Conforme LDB.
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <h3 className="text-sm font-bold">Pergunte sobre este indicador</h3>
            <p className="mt-1 text-xs text-muted-foreground">A IA responderá com base nos dados deste indicador.</p>
            <div className="mt-3 space-y-2">
              {perguntas.map((p) => (
                <button key={p} onClick={() => setPergunta(p)} className="block w-full rounded-lg border border-border bg-background px-3 py-2 text-left text-xs hover:border-primary hover:bg-primary-soft">
                  {p}
                </button>
              ))}
            </div>
            <form className="mt-3 flex items-center gap-2 rounded-lg border border-input bg-background pl-3 pr-1">
              <input value={pergunta} onChange={(e) => setPergunta(e.target.value)} placeholder="Digite sua pergunta..." className="flex-1 bg-transparent py-2 text-sm outline-none" />
              <button type="button" className="grid h-7 w-7 place-items-center rounded-md bg-primary text-primary-foreground">
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone?: "success" }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className={`mt-1 text-xl font-bold ${tone === "success" ? "text-success" : "text-foreground"}`}>{value}</div>
    </div>
  );
}

function Card({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="mb-4">
        <h3 className="text-sm font-bold tracking-tight">{title}</h3>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}