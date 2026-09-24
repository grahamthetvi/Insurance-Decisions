import { BCBS_DRAFT_QUOTED_INCREASE_PCT } from "@/lib/bcbs-plans"
import { pct } from "@/lib/money"

export const RULES_OF_THUMB = [
  {
    id: "compare-renewal",
    title: "Compare against this year's fully-insured renewal, not last year's premium.",
    why: `A self-funded quote that looks $350k more expensive than the packet line can still be cheaper than a fully-insured renewal. Meeting color was 18–20%. The 2027 Blue Cross draft quotes ${pct(BCBS_DRAFT_QUOTED_INCREASE_PCT, 1)}. The packet's $6.41M may be current premium, the 2027 ask, or something in between. Nail that down before anyone votes.`,
    test: "Ask: 'Is $6,410,422 what we pay now, or the fully-insured number for 1/1/2027?' Then rerun the Quote lab.",
  },
  {
    id: "stare-at-expected",
    title: "Stare at the Expected column first. Treat Great as a bonus.",
    why: "Brokers lead with the 23% savings column. That column assumes claims at 70% of expected plus a 25% loss-fund dividend. If that were the honest forecast, expected claims would already be lower. Expected is the forecast. Maximum is the cap.",
    test: `If Expected loses and Maximum is painful, you are buying volatility, not a discount. If Expected wins only after you layer in the draft ${pct(BCBS_DRAFT_QUOTED_INCREASE_PCT, 1)} — or the meeting's 20% — say which assumption you used.`,
  },
  {
    id: "one-percent",
    title: "A 1% fully-insured renewal is usually a take-it. A 20% is a shop-it.",
    why: "In a year when BCBS Illinois is telling 67% of customers 18–20%, a 1% increase is an outlier gift. Shopping a 1% deal can lose the deal. Shopping a 20% deal is the committee's job. 'Negative renewal' means rates go down. Take that too, and do not assume it repeats.",
    test: "If another carrier walks in at 0–3%, stop the self-funding romance long enough to price the sure thing. If everyone is at 18%+, self-funding is in play.",
  },
  {
    id: "unbundle-the-stack",
    title: "Name every vendor. If one company wears two hats, ask why.",
    why: "Fully insured is one bill from one carrier who is TPA, PBM, network, and risk-taker. Self-funding unbundles those jobs. That is how you see reports. It is also how things fall through the cracks. Troxell's pitch is separated vendors plus Troxell as the glue.",
    test: "Write down TPA, PBM, stop-loss carrier, network, consultant, and any watchdog. Who holds the claims data? Who does a member call?",
  },
  {
    id: "lasers",
    title: "Year-one $0 lasers is good. Ask what happens at the first renewal.",
    why: "A laser raises the deductible on a known high-cost person (often a spouse or dependent). The board member who asked about spouses was asking the right question. $0 laser in the packet means nobody is carved out for 2027. It does not mean the stop-loss carrier cannot laser someone for 2028.",
    test: "Ask for no-new-laser language, or a laser cap, in writing. Ask what 186 experienced at their first stop-loss renewal.",
  },
  {
    id: "pharmacy-is-the-savings",
    title: "If the savings live in pharmacy, audit the pharmacy math.",
    why: "The packet's only negative cost line besides dividends is $312,760 of uncapped estimated Rx savings 'per reprice.' That is not claims going down. That is last year's drugs run through SmithRx's prices and rebates. Reprices go stale. Formularies change. Members hate disruption.",
    test: "Get the reprice assumptions, whether rebates are 100% passed through, and whether a PBM watchdog (likely Truveris) is in the fees or extra. Ask SmithRx to walk Connect 360 / patient assistance.",
  },
  {
    id: "stop-loss-covers-what",
    title: "Confirm stop-loss covers medical and pharmacy, and the contract basis.",
    why: "Some stop-loss policies exclude pharmacy or injectables. They said this one covers everything. The packet also says contract 12/15: claims incurred in 12 months, paid within 15. A 12/12 is cheaper and leaves you naked for run-out bills after the plan year.",
    test: "Read the stop-loss specimen. Specific deductible, aggregate attachment, covered benefits, lasers, 12/15 vs 12/12, and whether aggregating specifics exist.",
  },
  {
    id: "network-is-member-experience",
    title: "Cost is a district problem. Network is a staff problem.",
    why: "They said ~98% of local providers sit in all these networks, Springfield Clinic is in, and Aetna wraps the rest including Barnes-Jewish. That can be true and still produce a chaotic open enrollment if ID cards, prior auths, and tier copays feel like a new plan. BCBS not renting its network means this is not a silent back-office change.",
    test: "Run a provider disruption report: every employee's current PCP, specialists, and last 12 months of facilities vs SCA + Aetna. Call 186 members, not just 186 HR.",
  },
  {
    id: "reference-the-neighbors",
    title: "Springfield 186 and the City are the lab. Use them.",
    why: "They already self-fund the way this would work. 98% of claims paid in 30 days is a TPA operations brag until you hear it from a nurse, a bus driver, and a building secretary. Spouses as 6 of 10 biggest spenders is a risk fact, not a morality play.",
    test: "Script in Ask next. Talk to employees, not only the benefits manager. Ask about denials, specialty drugs, and the first renewal.",
  },
  {
    id: "local-is-a-feature-and-a-concentration",
    title: "Local availability is real. So is key-person risk.",
    why: "A Springfield shop that will show up at the committee table is worth something a national RFP mill will not match. It is also one firm. Put the deliverables in the consulting agreement: meeting cadence, claim advocacy, disruption support, and who sits in the chair if that presenter leaves.",
    test: "Ask for a sample consulting agreement and two other Illinois school references besides 186.",
  },
] as const
