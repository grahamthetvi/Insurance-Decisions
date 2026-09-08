import { ArrowDown, ArrowRight } from "lucide-react"

export function CashFlow() {
  return (
    <div className="space-y-10">
      <section>
        <h2 className="font-heading text-2xl">Fully insured — one fat check</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          The district buys a year of certainty. Blue Cross (or whoever) keeps the surplus if staff are healthy, and eats the loss if they are not. Next year&apos;s premium is their opinion of both your claims and their whole book.
        </p>
        <div className="mt-5 grid items-center gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
          <FlowCard
            title="District"
            body="Pays premium. Last year that renewal was ~3%. This year the room is talking ~20%."
          />
          <Arrow />
          <FlowCard
            title="Carrier"
            body="Pays claims, runs the network, runs the PBM, keeps whatever is left. You do not see the guts."
            accent
          />
          <Arrow />
          <FlowCard
            title="Doctors & pharmacies"
            body="Billed at the carrier's contracted rates. Member uses the Blue card."
          />
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Budget: known. Surplus: theirs. Catastrophe: theirs, then they reprice you.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-2xl">Self-funded captive — several thinner checks</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          You are not writing medical checks from the superintendent&apos;s desk. A TPA does that. You are on the hook for the claims between $0 and the stop-loss tripwires, plus the fees to run the machine.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <FlowCard
            title="Claims fund"
            body="The real bill. In the packet, Expected is about $5.8M of plan-paid claims at the $150k specific."
          />
          <FlowCard
            title="Stop-loss"
            body="Two policies. Specific: one person over $150k/$175k. Aggregate: the whole year over ~120%. Covers medical and pharmacy, they said."
            accent
          />
          <FlowCard
            title="Admin + TPA"
            body="$436,320 in every column. ID cards, 800 number, paying the bills. 186's brag is 98% paid in 30 days."
          />
          <FlowCard
            title="Pharmacy (SmithRx)"
            body="Carved out. The ($312,760) line is last year's scripts repriced. Watchdog (likely Truveris) sits on this, not on medical."
          />
        </div>
        <div className="mt-4 flex items-start gap-3 text-sm">
          <ArrowDown className="mt-0.5 size-4 shrink-0 text-gold" />
          <p className="text-muted-foreground">
            Good year: surplus stays or comes back as a loss-fund dividend. Bad year: you pay up to the Maximum column, then aggregate stop-loss is supposed to take over. Catastrophe on one person: specific stop-loss.
          </p>
        </div>
      </section>

      <section className="paper-card rounded-xl p-5">
        <h2 className="font-heading text-xl">The $150,000 in one picture</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          One employee or spouse has a catastrophic year. This is specific stop-loss, not aggregate.
        </p>
        <div className="mt-5">
          <div className="flex h-12 overflow-hidden rounded-lg text-xs font-medium text-white sm:text-sm">
            <div className="flex w-[28%] items-center justify-center bg-primary">
              Plan pays first $150k
            </div>
            <div className="flex flex-1 items-center justify-center bg-save">
              Stop-loss pays the rest (e.g. $250k of a $400k case)
            </div>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Raise the deductible to $175k and that first brick gets thicker, the premium gets cheaper, and the Expected total barely moves in this packet. Lasers, if they appear next year, make that first brick thicker for one named person only.
          </p>
        </div>
      </section>
    </div>
  )
}

function Arrow() {
  return (
    <div className="hidden justify-center md:flex">
      <ArrowRight className="size-5 text-gold" />
    </div>
  )
}

function FlowCard({
  title,
  body,
  accent,
}: {
  title: string
  body: string
  accent?: boolean
}) {
  return (
    <div
      className={
        accent
          ? "rounded-xl border border-gold/40 bg-gold/10 p-4"
          : "paper-card rounded-xl p-4"
      }
    >
      <p className="font-heading text-base">{title}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </div>
  )
}
