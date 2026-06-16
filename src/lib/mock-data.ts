export const fmtBRL = (n: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(n);

export const fmtCompact = (n: number) =>
  new Intl.NumberFormat("pt-BR", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(n);

export const receitaDespesa = [
  { ano: "2021", receita: 820, despesa: 790 },
  { ano: "2022", receita: 905, despesa: 860 },
  { ano: "2023", receita: 980, despesa: 940 },
  { ano: "2024", receita: 1080, despesa: 1020 },
  { ano: "2025", receita: 1180, despesa: 1095 },
];

export const constitucionais = [
  { ano: "2021", educacao: 26.2, saude: 16.1, pessoal: 48.2 },
  { ano: "2022", educacao: 26.8, saude: 16.5, pessoal: 49.0 },
  { ano: "2023", educacao: 27.1, saude: 17.2, pessoal: 50.1 },
  { ano: "2024", educacao: 27.5, saude: 17.6, pessoal: 51.4 },
  { ano: "2025", educacao: 27.8, saude: 18.1, pessoal: 52.0 },
];

export const porSecretaria = [
  { nome: "Educação", valor: 305 },
  { nome: "Saúde", valor: 248 },
  { nome: "Administração", valor: 142 },
  { nome: "Obras", valor: 118 },
  { nome: "Assistência", valor: 96 },
  { nome: "Cultura", valor: 54 },
  { nome: "Outros", valor: 132 },
];

export const porReceita = [
  { nome: "Tributária", valor: 480 },
  { nome: "Transferências", valor: 520 },
  { nome: "Contribuições", valor: 95 },
  { nome: "Patrimonial", valor: 45 },
  { nome: "Outros", valor: 40 },
];

export const insights = [
  {
    tipo: "positivo",
    texto:
      "Os gastos com Educação estão 2,8% acima do mínimo constitucional de 25%.",
  },
  {
    tipo: "alerta",
    texto:
      "As despesas com pessoal cresceram 6% em relação ao ano anterior, aproximando-se do limite prudencial da LRF.",
  },
  {
    tipo: "positivo",
    texto:
      "A arrecadação tributária apresenta tendência consistente de crescimento (+9,3% YoY).",
  },
  {
    tipo: "info",
    texto:
      "Restos a pagar processados reduziram 12% em relação a 2024 — boa execução orçamentária.",
  },
];

export const CHART = {
  primary: "oklch(0.42 0.18 255)",
  secondary: "oklch(0.62 0.16 152)",
  warning: "oklch(0.78 0.16 85)",
  destructive: "oklch(0.6 0.22 27)",
  muted: "oklch(0.7 0.05 250)",
  accent: "oklch(0.55 0.2 290)",
  teal: "oklch(0.65 0.13 200)",
};

export const PIE_COLORS = [
  CHART.primary,
  CHART.secondary,
  CHART.warning,
  CHART.accent,
  CHART.teal,
  CHART.destructive,
  CHART.muted,
];