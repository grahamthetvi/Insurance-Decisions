import Link from "next/link"
import { PageKicker, PageLead, PageTitle, Callout } from "@/components/callout"
import { buttonVariants } from "@/components/ui/button"
import {
  BCBS_MARKET_RANGE,
  DISTRICT,
  LAST_YEAR_RENEWAL_PCT,
  PACKET_FULLY_INSURED,
  THIS_YEAR_LIKELY_RENEWAL_PCT,
  fullyInsuredCost,
  optionByDeductible,
} from "@/lib/quote-data"
import { NAV } from "@/lib/nav"
import { usd } from "@/lib/money"
import { cn } from "@/lib/utils"

const option150 = optionByDeductible(150_000)
const expected = option150.rows.expected
const maximum = option150.rows.maximum
const great = option150.rows.great
const fiAtLikely = fullyInsuredCost(
  THIS_YEAR_LIKELY_RENEWAL_PCT,
  "packet-is-current",
)
const vsRenewal = expected.totalCaptive - fiAtLikely
const maxVsRenewal = maximum.totalCaptive - fiAtLikely

export default function HomePage() {
  return (
    <div className="space-y-10">
      <header>
        <PageKicker>
          {DISTRICT.shortName} · Effective {DISTRICT.effectiveDateLabel} ·{" "}
          {DISTRICT.contractBasis}
        </PageKicker>
        <PageTitle>
          You are not deciding whether last year&apos;s {LAST_YEAR_RENEWAL_PCT}%
          was a nice year.
        </PageTitle>
        <PageLead>
          Last year&apos;s fully-insured renewal was about {LAST_YEAR_RENEWAL_PCT}
          %. This year the room is talking {BCBS_MARKET_RANGE[0]}–
          {BCBS_MARKET_RANGE[1]}%. The fork is whether Ball-Chatham stays fully
          insured at that kind of hike, or steps into self-funding with a
          ceiling. The Troxell packet&apos;s pretty column is not the decision.
        </PageLead>
      </header>

      <section className="grid gap-3 sm:grid-cols-3">
        <Stat
          label="Packet fully-insured line"
          value={usd(PACKET_FULLY_INSURED)}
          hint="Printed comparison base. First job: is this current premium or the 2027 fully-insured quote?"
        />
        <Stat
          label="Expected self-funding ($150k)"
          value={usd(expected.totalCaptive)}
          hint={`${usd(expected.vsPacketFi)} vs the packet line (${expected.savingsPctVsPacketFi}%). This is the forecast, not a bonus year.`}
          tone="risk"
        />
        <Stat
          label={`Fully insured if +${THIS_YEAR_LIKELY_RENEWAL_PCT}% on that base`}
          value={usd(fiAtLikely)}
          hint={
            vsRenewal < 0
              ? `Expected then wins by ${usd(Math.abs(vsRenewal))}. Maximum still overshoots by ${usd(maxVsRenewal)}.`
              : "Expected still costs more even after the hike."
          }
          tone="save"
        />
      </section>

      <Callout tone="risk" title="Read this before anyone quotes the 23% savings.">
        At Expected claims, the $150,000 option totals {usd(expected.totalCaptive)}
        . That is more than the packet&apos;s {usd(PACKET_FULLY_INSURED)}, not
        less. Great ({usd(great.totalCaptive)}, {great.savingsPctVsPacketFi}% vs
        packet) assumes claims at 70% of expected plus a dividend. If that were
        the honest forecast, Expected would already be lower. Maximum is{" "}
        {usd(maximum.totalCaptive)} — {maximum.savingsPctVsPacketFi}% vs the
        packet line.
      </Callout>

      <Callout tone="gold" title="The comparison that actually matches the meeting.">
        If {usd(PACKET_FULLY_INSURED)} is what you pay now, and fully insured
        renews ~{THIS_YEAR_LIKELY_RENEWAL_PCT}% ({usd(fiAtLikely)}), Expected
        self-funding wins by {usd(Math.abs(vsRenewal))}. You are still buying
        volatility: the Maximum column is {usd(maxVsRenewal)} above that same
        hiked premium. Confirm the $6.41M in writing, then use the Quote lab
        toggle — do not vote on a vibe from “67% of Blue Cross customers.”
      </Callout>

      <div className="flex flex-wrap gap-2">
        <Link
          href="/quote"
          className={cn(buttonVariants({ size: "lg" }), "h-10 px-4")}
        >
          Open the Quote lab
        </Link>
        <Link
          href="/questions"
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "h-10 px-4",
          )}
        >
          Ask the $6.41M question
        </Link>
        <Link
          href="/glossary"
          className={cn(
            buttonVariants({ variant: "ghost", size: "lg" }),
            "h-10 px-4",
          )}
        >
          Plain English first
        </Link>
      </div>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="paper-card rounded-xl p-5">
          <p className="font-mono text-[11px] tracking-widest text-save uppercase">
            The pitch
          </p>
          <h2 className="font-heading mt-1 text-2xl">
            Unbundle the carrier. Keep the surplus. Buy a net.
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
            <li>
              Springfield 186 and the City already self-insure this way. You would
              not be inventing a model.
            </li>
            <li>
              TPA, pharmacy, stop-loss, and network are separate shops, with
              Troxell as the local coordinator (Springfield / Bloomington /
              Washington, Illinois).
            </li>
            <li>
              Pharmacy is where they think the money is: SmithRx, a reprice of{" "}
              {usd(option150.rxSavings)}, and a watchdog (likely Truveris). That
              line is an estimate, not a warranty.
            </li>
            <li>
              Specific stop-loss ~$150k, aggregate as the group ceiling, year-one
              lasers $0, contract 12/15, medical and pharmacy on the catastrophe
              policy — as presented.
            </li>
          </ul>
        </article>
        <article className="paper-card rounded-xl p-5">
          <p className="font-mono text-[11px] tracking-widest text-risk uppercase">
            The risk
          </p>
          <h2 className="font-heading mt-1 text-2xl">
            Expected is not a discount. Network is not a silent swap.
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
            <li>
              If the packet $6.41M already is the 2027 fully-insured number,
              self-funding costs more in a normal year.
            </li>
            <li>
              Blue Cross will not rent its network. This is an SCA + Aetna wrap,
              three tiers, and a new card. 98% local overlap is a claim until you
              see your own doctors on a disruption file.
            </li>
            <li>
              Six of the ten biggest spenders were spouses. Year-one $0 lasers
              does not bind 2028. That is the renewal fight.
            </li>
            <li>
              You can leave later, but December claims still arrive in March.
              Run-out is a real exit cost.
            </li>
          </ul>
        </article>
      </section>

      <section>
        <h2 className="font-heading text-2xl">The rest of the binder</h2>
        <p className="mt-1 mb-4 max-w-2xl text-sm text-muted-foreground">
          Same notebook when the next vendor sits down. Compare and the scratch
          pad live in this browser; the packet math lives in the repo.
        </p>
        <ul className="grid gap-2 sm:grid-cols-2">
          {NAV.filter((item) => item.href !== "/").map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="paper-card block rounded-xl px-4 py-3 transition-colors hover:bg-muted/80"
              >
                <p className="font-heading text-base">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.blurb}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
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
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
        {hint}
      </p>
    </div>
  )
}
