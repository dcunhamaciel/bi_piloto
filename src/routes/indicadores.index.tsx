import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BarChart3 } from "lucide-react";

export const Route = createFileRoute("/indicadores/")({
  head: () => ({ meta: [{ title: "Indicadores — i.Maq BI" }] }),
  component: IndicadoresList,
});

const destaques = [
  { nome: "% Aplicado em Educação", valor: "27,8%", delta: "+1,1%", tone: "success" },
  { nome: "% Aplicado em Saúde", valor: "18,1%", delta: "+2,8%", tone: "success" },
  { nome: "Despesa com Pessoal / RCL", valor: "52,0%", delta: "+1,2%", tone: "warning" },
  { nome: "Receita Tributária", valor: "R$ 480M", delta: "+9,3%", tone: "success" },
  { nome: "Restos a Pagar", valor: "R$ 74,5M", delta: "-12,0%", tone: "success" },
  { nome: "Disponibilidade de Caixa", valor: "R$ 312M", delta: "+4,6%", tone: "success" },
];

function IndicadoresList() {
  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-semibold uppercase tracking-wide text-primary">Indicadores</div>
        <h1 className="mt-1 text-2xl font-bold tracking-tight md:text-3xl">Indicadores em destaque</h1>
        <p className="text-sm text-muted-foreground">Acompanhe a saúde fiscal do município em tempo real.</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {destaques.map((d) => (
          <Link
            key={d.nome}
            to="/indicadores/$id"
            params={{ id: encodeURIComponent(d.nome) }}
            className="group flex flex-col rounded-xl border border-border bg-card p-5 shadow-sm transition hover:shadow-md hover:border-primary/40"
          >
            <div className="flex items-center justify-between">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary-soft text-primary">
                <BarChart3 className="h-5 w-5" />
              </div>
              <span className={`rounded-md px-2 py-1 text-xs font-bold ${d.tone === "warning" ? "bg-warning/15 text-warning-foreground" : "bg-success/10 text-success"}`}>{d.delta}</span>
            </div>
            <div className="mt-4 text-sm font-semibold">{d.nome}</div>
            <div className="mt-1 text-2xl font-bold">{d.valor}</div>
            <div className="mt-3 flex items-center justify-end text-xs font-semibold text-primary opacity-0 transition group-hover:opacity-100">
              Ver detalhes <ArrowRight className="ml-1 h-3 w-3" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}