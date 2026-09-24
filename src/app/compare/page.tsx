import { PageKicker, PageLead, PageTitle } from "@/components/callout"
import { CompareLab } from "@/components/compare-lab"
import { BCBS_DRAFT_QUOTED_INCREASE_PCT } from "@/lib/bcbs-plans"
import { pct } from "@/lib/money"
import { STORAGE_KEY } from "@/lib/vendors"

export default function ComparePage() {
  return (
    <div>
      <PageKicker>Troxell now · whoever is next</PageKicker>
      <PageTitle>Put the next brochure on the same page as this one.</PageTitle>
      <PageLead>
        Seeded rows are the Troxell captive and the Blue Cross fully-insured
        sheets (2026 current, 2027 draft quoted {pct(BCBS_DRAFT_QUOTED_INCREASE_PCT, 1)}). Additional companies you type in stay in this browser (
        {STORAGE_KEY}). If an offering should follow every committee member,
        also add it as a seed in the repo. Do not invent a premium to make the
        table look complete. When you hand work to another AI agent, copy the
        JSON at the bottom of this page — that is the shape it should hand back.
      </PageLead>
      <div className="mt-8">
        <CompareLab />
      </div>
    </div>
  )
}
