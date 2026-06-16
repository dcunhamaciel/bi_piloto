import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import {
  Database,
  Filter,
  Layers,
  Save,
  BarChart3,
  LineChart as LineIcon,
  PieChart as PieIcon,
  AreaChart as AreaIcon,
  Table as TableIcon,
  Grid3x3,
} from "lucide-react";
import { CHART, PIE_COLORS } from "../lib/mock-data";

export const Route = createFileRoute("/explorador")({
  head: () => ({ meta: [{ title: "Explorador de Dados — i.Maq BI" }] }),
  component: Explorador,
});

const datasets = ["Despesas", "Receitas", "Pessoal", "Educação", "Saúde", "Contratos", "Licitações", "Patrimônio"];
const dimensoes = ["Exercício", "Mês", "Órgão", "Unidade", "Função", "Subfunção", "Programa", "Projeto/Atividade", "Fonte de Recurso", "Credor"];
const filtros = ["Exercício", "Secretaria", "Fonte de Recurso", "Período"];
const metricas = ["Empenhado", "Liquidado", "Pago", "Arrecadado", "Quantidade"];

const sample = [
  { dim: "Educação", empenhado: 305, liquidado: 290, pago: 270 },
  { dim: "Saúde", empenhado: 248, liquidado: 240, pago: 225 },
  { dim: "Administração", empenhado: 142, liquidado: 135, pago: 128 },
  { dim: "Obras", empenhado: 118, liquidado: 95, pago: 80 },
  { dim: "Assistência", empenhado: 96, liquidado: 90, pago: 84 },
  { dim: "Cultura", empenhado: 54, liquidado: 50, pago: 47 },
];

const vizTypes = [
  { id: "bar", label: "Barras", icon: BarChart3 },
  { id: "line", label: "Linhas", icon: LineIcon },
  { id: "area", label: "Área", icon: AreaIcon },
  { id: "pie", label: "Pizza", icon: PieIcon },
  { id: "table", label: "Tabela", icon: TableIcon },
  { id: "heatmap", label: "Mapa de Calor", icon: Grid3x3 },
] as const;

type Viz = (typeof vizTypes)[number]["id"];

