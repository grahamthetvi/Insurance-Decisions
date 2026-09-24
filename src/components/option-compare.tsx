import { Callout } from "@/components/callout"
import {
  comparePacketOptions,
  type FiBase,
  type FiVerdict,
  type PacketChoice,
  type PacketChoiceId,
  type PacketOptionComparison,
} from "@/lib/quote-data"
import { usd } from "@/lib/money"
import {
  ILLUSTRATION,
  LASERS_PENDING,
  MEMORIAL_CHOICE_ANNUAL,
  annualMaxClaims,
  annualWithMemorial,
} from "@/lib/troxell-illustration"
import { cn } from "@/lib/utils"

const CHOICE_NOTE: Record<PacketChoiceId, string> = {
  "fully-insured": "Premium stays put no matter how the claims year goes.",
  "spec-150": "Specific stop-loss pays after one person passes $150,000.",
  "spec-175": "Same stack. Each person must pass $175,000 before specific stop-loss pays.",
}

function choiceById(
  comparison: PacketOptionComparison,
  id: PacketChoiceId,
): PacketChoice {
  const row = comparison.choices.find((choice) => choice.id === id)
  if (!row) {
    throw new Error(`Missing packet choice ${id}`)
  }
  return row
}

function verdictCopy(comparison: PacketOptionComparison): string {
  const low = choiceById(comparison, "spec-150")
  const high = choiceById(comparison, "spec-175")
  const fi = comparison.fullyInsured
  const verdict: FiVerdict = comparison.verdict
  switch (verdict) {
    case "captive-lower-expected-and-maximum":
      return `Against ${usd(fi)}, both self-funded columns are lower at Expected and at Maximum. The cheaper Expected column is ${high.expected < low.expected ? high.name : low.name} (${usd(Math.min(low.expected, high.expected))}). That only holds if this fully-insured number is the real 2027 bill. The draft percent is a plan sheet, not the final letter.`
    case "captive-lower-expected-only":
      return `Against ${usd(fi)}, both self-funded columns are lower at Expected (by ${usd(Math.abs(low.vsFullyInsuredExpected))} on the $150,000 option and ${usd(Math.abs(high.vsFullyInsuredExpected))} on the $175,000 option) and higher at Maximum (by ${usd(low.vsFullyInsuredMaximum)} and ${usd(high.vsFullyInsuredMaximum)}). A normal year looks cheaper. A year that runs to the printed cap does not.`
    case "fully-insured-lower-expected-and-maximum":
      return `Against ${usd(fi)}, staying fully insured is lower at Expected and at Maximum. The $150,000 column is ${usd(low.vsFullyInsuredExpected)} higher at Expected; the $175,000 column is ${usd(high.vsFullyInsuredExpected)} higher. On these printed dollars you would be buying the unbundled model, not a discount.`
    case "mixed":
      return `Against ${usd(fi)}, the two self-funded columns do not land on the same side of fully insured. Read Expected and Maximum on each row before anyone calls one of them cheaper.`
    default: {
      const _exhaustive: never = verdict
      return _exhaustive
    }
  }
}

function deductibleCopy(comparison: PacketOptionComparison): string {
  const expectedGap = Math.abs(comparison.gap175Minus150Expected)
  const maximumGap = Math.abs(comparison.gap175Minus150Maximum)
  const stopLossGap = Math.abs(comparison.stopLoss175Minus150)
  const aggregateGap = Math.abs(comparison.aggregate175Minus150)
  const claimsGap = Math.abs(comparison.expectedClaims175Minus150)
  const which =
    comparison.lower175InEveryColumn
      ? `In all four printed columns, the $175,000 specific totals less than the $150,000 specific. At Expected the gap is ${usd(expectedGap)}. At Maximum it is ${usd(maximumGap)}.`
      : `At Expected the gap between the two specific deductibles is ${usd(expectedGap)}. At Maximum it is ${usd(maximumGap)}.`
  return `${which} The packet prints specific stop-loss ${usd(stopLossGap)} lower on the $175,000 option, aggregate premium ${usd(aggregateGap)} higher, and expected claims the district keeps ${usd(claimsGap)} higher. The higher deductible is the part the total compresses into one line: each person keeps an extra $25,000 before specific stop-loss pays.`
}

