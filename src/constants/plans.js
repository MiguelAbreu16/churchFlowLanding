/**
 * Static fallback mirroring backend/src/config/plans.ts (PLAN_ENTITLEMENTS).
 * Live prices / limits / modules come from the `planCatalog` query (see usePlans).
 */
const SEED_MODULES = [
  "churchLife",
  "visits",
  "shifts",
  "worship",
  "dance",
  "liveService",
  "publicSignup",
  "notifications",
];
const GROWTH_MODULES = [
  ...SEED_MODULES,
  "studies",
  "library",
  "finances",
  "events",
  "parking",
  "analytics",
  "pulse",
  "marketplace",
];
const KINGDOM_MODULES = [...GROWTH_MODULES, "kids", "camps", "network"];

export const PLANS = [
  {
    id: "basic",
    planCode: "SEMILLA",
    nameKey: "plans.basic.name",
    descriptionKey: "plans.basic.description",
    price: 29,
    priceAnnual: 278,
    periodKey: "plans.period",
    modules: SEED_MODULES,
    limits: {
      maxMembers: 500,
      maxUsers: 10,
      maxLayouts: 1,
      maxSeatsPerLayout: 500,
      maxUshers: 5,
    },
    addOns: [
      { key: "camps", priceMonthly: 20 },
      { key: "kids", priceMonthly: 19 },
      { key: "parking", priceMonthly: 15 },
    ],
    campusDiscountPct: 0,
    prioritySupport: false,
    color: "#64748B",
    popular: false,
  },
  {
    id: "pro",
    planCode: "STANDARD",
    nameKey: "plans.pro.name",
    descriptionKey: "plans.pro.description",
    price: 79,
    priceAnnual: 758,
    periodKey: "plans.period",
    modules: GROWTH_MODULES,
    limits: {
      maxMembers: 2000,
      maxUsers: 20,
      maxLayouts: 5,
      maxSeatsPerLayout: 2000,
      maxUshers: 20,
    },
    addOns: [
      { key: "camps", priceMonthly: 20 },
      { key: "kids", priceMonthly: 19 },
    ],
    campusDiscountPct: 0,
    prioritySupport: false,
    color: "#eab308",
    popular: true,
  },
  {
    id: "enterprise",
    planCode: "ENTERPRISE",
    nameKey: "plans.enterprise.name",
    descriptionKey: "plans.enterprise.description",
    price: 199,
    priceAnnual: 1910,
    periodKey: "plans.period",
    modules: KINGDOM_MODULES,
    limits: {
      maxMembers: 10000,
      maxUsers: null,
      maxLayouts: 50,
      maxSeatsPerLayout: 10000,
      maxUshers: null,
    },
    addOns: [],
    campusDiscountPct: 20,
    prioritySupport: true,
    color: "#1E293B",
    popular: false,
  },
];

const LIMIT_KEYS = [
  "maxMembers",
  "maxUsers",
  "maxLayouts",
  "maxSeatsPerLayout",
  "maxUshers",
];

/** Overlay live `planCatalog` rows on the static plans. */
export function mergeCatalog(catalog) {
  if (!catalog?.length) return PLANS;
  return PLANS.map((plan) => {
    const row = catalog.find(
      (c) => c.planCode === plan.planCode || c.landingId === plan.id,
    );
    if (!row?.modules) return plan;
    return {
      ...plan,
      price: row.priceMonthly,
      priceAnnual: row.priceAnnual,
      modules: row.modules,
      limits: Object.fromEntries(LIMIT_KEYS.map((k) => [k, row[k]])),
      addOns: row.addOns || [],
      campusDiscountPct: row.campusDiscountPct,
      prioritySupport: row.prioritySupport,
    };
  });
}

const fmt = (n) => n.toLocaleString("en-US");
const limitText = (t, key, n) =>
  n === null || n === undefined
    ? t(`plans.features.${key}Unlimited`)
    : t(`plans.features.${key}`, { n: fmt(n) });

/** Card bullet list: limits, modules new vs. the previous plan, perks and add-ons. */
export function planFeatures(plan, t) {
  const index = PLANS.findIndex((p) => p.id === plan.id);
  const prev = PLANS[index - 1];
  const { limits } = plan;
  return [
    limitText(t, "members", limits.maxMembers),
    limitText(t, "users", limits.maxUsers),
    t("plans.features.layouts", {
      layouts: limits.maxLayouts,
      seats: fmt(limits.maxSeatsPerLayout),
    }),
    limitText(t, "ushers", limits.maxUshers),
    prev && t("plans.features.everythingIn", { plan: t(prev.nameKey) }),
    ...plan.modules
      .filter((m) => !prev?.modules.includes(m))
      .map((m) => t(`plans.modules.${m}`)),
    plan.campusDiscountPct > 0 &&
      t("plans.features.campusDiscount", { pct: plan.campusDiscountPct }),
    plan.prioritySupport && t("plans.features.prioritySupport"),
    ...plan.addOns.map((a) =>
      t("plans.features.addOn", {
        module: t(`plans.modules.${a.key}`),
        price: a.priceMonthly,
      }),
    ),
  ].filter(Boolean);
}

const limitCell = (n) =>
  n === null || n === undefined ? { key: "plans.compare.unlimited" } : fmt(n);

/** Comparison table rows generated from limits + the module matrix. */
export function comparisonRows(plans) {
  const row = (labelKey, cell) => ({
    labelKey,
    cells: plans.map((p) => cell(p)),
  });
  const moduleCell = (m) => (p) => {
    if (p.modules.includes(m)) return true;
    const addOn = p.addOns.find((a) => a.key === m);
    return addOn
      ? { key: "plans.compare.addon", params: { price: addOn.priceMonthly } }
      : false;
  };
  return [
    row("plans.compare.labels.members", (p) => limitCell(p.limits.maxMembers)),
    row("plans.compare.labels.users", (p) => limitCell(p.limits.maxUsers)),
    row("plans.compare.labels.layouts", (p) => limitCell(p.limits.maxLayouts)),
    row("plans.compare.labels.seats", (p) =>
      limitCell(p.limits.maxSeatsPerLayout),
    ),
    row("plans.compare.labels.ushers", (p) => limitCell(p.limits.maxUshers)),
    ...KINGDOM_MODULES.map((m) => row(`plans.modules.${m}`, moduleCell(m))),
    row("plans.compare.labels.campusDiscount", (p) =>
      p.campusDiscountPct > 0 ? `${p.campusDiscountPct}%` : false,
    ),
    row("plans.compare.labels.prioritySupport", (p) => p.prioritySupport),
  ];
}
