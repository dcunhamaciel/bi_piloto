import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Star, Play, Pencil, Search, BookMarked } from "lucide-react";

export const Route = createFileRoute("/biblioteca")({
  head: () => ({ meta: [{ title: "Biblioteca de Indicadores — i.Maq BI" }] }),
  component: Biblioteca,
});

type Indicador = {
  nome: string;
  descricao: string;
  autor: string;
  data: string;
  categoria: string;
  fav?: boolean;
};

const categorias = {
  "Indicadores Oficiais": [
    { cat: "Educação", items: ["% Aplicado em Educação (MDE)", "FUNDEB — Aplicação 70%", "Custo Aluno-Ano"] },
    { cat: "Saúde", items: ["% Aplicado em Saúde (ASPS)", "Despesas com APS", "Cobertura ESF"] },
    { cat: "Pessoal", items: ["Despesa com Pessoal / RCL (LRF)", "Folha por Poder", "Evolução de Servidores"] },
    { cat: "Receita", items: ["Arrecadação Tributária", "Transferências Constitucionais", "FPM Mensal"] },
    { cat: "Despesa", items: ["Execução Orçamentária", "Despesas por Função", "Investimentos"] },
    { cat: "Restos a Pagar", items: ["RP Processados", "RP Não Processados", "Cancelamentos"] },
    { cat: "Disponibilidade de Caixa", items: ["Saldo Financeiro por Fonte", "Liquidez Imediata"] },
  ],
  "Meus Indicadores": [
    { cat: "Personalizados", items: ["Custo Médio por Aluno EF", "Eficiência Pavimentação", "Contratos por Modalidade"] },
  ],
  "Indicadores Compartilhados": [
    { cat: "Equipe Financeira", items: ["Painel da Controladoria", "Projeção de Receita 2026"] },
  ],
} as const;

function Biblioteca() {
  const [tab, setTab] = useState<keyof typeof categorias>("Indicadores Oficiais");
  const [q, setQ] = useState("");

  const items: Indicador[] = categorias[tab].flatMap((g) =>
    g.items.map((nome, i) => ({
      nome,
      descricao: `Indicador da área de ${g.cat} com cálculo automatizado e atualização periódica.`,
      autor: tab === "Meus Indicadores" ? "Você" : "Equipe i.Maq",
      data: "12/03/2025",
      categoria: g.cat,
      fav: i === 0,
    })),
  );

  const filtered = items.filter((i) => i.nome.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-semibold uppercase tracking-wide text-primary">Biblioteca</div>
        <h1 className="mt-1 text-2xl font-bold tracking-tight md:text-3xl">Indicadores Catalogados</h1>
        <p className="text-sm text-muted-foreground">Repositório oficial, pessoal e compartilhado de indicadores.</p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-1 rounded-lg border border-border bg-card p-1 shadow-sm">
          {(Object.keys(categorias) as (keyof typeof categorias)[]).map((k) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              className={`rounded-md px-4 py-2 text-sm font-semibold transition ${
                tab === k ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {k}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar indicador..."
            className="h-10 w-72 rounded-lg border border-input bg-card pl-9 pr-3 text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((ind, i) => (
          <div key={i} className="group flex flex-col rounded-xl border border-border bg-card p-5 shadow-sm transition hover:shadow-md hover:border-primary/40">
            <div className="flex items-start justify-between gap-2">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary-soft text-primary">
                <BookMarked className="h-5 w-5" />
              </div>
              <span className="rounded-full bg-muted px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                {ind.categoria}
              </span>
            </div>
            <h3 className="mt-3 font-bold tracking-tight">{ind.nome}</h3>
            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{ind.descricao}</p>
            <div className="mt-3 text-xs text-muted-foreground">
              {ind.autor} · {ind.data}
            </div>
            <div className="mt-4 flex items-center gap-2 border-t border-border pt-3">
              <Link
                to="/indicadores/$id"
                params={{ id: encodeURIComponent(ind.nome) }}
                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-md bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
              >
                <Play className="h-3.5 w-3.5" /> Executar
              </Link>
              <button className="grid h-8 w-8 place-items-center rounded-md border border-border hover:bg-muted">
                <Pencil className="h-3.5 w-3.5" />
              </button>
              <button className={`grid h-8 w-8 place-items-center rounded-md border border-border hover:bg-muted ${ind.fav ? "text-warning" : "text-muted-foreground"}`}>
                <Star className={`h-3.5 w-3.5 ${ind.fav ? "fill-current" : ""}`} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}