import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Bot, Send, Sparkles, BarChart3, TrendingUp, Lightbulb, User } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { CHART } from "../lib/mock-data";

export const Route = createFileRoute("/assistente")({
  head: () => ({ meta: [{ title: "Assistente IA — i.Maq BI" }] }),
  component: Assistente,
});

const exemplos = [
  "Crie um indicador mostrando a evolução dos gastos com saúde nos últimos 5 anos.",
  "Analise os gastos com Educação.",
  "Compare as despesas entre secretarias.",
  "Quais áreas apresentaram maior crescimento?",
  "Existe alguma anomalia nas despesas?",
];

const saudeData = [
  { ano: "2021", valor: 132 },
  { ano: "2022", valor: 148 },
  { ano: "2023", valor: 168 },
  { ano: "2024", valor: 192 },
  { ano: "2025", valor: 215 },
];

function Assistente() {
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; text: string }[]>([
    {
      role: "assistant",
      text:
        "Olá! Sou o Assistente i.Maq BI. Posso analisar dados, criar indicadores, comparar exercícios e identificar tendências. Como posso ajudar hoje?",
    },
  ]);
  const [input, setInput] = useState("");
  const [hasResult, setHasResult] = useState(false);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [
      ...m,
      { role: "user", text },
      {
        role: "assistant",
        text:
          "Analisei os dados solicitados. A evolução dos gastos com Saúde apresenta tendência consistente de crescimento, com taxa média anual de 13% nos últimos 5 anos. O município mantém aplicação acima do mínimo constitucional de 15%, atingindo 18,1% em 2025.",
      },
    ]);
    setInput("");
    setHasResult(true);
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px] h-[calc(100vh-9rem)]">
      <div className="flex flex-col rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 border-b border-border p-4">
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-primary to-[oklch(0.55_0.2_290)] text-primary-foreground">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <div className="font-bold">Assistente i.Maq BI</div>
            <div className="text-xs text-success flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-success" /> Online · IA Especializada em Gestão Pública
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-3 ${m.role === "user" ? "justify-end" : ""}`}>
              {m.role === "assistant" && (
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary-soft text-primary">
                  <Bot className="h-4 w-4" />
                </div>
              )}
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm ${
                  m.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-sm"
                    : "bg-muted text-foreground rounded-bl-sm"
                }`}
              >
                {m.text}
              </div>
              {m.role === "user" && (
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-foreground/10">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}

          {messages.length === 1 && (
            <div className="pt-4">
              <div className="mb-3 text-xs font-semibold uppercase text-muted-foreground">
                Sugestões de perguntas
              </div>
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                {exemplos.map((e) => (
                  <button
                    key={e}
                    onClick={() => send(e)}
                    className="rounded-lg border border-border bg-background p-3 text-left text-sm hover:border-primary hover:bg-primary-soft"
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="border-t border-border p-4"
        >
          <div className="flex items-center gap-2 rounded-xl border border-input bg-background pl-4 pr-2 focus-within:ring-2 focus-within:ring-ring/30">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Pergunte algo sobre as finanças do município..."
              className="flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>

      <aside className="rounded-xl border border-border bg-card shadow-sm overflow-y-auto">
        <div className="border-b border-border p-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <h3 className="font-bold">Resultado Estruturado</h3>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Indicadores, gráficos e insights gerados pela IA.
          </p>
        </div>
        {!hasResult ? (
          <div className="p-8 text-center text-sm text-muted-foreground">
            <Sparkles className="mx-auto mb-3 h-8 w-8 opacity-40" />
            Faça uma pergunta para ver insights estruturados aqui.
          </div>
        ) : (
          <div className="space-y-4 p-4">
            <div>
              <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase text-muted-foreground">
                <BarChart3 className="h-3.5 w-3.5" /> Indicador sugerido
              </div>
              <div className="rounded-lg bg-muted/60 p-3">
                <div className="text-sm font-semibold">Gastos com Saúde · 2021-2025</div>
                <div className="text-xs text-muted-foreground">Em R$ milhões · base anual</div>
                <ResponsiveContainer width="100%" height={140}>
                  <LineChart data={saudeData} margin={{ top: 12, right: 8, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 250)" />
                    <XAxis dataKey="ano" fontSize={10} />
                    <YAxis fontSize={10} />
                    <Tooltip />
                    <Line dataKey="valor" stroke={CHART.secondary} strokeWidth={2.5} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase text-muted-foreground">
                <TrendingUp className="h-3.5 w-3.5" /> Tendência
              </div>
              <div className="rounded-lg border border-border p-3 text-sm">
                Crescimento médio anual de <strong>+13%</strong>, projeção para 2026: <strong>R$ 243M</strong>.
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase text-muted-foreground">
                <Lightbulb className="h-3.5 w-3.5" /> Insights
              </div>
              <ul className="space-y-2 text-sm">
                <li className="rounded-lg bg-success/10 p-3 text-foreground">
                  Aplicação em Saúde acima do mínimo constitucional (18,1% vs. 15%).
                </li>
                <li className="rounded-lg bg-primary-soft p-3 text-foreground">
                  APS (Atenção Primária) lidera crescimento, com +22% em 2025.
                </li>
              </ul>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}