export function OptionCompare({
  renewalPct,
  fiBase,
}: {
  renewalPct: number
  fiBase: FiBase
}) {
  const comparison = comparePacketOptions({ renewalPct, fiBase })

  return (
    <section id="comparing-options" className="space-y-4">
      <div>
        <h2 className="font-heading text-xl">Comparing the options</h2>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          Three choices: stay fully insured, or self-fund at the packet&apos;s
          $150,000 or $175,000 specific deductible. Lowest printed cost is not
          a vote. It moves when you change the fully-insured assumption above.
          Stare at Expected first, then Maximum. Great (70%) is a bonus year,
          not the forecast.
        </p>
      </div>

      <div className="grid gap-3 lg:grid-cols-3">
        {comparison.choices.map((choice) => {
          const lowestExpected = choice.id === comparison.lowerExpectedId
          const lowestMaximum = choice.id === comparison.lowerMaximumId
          return (
            <article key={choice.id} className="paper-card rounded-xl p-4">
              <p className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
                {lowestExpected ? "Lowest expected" : "Expected"}
                {lowestMaximum ? " · lowest maximum" : ""}
              </p>
              <h3 className="font-heading mt-1 text-lg">{choice.name}</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {CHOICE_NOTE[choice.id]}
              </p>
              <dl className="mt-3 space-y-2 text-sm tabular-nums">
                <div className="flex items-baseline justify-between gap-3">
                  <dt>Expected</dt>
                  <dd className="font-medium">{usd(choice.expected)}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-3">
                  <dt>Maximum</dt>
                  <dd className="font-medium">{usd(choice.maximum)}</dd>
                </div>
                {choice.id === "fully-insured" ? (
                  <p className="text-xs text-muted-foreground">
                    Same bill in a normal year and a bad one.
                  </p>
                ) : (
                  <>
                    <div
                      className={cn(
                        "flex items-baseline justify-between gap-3 text-xs",
                        choice.vsFullyInsuredExpected < 0
                          ? "text-save"
                          : "text-risk",
                      )}
                    >
                      <dt>Expected vs fully insured</dt>
                      <dd>{usd(choice.vsFullyInsuredExpected)}</dd>
                    </div>
                    <div
                      className={cn(
                        "flex items-baseline justify-between gap-3 text-xs",
                        choice.vsFullyInsuredMaximum < 0
                          ? "text-save"
                          : "text-risk",
                      )}
                    >
                      <dt>Maximum vs fully insured</dt>
                      <dd>{usd(choice.vsFullyInsuredMaximum)}</dd>
                    </div>
                  </>
                )}
              </dl>
            </article>
          )
        })}
      </div>

      <Callout tone="ink" title="Which column is lower on the printed dollars">
        <p>{deductibleCopy(comparison)}</p>
        <p className="mt-2">{verdictCopy(comparison)}</p>
      </Callout>

      <IllustrationPair packet175Lower={comparison.lower175InEveryColumn} />

      <Callout tone="gold" title="What the cheaper total does not decide">
        On the packet, both Troxell columns share the same unbundled stack, the
        same year-one lasers at $0, and the same pharmacy reprice estimate. The
        employee sheet still prints Blue Cross; that carrier row is the one
        corrected to Health Link. Staying fully insured keeps the Blue Cross
        card and leaves catastrophe risk with the carrier for the plan year.
        Confirm stop-loss medical and pharmacy, the 12/15 contract, lasers, and
        the network on the specimen and the disruption file — not from this
        table.
      </Callout>
    </section>
  )
}

function IllustrationPair({ packet175Lower }: { packet175Lower: boolean }) {
  const max150 = annualMaxClaims("150")
  const max175 = annualMaxClaims("175")
  const withMemorial150 = annualWithMemorial("150")
  const withMemorial175 = annualWithMemorial("175")
  const lowerIs175 = max175 < max150
  const lowerMax = lowerIs175 ? "$175,000" : "$150,000"
  const maxGap = Math.abs(max175 - max150)
  const memorialSame =
    Math.abs(withMemorial175 - withMemorial150 - (max175 - max150)) < 0.01

  return (
    <Callout tone="ink" title="The 9/23 illustration is a different pair of options">
      <p>
        Dated {ILLUSTRATION.dated}, marked illustrative, contract{" "}
        {ILLUSTRATION.contractBasis}. It is not the packet (12/15, laser $0).
        On this sheet the lower max-claims annual is the {lowerMax} specific,
        by {usd(maxGap, 2)} ({usd(max150, 2)} at $150,000, {usd(max175, 2)} at
        $175,000).{" "}
        {packet175Lower && !lowerIs175
          ? "That is the opposite deductible from the packet, where the $175,000 column prints lower. "
          : null}
        {memorialSame
          ? `Memorial Choice is ${usd(MEMORIAL_CHOICE_ANNUAL, 2)} on both columns, so adding it (${usd(withMemorial150, 2)} and ${usd(withMemorial175, 2)}) does not change which one is lower.`
          : `With Memorial Choice the totals are ${usd(withMemorial150, 2)} and ${usd(withMemorial175, 2)}.`}{" "}
        Lasers on this sheet are still pending nurse review:{" "}
        {usd(LASERS_PENDING["150"])} at $150,000 and {usd(LASERS_PENDING["175"])}{" "}
        at $175,000. The packet still prints laser $0. Do not treat the lower
        illustration column as the quote, and do not mix it with the packet
        totals above.
      </p>
    </Callout>
  )
}
