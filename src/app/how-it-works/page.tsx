import { PageKicker, PageLead, PageTitle, Callout } from "@/components/callout"
import { CashFlow } from "@/components/cash-flow"
import { TROXELL_STACK } from "@/lib/quote-data"

export default function HowItWorksPage() {
  return (
    <div>
      <PageKicker>Fully insured vs self-funded</PageKicker>
      <PageTitle>You stop buying a black box. You start buying a machine with a net under it.</PageTitle>
      <PageLead>
        Fully insured is one premium to one carrier who is banker, claims shop,
        pharmacy, and network. Self-funding unbundles those jobs. Springfield
        186 and the City of Springfield already run this shape. The ceiling is
        stop-loss — specific for one catastrophic person, aggregate for a
        terrible group year.
      </PageLead>
      <div className="mt-8">
        <CashFlow />
      </div>
      <section className="mt-12">
        <h2 className="font-heading text-2xl">The seven pieces Troxell is selling</h2>
        <p className="mt-2 mb-6 max-w-2xl text-sm text-muted-foreground">
          Separated vendors is the transparency pitch. It is also more parties
          for HR to herd. Ask who the member actually calls.
        </p>
        <ol className="space-y-3">
          {TROXELL_STACK.map((item) => (
            <li key={item.n} className="paper-card rounded-xl p-4 sm:p-5">
              <p className="font-mono text-[11px] tracking-widest text-gold">
                {item.n}
              </p>
              <h3 className="font-heading mt-1 text-lg">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </li>
          ))}
        </ol>
      </section>
      <Callout className="mt-8" tone="ink" title="What you are not doing">
        You are not adjudicating claims from the board table. You are holding
        the risk between $0 and the stop-loss tripwires, paying people to run
        the plan, and reading reports that a fully-insured carrier would have
        kept. If the reports never get read, you bought complexity for nothing.
      </Callout>
    </div>
  )
}
