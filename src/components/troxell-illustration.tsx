import { Callout } from "@/components/callout"
import { usd } from "@/lib/money"
import { optionByDeductible } from "@/lib/quote-data"
import {
  ADMIN_LINES,
  COLLATERAL,
  ILLUSTRATION,
  LASERS_PENDING,
  MEMORIAL_CHOICE_ANNUAL,
  RX_REBATE_ESTIMATE,
  SPECIFIC_OPTIONS,
  STOPLOSS_LINES,
  adminPepm,
  annualMaxClaims,
  annualWithMemorial,
  planCostPepm,
  stopLossPepm,
  type FeeLine,
  type SpecificKey,
} from "@/lib/troxell-illustration"

const packet150 = optionByDeductible(150_000)
const packet175 = optionByDeductible(175_000)

function money(value: number | null): string {
  if (value == null) return "—"
  return usd(value, 2)
}

function FeeRows({ lines }: { lines: FeeLine[] }) {
  return lines.map((line) => (
    <tr key={line.id} className="border-b border-border/70 align-top">
      <th className="px-3 py-2 text-left font-medium">
        {line.label}
        {line.note ? (
          <span className="mt-0.5 block text-xs font-normal text-muted-foreground">
            {line.note}
          </span>
        ) : null}
      </th>
      {SPECIFIC_OPTIONS.map((option) => (
        <td key={option.key} className="px-3 py-2 text-right tabular-nums">
          {money(line.pepm[option.key])}
        </td>
      ))}
    </tr>
  ))
}

function TotalRow({
  label,
  values,
  strong = false,
}: {
  label: string
  values: Record<SpecificKey, string>
  strong?: boolean
}) {
  return (
    <tr className="border-b border-border bg-muted/40 align-top">
      <th className={`px-3 py-2 text-left ${strong ? "font-semibold" : "font-medium"}`}>
        {label}
      </th>
      {SPECIFIC_OPTIONS.map((option) => (
        <td
          key={option.key}
          className={`px-3 py-2 text-right tabular-nums ${strong ? "font-semibold" : ""}`}
        >
          {values[option.key]}
        </td>
      ))}
    </tr>
  )
}

export function TroxellIllustration() {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="font-heading text-2xl">
          A later illustration, dated {ILLUSTRATION.dated}
        </h2>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          {ILLUSTRATION.district}, effective {ILLUSTRATION.effective}. The sheet
          says {ILLUSTRATION.label.toLowerCase()} and a{" "}
          {ILLUSTRATION.contractBasis} contract. {ILLUSTRATION.employees}{" "}
          employees. {ILLUSTRATION.members} members as of{" "}
          {ILLUSTRATION.membersAsOf}. Amounts are per employee per month unless
          the row says otherwise. This is not the packet above, and it is not
          the employee paycheck grid.
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="px-3 py-2 font-medium">Line</th>
              {SPECIFIC_OPTIONS.map((option) => (
                <th key={option.key} className="px-3 py-2 text-right font-medium">
                  {usd(option.deductible)} specific
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <FeeRows lines={ADMIN_LINES} />
            <TotalRow
              label="Total administrative costs"
              values={{
                "150": money(adminPepm("150")),
                "175": money(adminPepm("175")),
              }}
            />
            <tr className="border-b border-border/70">
              <th className="px-3 py-2 text-left font-medium">
                Pharmacy rebates — estimated
                <span className="mt-0.5 block text-xs font-normal text-muted-foreground">
                  Annual dollars, not per employee. The packet’s reprice is a
                  different number.
                </span>
              </th>
              {SPECIFIC_OPTIONS.map((option) => (
                <td key={option.key} className="px-3 py-2 text-right tabular-nums">
                  {usd(RX_REBATE_ESTIMATE, 2)}
                </td>
              ))}
            </tr>
            <FeeRows lines={STOPLOSS_LINES} />
            <TotalRow
              label="Total stop-loss costs, per employee per month"
              values={{
                "150": money(stopLossPepm("150")),
                "175": money(stopLossPepm("175")),
              }}
            />
            <TotalRow
              strong
              label="Admin plus stop-loss plus max claims factor, per employee per month"
              values={{
                "150": money(planCostPepm("150")),
                "175": money(planCostPepm("175")),
              }}
            />
            <TotalRow
              strong
              label="Annual cost at max claims, before Memorial Choice"
              values={{
                "150": usd(annualMaxClaims("150"), 2),
                "175": usd(annualMaxClaims("175"), 2),
              }}
            />
            <tr className="border-b border-border/70">
              <th className="px-3 py-2 text-left font-medium">
                Organ transplant policy
              </th>
              <td className="px-3 py-2 text-right">TBD</td>
              <td className="px-3 py-2 text-right text-xs text-muted-foreground">
                RFP still in progress
              </td>
            </tr>
            <tr className="border-b border-border/70">
              <th className="px-3 py-2 text-left font-medium">
                Memorial Choice, annual
              </th>
              {SPECIFIC_OPTIONS.map((option) => (
                <td key={option.key} className="px-3 py-2 text-right tabular-nums">
                  {usd(MEMORIAL_CHOICE_ANNUAL, 2)}
                </td>
              ))}
            </tr>
            <TotalRow
              strong
              label="Annual max claims plus Memorial Choice"
              values={{
                "150": usd(annualWithMemorial("150"), 2),
                "175": usd(annualWithMemorial("175"), 2),
              }}
            />
            <TotalRow
              label="Collateral"
              values={{
                "150": usd(COLLATERAL["150"]),
                "175": usd(COLLATERAL["175"]),
              }}
            />
            <tr className="align-top">
              <th className="px-3 py-2 text-left font-medium text-risk">
                Lasers — pending final nurse review
                <span className="mt-0.5 block text-xs font-normal text-muted-foreground">
                  The sheet says see the second tab. That tab was not in this
                  photo. The packet still prints laser $0.
                </span>
              </th>
              {SPECIFIC_OPTIONS.map((option) => (
                <td
                  key={option.key}
                  className="px-3 py-2 text-right tabular-nums text-risk"
                >
                  {usd(LASERS_PENDING[option.key])}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <Callout tone="risk" title="Two Troxell documents. They do not match.">
        The packet’s $150,000 option, on a 12/15 contract, is{" "}
        {usd(packet150.rows.expected.totalCaptive)} at Expected and{" "}
        {usd(packet150.rows.maximum.totalCaptive)} at Maximum, with laser $0.
        This illustration’s max-claims annual at the same deductible is{" "}
        {usd(annualMaxClaims("150"), 2)} before Memorial Choice, on a 12/12
        contract, with a laser of {usd(LASERS_PENDING["150"])} still under
        nurse review. The $175,000 packet Maximum is{" "}
        {usd(packet175.rows.maximum.totalCaptive)}. This sheet’s matching
        annual is {usd(annualMaxClaims("175"), 2)}. Do not pick one and call
        it the quote.
      </Callout>
    </section>
  )
}
