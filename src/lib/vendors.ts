import {
  BCBS_DRAFT,
  BCBS_DRAFT_QUOTED_INCREASE_PCT,
  TROXELL_ASSUMED_INCREASE_PCT,
  TROXELL_NETWORK_CORRECTION,
  rate,
} from "@/lib/bcbs-plans"
import { pct, usd } from "@/lib/money"

export type FundingModel =
  | "fully-insured"
  | "self-funded"
  | "captive"
  | "level-funded"
  | "unknown"

export type LaserStatus = "none-year-one" | "none-guaranteed" | "some" | "unknown"

export type SourceProvenance =
  | "packet"
  | "meeting-color"
  | "vendor-materials"
  | "inference"
  | "unknown"

export type VendorOffering = {
  id: string
  name: string
  company: string
  model: FundingModel
  locked?: boolean
  network: string
  pbm: string
  tpa: string
  stopLoss: string
  specificDeductible: number | null
  lasers: LaserStatus
  expectedAnnualCost: number | null
  maxAnnualCost: number | null
  renewalPct: number | null
  localSupport: string
  notes: string
  /** What this choice gets you. Keep each item to one plain sentence. */
  pros: string[]
  /** What it costs you or risks. Keep each item to one plain sentence. */
  cons: string[]
  /** What you still need in writing before a vote. */
  openQuestions: string[]
  /** Where the numbers came from: packet, meeting color, vendor pages, or inference. */
  provenance: SourceProvenance
  /** One line: packet date, page, or who said it and when. */
  sourceDetail: string
  /** e.g. "1/1/2027". Blank until the vendor puts it in writing. */
  effectiveDate: string
  /** e.g. "12/15". Blank until the specimen confirms it. */
  contractBasis: string
  /** Aggregate attachment, what it covers, and what confirms it. */
  aggregateDetails: string
  /** Reprice size, rebate pass-through, and whether the watchdog fee is included. */
  rxDetails: string
}

