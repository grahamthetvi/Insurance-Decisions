"use client"

import { useState } from "react"
import { Callout } from "@/components/callout"
import {
  BCBS_BENEFITS,
  BCBS_CURRENT,
  BCBS_DRAFT,
  BCBS_DRAFT_QUOTED_INCREASE_PCT,
  BCBS_PLANS,
  TROXELL_ASSUMED_INCREASE_PCT,
  TROXELL_EMPLOYEE_DRAFT,
  TROXELL_NETWORK_CORRECTION,
  TROXELL_SHEET_PRINTED_CARRIER,
  COVERAGE_TIERS,
  PAY_SCHEDULES,
  annualEmployeeDeduction,
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
            Employee deduction per pay, as printed. The year line is that
            amount times {pays.pays} pays. The Blue Cross draft headline is{" "}
            {pct(BCBS_DRAFT_QUOTED_INCREASE_PCT, 1)}. The Troxell draft headline
            is an assumed {pct(TROXELL_ASSUMED_INCREASE_PCT, 0)}. Neither
            headline is the percent change in these paycheck lines.
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
                    const troxell = rate(
                      TROXELL_EMPLOYEE_DRAFT,
                      plan.id,
                      schedule,
                      tier.id,
                    )
                    const vsBlue = next - troxell
                    return (
                      <td key={plan.id} className="px-3 py-3 tabular-nums">
                        <p>
                          <span className="text-muted-foreground">2026 Blue Cross </span>
                          {usd(current, 2)}
                        </p>
                        <p>
                          <span className="text-muted-foreground">2027 Blue Cross draft </span>
                          {usd(next, 2)}
                        </p>
                        <p>
                          <span className="text-muted-foreground">2027 Troxell draft </span>
                          {usd(troxell, 2)}
                        </p>
                        <p className={vsBlue >= 0 ? "text-save" : "text-risk"}>
                          {vsBlue >= 0
                            ? `${usd(vsBlue, 2)} less per pay than the Blue Cross draft`
                            : `${usd(Math.abs(vsBlue), 2)} more per pay than the Blue Cross draft`}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Troxell year:{" "}
                          {usd(annualEmployeeDeduction(troxell, schedule), 2)}
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
        Employee-only on the HSA is {usd(0, 2)} in 2026,{" "}
        {usd(rate(BCBS_DRAFT, "hsa-3500", "24", "ee"), 2)} on the Blue Cross
        draft, and {usd(rate(TROXELL_EMPLOYEE_DRAFT, "hsa-3500", "24", "ee"), 2)}{" "}
        on the Troxell draft, per 24-pay check. A total premium cannot be $0,
        so this grid is the employee share. The Troxell packet&apos;s{" "}
        {usd(PACKET_FULLY_INSURED)} line is a different document. Do not add
        these paychecks up and call the sum either quote.
      </Callout>

      <Callout tone="risk" title="The Troxell sheet names the wrong network.">
        The carrier row prints {TROXELL_SHEET_PRINTED_CARRIER}. That cell is
        wrong for this option. The provider network is {TROXELL_NETWORK_CORRECTION},
        not Blue Cross. The sheet is also labeled self-insured captive, with an
        assumed {pct(TROXELL_ASSUMED_INCREASE_PCT, 0)} increase. Plan design
        still matches the Blue Cross cards. The meeting had described Springfield
        Clinic Advantage plus an Aetna wrap.         Health Link is the correction on
        this sheet. Consociate Health, a TPA in Decatur, is the firm to
        confirm: HealthLink lists Consociate Group as a contracted TPA, and
        Consociate lists HealthLink and Springfield Clinic Advantage with
        HealthLink. Neither name is printed on this sheet. The meeting had
        said an Aetna wrap and did not name the TPA. Ask Troxell to put the
        network and the TPA on one page.
      </Callout>

      <section className="space-y-4">
        <div>
          <h2 className="font-heading text-2xl">Plan design — same on all three sheets</h2>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            Deductibles, copays, and drug tiers print the same for 2026 Blue
            Cross, the 2027 Blue Cross draft, and the 2027 Troxell draft. The
            drafts change the paycheck, not the card design. Member costs below
            are what the employee pays at the doctor.
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
