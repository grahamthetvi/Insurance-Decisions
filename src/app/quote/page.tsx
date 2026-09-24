import { PageKicker, PageLead, PageTitle } from "@/components/callout"
import { QuoteLab } from "@/components/quote-lab"
import { TroxellIllustration } from "@/components/troxell-illustration"
import { BCBS_DRAFT_QUOTED_INCREASE_PCT } from "@/lib/bcbs-plans"
import {
  BCBS_MARKET_RANGE,
  PACKET_FULLY_INSURED,
  fullyInsuredCost,
  optionByDeductible,
} from "@/lib/quote-data"
import { pct, usd } from "@/lib/money"

const expected = optionByDeductible(150_000).rows.expected
const fiAtDraft = fullyInsuredCost(
  BCBS_DRAFT_QUOTED_INCREASE_PCT,
  "packet-is-current",
)

export default function QuotePage() {
  return (
    <div>
      <PageKicker>Troxell packet · 1/1/2027 · 12/15</PageKicker>
      <PageTitle>Slide the year you actually expect, not the year they led with.</PageTitle>
      <PageLead>
        Printed Expected at a $150,000 specific is {usd(expected.totalCaptive)}
        vs a packet fully-insured line of {usd(PACKET_FULLY_INSURED)}. The
        2027 Blue Cross draft quotes {pct(BCBS_DRAFT_QUOTED_INCREASE_PCT, 1)}.
        If the packet line is current premium, that hike is {usd(fiAtDraft)}.
        The lab opens on that draft percent. Meeting color (
        {BCBS_MARKET_RANGE[0]}–{BCBS_MARKET_RANGE[1]}%) is a separate preset.
        Interpolated points between 70 / 85 / 100 / 120% are from those four
        printed columns, not a new model. Further down, both specific
        deductibles sit next to the fully-insured number you pick here.
      </PageLead>
      <div className="mt-8">
        <QuoteLab />
      </div>
      <div className="mt-12">
        <TroxellIllustration />
      </div>
    </div>
  )
}
