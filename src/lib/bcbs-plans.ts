/**
 * Blue Cross Blue Shield of Illinois fully-insured plan sheets for
 * Ball-Chatham CUSD 5. Transcribed from the printed grids:
 * 2026 current (effective 01/01/2026) and 2027 draft (effective 01/01/2027).
 *
 * Per-pay amounts are the employee payroll deductions on those sheets.
 * Employee-only HSA is $0 in 2026, so these columns are not the district's
 * total premium. The packet comparison ($6,410,422) lives in quote-data.ts
 * and is a different document.
 */

export const BCBS_CARRIER = "BlueCross BlueShield of Illinois"

/** Headline printed on the 2027 draft sheet. Not an employee-paycheck percent. */
export const BCBS_DRAFT_QUOTED_INCREASE_PCT = 39.7

export type PlanId = "hsa-3500" | "ppo-2000" | "ppo-1500"

export type PayScheduleId = "24" | "19"

export type CoverageTierId = "ee" | "ee-spouse" | "ee-child" | "ee-family"

export type PlanMeta = {
  id: PlanId
  name: string
  design: "HSA" | "PPO"
}

export const BCBS_PLANS: PlanMeta[] = [
  { id: "hsa-3500", name: "BlueEdge HSA 3500", design: "HSA" },
  { id: "ppo-2000", name: "PPO 2000", design: "PPO" },
  { id: "ppo-1500", name: "PPO 1500", design: "PPO" },
]

export const PAY_SCHEDULES: Array<{
  id: PayScheduleId
  pays: number
  label: string
  who: string
}> = [
  {
    id: "24",
    pays: 24,
    label: "24 pays",
    who: "12-month staff",
  },
  {
    id: "19",
    pays: 19,
    label: "19 pays",
    who: "Staff under 12 months",
  },
]

export const COVERAGE_TIERS: Array<{ id: CoverageTierId; label: string }> = [
  { id: "ee", label: "Employee only" },
  { id: "ee-spouse", label: "Employee + spouse" },
  { id: "ee-child", label: "Employee + child(ren)" },
  { id: "ee-family", label: "Employee + family" },
]

/** Employee deduction per paycheck, as printed. */
export type RateGrid = Record<
  PlanId,
  Record<PayScheduleId, Record<CoverageTierId, number>>
>

export type BcbsYear = {
  year: 2026 | 2027
  status: "current" | "draft"
  effective: string
  /** Null on the current sheet. The draft prints this as a quoted increase. */
  quotedIncreasePct: number | null
  rates: RateGrid
}

const RATES_2026: RateGrid = {
  "hsa-3500": {
    "24": { ee: 0, "ee-spouse": 222.87, "ee-child": 170.93, "ee-family": 568.96 },
    "19": { ee: 0, "ee-spouse": 281.51, "ee-child": 215.91, "ee-family": 718.69 },
  },
  "ppo-2000": {
    "24": { ee: 20.3, "ee-spouse": 245.23, "ee-child": 201.4, "ee-family": 592.29 },
    "19": { ee: 25.64, "ee-spouse": 309.76, "ee-child": 254.39, "ee-family": 748.16 },
  },
  "ppo-1500": {
    "24": { ee: 87.62, "ee-spouse": 342.31, "ee-child": 292.73, "ee-family": 735.29 },
    "19": { ee: 110.68, "ee-spouse": 432.39, "ee-child": 369.76, "ee-family": 928.78 },
  },
}

const RATES_2027: RateGrid = {
  "hsa-3500": {
    "24": { ee: 159.61, "ee-spouse": 470.96, "ee-child": 398.4, "ee-family": 954.45 },
    "19": { ee: 201.62, "ee-spouse": 594.89, "ee-child": 503.24, "ee-family": 1205.62 },
  },
  "ppo-2000": {
    "24": { ee: 209.4, "ee-spouse": 523.62, "ee-child": 462.39, "ee-family": 1008.47 },
    "19": { ee: 264.5, "ee-spouse": 661.42, "ee-child": 584.07, "ee-family": 1273.85 },
  },
  "ppo-1500": {
    "24": { ee: 303.44, "ee-spouse": 659.24, "ee-child": 589.97, "ee-family": 1208.23 },
    "19": { ee: 383.3, "ee-spouse": 832.72, "ee-child": 745.23, "ee-family": 1526.19 },
  },
}

export const BCBS_YEARS: BcbsYear[] = [
  {
    year: 2026,
    status: "current",
    effective: "01/01/2026",
    quotedIncreasePct: null,
    rates: RATES_2026,
  },
  {
    year: 2027,
    status: "draft",
    effective: "01/01/2027",
    quotedIncreasePct: BCBS_DRAFT_QUOTED_INCREASE_PCT,
    rates: RATES_2027,
  },
]