export const SEED_OFFERINGS: VendorOffering[] = [
  {
    id: "bcbs-fi",
    name: "Stay fully insured",
    company: "BCBS Illinois",
    model: "fully-insured",
    locked: true,
    network: "BCBS Illinois (does not rent out)",
    pbm: "Carrier PBM (bundled)",
    tpa: "BCBS (bundled)",
    stopLoss: "Not separate — carrier holds the risk",
    specificDeductible: null,
    lasers: "unknown",
    expectedAnnualCost: 6_410_422,
    maxAnnualCost: 6_410_422,
    renewalPct: BCBS_DRAFT_QUOTED_INCREASE_PCT,
    localSupport: "National carrier service model",
    notes:
      `Packet comparison base is $6,410,422 — that dollar is the Troxell packet, not a total printed on the BCBS sheets. The 2027 draft sheet quotes a ${pct(BCBS_DRAFT_QUOTED_INCREASE_PCT, 1)} increase and shows employee per-pay deductions only. Meeting color remains last year ~3% and 67% of BCBS IL customers at 18–20%. Do not treat ${pct(BCBS_DRAFT_QUOTED_INCREASE_PCT, 1)} × $6.41M as the renewal until someone confirms the packet line is current total premium.`,
    pros: [
      "One bill, one card, no new network for staff to learn.",
      "Catastrophe risk stays with the carrier for the plan year.",
      "The 2027 draft keeps the same three plan designs: HSA 3500, PPO 2000, PPO 1500.",
    ],
    cons: [
      `The draft sheet quotes ${pct(BCBS_DRAFT_QUOTED_INCREASE_PCT, 1)}, well above the 18–20% said in the Troxell meeting.`,
      `Employee deductions on that draft rise by more than ${pct(BCBS_DRAFT_QUOTED_INCREASE_PCT, 1)} on most tiers, and HSA employee-only goes from $0 to ${usd(rate(BCBS_DRAFT, "hsa-3500", "24", "ee"), 2)} per 24-pay check.`,
      "Claims stay a black box, and no surplus comes back in a healthy year.",
    ],
    openQuestions: [
      "Is $6,410,422 current total premium or already the 1/1/2027 ask? The BCBS sheets do not print the district total.",
      "Is 39.7% the final letter, and does it include the board share plus the employee share on the same census as Troxell?",
    ],
    provenance: "vendor-materials",
    sourceDetail:
      `2026 current sheet and 2027 draft sheet (quoted ${pct(BCBS_DRAFT_QUOTED_INCREASE_PCT, 1)}). $6,410,422 is still the Troxell packet line, not a figure on those sheets. 18–20% is meeting color.`,
    effectiveDate: "",
    contractBasis: "",
    aggregateDetails: "Not applicable — carrier holds the risk.",
    rxDetails: "Bundled carrier PBM; no separate reprice on file.",
  },
  {
    id: "troxell",
    name: "Unified Schools (Troxell)",
    company: "Troxell + unbundled stack",
    model: "captive",
    locked: true,
    network: `${TROXELL_NETWORK_CORRECTION} (committee correction). Meeting said SCA + Aetna wrap. The employee sheet still prints BCBS Illinois.`,
    pbm: "SmithRx, with likely Truveris oversight",
    tpa: "Not named on the sheet. Confirm Consociate Health (Decatur TPA).",
    stopLoss: "Specific + aggregate, medical and pharmacy (as presented)",
    specificDeductible: 150_000,
    lasers: "none-year-one",
    expectedAnnualCost: 6_763_333.33,
    maxAnnualCost: 7_991_392.41,
    renewalPct: null,
    localSupport: "Springfield / Bloomington / Washington IL — high availability pitch",
    notes:
      `Expected vs packet $6.41M is a loss (~$353k). A separate 2027 employee sheet assumes a ${pct(TROXELL_ASSUMED_INCREASE_PCT, 0)} increase and shows paycheck deductions, not this district total. That sheet prints Blue Cross as the carrier; the network is ${TROXELL_NETWORK_CORRECTION}. Consociate Health is a Decatur TPA that publicly lists HealthLink and Springfield Clinic Advantage with HealthLink. HealthLink lists Consociate Group as a contracted TPA. Neither name is printed on the Ball-Chatham sheet. Year-one lasers $0. Pharmacy reprice $312,760 is an estimate.`,
    pros: [
      "Unbundled vendors with separate medical and pharmacy reports you can actually read.",
      "Local coordinator in Springfield / Bloomington / Washington IL who shows up.",
      "Year-one lasers $0 after underwriting, as printed in the packet.",
    ],
    cons: [
      "Expected costs ~$353k more than the packet $6.41M line — you buy volatility, not a discount.",
      "Network is not the Blue card. The meeting said an Aetna wrap. The new sheet's carrier row says Blue Cross, and that row is wrong: the network is Health Link. Those three stories do not match yet.",
      "Savings hinge on a $312,760 uncapped Rx reprice estimate, not a warranty.",
    ],
    openQuestions: [
      "What laser rights exist at 1/1/2028 — no-new-laser language or a cap?",
      "Is the pharmacy watchdog fee inside the $436,320 admin or extra?",
      "Who falls out on a disruption file (Memorial, HSHS, SIU, Barnes-Jewish)?",
      "Is Consociate Health the TPA, and is Health Link the network, with or without Springfield Clinic Advantage?",
    ],
    provenance: "packet",
    sourceDetail:
      "Packet effective 1/1/2027, contract 12/15. Network, laser, and reprice color is meeting talk until the specimen and disruption file confirm it.",
    effectiveDate: "1/1/2027",
    contractBasis: "12/15",
    aggregateDetails:
      "Aggregate as the group ceiling near ~120% of expected (as presented); $58,031 aggregate premium at $150k. Confirm attachment and covered benefits on the specimen.",
    rxDetails:
      "Uncapped estimated Rx savings $312,760 per reprice. Confirm rebate pass-through and whether Truveris oversight is in the fees.",
  },
]

export const MODEL_LABEL: Record<FundingModel, string> = {
  "fully-insured": "Fully insured",
  "self-funded": "Self-funded",
  captive: "Self-funded captive",
  "level-funded": "Level-funded",
  unknown: "Not yet tagged",
}

export const LASER_LABEL: Record<LaserStatus, string> = {
  "none-year-one": "None in year one",
  "none-guaranteed": "No-new-laser language",
  some: "Lasers present",
  unknown: "Unknown",
}

export const PROVENANCE_LABEL: Record<SourceProvenance, string> = {
  packet: "Packet",
  "meeting-color": "Meeting color",
  "vendor-materials": "Vendor materials",
  inference: "Inference",
  unknown: "Unknown",
}

export const STORAGE_KEY = "bcusd-insurance-offerings-v1"
export const NOTES_KEY = "bcusd-insurance-scratchpad-v1"

/** Blank offering an AI agent or a committee member can fill in. Id is assigned on save. */
export const INTAKE_TEMPLATE: Omit<VendorOffering, "id" | "locked"> = {
  name: "",
  company: "",
  model: "unknown",
  network: "",
  pbm: "",
  tpa: "",
  stopLoss: "",
  specificDeductible: null,
  lasers: "unknown",
  expectedAnnualCost: null,
  maxAnnualCost: null,
  renewalPct: null,
  localSupport: "",
  notes: "",
  pros: [],
  cons: [],
  openQuestions: [],
  provenance: "unknown",
  sourceDetail: "",
  effectiveDate: "",
  contractBasis: "",
  aggregateDetails: "",
  rxDetails: "",
}

function isFundingModel(value: unknown): value is FundingModel {
  switch (value) {
    case "fully-insured":
    case "self-funded":
    case "captive":
    case "level-funded":
    case "unknown":
      return true
    default:
      return false
  }
}

