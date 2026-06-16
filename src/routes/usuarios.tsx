import { createFileRoute } from "@tanstack/react-router";
import { UserPlus } from "lucide-react";

export const Route = createFileRoute("/usuarios")({
  head: () => ({ meta: [{ title: "Usuários — i.Maq BI" }] }),
  component: Usuarios,
});

const users = [
  { n: "Maria Ribeiro", c: "Secretária de Finanças", p: "Administrador", e: "maria@municipio.gov.br", s: "Ativo" },
  { n: "João Almeida", c: "Controlador Interno", p: "Controlador", e: "joao@municipio.gov.br", s: "Ativo" },
  { n: "Patrícia Souza", c: "Contadora", p: "Editor", e: "patricia@municipio.gov.br", s: "Ativo" },
  { n: "Carlos Mendes", c: "Sec. de Educação", p: "Visualizador", e: "carlos@municipio.gov.br", s: "Ativo" },
  { n: "Ana Lima", c: "Servidora", p: "Visualizador", e: "ana@municipio.gov.br", s: "Pendente" },
];

function Usuarios() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-primary">Usuários</div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight md:text-3xl">Gestão de acessos</h1>
          <p className="text-sm text-muted-foreground">Controle quem acessa indicadores e relatórios.</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
          <UserPlus className="h-4 w-4" /> Novo usuário
        </button>
      </div>
      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/60 text-left text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-5 py-3">Usuário</th>
              <th className="px-5 py-3">Cargo</th>
              <th className="px-5 py-3">Perfil</th>
              <th className="px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.e} className="border-t border-border hover:bg-muted/40">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                      {u.n.split(" ").map((x) => x[0]).slice(0, 2).join("")}
                    </div>
                    <div>
                      <div className="font-semibold">{u.n}</div>
                      <div className="text-xs text-muted-foreground">{u.e}</div>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">{u.c}</td>
                <td className="px-5 py-4">
                  <span className="rounded-full bg-primary-soft px-2 py-1 text-xs font-semibold text-primary">{u.p}</span>
                </td>
                <td className="px-5 py-4">
                  <span className={`rounded-full px-2 py-1 text-xs font-semibold ${u.s === "Ativo" ? "bg-success/10 text-success" : "bg-warning/15 text-warning-foreground"}`}>
                    {u.s}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}