export const BCBS_CURRENT = BCBS_YEARS[0]
export const BCBS_DRAFT = BCBS_YEARS[1]

/**
 * Headline printed on the Troxell 2027 draft: "assumed 12% increase".
 * That is this sheet's assumption, not a fully-insured renewal and not the
 * percent change in the paycheck columns.
 */
export const TROXELL_ASSUMED_INCREASE_PCT = 12

/**
 * Printed carrier cell on the Troxell sheet. The committee says this cell is
 * wrong: the provider network is Health Link, not Blue Cross.
 */
export const TROXELL_SHEET_PRINTED_CARRIER = "BlueCross BlueShield of Illinois"
export const TROXELL_NETWORK_CORRECTION = "Health Link"

const RATES_TROXELL_2027: RateGrid = {
  "hsa-3500": {
    "24": { ee: 28.82, "ee-spouse": 278.43, "ee-child": 220.26, "ee-family": 666.06 },
    "19": { ee: 36.41, "ee-spouse": 351.71, "ee-child": 278.22, "ee-family": 841.34 },
  },
  "ppo-2000": {
    "24": { ee: 68.74, "ee-spouse": 320.66, "ee-child": 271.56, "ee-family": 709.36 },
    "19": { ee: 86.82, "ee-spouse": 405.04, "ee-child": 343.03, "ee-family": 896.04 },
  },
  "ppo-1500": {
    "24": { ee: 144.13, "ee-spouse": 429.38, "ee-child": 373.85, "ee-family": 869.52 },
    "19": { ee: 182.06, "ee-spouse": 542.38, "ee-child": 472.23, "ee-family": 1098.34 },
  },
}

export const TROXELL_EMPLOYEE_DRAFT: BcbsYear = {
  year: 2027,
  status: "draft",
  effective: "01/01/2027",
  quotedIncreasePct: TROXELL_ASSUMED_INCREASE_PCT,
  rates: RATES_TROXELL_2027,
}

export type BenefitRow = {
  label: string
  group: string
  cells: Record<PlanId, string>
}

/**
 * In-network and out-of-network design. The 2026 and 2027 sheets print the
 * same benefit cells. Copays and deductibles below are member cost, not premium.
 */
