export type GlossaryEntry = {
  id: string
  term: string
  alsoHeardAs?: string[]
  oneLiner: string
  body: string
  whyItMatters: string
  tags: string[]
}

export const GLOSSARY: GlossaryEntry[] = [
  {
    id: "fully-insured",
    term: "Fully insured",
    oneLiner: "You pay a premium. The carrier pays claims and keeps whatever is left.",
    body: "This is the traditional school-district model. One carrier (often Blue Cross) quotes a rate. The district writes premium checks. If the year is healthy, the carrier's profit. If the year is catastrophic, the carrier's problem — which is why they raise rates the next year. Predictable budget, opaque claims, and renewals that follow the carrier's book of business as much as your own.",
    whyItMatters:
      "Last year you got about 3%. This year the room is talking 20%. Fully insured is not 'safer' in budget terms if the renewal is 20%; it is only more certain for that one year.",
    tags: ["model"],
  },
  {
    id: "self-funded",
    term: "Self-funded / self-insured",
    alsoHeardAs: ["self insured", "captive", "as 186 does it"],
    oneLiner: "The district pays the actual claims, plus admin, plus a catastrophe policy.",
    body: "Springfield District 186 and the City of Springfield already do this. You are not 'becoming an insurance company' in the casual sense. You hire a TPA to process claims, you buy stop-loss so one cancer case cannot sink the fund, and you hold the risk between those two. Good years, money stays (or comes back as a dividend). Bad years, you pay up to the stop-loss caps. The packet calls the whole arrangement a captive because stop-loss and surplus are handled through Troxell's Unified Schools pool rather than a one-off policy.",
    whyItMatters:
      "This is the fork. You trade a fatter, more certain premium for a thinner, more variable cost with a ceiling.",
    tags: ["model"],
  },
  {
    id: "captive",
    term: "Captive (Unified Schools System)",
    oneLiner: "A pool of similar employers that share stop-loss and, in good years, surplus.",
    body: "Instead of Ball-Chatham buying stop-loss all alone, you join a school-focused pool. That is why the quote has 'loss fund dividends' at 70% and 85% claims and a 'true-up' at 120%. The pool is trying to keep stop-loss cheaper and return unused risk money. You still pay your own claims. You are not paying Springfield 186's knee surgeries — but you are in a shared catastrophe and surplus structure.",
    whyItMatters:
      "Ask who else is in the pool, how dividends are calculated, and whether a bad year for the pool can assess you beyond the printed maximum column.",
    tags: ["model", "money"],
  },
  {
    id: "tpa",
    term: "TPA (third-party administrator)",
    oneLiner: "The shop that pays claims and answers the member 800 number. Not the risk-taker.",
    body: "In fully insured, Blue Cross is both banker and claims shop. In self-funding, a TPA does the claims job for a fee (the packet's $436,320 admin line). They adjudicate bills, issue ID cards, run prior auth. The 186 brag — 98% of claims paid in 30 days — is a TPA operations metric.",
    whyItMatters:
      "Member experience lives or dies here. Slow pay, messy EOBs, and denied auths are what staff will bring to the board, not the dividend formula.",
    tags: ["vendors"],
  },
  {
    id: "pbm",
    term: "PBM (pharmacy benefit manager)",
    oneLiner: "The company that prices drugs, runs the formulary, and pays pharmacies.",
    body: "This is the most conflicted corner of American health benefits. Traditional PBMs make money in the spread between what they charge you and what they pay the pharmacy, plus rebate keep. Independent / pass-through PBMs (SmithRx pitches this) charge a fee and pass the rest through. Troxell says pharmacy is the biggest savings bucket. A watchdog (you heard something like 'Truevarous' — almost certainly Truveris) exists because even a 'transparent' PBM still needs someone else checking the invoices.",
    whyItMatters:
      "$312,760 of the quote's savings is an Rx reprice. If that number is soft, the whole Expected column moves.",
    tags: ["vendors", "pharmacy"],
  },
  {
    id: "smithrx",
    term: "SmithRx",
    oneLiner: "The independent PBM Troxell would use, including help when a drug is unaffordable.",
    body: "SmithRx runs a program family called Connect 360: manufacturer copay cards, foundation / patient-assistance navigation (Access Plus) when a specialty drug is not covered, discount-card shopping at the counter (Assist), and medical-pharmacy help for infused drugs. Members usually have to answer the phone and sign an authorization. This is worth putting in the open-enrollment script so it does not feel like a bait-and-switch on a high-cost medication.",
    whyItMatters:
      "You flagged this in the meeting. Get the actual program names, whether enrollment is mandatory, and what happens during the transition fills.",
    tags: ["vendors", "pharmacy"],
  },
  {
    id: "truveris",
    term: "Truveris (PBM watchdog)",
    alsoHeardAs: ["truevarous", "true various", "truGuard"],
    oneLiner: "An independent firm that watches whether the PBM is actually billing what the contract says.",
    body: "You heard a name like 'Truevarous' tied only to pharmacy. The company that matches that job is Truveris (products truGuard / truAudit): they readjudicate pharmacy claims against the PBM contract. Fox, henhouse, etc. Confirm the spelling and whether their fee is inside the $436k admin or extra.",
    whyItMatters:
      "Unbundled vendors only help if someone is actually reading the other vendors' reports.",
    tags: ["vendors", "pharmacy"],
  },
  {
    id: "stop-loss",
    term: "Stop-loss / specific deductible",
    alsoHeardAs: ["reinsurance", "catastrophic", "the $150,000"],
    oneLiner: "A policy that pays after one person costs the plan more than $150k (or $175k).",
    body: "This is not health insurance for employees. It is insurance for the district's claims fund. Example: a transplant hits $400,000. At a $150,000 specific, the plan pays the first $150k and the stop-loss carrier reimburses $250k. They said coverage includes medical and pharmacy. Higher deductible ($175k) means cheaper stop-loss premium and more retained risk — the packet shows almost the same total cost at Expected, with a cheaper premium and slightly higher plan-paid claims.",
    whyItMatters:
      "This is the number the presenter kept returning to. It is the main lever between 'we are a mini-Blue Cross' and 'we are one lawsuit away from the fund.'",
    tags: ["money", "risk"],
  },
  {
    id: "aggregate",
    term: "Aggregate stop-loss",
    alsoHeardAs: ["arraget", "arrears", "aggregate insurance", "agg attachment"],
    oneLiner: "The policy that pays if the whole group has a terrible year, not just one person.",
    body: "You heard something that sounded like 'arraget insurance.' That is aggregate. Specific stop-loss catches the one catastrophic member. Aggregate catches death-by-a-thousand-papercuts: lots of $40k claimants, a bad flu year, a spike in dependents. Typical attachment is 120–125% of expected claims. In the packet, the Maximum column is that corridor: you fund up to ~120%, then aggregate is supposed to take over. There is a small separate aggregate premium ($58k / $62k) on top of the specific premium.",
    whyItMatters:
      "Without aggregate, self-funding has no ceiling. With it, the Maximum column is the honest worst-case to budget against — if the policy is written cleanly.",
    tags: ["money", "risk"],
  },
  {
    id: "laser",
    term: "Laser",
    alsoHeardAs: ["no lasers"],
    oneLiner: "A higher deductible aimed at one known high-cost person, usually at renewal.",
    body: "If a spouse is on a $2M therapy, the stop-loss carrier may say: everyone else stays at $150k, that person is lasered at $500k. The district then owns the gap. The board member asked about spouses; the presenter said no lasers. The packet prints Laser $0.00 for 2027. That is year one, after underwriting. Lasers usually appear at the first renewal, which is why 'no-new-laser' contract language is a real ask, not a nitpick.",
    whyItMatters:
      "Six of the district's ten biggest spenders being spouses is exactly the fact pattern that produces lasers later. Year-one $0 is not a lifetime promise.",
    tags: ["risk"],
  },
  {
    id: "negative-renewal",
    term: "Negative renewal",
    alsoHeardAs: ["always take a 1% renewal"],
    oneLiner: "Rates go down. A 1% increase, in this market, is almost as good — take it.",
    body: "Renewal math is just new premium vs last year's. +20% is a 20% renewal. 0% is flat. Negative means the carrier (or the stop-loss market) is charging less than last year. That happens after a fat year of premium or a thin year of claims. The presenter's 'always take a 1% renewal' is broker folklore: in a 18–20% BCBS market, a 1% fully-insured offer is so good you stop shopping so you do not scare it off. It is not a law. It is a reminder that 3% last year was the exception, and 1% would be a gift.",
    whyItMatters:
      "You asked this in the meeting. Use it as a compass: 1% = probably stay. 20% = the reason this Troxell packet exists.",
    tags: ["renewal"],
  },
  {
    id: "network-rental",
    term: "Network rental (why not Blue Cross)",
    oneLiner: "BCBS generally will not let an outside TPA use the Blue network. Aetna will.",
    body: "Carriers 'rent' their contracted doctor discounts to self-funded plans. Blue Cross Illinois historically does not. That is why self-funded Illinois groups land on Aetna, Cigna, UMR (United's TPA), or a local wrap. Troxell said Aetna currently has the best pricing among those national options. You are not keeping the Blue Cross card with a different bank account. Staff will notice.",
    whyItMatters:
      "If the political goal is 'don't make people change doctors,' you still need a disruption file, not a slogan. They claim 98% overlap locally.",
    tags: ["network"],
  },
  {
    id: "wrap",
    term: "Wrap network",
    alsoHeardAs: ["Aetna wrap"],
    oneLiner: "The national network that covers everyone SCA does not.",
    body: "Tier 1 is Springfield Clinic Advantage (local steerage). The wrap is Aetna sitting around it so the plan still looks like a normal PPO when someone is in St. Louis, at college, or at Barnes-Jewish. SCA + Aetna wrap is the architecture they described.",
    whyItMatters:
      "Ask who is Tier 1 vs Tier 2 at Memorial, HSHS, SIU, and Barnes-Jewish so you do not discover it in January.",
    tags: ["network"],
  },
  {
    id: "sca",
    term: "SCA / Springfield Clinic Advantage",
    alsoHeardAs: ["Springfield Clinic Advance", "tier 1"],
    oneLiner: "The local preferred tier: Springfield Clinic doctors, richer benefits, better discounts.",
    body: "Springfield Clinic built Advantage as an employer plan after years of friction with BCBS. Troxell is plugging that preferred network in as Tier 1 of a three-tier design. Members who already live in Springfield Clinic save. Members whose cardiologist is elsewhere still have Aetna Tier 2, at a worse benefit. Steerage only works if the benefit gap is real and the clinic has capacity.",
    whyItMatters:
      "This is both a cost play and a local-politics play. Map your enrolled members' current PCPs before you sell it as painless.",
    tags: ["network"],
  },
  {
    id: "three-tier",
    term: "Three-tier plan",
    oneLiner: "Tier 1 SCA (best), Tier 2 Aetna in-network, Tier 3 out-of-network (worst).",
    body: "Classic preferred-provider design. Copays, coinsurance, and deductibles get worse as you leave the preferred clinic, then worse again if you leave the national network. Out-of-network is where balance bills live.",
    whyItMatters:
      "Print a one-page copay grid before open enrollment. Staff will not read the SPD. They will read 'PCP $10 vs $40 vs 50%.'",
    tags: ["network"],
  },
  {
    id: "balance-billing",
    term: "Balance billing",
    alsoHeardAs: ["no balance billing"],
    oneLiner: "The provider bills the patient for the leftover above what the plan paid.",
    body: "In-network doctors have a contract: they cannot bill the member beyond copay/coinsurance. Out-of-network doctors often can. The federal No Surprises Act already bans most emergency and some in-network-hospital ancillary balance bills. The presenter saying 'no balance billing' is either (a) stay in network and you are fine, or (b) some extra wrap/SCA promise. Get which one. It is not a magic shield for someone who elects an out-of-network specialist in Chicago.",
    whyItMatters:
      "This is a trust issue. One surprise bill at St. John's and the committee owns it.",
    tags: ["network", "member"],
  },
  {
    id: "12-15",
    term: "12/15 contract basis",
    alsoHeardAs: ["contract 12/15"],
    oneLiner: "Stop-loss covers claims incurred in 12 months and paid in 15.",
    body: "Medical bills lag. A December surgery may not be billed until February. A 12/12 policy is cheaper and leaves those run-out claims with you. 12/15 gives a three-month tail. 12/24 is richer. The packet header says 12/15. That is a decent standard, not the most generous.",
    whyItMatters:
      "If you ever leave self-funding and go back to fully insured, run-out claims still arrive. Ask who pays them.",
    tags: ["risk"],
  },
  {
    id: "loss-fund",
    term: "Loss-fund dividend / true-up",
    oneLiner: "Money back in a good year, extra bill in a bad year, inside the captive.",
    body: "Great column: ($100,218) comes back. Good: ($52,928). Expected: $0. Maximum: you pay ~$115k extra as a true-up. This is how the pool shares results. Dividends are not guaranteed and often arrive after the plan year, which is awkward for school budgeting.",
    whyItMatters:
      "Do not budget a dividend. Do budget the Maximum true-up. Anything back is a pleasant audit adjustment.",
    tags: ["money"],
  },
  {
    id: "reprice",
    term: "Reprice (uncapped estimated Rx savings)",
    oneLiner: "Last year's prescriptions run through a new PBM's prices. An estimate, not a warranty.",
    body: "The ($312,760) line is labeled uncapped estimated Rx savings per reprice. Uncapped means they did not haircut it for disruption or conservative underwriting. That makes the Great/Good columns prettier. Ask whether medical was also repriced through Aetna/SCA discounts, or only pharmacy.",
    whyItMatters:
      "This is the swing line. Haircut it in the Quote lab mentally: if Rx savings are half, Expected looks worse.",
    tags: ["pharmacy", "money"],
  },
  {
    id: "level-funded",
    term: "Level-funded (for the next brochure)",
    oneLiner: "A hybrid: you pay a level monthly amount, with a surplus refund if claims are light.",
    body: "You will see this from national carriers as the 'starter' self-fund. It feels like fully insured. Surplus sharing is real; so are lasers and worse renewals. Troxell is pitching a more fully unbundled captive, not classic level-fund. When the next company comes, put them on the Compare page and tag the model honestly.",
    whyItMatters:
      "Level-funded often looks cheaper until you read the laser and the year-2 rate.",
    tags: ["model"],
  },
  {
    id: "minimum-lives",
    term: "50-life vs 500-life threshold",
    oneLiner: "Stop-loss used to want huge groups. The market is opening to much smaller ones.",
    body: "He said it used to take ~500 employees to self-fund and that it is heading toward 50. That is a market comment, not a Ball-Chatham constraint — you are already large enough. It is interesting because it tells you stop-loss capital is hunting for smaller school districts, which can mean more options next year… or more aggressive selling this year.",
    whyItMatters:
      "You do not need to wait for 50. You do need to ask whether a market that just opened the gates is pricing this generously to win logos.",
    tags: ["market"],
  },
]
