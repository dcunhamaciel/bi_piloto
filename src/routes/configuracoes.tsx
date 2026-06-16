import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/configuracoes")({
  head: () => ({ meta: [{ title: "Configurações — i.Maq BI" }] }),
  component: Configuracoes,
});

function Configuracoes() {
  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-semibold uppercase tracking-wide text-primary">Configurações</div>
        <h1 className="mt-1 text-2xl font-bold tracking-tight md:text-3xl">Preferências da Plataforma</h1>
        <p className="text-sm text-muted-foreground">Conexões, parâmetros municipais e integrações.</p>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {[
          { t: "Dados do Município", d: "Razão social, CNPJ, exercício, brasão e identidade visual." },
          { t: "Conexão de Banco", d: "Firebird (API Delphi) · Banco analítico para IA · Status: Conectado." },
          { t: "Parâmetros Constitucionais", d: "Mínimos de Educação (25%), Saúde (15%) e limites LRF." },
          { t: "Integrações IA", d: "Engine Python · Modelos personalizados para gestão pública." },
          { t: "Notificações", d: "Alertas automáticos por e-mail e push." },
          { t: "Backup & Segurança", d: "Snapshots diários · LGPD · Logs de auditoria." },
        ].map((s) => (
          <div key={s.t} className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <h3 className="font-bold">{s.t}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
            <button className="mt-4 text-xs font-semibold text-primary hover:underline">Configurar →</button>
          </div>
        ))}
      </div>
    </div>
  );
}