import { createFileRoute } from "@tanstack/react-router";
import { FileText, Download, Calendar } from "lucide-react";

export const Route = createFileRoute("/relatorios")({
  head: () => ({ meta: [{ title: "Relatórios — i.Maq BI" }] }),
  component: Relatorios,
});

const relatorios = [
  { nome: "Relatório de Gestão Fiscal (RGF) — 3º Quadrimestre", data: "30/01/2026", tipo: "Obrigatório LRF" },
  { nome: "Relatório Resumido da Execução Orçamentária (RREO)", data: "28/01/2026", tipo: "Obrigatório LRF" },
  { nome: "Prestação de Contas Anual — Educação", data: "15/01/2026", tipo: "Constitucional" },
  { nome: "Painel Executivo Mensal", data: "05/01/2026", tipo: "Gerencial" },
  { nome: "Relatório de Pessoal por Poder", data: "02/01/2026", tipo: "Gerencial" },
];

function Relatorios() {
  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-semibold uppercase tracking-wide text-primary">Relatórios</div>
        <h1 className="mt-1 text-2xl font-bold tracking-tight md:text-3xl">Relatórios oficiais e gerenciais</h1>
        <p className="text-sm text-muted-foreground">Documentos prontos para envio ao TCE, MP e órgãos de controle.</p>
      </div>
      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/60">
            <tr className="text-left text-xs uppercase text-muted-foreground">
              <th className="px-5 py-3">Relatório</th>
              <th className="px-5 py-3">Tipo</th>
              <th className="px-5 py-3">Gerado em</th>
              <th className="px-5 py-3 text-right">Ação</th>
            </tr>
          </thead>
          <tbody>
            {relatorios.map((r) => (
              <tr key={r.nome} className="border-t border-border hover:bg-muted/40">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary-soft text-primary">
                      <FileText className="h-4 w-4" />
                    </div>
                    <span className="font-semibold">{r.nome}</span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className="rounded-full bg-muted px-2 py-1 text-xs font-semibold">{r.tipo}</span>
                </td>
                <td className="px-5 py-4 text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" /> {r.data}
                  </span>
                </td>
                <td className="px-5 py-4 text-right">
                  <button className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90">
                    <Download className="h-3.5 w-3.5" /> Baixar PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}