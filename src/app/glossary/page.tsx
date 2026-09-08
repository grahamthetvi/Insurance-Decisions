import { PageKicker, PageLead, PageTitle } from "@/components/callout"
import { GlossarySearch } from "@/components/glossary-search"

export default function GlossaryPage() {
  return (
    <div>
      <PageKicker>Plain English</PageKicker>
      <PageTitle>The words from the room, without pretending you grew up in stop-loss.</PageTitle>
      <PageLead>
        Phonetic guesses stay labeled. “Arraget” is almost certainly aggregate.
        “Truevarous” is almost certainly Truveris. Neither is confirmed until
        someone spells it on a contract. Packet numbers and meeting color are
        different kinds of fact — the entries say which.
      </PageLead>
      <div className="mt-8">
        <GlossarySearch />
      </div>
    </div>
  )
}
