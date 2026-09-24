import { findBreakEven, interpolate } from "@/lib/money"

export const DISTRICT = {
  name: "Ball-Chatham Community Unit School District",
  shortName: "Ball-Chatham",
  effectiveDateLabel: "January 1, 2027",
  contractBasis: "12/15",
  consultant: "Troxell",
  packetTitle: "The TROXELL Unified Schools System",
}

/** Fully-insured premium printed in the Troxell packet as the comparison base. */
export const PACKET_FULLY_INSURED = 6_410_422

export const LAST_YEAR_RENEWAL_PCT = 3
export const THIS_YEAR_LIKELY_RENEWAL_PCT = 20
export const BCBS_MARKET_RANGE: [number, number] = [18, 20]

export type ScenarioKey = "great" | "good" | "expected" | "maximum"

export type ScenarioMeta = {
  key: ScenarioKey
  claimsPct: number
  label: string
  shortLabel: string
  subtitle: string
  meaning: string
}

export const SCENARIOS: ScenarioMeta[] = [
  {
    key: "great",
    claimsPct: 70,
    label: "Great year",
    shortLabel: "70%",
    subtitle: "70% of expected claims · 25% loss-fund dividend",
    meaning:
      "Claims come in far below the actuary's estimate. The captive has surplus and sends some of it back to the district as a dividend.",
  },
  {
    key: "good",
    claimsPct: 85,
    label: "Good year",
    shortLabel: "85%",
    subtitle: "85% of expected claims · 15% loss-fund dividend",
    meaning:
      "A healthier-than-average year. You still get a smaller dividend. This is a realistic 'we got a little lucky' case, not a fantasy.",
  },
  {
    key: "expected",
    claimsPct: 100,
    label: "Expected year",
    shortLabel: "100%",
    subtitle: "100% of expected claims · no dividend",
    meaning:
      "The year plays out exactly as the underwriters modeled. No refund, no true-up. This is the number to stare at first — not the rosy column.",
  },
  {
    key: "maximum",
    claimsPct: 120,
    label: "Bad year (capped)",
    shortLabel: "120%",
    subtitle: "120% of expected claims · aggregate true-up",
    meaning:
      "Claims run hot. Specific stop-loss has already been catching individual catastrophes. Aggregate stop-loss is the backstop for the whole group. The 'maximum' column is the corridor you fund before that backstop pays.",
  },
]

export type ScenarioRow = {
  claims: number
  profitDistOrTrueUp: number
  totalCaptive: number
  vsPacketFi: number
  savingsPctVsPacketFi: number
}

export type DeductibleOption = {
  specificDeductible: 150_000 | 175_000
  label: string
  admin: number
  rxSavings: number
  stopLossPremium: number
  aggregatePremium: number
  laser: number
  expectedClaims: number
  rows: Record<ScenarioKey, ScenarioRow>
}

export const OPTIONS: DeductibleOption[] = [
  {
    specificDeductible: 150_000,
    label: "$150,000 specific deductible",
    admin: 436_320,
    rxSavings: -312_760,
    stopLossPremium: 796_743,
    aggregatePremium: 58_031,
    laser: 0,
    expectedClaims: 5_785_403.33,
    rows: {
      great: {
        claims: 4_049_792.33,
        profitDistOrTrueUp: -100_218,
        totalCaptive: 4_919_898.33,
        vsPacketFi: -1_490_523.67,
        savingsPctVsPacketFi: 23,
      },
      good: {
        claims: 4_917_192.83,
        profitDistOrTrueUp: -52_928,
        totalCaptive: 5_842_998.83,
        vsPacketFi: -567_423.17,
        savingsPctVsPacketFi: 9,
      },
      expected: {
        claims: 5_785_403.33,
        profitDistOrTrueUp: 0,
        totalCaptive: 6_763_333.33,
        vsPacketFi: 352_911.33,
        savingsPctVsPacketFi: -6,
      },
      maximum: {
        claims: 6_942_484,
        profitDistOrTrueUp: 115_576.41,
        totalCaptive: 7_991_392.41,
        vsPacketFi: 1_580_970.41,
        savingsPctVsPacketFi: -25,
      },
    },
  },
  {
    specificDeductible: 175_000,
    label: "$175,000 specific deductible",
    admin: 436_320,
    rxSavings: -312_760,
    stopLossPremium: 665_679,
    aggregatePremium: 62_006,
    laser: 0,
    expectedClaims: 5_906_215.8,
    rows: {
      great: {
        claims: 4_112_951.08,
        profitDistOrTrueUp: -88_010,
        totalCaptive: 4_814_186,
        vsPacketFi: -1_596_235.92,
        savingsPctVsPacketFi: 25,
      },
      good: {
        claims: 4_996_013.4,
        profitDistOrTrueUp: -48_010,
        totalCaptive: 5_829_022.4,
        vsPacketFi: -581_399.6,
        savingsPctVsPacketFi: 9,
      },
      expected: {
        claims: 5_906_215.8,
        profitDistOrTrueUp: 0,
        totalCaptive: 6_755_460.8,
        vsPacketFi: 345_038.8,
        savingsPctVsPacketFi: -5,
      },
      maximum: {
        claims: 7_085_059,
        profitDistOrTrueUp: 115_059,
        totalCaptive: 7_931_732,
        vsPacketFi: 1_521_310,
        savingsPctVsPacketFi: -24,
      },
    },
  },
]

