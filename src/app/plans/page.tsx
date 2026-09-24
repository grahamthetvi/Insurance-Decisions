import Link from "next/link"
import { PageKicker, PageLead, PageTitle, Callout } from "@/components/callout"
import { BcbsPlanSheets } from "@/components/bcbs-plan-sheets"
import { buttonVariants } from "@/components/ui/button"
import {
  BCBS_CARRIER,
  BCBS_CURRENT,
  BCBS_DRAFT,
  BCBS_DRAFT_QUOTED_INCREASE_PCT,
} from "@/lib/bcbs-plans"
import {
  BCBS_MARKET_RANGE,
  LAST_YEAR_RENEWAL_PCT,
  PACKET_FULLY_INSURED,
  fullyInsuredCost,
  optionByDeductible,
} from "@/lib/quote-data"
import { pct, usd } from "@/lib/money"
import { cn } from "@/lib/utils"

const expected = optionByDeductible(150_000).rows.expected
const maximum = optionByDeductible(150_000).rows.maximum
const fiIfPacketIsCurrent = fullyInsuredCost(
  BCBS_DRAFT_QUOTED_INCREASE_PCT,
  "packet-is-current",
)

export default function PlansPage() {
  return (
    <div className="space-y-8">
      <header>
        <PageKicker>
          {BCBS_CARRIER} · current {BCBS_CURRENT.effective} · draft{" "}
          {BCBS_DRAFT.effective}
        </PageKicker>
        <PageTitle>
          The draft quotes a {pct(BCBS_DRAFT_QUOTED_INCREASE_PCT, 1)} increase.
          The paychecks move by more than that.
        </PageTitle>
        <PageLead>
          Two fully-insured sheets, same three cards: BlueEdge HSA 3500, PPO
          2000, and PPO 1500. The 2026 sheet is current. The 2027 sheet is
          marked draft and prints “quoted {pct(BCBS_DRAFT_QUOTED_INCREASE_PCT, 1)}{" "}
          increase.” Plan design matches year to year. What changed is the
          employee deduction per pay.
        </PageLead>
      </header>

      <section className="grid gap-3 sm:grid-cols-3">
        <article className="paper-card rounded-xl p-4">
          <p className="text-xs tracking-wide text-muted-foreground uppercase">
            Sheet headline
          </p>
          <p className="font-heading mt-2 text-3xl text-risk">
            {pct(BCBS_DRAFT_QUOTED_INCREASE_PCT, 1)}
          </p>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            Printed on the 2027 draft. This is the quoted fully-insured
            increase, not a percent you can read off one paycheck line.
          </p>
        </article>
        <article className="paper-card rounded-xl p-4">
          <p className="text-xs tracking-wide text-muted-foreground uppercase">
            Meeting color, still
          </p>
          <p className="font-heading mt-2 text-3xl">
            {BCBS_MARKET_RANGE[0]}–{BCBS_MARKET_RANGE[1]}%
          </p>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            What was said in the Troxell room: last year about{" "}
            {LAST_YEAR_RENEWAL_PCT}%, this year 67% of BCBS Illinois customers
            hearing {BCBS_MARKET_RANGE[0]}–{BCBS_MARKET_RANGE[1]}%. That is not
            this sheet.
          </p>
        </article>
        <article className="paper-card rounded-xl p-4">
          <p className="text-xs tracking-wide text-muted-foreground uppercase">
            If the packet line is current premium
          </p>
          <p className="font-heading mt-2 text-3xl tabular-nums">
            {usd(fiIfPacketIsCurrent)}
          </p>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            {usd(PACKET_FULLY_INSURED)} × {1 + BCBS_DRAFT_QUOTED_INCREASE_PCT / 100}
            . Inference: only if the Troxell packet&apos;s fully-insured line is
            this year&apos;s total premium. The sheets do not print that total.
          </p>
        </article>
      </section>

      <Callout tone="risk" title="Draft, not a renewal letter.">
        Expected self-funding at the $150,000 specific is{" "}
        {usd(expected.totalCaptive)}. Maximum is {usd(maximum.totalCaptive)}.
        Against a {pct(BCBS_DRAFT_QUOTED_INCREASE_PCT, 1)} hike on the packet
        base, both sit under {usd(fiIfPacketIsCurrent)} — and that comparison
        collapses if {usd(PACKET_FULLY_INSURED)} is already the 2027 premium, or
        if the final letter is not {pct(BCBS_DRAFT_QUOTED_INCREASE_PCT, 1)}. Ask
        for the district total (board share plus employee share) on the same
        census as the Troxell quote.
      </Callout>

      <BcbsPlanSheets />

      <div className="flex flex-wrap gap-2">
        <Link
          href="/quote"
          className={cn(buttonVariants({ size: "lg" }), "h-10 px-4")}
        >
          Run {pct(BCBS_DRAFT_QUOTED_INCREASE_PCT, 1)} in the Quote lab
        </Link>
        <Link
          href="/network"
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "h-10 px-4",
          )}
        >
          What leaving the Blue card changes
        </Link>
      </div>
    </div>
  )
}
