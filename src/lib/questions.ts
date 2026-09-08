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
      "Every savings percentage in the packet is vs that number. If it is current premium, a 20% Blue Cross renewal makes Expected self-funding look like a save. If it is already the 2027 fully-insured quote, Expected self-funding costs more.",
    goodAnswerLooksLike:
      "A one-line written answer plus the matching census (employees, spouses, children) and the fully-insured renewal letter.",
  },
  {
    id: "real-renewal",
    to: "Current carrier / broker of record",
    ask: "What is the actual 1/1/2027 fully-insured renewal, on the same census, in writing?",
    because:
      "Market color ('67% of BCBS customers at 18–20%') is not Ball-Chatham's number. You cannot vote on a vibe.",
    goodAnswerLooksLike:
      "A rate sheet with current vs renewal annualized premium, and whether any plan-design changes are baked in.",
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
    ask: "Show the three-tier copay/coinsurance grid vs today's plan, not just the network story.",
    because:
      "A cheaper district cost with a meaner deductible is a compensation cut. The board should know which it is.",
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
