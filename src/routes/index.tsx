import { createFileRoute, Link } from "@tanstack/react-router";
import {
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Sparkles,
  AlertTriangle,
  Info,
  CheckCircle2,
  Wallet,
  Receipt,
  PiggyBank,
  GraduationCap,
  HeartPulse,
  UserSquare2,
  ClipboardList,
  Banknote,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  receitaDespesa,
  constitucionais,
  porSecretaria,
  porReceita,
  insights,
  fmtBRL,
  CHART,
  PIE_COLORS,
} from "../lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — i.Maq BI" },
      { name: "description", content: "Painel executivo com indicadores fiscais, financeiros e operacionais do município." },
    ],
  }),
  component: Dashboard,
});

type CardProps = {
  label: string;
  value: string;
  pct: number;
  delta: number;
  icon: React.ComponentType<{ className?: string }>;
  tone?: "primary" | "success" | "warning" | "destructive";
};

function KpiCard({ label, value, pct, delta, icon: Icon, tone = "primary" }: CardProps) {
  const up = delta >= 0;
  const toneBg = {
    primary: "bg-primary-soft text-primary",
    success: "bg-success/10 text-success",
    warning: "bg-warning/15 text-warning-foreground",
    destructive: "bg-destructive/10 text-destructive",
  }[tone];
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className={`grid h-10 w-10 place-items-center rounded-lg ${toneBg}`}>
          <Icon className="h-5 w-5" />
        </div>
        <span
          className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold ${
            up ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
          }`}
        >
          {up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          {up ? "+" : ""}
          {delta.toFixed(1)}%
        </span>
      </div>
      <div className="mt-4 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </div>
      <div className="mt-1 text-2xl font-bold tracking-tight">{value}</div>
      <div className="mt-1 text-xs text-muted-foreground">
        {pct.toFixed(1)}% do orçamento · vs. período anterior
      </div>
    </div>
  );
}

function Dashboard() {
  const kpis: CardProps[] = [
    { label: "Receita Total", value: fmtBRL(1_180_000_000), pct: 100, delta: 9.3, icon: Wallet, tone: "primary" },
    { label: "Despesa Total", value: fmtBRL(1_095_000_000), pct: 92.8, delta: 7.4, icon: Receipt, tone: "primary" },
    { label: "Superávit", value: fmtBRL(85_000_000), pct: 7.2, delta: 18.2, icon: PiggyBank, tone: "success" },
    { label: "Educação", value: "27,8%", pct: 27.8, delta: 1.1, icon: GraduationCap, tone: "success" },
    { label: "Saúde", value: "18,1%", pct: 18.1, delta: 2.8, icon: HeartPulse, tone: "success" },
    { label: "Pessoal", value: "52,0%", pct: 52.0, delta: 1.2, icon: UserSquare2, tone: "warning" },
    { label: "Restos a Pagar", value: fmtBRL(74_500_000), pct: 6.3, delta: -12.0, icon: ClipboardList, tone: "primary" },
    { label: "Disponibilidade", value: fmtBRL(312_000_000), pct: 26.4, delta: 4.6, icon: Banknote, tone: "success" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-primary">
            Painel Executivo
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight md:text-3xl">
            Visão Geral do Município
          </h1>
          <p className="text-sm text-muted-foreground">
            Indicadores fiscais e operacionais consolidados · Exercício 2026
          </p>
        </div>
        <div className="flex gap-2">
          <select className="h-9 rounded-lg border border-input bg-card px-3 text-sm">
            <option>Exercício 2026</option>
            <option>Exercício 2025</option>
            <option>Exercício 2024</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => (
          <KpiCard key={k.label} {...k} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2 space-y-6">
          <ChartCard title="Receita x Despesa" subtitle="Evolução nos últimos 5 anos · valores em R$ milhões">
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={receitaDespesa}>
                <defs>
                  <linearGradient id="gReceita" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={CHART.primary} stopOpacity={0.35} />
                    <stop offset="100%" stopColor={CHART.primary} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gDespesa" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={CHART.destructive} stopOpacity={0.25} />
                    <stop offset="100%" stopColor={CHART.destructive} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 250)" />
                <XAxis dataKey="ano" stroke="oklch(0.5 0.03 255)" fontSize={12} />
                <YAxis stroke="oklch(0.5 0.03 255)" fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid oklch(0.92 0.01 250)" }} />
                <Legend />
                <Area type="monotone" dataKey="receita" name="Receita" stroke={CHART.primary} fill="url(#gReceita)" strokeWidth={2.5} />
                <Area type="monotone" dataKey="despesa" name="Despesa" stroke={CHART.destructive} fill="url(#gDespesa)" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Gastos Constitucionais" subtitle="Educação, Saúde e Pessoal · % aplicado ao longo dos anos">
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={constitucionais}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 250)" />
                <XAxis dataKey="ano" stroke="oklch(0.5 0.03 255)" fontSize={12} />
                <YAxis stroke="oklch(0.5 0.03 255)" fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid oklch(0.92 0.01 250)" }} />
                <Legend />
                <Line type="monotone" dataKey="educacao" name="Educação" stroke={CHART.primary} strokeWidth={2.5} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="saude" name="Saúde" stroke={CHART.secondary} strokeWidth={2.5} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="pessoal" name="Pessoal" stroke={CHART.warning} strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <ChartCard title="Despesas por Secretaria" subtitle="R$ milhões">
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={porSecretaria} layout="vertical" margin={{ left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 250)" />
                  <XAxis type="number" stroke="oklch(0.5 0.03 255)" fontSize={11} />
                  <YAxis type="category" dataKey="nome" stroke="oklch(0.5 0.03 255)" fontSize={11} width={100} />
                  <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid oklch(0.92 0.01 250)" }} />
                  <Bar dataKey="valor" fill={CHART.primary} radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Receitas por Categoria" subtitle="Distribuição da arrecadação">
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie data={porReceita} dataKey="valor" nameKey="nome" innerRadius={50} outerRadius={90} paddingAngle={2}>
                    {porReceita.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid oklch(0.92 0.01 250)" }} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-xl border border-border bg-gradient-to-br from-primary to-[oklch(0.55_0.2_255)] p-5 text-primary-foreground shadow-sm">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide opacity-90">
              <Sparkles className="h-4 w-4" /> Insights Automáticos
            </div>
            <p className="mt-2 text-sm opacity-95">
              Análises geradas em tempo real pela IA do i.Maq BI com base nos dados do exercício.
            </p>
          </div>
          {insights.map((ins, i) => {
            const I = ins.tipo === "positivo" ? CheckCircle2 : ins.tipo === "alerta" ? AlertTriangle : Info;
            const tone =
              ins.tipo === "positivo"
                ? "bg-success/10 text-success"
                : ins.tipo === "alerta"
                  ? "bg-warning/15 text-warning-foreground"
                  : "bg-primary-soft text-primary";
            return (
              <div key={i} className="rounded-xl border border-border bg-card p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${tone}`}>
                    <I className="h-4 w-4" />
                  </div>
                  <p className="text-sm leading-relaxed text-foreground">{ins.texto}</p>
                </div>
              </div>
            );
          })}
          <Link
            to="/assistente"
            className="flex items-center justify-between rounded-xl border border-dashed border-primary/40 bg-primary-soft px-4 py-3 text-sm font-semibold text-primary hover:bg-primary/10"
          >
            Conversar com o Assistente IA
            <ArrowRight className="h-4 w-4" />
          </Link>
        </aside>
      </div>
    </div>
  );
}

function ChartCard({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
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