export type QuotePoint = {
  claimsPct: number
  claims: number
  profitDistOrTrueUp: number
  totalCaptive: number
  admin: number
  rxSavings: number
  stopLossPremium: number
  aggregatePremium: number
  laser: number
}

export function optionByDeductible(
  deductible: 150_000 | 175_000,
): DeductibleOption {
  return OPTIONS.find((o) => o.specificDeductible === deductible) ?? OPTIONS[0]
}

function series(
  option: DeductibleOption,
  pick: (row: ScenarioRow) => number,
): Array<{ x: number; y: number }> {
  return SCENARIOS.map((s) => ({
    x: s.claimsPct,
    y: pick(option.rows[s.key]),
  }))
}

export function pointAt(
  option: DeductibleOption,
  claimsPct: number,
): QuotePoint {
  return {
    claimsPct,
    claims: interpolate(series(option, (r) => r.claims), claimsPct),
    profitDistOrTrueUp: interpolate(
      series(option, (r) => r.profitDistOrTrueUp),
      claimsPct,
    ),
    totalCaptive: interpolate(
      series(option, (r) => r.totalCaptive),
      claimsPct,
    ),
    admin: option.admin,
    rxSavings: option.rxSavings,
    stopLossPremium: option.stopLossPremium,
    aggregatePremium: option.aggregatePremium,
    laser: option.laser,
  }
}

export type FiBase = "packet-is-current" | "packet-is-renewal"

export function fullyInsuredCost(
  renewalPct: number,
  base: FiBase,
): number {
  if (base === "packet-is-renewal") return PACKET_FULLY_INSURED
  return PACKET_FULLY_INSURED * (1 + renewalPct / 100)
}

export function compareAt(args: {
  deductible: 150_000 | 175_000
  claimsPct: number
  renewalPct: number
  fiBase: FiBase
}) {
  const option = optionByDeductible(args.deductible)
  const point = pointAt(option, args.claimsPct)
  const fullyInsured = fullyInsuredCost(args.renewalPct, args.fiBase)
  const delta = point.totalCaptive - fullyInsured
  const deltaPct = fullyInsured === 0 ? 0 : (delta / fullyInsured) * 100
  const breakEven = findBreakEven(
    (pctValue) => pointAt(option, pctValue).totalCaptive,
    fullyInsured,
  )
  return { option, point, fullyInsured, delta, deltaPct, breakEven }
}

export const TROXELL_STACK = [
  {
    n: "01",
    title: "Independent TPA",
    body: "A third-party administrator pays claims and runs member services. They are not the insurance company keeping the surplus. The meeting did not name the firm. Consociate Health, in Decatur, is the name to confirm: it is an Illinois TPA, HealthLink lists Consociate Group among contracted TPAs, and Consociate's own provider list includes HealthLink and Springfield Clinic Advantage with HealthLink. That is public-website overlap, not a line on the Ball-Chatham sheet.",
  },
  {
    n: "02",
    title: "Separated vendors",
    body: "TPA, pharmacy, stop-loss, and network are different companies. That is the 'checks and balances' line. No single vendor grades its own homework. The cost is more moving parts for HR to coordinate — Troxell is selling itself as the coordinator.",
  },
  {
    n: "03",
    title: "SCA Tier 1",
    body: "Springfield Clinic Advantage as the preferred local tier: better discounts and lower employee out-of-pocket when people use Springfield Clinic. This is the hometown steerage. It only saves money if employees actually use those clinics.",
  },
  {
    n: "04",
    title: "Network: Health Link, not the Blue card",
    body: "The meeting recommended Aetna among Aetna / Cigna / UMR, behind Springfield Clinic Advantage. The later employee sheet still prints Blue Cross Blue Shield of Illinois in the carrier row. That cell is wrong. The provider network for this option is Health Link. Blue Cross generally will not rent its network to an outside TPA, which is why this was never a silent card swap. Ask for the disruption file against Health Link, not against the printed Blue Cross name.",
  },
  {
    n: "05",
    title: "Independent PBM (SmithRx)",
    body: "Pharmacy benefit manager carved out of the medical carrier. Troxell thinks this is where most of the savings live. The packet's uncapped Rx reprice is $312,760. That number is an estimate from repricing last year's scripts, not a guarantee.",
  },
  {
    n: "06",
    title: "Stop-loss reinsurance",
    body: "The safety net. Specific stop-loss: one person blows past $150k (or $175k) and the reinsurer pays the rest. Aggregate stop-loss: the whole plan has a terrible year and the reinsurer pays above ~120% of expected. They said this policy covers medical and pharmacy.",
  },
  {
    n: "07",
    title: "Troxell consulting",
    body: "Local Springfield / Bloomington / Washington Illinois shop. Vendor negotiation, claims help, HR support, education, and 30+ years of committee work. Availability is part of what you are buying. Ask how that is contracted and what happens if the relationship sours.",
  },
] as const
