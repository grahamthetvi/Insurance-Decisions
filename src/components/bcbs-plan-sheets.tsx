"use client"

import { useState } from "react"
import { Callout } from "@/components/callout"
import {
  BCBS_BENEFITS,
  BCBS_CURRENT,
  BCBS_DRAFT,
  BCBS_DRAFT_QUOTED_INCREASE_PCT,
  BCBS_PLANS,
  COVERAGE_TIERS,
  PAY_SCHEDULES,
  annualEmployeeDeduction,
  deductionChange,
  rate,
  type PayScheduleId,
} from "@/lib/bcbs-plans"
import { PACKET_FULLY_INSURED } from "@/lib/quote-data"
import { pct, usd } from "@/lib/money"
import { cn } from "@/lib/utils"

export function BcbsPlanSheets() {
  const [schedule, setSchedule] = useState<PayScheduleId>("24")
  const pays = PAY_SCHEDULES.find((s) => s.id === schedule) ?? PAY_SCHEDULES[0]

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2">
        {PAY_SCHEDULES.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setSchedule(item.id)}
            className={cn(
              "rounded-lg border px-3 py-2 text-left transition-colors",
              schedule === item.id
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card hover:bg-muted",
            )}
          >
            <p className="font-heading text-base leading-none">{item.label}</p>
            <p className="mt-1 text-[11px] opacity-80">{item.who}</p>
          </button>
        ))}
      </div>

      <section className="space-y-4">
        <div>
          <h2 className="font-heading text-2xl">What comes out of the paycheck</h2>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            Employee deduction per pay, as printed. Annual column is that
            amount times {pays.pays} pays — arithmetic from the sheet, not a
            separate quote. The draft&apos;s {pct(BCBS_DRAFT_QUOTED_INCREASE_PCT, 1)}{" "}
            headline is the increase quoted on the sheet. It is not the percent
            change in these paycheck lines.
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-border bg-card">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="px-3 py-2 font-medium">Coverage</th>
                {BCBS_PLANS.map((plan) => (
                  <th key={plan.id} className="px-3 py-2 font-medium">
                    <span className="block">{plan.name}</span>
                    <span className="block text-xs font-normal text-muted-foreground">
                      {plan.design}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COVERAGE_TIERS.map((tier) => (
                <tr key={tier.id} className="border-b border-border/70 align-top">
                  <th className="px-3 py-3 text-left font-medium">{tier.label}</th>
                  {BCBS_PLANS.map((plan) => {
                    const current = rate(BCBS_CURRENT, plan.id, schedule, tier.id)
                    const next = rate(BCBS_DRAFT, plan.id, schedule, tier.id)
                    const change = deductionChange(current, next)
                    return (
                      <td key={plan.id} className="px-3 py-3 tabular-nums">
                        <p>
                          <span className="text-muted-foreground">2026 </span>
                          {usd(current, 2)}
                        </p>
                        <p>
                          <span className="text-muted-foreground">2027 draft </span>
                          {usd(next, 2)}
                        </p>
                        <p className="text-risk">
                          {change.pct == null
                            ? `New deduction ${usd(change.dollars, 2)} (2026 was $0)`
                            : `+${usd(change.dollars, 2)} per pay (${pct(change.pct, 1)})`}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Year: {usd(annualEmployeeDeduction(current, schedule), 2)}{" "}
                          → {usd(annualEmployeeDeduction(next, schedule), 2)}
                        </p>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <Callout tone="gold" title="These checks are not the district's premium.">
        Employee-only on the HSA is {usd(0, 2)} in 2026 and{" "}
        {usd(rate(BCBS_DRAFT, "hsa-3500", "24", "ee"), 2)} per 24-pay check on
        the draft. A total premium cannot be $0, so this grid is the employee
        share. The board&apos;s share is not on either sheet. Do not add these
        paychecks up and call the sum the {usd(PACKET_FULLY_INSURED)} packet line.
      </Callout>

      <section className="space-y-4">
        <div>
          <h2 className="font-heading text-2xl">Plan design — same on both sheets</h2>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            Deductibles, copays, and drug tiers print the same for 2026 and the
            2027 draft. The draft is a price change on these three cards, not a
            redesigned plan. Member costs below are what the employee pays at
            the doctor, after the paycheck deduction above.
          </p>
        </div>
        <div className="overflow-x-auto rounded-xl border border-border bg-card">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="px-3 py-2 font-medium">Benefit</th>
                {BCBS_PLANS.map((plan) => (
                  <th key={plan.id} className="px-3 py-2 font-medium">
                    {plan.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {BCBS_BENEFITS.map((row) => (
                <tr
                  key={`${row.group}-${row.label}`}
                  className="border-b border-border/70 align-top"
                >
                  <th className="px-3 py-2 text-left font-medium">
                    <span className="block text-[10px] tracking-widest text-muted-foreground uppercase">
                      {row.group}
                    </span>
                    {row.label}
                  </th>
                  {BCBS_PLANS.map((plan) => (
                    <td key={plan.id} className="px-3 py-2">
                      {row.cells[plan.id]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
