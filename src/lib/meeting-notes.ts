import { BCBS_DRAFT_QUOTED_INCREASE_PCT } from "@/lib/bcbs-plans"
import { pct } from "@/lib/money"

export type MeetingBlock = {
  id: string
  heading: string
  gist: string
  bullets: string[]
  watchFor?: string
}

export const MEETING = {
  title: "Insurance committee — Troxell offering",
  district: "Ball-Chatham CUSD",
  posture:
    "Working notes from the Troxell meeting, translated into something you can reuse when the next carrier sits down. Not minutes. Not a recommendation.",
  blocks: [
    {
      id: "climate",
      heading: "Why this meeting exists",
      gist: "Last year's fully-insured renewal was about 3%. This year the floor looks like double digits, probably ~20%. That is the whole plot.",
      bullets: [
        "Troxell says BCBS Illinois is taking 67% of customers up 18–20%. Treat that as market color until you see Ball-Chatham's actual fully-insured letter.",
        "A 3% year is the kind of number that makes committees go quiet. A 20% year is why you are listening to self-funding.",
        "He said always take a 1% renewal. Translation: if someone later offers ~1%, that is a gift in this market. Do not shop a gift into the grave. You do not have a gift right now.",
      ],
      watchFor:
        `A 2027 Blue Cross draft sheet now quotes ${pct(BCBS_DRAFT_QUOTED_INCREASE_PCT, 1)}. That arrived after this meeting color (18–20%). Still get the district's total premium, in writing, on the same census as the Troxell quote — the sheet shows employee per-pay amounts, not the board's annual bill.`,
    },
    {
      id: "who",
      heading: "Who Troxell is selling",
      gist: "Local shop. Springfield, plus Bloomington and Washington, Illinois. The product is a self-funded school captive they brand as the Unified Schools System.",
      bullets: [
        "Same shape as Springfield District 186 and the City of Springfield: self-insured, not a Blue Cross fully-insured policy.",
        "Local availability was a repeated theme — they will show up. That is a real difference from a national RFP mill. Put it in the contract anyway.",
        "Thirty-plus years of committee work is the credibility line. Ask for two other Illinois school references besides 186.",
      ],
    },
    {
      id: "model",
      heading: "The model in seven pieces",
      gist: "Unbundle the carrier. Keep a consultant in the middle. Buy a catastrophe net.",
      bullets: [
        "Independent TPA — claims paying and member services, with more transparency than the current black box.",
        "Separated vendors — TPA, PBM, stop-loss, network are different companies on purpose (checks and balances, and more reports you can actually see).",
        "SCA as Tier 1 — Springfield Clinic Advantage for richer local benefits and discounts.",
        "National network — they recommend Aetna among Aetna / Cigna / UMR. Blue Cross will not rent its network to this structure.",
        "Independent PBM — SmithRx. They think this is the largest savings pocket.",
        "Stop-loss reinsurance — specific around $150,000, plus aggregate. Covers medical and pharmacy, they said.",
        "Troxell consulting — negotiation, claims help, HR, education.",
      ],
    },
    {
      id: "numbers",
      heading: "The numbers they put on paper",
      gist: "Effective 1/1/2027. Comparison fully-insured premium in the packet: $6,410,422. Two specific-deductible options: $150k and $175k. Zero lasers in year one.",
      bullets: [
        "Admin is a flat $436,320 in every column. That is the cost of running the machine, not the claims.",
        "Estimated Rx savings ($312,760) is also in every column. It is a reprice, labeled uncapped.",
        "At Expected claims, total captive cost is about $6.76M — higher than the packet's $6.41M fully-insured line. That is the sentence most people miss.",
        "At Great (70% claims) they show ~23–25% savings. At Maximum (120%) they show the district paying ~24–25% more than that $6.41M line.",
        "Contract basis printed as 12/15.",
      ],
      watchFor:
        "If $6.41M is this year's premium and the fully-insured renewal is really 20%, Expected self-funding suddenly looks cheaper than staying. If $6.41M already is the 2027 fully-insured quote, Expected self-funding is more expensive. This is the first question.",
    },
    {
      id: "stoploss",
      heading: "Stop-loss, aggregate, lasers",
      gist: "Catastrophe cover is the thing that makes self-funding legal for a school board. The $150,000 is the per-person tripwire.",
      bullets: [
        "Specific stop-loss: one person / one family hits $150k (or $175k) and reinsurance takes the rest.",
        "Aggregate ('arraget') insurance: the whole plan blows past ~120% of expected and reinsurance takes the rest. That is the ceiling.",
        "They said the stop-loss covers everything — pharmacy, medical, etc. Confirm on the specimen policy.",
        "Board member asked about spouses. Presenter said no lasers. Packet shows $0.00 laser. Ask again for renewal language, not just year one.",
      ],
    },
    {
      id: "network",
      heading: "Who is in network",
      gist: "Three tiers. They claim almost everybody local is in somebody's network.",
      bullets: [
        "Tier 1: Springfield Clinic Advantage (you heard 'Advance' — same idea).",
        "Tier 2: in-network via the Aetna wrap.",
        "Tier 3: out of network.",
        "Claim: ~98% of providers in the area participate in all these networks. Everyone at Springfield Clinic. Barnes-Jewish (St. Louis) via the wrap.",
        "No balance billing — get the actual promise. In-network contracted rates are the safe version of that sentence.",
      ],
      watchFor:
        "A later Troxell employee sheet still prints Blue Cross as the carrier. That cell is wrong: the network is Health Link. The meeting's Aetna wrap is what was said in the room, not what the correction says. Confirm Consociate Health as the TPA. Memorial, HSHS, SIU, and the high-utilizing specialists still need a disruption file.",
    },
    {
      id: "pharmacy",
      heading: "Pharmacy",
      gist: "This is where they think you save money. Treat it as a homework assignment, not a fact.",
      bullets: [
        "SmithRx is the PBM.",
        "A watchdog firm for pharmacy only — you heard 'Truevarous'; the matching company is almost certainly Truveris. Confirm.",
        "SmithRx has a path if a member cannot afford the drug itself (patient assistance / copay programs). Look into Connect 360 / Access Plus before open enrollment.",
        "Reporting across vendors was a selling point: you can see medical and pharmacy instead of a blended carrier number.",
      ],
    },
    {
      id: "186",
      heading: "The 186 homework",
      gist: "He told you to talk to Springfield 186 employees, not just their consultant.",
      bullets: [
        "186 is already self-insured this way. So is the City of Springfield.",
        "They cited 98% of claims paid in 30 days as evidence the TPA machine works.",
        "Ask employees about denials, specialty drugs, out-of-town care, and whether the first renewal felt like a bait-and-switch.",
      ],
    },
    {
      id: "risk-shape",
      heading: "What is actually driving cost",
      gist: "A handful of people, and several of them are spouses.",
      bullets: [
        "Six of the ten biggest spenders for the district were spouses. That is a claims fact. It is not a reason to pick a fight about dependent coverage in this meeting — it is a reason to understand stop-loss, lasers, and whether wellness/care-management even touches dependents.",
        "The market comment about 50 employees becoming enough to self-fund (down from ~500) is about the industry, not a new eligibility hurdle for Ball-Chatham.",
      ],
    },
  ] satisfies MeetingBlock[],
}
