export type FundingModel =
  | "fully-insured"
  | "self-funded"
  | "captive"
  | "level-funded"
  | "unknown"

export type LaserStatus = "none-year-one" | "none-guaranteed" | "some" | "unknown"

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
}

export const SEED_OFFERINGS: VendorOffering[] = [
  {
    id: "bcbs-fi",
    name: "Stay fully insured",
    company: "BCBS Illinois (current climate)",
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
    renewalPct: 20,
    localSupport: "National carrier service model",
    notes:
      "Packet comparison base is $6,410,422. Meeting color: last year ~3%, this year likely ~20%, and 67% of BCBS IL customers hearing 18–20%. Replace expectedAnnualCost with the real renewal letter when it lands. For a 20% hike on the packet base, budget ~$7.69M.",
  },
  {
    id: "troxell",
    name: "Unified Schools (Troxell)",
    company: "Troxell + unbundled stack",
    model: "captive",
    locked: true,
    network: "SCA Tier 1 + Aetna wrap (Cigna/UMR were alternatives)",
    pbm: "SmithRx, with likely Truveris oversight",
    tpa: "Independent TPA (name still to confirm)",
    stopLoss: "Specific + aggregate, medical and pharmacy (as presented)",
    specificDeductible: 150_000,
    lasers: "none-year-one",
    expectedAnnualCost: 6_763_333,
    maxAnnualCost: 7_991_392,
    renewalPct: null,
    localSupport: "Springfield / Bloomington / Washington IL — high availability pitch",
    notes:
      "Expected vs packet $6.41M is a loss (~$353k). Great vs packet is a ~23% save. Run the Quote lab before you quote either number in a board meeting. Year-one lasers $0. Confirm 2028 laser rights. Pharmacy reprice $312,760 is the main savings lever.",
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

export const STORAGE_KEY = "bcusd-insurance-offerings-v1"
export const NOTES_KEY = "bcusd-insurance-scratchpad-v1"
