"use client"

import { useMemo, useState } from "react"
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceDot,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Callout } from "@/components/callout"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import {
  compareAt,
  fullyInsuredCost,
  OPTIONS,
  PACKET_FULLY_INSURED,
  SCENARIOS,
  optionByDeductible,
  pointAt,
  type FiBase,
} from "@/lib/quote-data"
import { pct, usd, usdCompact } from "@/lib/money"
import { cn } from "@/lib/utils"

const CLAIMS_MIN = 70
const CLAIMS_MAX = 120

function snap(values: number | readonly number[], min: number, max: number) {
  const n = typeof values === "number" ? values : (values[0] ?? min)
  return Math.min(max, Math.max(min, Math.round(n)))
}

export function QuoteLab() {
  const [deductible, setDeductible] = useState<150_000 | 175_000>(150_000)
  const [claimsPct, setClaimsPct] = useState(100)
  const [renewalPct, setRenewalPct] = useState(20)
  const [fiBase, setFiBase] = useState<FiBase>("packet-is-current")

  const result = compareAt({ deductible, claimsPct, renewalPct, fiBase })
  const { point, fullyInsured, delta, breakEven } = result
  const saving = delta < 0

  const chartData = useMemo(() => {
    const option = optionByDeductible(deductible)
    const fi = fullyInsuredCost(renewalPct, fiBase)
    const rows = []
    for (let x = CLAIMS_MIN; x <= CLAIMS_MAX; x += 2.5) {
      rows.push({
        claimsPct: x,
        captive: Math.round(pointAt(option, x).totalCaptive),
        fullyInsured: Math.round(fi),
      })
    }
    return rows
  }, [deductible, renewalPct, fiBase])

  const nearest = SCENARIOS.reduce((a, b) =>
    Math.abs(b.claimsPct - claimsPct) < Math.abs(a.claimsPct - claimsPct) ? b : a,
  )

  const components = [
    { label: "Expected / modeled claims the district pays", value: point.claims, hint: "Scales with the year you actually have" },
    { label: "Stop-loss premium (specific)", value: point.stopLossPremium, hint: "Pays after one person crosses the deductible" },
    { label: "Aggregate premium", value: point.aggregatePremium, hint: "Pays if the whole group has a terrible year" },
    { label: "Administration", value: point.admin, hint: "TPA / running the plan — flat in every column" },
    { label: "Pharmacy reprice (estimated)", value: point.rxSavings, hint: "Uncapped estimate, not a guarantee" },
    { label: "Dividend / true-up", value: point.profitDistOrTrueUp, hint: "Money back in a good year, extra in a bad one" },
  ]

  return (
    <div className="space-y-8">
      <div className="grid gap-3 sm:grid-cols-2">
        <fieldset className="paper-card rounded-xl p-4">
          <legend className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
            Specific deductible
          </legend>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {OPTIONS.map((opt) => (
              <button
                key={opt.specificDeductible}
                type="button"
                onClick={() => setDeductible(opt.specificDeductible)}
                className={cn(
                  "rounded-lg border px-3 py-2.5 text-left transition-colors",
                  deductible === opt.specificDeductible
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card hover:bg-muted",
                )}
              >
                <p className="font-heading text-lg leading-none">
                  {usd(opt.specificDeductible, 0)}
                </p>
                <p className="mt-1 text-[11px] opacity-80">
                  SL premium {usd(opt.stopLossPremium)}
                </p>
              </button>
            ))}
          </div>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            Higher deductible = cheaper catastrophe premium, more of a big claim stays with the district. The packet&apos;s two options land in almost the same place at Expected.
          </p>
        </fieldset>

        <fieldset className="paper-card rounded-xl p-4">
          <legend className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
            What is the $6.41M?
          </legend>
          <div className="mt-2 grid gap-2">
            {(
              [
                [
                  "packet-is-current",
                  "Current premium — apply a renewal on top",
                  "Matches the meeting: last year 3%, this year maybe 20%.",
                ],
                [
                  "packet-is-renewal",
                  "Already the 2027 fully-insured quote",
                  "Then ignore the renewal slider; compare captive to $6.41M as-is.",
                ],
              ] as const
            ).map(([id, label, hint]) => (
              <button
                key={id}
                type="button"
                onClick={() => setFiBase(id)}
                className={cn(
                  "rounded-lg border px-3 py-2 text-left transition-colors",
                  fiBase === id
                    ? "border-primary bg-primary/8"
                    : "border-border hover:bg-muted",
                )}
              >
                <p className="text-sm font-medium">{label}</p>
                <p className="text-xs text-muted-foreground">{hint}</p>
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="paper-card space-y-6 rounded-xl p-4 sm:p-6">
        <div>
          <div className="flex items-end justify-between gap-3">
            <label className="font-heading text-lg">Claims year</label>
            <p className="font-mono text-sm tabular-nums">
              {claimsPct}% of expected
            </p>
          </div>
          <p className="mb-3 text-xs text-muted-foreground">
            70% is their “Great” column. 100% is Expected. 120% is the printed Maximum / aggregate corridor.
          </p>
          <Slider
            min={CLAIMS_MIN}
            max={CLAIMS_MAX}
            value={[claimsPct]}
            onValueChange={(v) => setClaimsPct(snap(v, CLAIMS_MIN, CLAIMS_MAX))}
          />
          <div className="mt-2 flex justify-between font-mono text-[10px] tracking-wide text-muted-foreground uppercase">
            <span>Great 70%</span>
            <span>Good 85%</span>
            <span>Expected 100%</span>
            <span>Max 120%</span>
          </div>
        </div>

        {fiBase === "packet-is-current" ? (
          <div>
            <div className="flex items-end justify-between gap-3">
              <label className="font-heading text-lg">
                Fully-insured renewal
              </label>
              <p className="font-mono text-sm tabular-nums">{renewalPct}%</p>
            </div>
            <p className="mb-3 text-xs text-muted-foreground">
              Last year was ~3%. The room is talking ~20%. BCBS Illinois color: 67% of customers at 18–20%.
            </p>
            <Slider
              min={0}
              max={30}
              value={[renewalPct]}
              onValueChange={(v) => setRenewalPct(snap(v, 0, 30))}
            />
            <div className="mt-2 flex justify-between font-mono text-[10px] tracking-wide text-muted-foreground uppercase">
              <span>0% flat</span>
              <span>3% last year</span>
              <span>20% this year?</span>
              <span>30%</span>
            </div>
          </div>
        ) : null}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Stat
          label="Self-funded / captive cost"
          value={usd(point.totalCaptive)}
          hint={`${nearest.label} neighborhood`}
        />
        <Stat
          label="Fully-insured comparison"
          value={usd(fullyInsured)}
          hint={
            fiBase === "packet-is-current"
              ? `${usd(PACKET_FULLY_INSURED)} × ${1 + renewalPct / 100}`
              : "Packet figure, no extra hike"
          }
        />
        <Stat
          label={saving ? "District would spend less" : "District would spend more"}
          value={usd(Math.abs(delta))}
          hint={saving ? "vs fully insured in this setup" : "vs fully insured in this setup"}
          tone={saving ? "save" : "risk"}
        />
      </div>

      {saving ? (
        <Callout tone="save" title="In this setup, self-funding wins.">
          Captive {usd(point.totalCaptive)} vs fully insured {usd(fullyInsured)}.
          {breakEven
            ? ` Self-funding stays cheaper until claims reach about ${pct(breakEven, 0)} of expected.`
            : " Across the 70–120% window you are still under the fully-insured number."}
        </Callout>
      ) : (
        <Callout tone="risk" title="In this setup, fully insured is cheaper.">
          Captive {usd(point.totalCaptive)} vs fully insured {usd(fullyInsured)}.
          {breakEven
            ? ` You would need claims below about ${pct(breakEven, 0)} of expected for self-funding to win.`
            : " Even a Great claims year does not beat this fully-insured number — check the $6.41M interpretation."}
        </Callout>
      )}

      <div className="paper-card rounded-xl p-4 sm:p-6">
        <h2 className="font-heading text-xl">Cost as the year gets worse</h2>
        <p className="mt-1 mb-4 max-w-2xl text-sm text-muted-foreground">
          The flat line is fully insured (you pay the premium no matter the claims). The sloping line is self-funding. Where they cross is the break-even claims year.
        </p>
        <div className="h-72 w-full">
          <ResponsiveContainer>
            <LineChart data={chartData} margin={{ top: 8, right: 12, left: 8, bottom: 8 }}>
              <CartesianGrid stroke="oklch(0.88 0.02 75)" strokeDasharray="3 3" />
              <XAxis
                dataKey="claimsPct"
                tickFormatter={(v) => `${v}%`}
                tick={{ fontSize: 11, fill: "oklch(0.48 0.03 50)" }}
              />
              <YAxis
                tickFormatter={(v) => usdCompact(Number(v))}
                width={56}
                tick={{ fontSize: 11, fill: "oklch(0.48 0.03 50)" }}
              />
              <Tooltip
                formatter={(value, name) => [
                  usd(Number(value)),
                  name === "captive" ? "Captive" : "Fully insured",
                ]}
                labelFormatter={(label) => `${label}% of expected claims`}
              />
              <Line
                type="monotone"
                dataKey="fullyInsured"
                stroke="oklch(0.4 0.12 25)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="captive"
                stroke="oklch(0.45 0.08 155)"
                strokeWidth={2.5}
                dot={false}
              />
              <ReferenceLine
                x={claimsPct}
                stroke="oklch(0.72 0.1 75)"
                strokeDasharray="4 4"
              />
              <ReferenceDot
                x={claimsPct}
                y={point.totalCaptive}
                r={5}
                fill="oklch(0.45 0.08 155)"
                stroke="white"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 flex flex-wrap gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <i className="inline-block h-0.5 w-4 bg-primary" /> Fully insured
          </span>
          <span className="inline-flex items-center gap-1.5">
            <i className="inline-block h-0.5 w-4 bg-save" /> Self-funded / captive
          </span>
        </div>
      </div>

      <div className="paper-card rounded-xl p-4 sm:p-6">
        <h2 className="font-heading text-xl">What the captive number is made of</h2>
        <p className="mt-1 mb-5 text-sm text-muted-foreground">
          Claims move. Admin, stop-loss, and the Rx reprice do not, in this packet. Dividends only show up when the year is better than expected.
        </p>
        <ul className="space-y-3">
          {components.map((row) => {
            const width = Math.min(
              100,
              (Math.abs(row.value) / point.totalCaptive) * 100 * 1.15,
            )
            const negative = row.value < 0
            return (
              <li key={row.label}>
                <div className="flex items-baseline justify-between gap-3 text-sm">
                  <span>{row.label}</span>
                  <span
                    className={cn(
                      "font-mono tabular-nums",
                      negative ? "text-save" : "",
                    )}
                  >
                    {usd(row.value)}
                  </span>
                </div>
                <div className="mt-1 h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className={cn(
                      "h-full rounded-full",
                      negative ? "bg-save" : "bg-primary/80",
                    )}
                    style={{ width: `${width}%` }}
                  />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{row.hint}</p>
              </li>
            )
          })}
        </ul>
      </div>

      <PacketTable deductible={deductible} fi={fullyInsured} />
    </div>
  )
}

function Stat({
  label,
  value,
  hint,
  tone = "ink",
}: {
  label: string
  value: string
  hint: string
  tone?: "ink" | "save" | "risk"
}) {
  return (
    <div
      className={cn(
        "paper-card rounded-xl p-4",
        tone === "save" && "ring-1 ring-save/30",
        tone === "risk" && "ring-1 ring-risk/30",
      )}
    >
      <p className="text-xs tracking-wide text-muted-foreground uppercase">
        {label}
      </p>
      <p
        className={cn(
          "font-heading mt-2 text-2xl tabular-nums sm:text-3xl",
          tone === "save" && "text-save",
          tone === "risk" && "text-risk",
        )}
      >
        {value}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
    </div>
  )
}

function PacketTable({
  deductible,
  fi,
}: {
  deductible: 150_000 | 175_000
  fi: number
}) {
  const option = optionByDeductible(deductible)
  return (
    <div className="overflow-x-auto paper-card rounded-xl p-4 sm:p-6">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <h2 className="font-heading text-xl">The four printed columns</h2>
        <Badge variant="outline">{option.label}</Badge>
      </div>
      <p className="mb-4 max-w-2xl text-sm text-muted-foreground">
        “Savings %” in the packet is vs $6.41M, not vs a 20% renewal. The last row recasts each column against the fully-insured number you chose above.
      </p>
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="border-b text-xs tracking-wide text-muted-foreground uppercase">
            <th className="py-2 pr-3 font-medium">Line</th>
            {SCENARIOS.map((s) => (
              <th key={s.key} className="py-2 pr-3 font-medium">
                {s.label}
                <span className="mt-0.5 block font-mono normal-case tracking-normal">
                  {s.shortLabel}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="tabular-nums">
          <tr className="border-b border-border/70">
            <td className="py-2 pr-3">Claims</td>
            {SCENARIOS.map((s) => (
              <td key={s.key} className="py-2 pr-3">
                {usd(option.rows[s.key].claims)}
              </td>
            ))}
          </tr>
          <tr className="border-b border-border/70">
            <td className="py-2 pr-3">Dividend / true-up</td>
            {SCENARIOS.map((s) => (
              <td key={s.key} className="py-2 pr-3">
                {usd(option.rows[s.key].profitDistOrTrueUp)}
              </td>
            ))}
          </tr>
          <tr className="border-b border-border/70">
            <td className="py-2 pr-3 font-medium">Total captive</td>
            {SCENARIOS.map((s) => (
              <td key={s.key} className="py-2 pr-3 font-medium">
                {usd(option.rows[s.key].totalCaptive)}
              </td>
            ))}
          </tr>
          <tr className="border-b border-border/70">
            <td className="py-2 pr-3">Packet vs $6.41M</td>
            {SCENARIOS.map((s) => {
              const v = option.rows[s.key].vsPacketFi
              return (
                <td
                  key={s.key}
                  className={cn("py-2 pr-3", v < 0 ? "text-save" : "text-risk")}
                >
                  {usd(v)} ({option.rows[s.key].savingsPctVsPacketFi}%)
                </td>
              )
            })}
          </tr>
          <tr>
            <td className="py-2 pr-3">Vs your fully-insured number</td>
            {SCENARIOS.map((s) => {
              const v = option.rows[s.key].totalCaptive - fi
              return (
                <td
                  key={s.key}
                  className={cn("py-2 pr-3", v < 0 ? "text-save" : "text-risk")}
                >
                  {usd(v)}
                </td>
              )
            })}
          </tr>
        </tbody>
      </table>
      <p className="mt-3 text-xs text-muted-foreground">
        Admin {usd(option.admin)} · Rx reprice {usd(option.rxSavings)} · Stop-loss{" "}
        {usd(option.stopLossPremium)} · Aggregate {usd(option.aggregatePremium)} · Lasers{" "}
        {usd(option.laser)} — identical in every column.
      </p>
    </div>
  )
}