function Explorador() {
  const [dataset, setDataset] = useState("Despesas");
  const [viz, setViz] = useState<Viz>("bar");
  const [selDim, setSelDim] = useState<string[]>(["Função"]);
  const [selMetricas, setSelMetricas] = useState<string[]>(["Empenhado", "Liquidado", "Pago"]);

  const toggle = (arr: string[], item: string, set: (v: string[]) => void) =>
    set(arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-primary">Explorador</div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight md:text-3xl">Construa seu indicador</h1>
          <p className="text-sm text-muted-foreground">
            Arraste dimensões, métricas e filtros para construir análises sob medida.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90">
          <Save className="h-4 w-4" /> Salvar Indicador
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-sm">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Database className="h-4 w-4 text-primary" /> Dataset:
        </div>
        <div className="flex flex-wrap gap-2">
          {datasets.map((d) => (
            <button
              key={d}
              onClick={() => setDataset(d)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                dataset === d ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-accent"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="space-y-4">
          <Panel icon={Layers} title="Dimensões">
            {dimensoes.map((d) => (
              <Chip key={d} active={selDim.includes(d)} onClick={() => toggle(selDim, d, setSelDim)}>
                {d}
              </Chip>
            ))}
          </Panel>
          <Panel icon={Filter} title="Filtros">
            {filtros.map((f) => (
              <div key={f} className="flex items-center justify-between rounded-md px-2 py-1.5 text-sm hover:bg-muted">
                <span>{f}</span>
                <span className="text-xs text-muted-foreground">Todos</span>
              </div>
            ))}
          </Panel>
          <Panel icon={BarChart3} title="Métricas">
            {metricas.map((m) => (
              <Chip key={m} active={selMetricas.includes(m)} onClick={() => toggle(selMetricas, m, setSelMetricas)}>
                {m}
              </Chip>
            ))}
          </Panel>
        </aside>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2 rounded-xl border border-border bg-card p-2 shadow-sm">
            {vizTypes.map((v) => {
              const I = v.icon;
              return (
                <button
                  key={v.id}
                  onClick={() => setViz(v.id)}
                  className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-xs font-semibold transition ${
                    viz === v.id ? "bg-primary-soft text-primary" : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <I className="h-4 w-4" /> {v.label}
                </button>
              );
            })}
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold">{dataset} por {selDim[0] ?? "—"}</h3>
                <p className="text-xs text-muted-foreground">
                  Métricas: {selMetricas.join(", ") || "—"}
                </p>
              </div>
              <span className="rounded-full bg-success/10 px-2 py-1 text-xs font-semibold text-success">
                Atualizado agora
              </span>
            </div>

            {viz === "heatmap" ? (
              <div className="grid grid-cols-12 gap-1 p-2">
                {Array.from({ length: 96 }).map((_, i) => {
                  const intensity = Math.abs(Math.sin(i * 1.7)) * 0.9 + 0.1;
                  return (
                    <div
                      key={i}
                      className="aspect-square rounded"
                      style={{ background: `oklch(0.42 0.18 255 / ${intensity})` }}
                    />
                  );
                })}
              </div>
            ) : viz === "table" ? null : (
              <ResponsiveContainer width="100%" height={360}>
                {renderViz(viz, sample, selMetricas)}
              </ResponsiveContainer>
            )}

            {viz === "table" && (
              <table className="mt-4 w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs uppercase text-muted-foreground">
                    <th className="py-2">Função</th>
                    <th>Empenhado</th>
                    <th>Liquidado</th>
                    <th>Pago</th>
                  </tr>
                </thead>
                <tbody>
                  {sample.map((r) => (
                    <tr key={r.dim} className="border-b border-border/60">
                      <td className="py-2 font-medium">{r.dim}</td>
                      <td>R$ {r.empenhado}M</td>
                      <td>R$ {r.liquidado}M</td>
                      <td>R$ {r.pago}M</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function renderViz(viz: Viz, data: typeof sample, metrics: string[]) {
  const keyMap: Record<string, "empenhado" | "liquidado" | "pago"> = {
    Empenhado: "empenhado",
    Liquidado: "liquidado",
    Pago: "pago",
  };
  const keys = metrics.map((m) => keyMap[m]).filter(Boolean);
  const colors = [CHART.primary, CHART.secondary, CHART.warning];
  if (viz === "bar")
    return (
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 250)" />
        <XAxis dataKey="dim" fontSize={12} stroke="oklch(0.5 0.03 255)" />
        <YAxis fontSize={12} stroke="oklch(0.5 0.03 255)" />
        <Tooltip />
        <Legend />
        {keys.map((k, i) => (
          <Bar key={k} dataKey={k} fill={colors[i]} radius={[4, 4, 0, 0]} />
        ))}
      </BarChart>
    );
  if (viz === "line")
    return (
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 250)" />
        <XAxis dataKey="dim" fontSize={12} />
        <YAxis fontSize={12} />
        <Tooltip />
        <Legend />
        {keys.map((k, i) => (
          <Line key={k} dataKey={k} stroke={colors[i]} strokeWidth={2.5} />
        ))}
      </LineChart>
    );
  if (viz === "area")
    return (
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 250)" />
        <XAxis dataKey="dim" fontSize={12} />
        <YAxis fontSize={12} />
        <Tooltip />
        <Legend />
        {keys.map((k, i) => (
          <Area key={k} dataKey={k} stroke={colors[i]} fill={colors[i]} fillOpacity={0.2} />
        ))}
      </AreaChart>
    );
  if (viz === "pie")
    return (
      <PieChart>
        <Pie data={data} dataKey="empenhado" nameKey="dim" innerRadius={60} outerRadius={120} paddingAngle={2}>
          {data.map((_, i) => (
            <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    );
  return <BarChart data={data} />;
}

function Panel({ icon: Icon, title, children }: { icon: React.ComponentType<{ className?: string }>; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
        <Icon className="h-3.5 w-3.5" /> {title}
      </div>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition ${
        active ? "bg-primary text-primary-foreground" : "bg-muted text-foreground hover:bg-accent"
      }`}
    >
      {children}
    </button>
  );
}