/**
 * Illustrative Troxell cost build for Ball-Chatham, effective 1/1/2027,
 * dated 9/23/2026, marked "ILLUSTRATIVE" and "12/12 CONTRACT".
 *
 * This is not the Troxell packet. The packet is 12/15, laser $0, and its
 * $150k Expected total is $6,763,333.33. Do not overwrite those figures
 * with this sheet.
 *
 * Rates below are per employee per month. The annual "max claims" total
 * equals that rate times 405 employees times 12, plus the estimated
 * pharmacy rebate (a negative number).
 */

export const ILLUSTRATION = {
  district: "Ball Chatham School District",
  effective: "1/1/2027",
  dated: "9/23/2026",
  contractBasis: "12/12",
  label: "Illustrative",
  employees: 405,
  members: 706,
  membersAsOf: "July 2026",
} as const

export type SpecificKey = "150" | "175"

export const SPECIFIC_OPTIONS: Array<{
  key: SpecificKey
  deductible: 150_000 | 175_000
}> = [
  { key: "150", deductible: 150_000 },
  { key: "175", deductible: 175_000 },
]

/** Estimated pharmacy rebate printed once per column. Not the packet's $312,760. */
export const RX_REBATE_ESTIMATE = -350_000

export type FeeLine = {
  id: string
  label: string
  note?: string
  /** Null means the row is named but has no PEPM in that column. */
  pepm: Record<SpecificKey, number | null>
}

export const ADMIN_LINES: FeeLine[] = [
  {
    id: "tpa",
    label: "Consociate Health — TPA fee",
    note: "Named on the sheet. No PEPM in the amount columns.",
    pepm: { "150": null, "175": null },
  },
  {
    id: "cobra",
    label: "COBRA administration",
    note: "Note on the sheet: Troxell covering COBRA admin fee.",
    pepm: { "150": null, "175": null },
  },
  {
    id: "local-network",
    label: "Carle Health / Springfield Clinic / BJC center of excellence",
    note: "Named on the sheet. No separate PEPM in the amount columns.",
    pepm: { "150": null, "175": null },
  },
  {
    id: "healthlink",
    label: "HealthLink and PHCS, out of area, at 30% of savings",
    pepm: { "150": 32, "175": 32 },
  },
  {
    id: "um",
    label: "Utilization management — Precedence",
    pepm: { "150": 8, "175": 8 },
  },
  {
    id: "cm",
    label: "Case management — Precedence, $147 per hour",
    pepm: { "150": 8, "175": 8 },
  },
  {
    id: "pbm",
    label: "Pharmacy benefit manager — Slate Rx",
    note: "Sheet also says $6.00 per member per month, billed on claims. The column amount is $2.40.",
    pepm: { "150": 2.4, "175": 2.4 },
  },
  {
    id: "consultant",
    label: "Consultant fee — Troxell",
    pepm: { "150": 0, "175": 0 },
  },
  {
    id: "accommodation",
    label: "Monthly accommodation — included with aggregate",
    pepm: { "150": 0, "175": 0 },
  },
  {
    id: "captive",
    label: "Captive fee",
    pepm: { "150": 50, "175": 50 },
  },
  {
    id: "regulatory",
    label: "Regulatory / compliance solutions",
    note: "Amount columns are blank (NA). A side note prints 0.00 and $1.60 PEPM. That $1.60 is not inside the $101.65 total.",
    pepm: { "150": null, "175": null },
  },
  {
    id: "bluebook",
    label: "Healthcare Bluebook / transparency fee",
    pepm: { "150": 0, "175": 0 },
  },
  {
    id: "nqtl",
    label: "NQTL services up to $4,999 and CAA Rx reporting $1,750 — annual cost",
    pepm: { "150": 1.25, "175": 1.25 },
  },
]

export const STOPLOSS_LINES: FeeLine[] = [
  {
    id: "specific",
    label: "Specific premium",
    pepm: { "150": 153.01, "175": 129.55 },
  },
  {
    id: "aggregate",
    label: "Aggregate premium",
    pepm: { "150": 10.56, "175": 12.18 },
  },
  {
    id: "agg-factor",
    label: "Aggregate claims factor — max",
    pepm: { "150": 1289.61, "175": 1325.11 },
  },
]

export const MEMORIAL_CHOICE_ANNUAL = 184_000

export const COLLATERAL: Record<SpecificKey, number> = {
  "150": 82_393,
  "175": 67_253,
}

/** Pending final nurse review. The packet still prints laser $0. See the second tab, which was not in this photo. */
export const LASERS_PENDING: Record<SpecificKey, number> = {
  "150": 525_000,
  "175": 475_000,
}

export function sumPepm(lines: FeeLine[], key: SpecificKey): number {
  return lines.reduce((sum, line) => sum + (line.pepm[key] ?? 0), 0)
}

export function adminPepm(key: SpecificKey): number {
  return sumPepm(ADMIN_LINES, key)
}

export function stopLossPepm(key: SpecificKey): number {
  return sumPepm(STOPLOSS_LINES, key)
}

export function planCostPepm(key: SpecificKey): number {
  return adminPepm(key) + stopLossPepm(key)
}

/**
 * Printed annual max-claims cost: PEPM times 405 employees times 12,
 * plus the estimated rebate (negative).
 */
export function annualMaxClaims(key: SpecificKey): number {
  return planCostPepm(key) * ILLUSTRATION.employees * 12 + RX_REBATE_ESTIMATE
}

export function annualWithMemorial(key: SpecificKey): number {
  return annualMaxClaims(key) + MEMORIAL_CHOICE_ANNUAL
}
