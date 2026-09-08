import { PageKicker, PageLead, PageTitle } from "@/components/callout"
import { RULES_OF_THUMB } from "@/lib/reasoning"

export default function RulesPage() {
  return (
    <div>
      <PageKicker>How to judge any future bid</PageKicker>
      <PageTitle>The next company does not get a clean legal pad. They get this list.</PageTitle>
      <PageLead>
        Same tests whether the logo says Troxell, Blue Cross, or someone who
        has not sat down yet. Compare against this year&apos;s fully-insured
        renewal. Stare at Expected and Maximum. Name every vendor.
      </PageLead>
      <ol className="mt-8 space-y-4">
        {RULES_OF_THUMB.map((rule, i) => (
          <li key={rule.id} id={rule.id} className="paper-card rounded-xl p-4 sm:p-6">
            <p className="font-mono text-[11px] tracking-widest text-gold">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h2 className="font-heading mt-1 text-xl">{rule.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {rule.why}
            </p>
            <p className="mt-3 border-l-2 border-gold pl-3 text-sm leading-relaxed">
              <span className="font-medium">The test. </span>
              {rule.test}
            </p>
          </li>
        ))}
      </ol>
    </div>
  )
}
