import { createFileRoute, Link } from "@tanstack/react-router";
import { Star, Play } from "lucide-react";

export const Route = createFileRoute("/favoritos")({
  head: () => ({ meta: [{ title: "Favoritos — i.Maq BI" }] }),
  component: Favoritos,
});

const favs = [
  "% Aplicado em Educação (MDE)",
  "% Aplicado em Saúde (ASPS)",
  "Despesa com Pessoal / RCL (LRF)",
  "Painel da Controladoria",
];

function Favoritos() {
  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-semibold uppercase tracking-wide text-primary">Favoritos</div>
        <h1 className="mt-1 text-2xl font-bold tracking-tight md:text-3xl">Seus indicadores favoritos</h1>
        <p className="text-sm text-muted-foreground">Acesso rápido aos indicadores que você mais utiliza.</p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {favs.map((f) => (
          <div key={f} className="flex items-center justify-between rounded-xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <Star className="h-5 w-5 fill-current text-warning" />
              <div>
                <div className="font-semibold">{f}</div>
                <div className="text-xs text-muted-foreground">Atualizado há 2 horas</div>
              </div>
            </div>
            <Link to="/indicadores/$id" params={{ id: encodeURIComponent(f) }} className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90">
              <Play className="h-3.5 w-3.5" /> Executar
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}