import { PageKicker, PageLead, PageTitle } from "@/components/callout"
import { QuoteLab } from "@/components/quote-lab"
import {
  PACKET_FULLY_INSURED,
  THIS_YEAR_LIKELY_RENEWAL_PCT,
  fullyInsuredCost,
  optionByDeductible,
} from "@/lib/quote-data"
import { usd } from "@/lib/money"

const expected = optionByDeductible(150_000).rows.expected
const fiAtLikely = fullyInsuredCost(
  THIS_YEAR_LIKELY_RENEWAL_PCT,
  "packet-is-current",
)

export default function QuotePage() {
  return (
    <div>
      <PageKicker>Troxell packet · 1/1/2027 · 12/15</PageKicker>
      <PageTitle>Slide the year you actually expect, not the year they led with.</PageTitle>
      <PageLead>
        Printed Expected at a $150,000 specific is {usd(expected.totalCaptive)}
        vs a packet fully-insured line of {usd(PACKET_FULLY_INSURED)}. A{" "}
        {THIS_YEAR_LIKELY_RENEWAL_PCT}% hike on that base is {usd(fiAtLikely)}.
        Use the toggle: is $6.41M current premium, or already the 2027
        fully-insured quote? Interpolated points between 70 / 85 / 100 / 120%
        are from those four printed columns, not a new model.
      </PageLead>
      <div className="mt-8">
        <QuoteLab />
      </div>
    </div>
  )
}
