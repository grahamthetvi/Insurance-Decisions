import {
  BCBS_DRAFT_QUOTED_INCREASE_PCT,
  TROXELL_ASSUMED_INCREASE_PCT,
} from "@/lib/bcbs-plans"
import { pct } from "@/lib/money"

export type Question = {
  id: string
  to: string
  ask: string
  because: string
  goodAnswerLooksLike: string
}

export const QUESTIONS: Question[] = [
  {
    id: "six-four-one",
    to: "Troxell / administration",
    ask: "Is the $6,410,422 in the packet what Ball-Chatham pays today, or the fully-insured premium for 1/1/2027?",
    because:
      `Every savings percentage in the packet is vs that number. The 2027 Blue Cross draft quotes ${pct(BCBS_DRAFT_QUOTED_INCREASE_PCT, 1)}, which is a different document from the $6.41M line. If $6.41M is current total premium, that draft hike makes Expected self-funding look cheaper. If $6.41M is already the 2027 ask, Expected costs more.`,
    goodAnswerLooksLike:
      "A one-line written answer plus the matching census (employees, spouses, children) and the fully-insured renewal letter.",
  },
  {
    id: "real-renewal",
    to: "Current carrier / broker of record",
    ask: `The draft sheet quotes ${pct(BCBS_DRAFT_QUOTED_INCREASE_PCT, 1)} and lists employee per-pay amounts. What is the district's total 1/1/2027 premium — board share plus employee share — on the same census as Troxell, and is ${pct(BCBS_DRAFT_QUOTED_INCREASE_PCT, 1)} still draft?`,
    because:
      `Meeting color was 18–20%. The sheet headline is ${pct(BCBS_DRAFT_QUOTED_INCREASE_PCT, 1)}. The paycheck lines are a different set of numbers, and on most tiers they rose by more than ${pct(BCBS_DRAFT_QUOTED_INCREASE_PCT, 1)}. The sheet does not say why. None of those figures is the board's annual premium until someone writes the total down.`,
    goodAnswerLooksLike:
      "One page: current total premium, draft or final 2027 total premium, the board contribution rule, and a note that plan design did not change.",
  },
  {
    id: "expected-lose",
    to: "Troxell",
    ask: "Walk the Expected column out loud: why should we leave fully insured if, vs the packet's $6.41M, Expected costs ~$350k more?",
    because:
      "If the answer is only 'but look at Great,' they are selling hope. If the answer is 'your fully-insured renewal is actually $7.7M,' that is a different conversation.",
    goodAnswerLooksLike:
      "They put the fully-insured renewal next to Expected and Maximum on one slide, no roses.",
  },
  {
    id: "rx-reprice",
    to: "Troxell / SmithRx",
    ask: "Show the pharmacy reprice: which NDCs, what discount and rebate assumptions, pass-through or not, and what happens if we only realize half of $312,760.",
    because:
      "That line is in every column. It is doing a lot of work. Uncapped estimates are the first thing that shrink in real life.",
    goodAnswerLooksLike:
      "A workbook, 100% rebate pass-through in the contract, and a conservative scenario in the quote.",
  },
  {
    id: "watchdog",
    to: "Troxell",
    ask: "Name the PBM oversight firm, spell it, and say whether the fee is inside the $436,320 admin.",
    because:
      "You heard something like Truevarous. Truveris is the likely match. If there is no independent readjudication, 'transparency' is just more PDFs from the PBM.",
    goodAnswerLooksLike:
      "A named vendor, a sample report, and a line item.",
  },
  {
    id: "connect-360",
    to: "SmithRx",
    ask: "If a member cannot afford a medication, what is the exact program, is it optional, and what does the first 90 days look like?",
    because:
      "You were told there is a program. Open enrollment will produce this question from a staff member with a specialty script on day one.",
    goodAnswerLooksLike:
      "Connect 360 / Access Plus (or whatever is actually in the bid), member letter, transition-fill rules, and who they call.",
  },
  {
    id: "stop-loss-specimen",
    to: "Stop-loss carrier via Troxell",
    ask: "May we see the specimen policy: specific, aggregate attachment, covered benefits (Rx?), lasers, 12/15, and any aggregating specific?",
    because:
      "'Covers everything' and 'no lasers' are meeting talk until they are form language.",
    goodAnswerLooksLike:
      "A policy form plus a one-page coverage summary the board attorney can read.",
  },
  {
    id: "laser-renewal",
    to: "Troxell / stop-loss",
    ask: "What laser rights exist at 1/1/2028, and will you put no-new-laser or a laser cap in the deal?",
    because:
      "Year-one $0 lasers after they have seen the data is table stakes. Spouses as 6 of 10 large claimants is the year-two fight.",
    goodAnswerLooksLike:
      "Written no-new-laser, or a maximum laser amount, with the rate-cap that comes with it.",
  },
  {
    id: "health-link",
    to: "Troxell",
    ask: `The employee sheet prints Blue Cross as the carrier and assumes a ${pct(TROXELL_ASSUMED_INCREASE_PCT, 0)} increase. Confirm in writing: the network is Health Link, the TPA is or is not Consociate Health, and Springfield Clinic Advantage is or is not still tier 1.`,
    because:
      "The meeting described an Aetna wrap and did not name the TPA. Consociate Health publicly lists HealthLink and Springfield Clinic Advantage with HealthLink. HealthLink lists Consociate Group as a contracted TPA. None of that is the same thing as a signed name on this bid.",
    goodAnswerLooksLike:
      "One page: TPA legal name, network name, what happened to the Aetna option, and a provider search link staff can use.",
  },
  {
    id: "disruption",
    to: "Troxell / TPA",
    ask: "Run our current providers and last 12 months of claims against SCA + Aetna. Who falls out, including Memorial, HSHS, SIU, and Barnes-Jewish?",
    because:
      "98% overlap is a marketing average. Disruption is personal.",
    goodAnswerLooksLike:
      "A named-provider file and a count of unique members who would see a tier change.",
  },
  {
    id: "balance-bill",
    to: "Troxell / SCA / Aetna",
    ask: "When you say no balance billing, is that in-network only, or a contractual hold-harmless for SCA/Aetna facilities?",
    because:
      "Staff will hear 'you will never get an extra bill.' That is probably not what was promised.",
    goodAnswerLooksLike:
      "A precise sentence you can put in the open-enrollment FAQ.",
  },
  {
    id: "tier-grid",
    to: "Troxell",
    ask: "Show the three-tier copay/coinsurance grid next to today's Blue Cross grid (HSA 3500, PPO 2000, PPO 1500), not just the network story.",
    because:
      "Today's design is on the Blue Cross page, and the 2027 draft keeps it. A cheaper district cost with a meaner deductible is a compensation cut. The board should see both grids.",
    goodAnswerLooksLike:
      "Side-by-side: PCP, specialist, ER, Rx tiers, OOP max, for employee and family.",
  },
  {
    id: "186-employees",
    to: "You / a colleague",
    ask: "Talk to Springfield 186 employees (and City if you can): claims pay speed, denials, specialty drugs, first renewal, and whether they would go back.",
    because:
      "The presenter told you to. 98% paid in 30 days is their metric. Member stories are yours.",
    goodAnswerLooksLike:
      "Three unscripted conversations, notes in the scratch pad, not a glowing email from 186's consultant.",
  },
  {
    id: "pool",
    to: "Troxell",
    ask: "Who is in the Unified Schools captive, how is the dividend calculated, and can a bad pool year assess us above the Maximum column?",
    because:
      "Captives have documents. The PDF is a sales sheet.",
    goodAnswerLooksLike:
      "A participation list (or at least a size/profile), governing docs, and a clear 'no additional assessments' sentence — or an honest 'yes, here's how.'",
  },
  {
    id: "consulting-agreement",
    to: "Troxell",
    ask: "What is the consulting agreement: fees, meeting cadence, claim advocacy, and who shows up if the presenter is gone?",
    because:
      "Local availability is the emotional close. Contracts survive people.",
    goodAnswerLooksLike:
      "A draft agreement with named deliverables, not a handshake.",
  },
  {
    id: "exit",
    to: "Troxell / attorney",
    ask: "If we hate this in 2028, what does it cost to go back to fully insured, including run-out claims after 12/15?",
    because:
      "Self-funding is easier to enter than to leave. December claims still arrive in March.",
    goodAnswerLooksLike:
      "A run-out estimate and a timeline that matches a school-board budget cycle.",
  },
]

export const CALL_186 = [
  "How long did it take to get an ID card, and did doctors take it the first week of January?",
  "When a claim was denied, who actually helped — TPA, Troxell, or nobody?",
  "Pharmacy: any surprise that a drug was not covered, or a new prior auth?",
  "Did anyone get a balance bill?",
  "At the first renewal, did stop-loss jump, and did anyone get lasered?",
  "Would you go back to fully insured if you could? Why?",
]
