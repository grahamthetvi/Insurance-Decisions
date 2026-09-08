import { PageKicker, PageLead, PageTitle } from "@/components/callout"
import { CompareLab } from "@/components/compare-lab"
import { STORAGE_KEY } from "@/lib/vendors"

export default function ComparePage() {
  return (
    <div>
      <PageKicker>Troxell now · whoever is next</PageKicker>
      <PageTitle>Put the next brochure on the same page as this one.</PageTitle>
      <PageLead>
        Seeded rows are the Troxell captive and the current fully-insured
        climate. Additional companies you type in stay in this browser (
        {STORAGE_KEY}). If an offering should follow every committee member,
        also add it as a seed in the repo. Do not invent a premium to make the
        table look complete.
      </PageLead>
      <div className="mt-8">
        <CompareLab />
      </div>
    </div>
  )
}
