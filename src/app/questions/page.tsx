import { PageKicker, PageLead, PageTitle, Callout } from "@/components/callout"
import { CALL_186, QUESTIONS } from "@/lib/questions"

export default function QuestionsPage() {
  return (
    <div className="space-y-10">
      <header>
        <PageKicker>Before anyone votes</PageKicker>
        <PageTitle>Ask for paper. Market color is not Ball-Chatham&apos;s number.</PageTitle>
        <PageLead>
          Start with whether $6,410,422 is current premium or the 2027
          fully-insured quote. Everything else in the packet is a percentage
          versus that line. Then get the real renewal letter on the same census.
        </PageLead>
      </header>

      <ol className="space-y-4">
        {QUESTIONS.map((q, i) => (
          <li key={q.id} id={q.id} className="paper-card scroll-mt-24 rounded-xl p-4 sm:p-6">
            <p className="font-mono text-[11px] tracking-widest text-gold">
              {String(i + 1).padStart(2, "0")} · Ask {q.to}
            </p>
            <h2 className="font-heading mt-2 text-xl">{q.ask}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              <span className="font-medium text-foreground">Why. </span>
              {q.because}
            </p>
            <p className="mt-2 text-sm leading-relaxed">
              <span className="font-medium">A good answer looks like: </span>
              {q.goodAnswerLooksLike}
            </p>
          </li>
        ))}
      </ol>

      <section>
        <h2 className="font-heading text-2xl">When you actually call 186</h2>
        <p className="mt-2 mb-4 max-w-2xl text-sm text-muted-foreground">
          The presenter told you to talk to employees, not the consultant. Three
          unscripted conversations beat one glowing email. Park notes in the
          scratch pad.
        </p>
        <Callout tone="gold" title="Do not interview HR only.">
          A nurse, a bus driver, and a building secretary will tell you whether
          the ID card worked in week one.
        </Callout>
        <ul className="mt-4 space-y-2">
          {CALL_186.map((line) => (
            <li
              key={line}
              className="paper-card rounded-xl px-4 py-3 text-sm leading-relaxed"
            >
              {line}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
