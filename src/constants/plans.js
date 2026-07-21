export const PLANS = [
  {
    id: "basic",
    nameKey: "plans.basic.name",
    descriptionKey: "plans.basic.description",
    price: 29,
    periodKey: "plans.period",
    featureKeys: [
      "plans.basic.features.seats",
      "plans.basic.features.layouts",
      "plans.basic.features.ushers",
      "plans.basic.features.liveOps",
      "plans.basic.features.emailSupport",
    ],
    color: "#64748B",
    popular: false,
  },
  {
    id: "pro",
    nameKey: "plans.pro.name",
    descriptionKey: "plans.pro.description",
    price: 79,
    periodKey: "plans.period",
    featureKeys: [
      "plans.pro.features.seats",
      "plans.pro.features.layouts",
      "plans.pro.features.ushers",
      "plans.pro.features.events",
      "plans.pro.features.analytics",
      "plans.pro.features.parkingMembers",
      "plans.pro.features.prioritySupport",
    ],
    color: "#eab308",
    popular: true,
  },
  {
    id: "enterprise",
    nameKey: "plans.enterprise.name",
    descriptionKey: "plans.enterprise.description",
    price: 199,
    periodKey: "plans.period",
    featureKeys: [
      "plans.enterprise.features.seats",
      "plans.enterprise.features.layouts",
      "plans.enterprise.features.ushers",
      "plans.enterprise.features.audit",
      "plans.enterprise.features.dedicatedSupport",
      "plans.enterprise.features.apiComingSoon",
      "plans.enterprise.features.addonHint",
    ],
    color: "#1E293B",
    popular: false,
  },
];

/** @deprecated Apóstol is included in Plan Reino; kept for legacy imports. */
export const APOSTOL_ADDON = null;

/** Rows for PricingComparisonTable — values are i18n keys or plan field keys */
export const PLAN_COMPARISON_ROWS = [
  { key: "seats", basic: "plans.compare.seats.basic", pro: "plans.compare.seats.pro", enterprise: "plans.compare.seats.enterprise" },
  { key: "layouts", basic: "plans.compare.layouts.basic", pro: "plans.compare.layouts.pro", enterprise: "plans.compare.layouts.enterprise" },
  { key: "ushers", basic: "plans.compare.ushers.basic", pro: "plans.compare.ushers.pro", enterprise: "plans.compare.ushers.enterprise" },
  { key: "liveOps", basic: true, pro: true, enterprise: true },
  { key: "incidents", basic: true, pro: true, enterprise: true },
  { key: "terminal", basic: true, pro: true, enterprise: true },
  { key: "events", basic: false, pro: true, enterprise: true },
  { key: "tickets", basic: false, pro: true, enterprise: true },
  { key: "checkIn", basic: false, pro: true, enterprise: true },
  { key: "analytics", basic: false, pro: true, enterprise: true },
  { key: "parking", basic: false, pro: true, enterprise: true },
  { key: "members", basic: false, pro: true, enterprise: true },
  { key: "audit", basic: false, pro: false, enterprise: true },
  { key: "api", basic: false, pro: false, enterprise: "comingSoon" },
  {
    key: "multisite",
    basic: "plans.compare.multisite.addon",
    pro: "plans.compare.multisite.addon",
    enterprise: "plans.compare.multisite.included",
  },
];

export const PLAN_COMPARISON_LABELS = {
  seats: "plans.compare.labels.seats",
  layouts: "plans.compare.labels.layouts",
  ushers: "plans.compare.labels.ushers",
  liveOps: "plans.compare.labels.liveOps",
  incidents: "plans.compare.labels.incidents",
  terminal: "plans.compare.labels.terminal",
  events: "plans.compare.labels.events",
  tickets: "plans.compare.labels.tickets",
  checkIn: "plans.compare.labels.checkIn",
  analytics: "plans.compare.labels.analytics",
  parking: "plans.compare.labels.parking",
  members: "plans.compare.labels.members",
  audit: "plans.compare.labels.audit",
  api: "plans.compare.labels.api",
  multisite: "plans.compare.labels.multisite",
};