export const BCBS_BENEFITS: BenefitRow[] = [
  {
    group: "In-network",
    label: "Deductible type",
    cells: { "hsa-3500": "Embedded", "ppo-2000": "Embedded", "ppo-1500": "Embedded" },
  },
  {
    group: "In-network",
    label: "Calendar-year deductible (individual / family)",
    cells: {
      "hsa-3500": "$3,500 / $7,000",
      "ppo-2000": "$2,000 / $6,000",
      "ppo-1500": "$1,500 / $3,000",
    },
  },
  {
    group: "In-network",
    label: "Out-of-pocket max type",
    cells: { "hsa-3500": "Embedded", "ppo-2000": "Embedded", "ppo-1500": "Embedded" },
  },
  {
    group: "In-network",
    label: "Out-of-pocket max (individual / family)",
    cells: {
      "hsa-3500": "$3,500 / $7,000",
      "ppo-2000": "$4,000 / $12,000",
      "ppo-1500": "$3,000 / $6,000",
    },
  },
  {
    group: "In-network",
    label: "Coinsurance (member pays after deductible)",
    cells: { "hsa-3500": "0%", "ppo-2000": "20%", "ppo-1500": "20%" },
  },
  {
    group: "In-network",
    label: "Preventive care",
    cells: {
      "hsa-3500": "Covered 100%",
      "ppo-2000": "Covered 100%",
      "ppo-1500": "Covered 100%",
    },
  },
  {
    group: "In-network",
    label: "Primary care visit",
    cells: {
      "hsa-3500": "0% after deductible",
      "ppo-2000": "$30 copay",
      "ppo-1500": "$25 copay",
    },
  },
  {
    group: "In-network",
    label: "Specialist visit",
    cells: {
      "hsa-3500": "0% after deductible",
      "ppo-2000": "$60 copay",
      "ppo-1500": "$40 copay",
    },
  },
  {
    group: "In-network",
    label: "Telehealth",
    cells: { "hsa-3500": "$48 per visit", "ppo-2000": "$0 copay", "ppo-1500": "$0 copay" },
  },
  {
    group: "In-network",
    label: "Urgent care",
    cells: {
      "hsa-3500": "0% after deductible",
      "ppo-2000": "$125 copay",
      "ppo-1500": "$50 copay",
    },
  },
  {
    group: "In-network",
    label: "Emergency room",
    cells: {
      "hsa-3500": "0% after deductible",
      "ppo-2000": "20% after deductible",
      "ppo-1500": "$250 copay",
    },
  },
  {
    group: "In-network",
    label: "Inpatient hospital",
    cells: {
      "hsa-3500": "0% after deductible",
      "ppo-2000": "$1,000 copay per stay",
      "ppo-1500": "20% after deductible",
    },
  },
  {
    group: "In-network",
    label: "Outpatient surgery",
    cells: {
      "hsa-3500": "0% after deductible",
      "ppo-2000": "$1,000 copay per procedure",
      "ppo-1500": "20% after deductible",
    },
  },
  {
    group: "In-network",
    label: "Chiropractic (visit limits may apply)",
    cells: {
      "hsa-3500": "0% after deductible · combined max $500 in- and out-of-network",
      "ppo-2000": "50% · combined max $500 in- and out-of-network",
      "ppo-1500": "50% · combined max $500 in- and out-of-network",
    },
  },
  {
    group: "In-network",
    label: "Physical / occupational / speech therapy",
    cells: {
      "hsa-3500": "0% after deductible · 60 visits",
      "ppo-2000": "20% after deductible · 60 visits",
      "ppo-1500": "20% after deductible · 60 visits",
    },
  },
  {
    group: "In-network",
    label: "Diagnostic test (X-ray, blood work)",
    cells: {
      "hsa-3500": "0% after deductible",
      "ppo-2000": "Covered 100%",
      "ppo-1500": "20% after deductible",
    },
  },
  {
    group: "In-network",
    label: "Imaging (CT / PET / MRI)",
    cells: {
      "hsa-3500": "0% after deductible",
      "ppo-2000": "$500 copay per service",
      "ppo-1500": "20% after deductible",
    },
  },
  {
    group: "Retail drugs",
    label: "Supply",
    cells: { "hsa-3500": "30 days", "ppo-2000": "30 days", "ppo-1500": "30 days" },
  },
  {
    group: "Retail drugs",
    label: "Tier I / II / III",
    cells: {
      "hsa-3500": "0% after deductible",
      "ppo-2000": "$10 / $35 / $125",
      "ppo-1500": "$0 / $10 / $40",
    },
  },
  {
    group: "Retail drugs",
    label: "Specialty tier IV / V / VI",
    cells: {
      "hsa-3500": "0% after deductible",
      "ppo-2000": "$250 / 30% / 50%",
      "ppo-1500": "$80 / 30% / 50%",
    },
  },
  {
    group: "Mail-order drugs",
    label: "Supply",
    cells: { "hsa-3500": "90 days", "ppo-2000": "90 days", "ppo-1500": "90 days" },
  },
  {
    group: "Mail-order drugs",
    label: "Tier I / II / III / IV",
    cells: {
      "hsa-3500": "0% after deductible",
      "ppo-2000": "$27.50 / $96.25 / $343.75 / n/a",
      "ppo-1500": "$0 / $27.50 / $110 / $220",
    },
  },
  {
    group: "Out-of-network",
    label: "Deductible type",
    cells: { "hsa-3500": "Embedded", "ppo-2000": "Embedded", "ppo-1500": "Embedded" },
  },
  {
    group: "Out-of-network",
    label: "Calendar-year deductible (individual / family)",
    cells: {
      "hsa-3500": "$7,000 / $14,000",
      "ppo-2000": "$4,000 / $12,000",
      "ppo-1500": "$3,000 / $6,000",
    },
  },
  {
    group: "Out-of-network",
    label: "Out-of-pocket max type",
    cells: { "hsa-3500": "Embedded", "ppo-2000": "Embedded", "ppo-1500": "Embedded" },
  },
  {
    group: "Out-of-network",
    label: "Out-of-pocket max (individual / family)",
    cells: {
      "hsa-3500": "$7,000 / $14,000",
      "ppo-2000": "$12,000 / $36,000",
      "ppo-1500": "$6,000 / $12,000",
    },
  },
  {
    group: "Out-of-network",
    label: "Coinsurance (member pays after deductible)",
    cells: { "hsa-3500": "0%", "ppo-2000": "40%", "ppo-1500": "40%" },
  },
]

export function rate(
  year: BcbsYear,
  plan: PlanId,
  schedule: PayScheduleId,
  tier: CoverageTierId,
): number {
  return year.rates[plan][schedule][tier]
}

/** Printed per-pay × number of pays. Arithmetic from the sheet, not a new quote. */
export function annualEmployeeDeduction(
  perPay: number,
  schedule: PayScheduleId,
): number {
  const pays = PAY_SCHEDULES.find((s) => s.id === schedule)?.pays ?? 0
  return perPay * pays
}

/**
 * Change in the employee deduction. Percent is null when the 2026 amount is
 * $0 — a percent off zero is not a meaningful increase.
 */
export function deductionChange(
  current: number,
  next: number,
): { dollars: number; pct: number | null } {
  const dollars = next - current
  if (current === 0) return { dollars, pct: null }
  return { dollars, pct: (dollars / current) * 100 }
}
