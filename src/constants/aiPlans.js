/** Mirror of backend/src/config/aiPlans.ts — AI add-on plans. */
export const AI_PLANS = [
  {
    id: "ai-seed",
    code: "SEED",
    name: "IA Semilla",
    priceMonthly: 5,
    priceAnnual: 48,
    budgetUsd: 5,
    description:
      "Cupo mensual de $5 para el asistente pastoral: briefing del domingo, turnos y preguntas del equipo.",
    highlights: ["Church AI chat", "Confirmaciones humanas", "Soporte por email"],
  },
  {
    id: "ai-growth",
    code: "GROWTH",
    name: "IA Crecimiento",
    priceMonthly: 20,
    priceAnnual: 192,
    budgetUsd: 20,
    popular: true,
    description:
      "Cupo de $20/mes con skills de operación, planes de evento con cupos de presupuesto y Media AI.",
    highlights: [
      "Todo Semilla",
      "Skills de operaciones",
      "Planes de evento",
      "Media AI (clips)",
    ],
  },
  {
    id: "ai-kingdom",
    code: "KINGDOM",
    name: "IA Reino",
    priceMonthly: 75,
    priceAnnual: 720,
    budgetUsd: 75,
    description:
      "Cupo alto de $75/mes para equipos que viven en la IA todos los días.",
    highlights: [
      "Todo Crecimiento",
      "Cupo alto",
      "Prioridad de cola",
      "Créditos a precio preferente",
    ],
  },
];

export const AI_CREDIT_PACKS = [
  { id: "credit_10", usd: 10 },
  { id: "credit_25", usd: 25 },
  { id: "credit_50", usd: 50 },
];