function isLaserStatus(value: unknown): value is LaserStatus {
  switch (value) {
    case "none-year-one":
    case "none-guaranteed":
    case "some":
    case "unknown":
      return true
    default:
      return false
  }
}

function isProvenance(value: unknown): value is SourceProvenance {
  switch (value) {
    case "packet":
    case "meeting-color":
    case "vendor-materials":
    case "inference":
    case "unknown":
      return true
    default:
      return false
  }
}

function toText(value: unknown): string {
  return typeof value === "string" ? value : ""
}

function toTextList(value: unknown): string[] {
  if (!Array.isArray(value)) return []
  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter((item) => item.length > 0)
}

function toNullableNumber(value: unknown): number | null {
  if (value === null || value === undefined || value === "") return null
  const n = typeof value === "number" ? value : Number(String(value).replace(/[$,%\s]/g, ""))
  if (!Number.isFinite(n) || n < 0) return null
  return n
}

/**
 * Normalize unknown JSON (localStorage, pasted import, or AI-agent output)
 * into a VendorOffering. Returns null when id or name/company are missing,
 * so callers can report the row instead of saving a mystery card.
 * Old rows without the newer pros/cons/provenance fields migrate to blanks.
 */
export function normalizeOffering(value: unknown): VendorOffering | null {
  if (!value || typeof value !== "object") return null
  const o = value as Record<string, unknown>
  const id = toText(o.id)
  const name = toText(o.name).trim()
  const company = toText(o.company).trim()
  if (!id || !name || !company) return null
  return {
    id,
    name,
    company,
    model: isFundingModel(o.model) ? o.model : "unknown",
    locked: o.locked === true ? true : undefined,
    network: toText(o.network),
    pbm: toText(o.pbm),
    tpa: toText(o.tpa),
    stopLoss: toText(o.stopLoss),
    specificDeductible: toNullableNumber(o.specificDeductible),
    lasers: isLaserStatus(o.lasers) ? o.lasers : "unknown",
    expectedAnnualCost: toNullableNumber(o.expectedAnnualCost),
    maxAnnualCost: toNullableNumber(o.maxAnnualCost),
    renewalPct: toNullableNumber(o.renewalPct),
    localSupport: toText(o.localSupport),
    notes: toText(o.notes),
    pros: toTextList(o.pros),
    cons: toTextList(o.cons),
    openQuestions: toTextList(o.openQuestions),
    provenance: isProvenance(o.provenance) ? o.provenance : "unknown",
    sourceDetail: toText(o.sourceDetail),
    effectiveDate: toText(o.effectiveDate),
    contractBasis: toText(o.contractBasis),
    aggregateDetails: toText(o.aggregateDetails),
    rxDetails: toText(o.rxDetails),
  }
}

/**
 * Human-readable problems for one offering. Empty means it is safe to save.
 * Missing costs are not errors — blank is honest until a packet lands.
 */
export function validateOffering(o: VendorOffering): string[] {
  const problems: string[] = []
  if (!o.name.trim() || !o.company.trim()) {
    problems.push("Name the offering and the company.")
  }
  if (o.model === "unknown") {
    problems.push("Tag the funding model, or leave it unknown on purpose.")
  }
  if (o.provenance === "unknown") {
    problems.push("Say where the numbers came from (packet, meeting color, vendor materials, or inference).")
  }
  if (!o.sourceDetail.trim()) {
    problems.push("Add one source line: packet date and page, or who said it and when.")
  }
  if (o.pros.length === 0 && o.cons.length === 0) {
    problems.push("Add at least one pro or one con so the row compares, not just lists.")
  }
  return problems
}

/** Parse a pasted JSON array of offerings (e.g. from an AI agent) into clean rows. */
export function parseOfferingsJson(raw: string): {
  offerings: VendorOffering[]
  errors: string[]
} {
  if (!raw.trim()) return { offerings: [], errors: [] }
  let parsed: unknown
  try {
    parsed = JSON.parse(raw)
  } catch {
    return { offerings: [], errors: ["That is not valid JSON. It must be an array of offerings."] }
  }
  if (!Array.isArray(parsed)) {
    return { offerings: [], errors: ["Top level must be a JSON array, not an object."] }
  }
  const seedIds = new Set(SEED_OFFERINGS.map((s) => s.id))
  const offerings: VendorOffering[] = []
  const errors: string[] = []
  parsed.forEach((item, i) => {
    const row = normalizeOffering(item)
    if (!row) {
      errors.push(`Row ${i + 1}: needs an id, an offering name, and a company. Skipped.`)
      return
    }
    if (seedIds.has(row.id) || row.locked) {
      errors.push(`Row ${i + 1} (“${row.name}”): id collides with a seeded row. Give it a fresh id. Skipped.`)
      return
    }
    offerings.push(row)
  })
  return { offerings, errors }
}
