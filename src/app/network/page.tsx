import Link from "next/link"
import { PageKicker, PageLead, PageTitle, Callout } from "@/components/callout"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const TIERS = [
  {
    n: "Tier 1",
    name: "Springfield Clinic Advantage (SCA)",
    pay: "Best benefits, deepest discounts — if the member actually uses Springfield Clinic.",
    body: "The hometown steerage. You heard “Advance”; same idea. Springfield Clinic built this after years of friction with Blue Cross. Members already in that clinic will feel it as a raise. Members whose cardiologist is elsewhere will feel a worse copay for staying put.",
  },
  {
    n: "Tier 2",
    name: "Aetna wrap — in-network",
    pay: "Standard PPO: still contracted, still no in-network balance bill, richer than out-of-network.",
    body: "Aetna sits around SCA so the card still works at college, for snowbirds, and at Barnes-Jewish in St. Louis. Troxell said Aetna currently has the best pricing among Aetna / Cigna / UMR. Blue Cross Illinois generally will not rent its network to an outside TPA, which is why this is not “keep the Blue card, change the bank.”",
  },
  {
    n: "Tier 3",
    name: "Out of network",
    pay: "Worst cost share. This is where leftover provider bills live.",
    body: "“No balance billing” in the meeting is almost certainly the in-network promise, plus whatever the federal surprise-billing rules already ban in emergencies. It is not a shield for someone who picks an out-of-network specialist in Chicago. Get the sentence in writing for the open-enrollment FAQ.",
  },
]

export default function NetworkPage() {
  return (
    <div className="space-y-8">
      <header>
        <PageKicker>Doctors, clinics, and the new card</PageKicker>
        <PageTitle>Cost is a district problem. Network is a staff problem.</PageTitle>
        <PageLead>
          Three tiers: SCA preferred, Aetna in-network wrap, then out-of-network.
          They claimed ~98% of local providers sit in all of these, everyone at
          Springfield Clinic, Barnes-Jewish via the wrap. That can be true and
          still blow up open enrollment if one oncologist or Memorial / HSHS /
          SIU relationship is the exception.
        </PageLead>
      </header>

      <div className="grid gap-3 lg:grid-cols-3">
        {TIERS.map((tier) => (
          <article key={tier.n} className="paper-card rounded-xl p-4 sm:p-5">
            <p className="font-mono text-[11px] tracking-widest text-gold uppercase">
              {tier.n}
            </p>
            <h2 className="font-heading mt-1 text-xl">{tier.name}</h2>
            <p className="mt-2 text-sm font-medium leading-relaxed">{tier.pay}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {tier.body}
            </p>
          </article>
        ))}
      </div>

      <Callout tone="gold" title="The network name has changed since the meeting.">
        The meeting described Springfield Clinic Advantage plus an Aetna wrap.
        The Troxell employee sheet still prints Blue Cross in the carrier row.
        That row is wrong. The network for this option is Health Link. Consociate
        Health, a TPA in Decatur, is the firm to confirm: HealthLink lists
        Consociate Group, and Consociate lists HealthLink. Neither name is on
        the Ball-Chatham sheet.
      </Callout>

      <Callout tone="risk" title="Do not skip the disruption file.">
        98% overlap is a marketing average. Run last year’s providers — PCPs,
        specialists, Memorial, HSHS, SIU, Barnes-Jewish — against SCA + Aetna.
        Count unique members who would change tier, not just unique tax IDs.
        Then talk to 186 employees, not only 186 HR.
      </Callout>

      <section className="paper-card rounded-xl p-5">
        <h2 className="font-heading text-xl">Why this is not a silent back-office change</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
          <li>
            New ID cards, new prior-auth habits, new pharmacy counter. The TPA
            800 number is who staff will swear at in January.
          </li>
          <li>
            Steerage only works if the benefit gap is real and Springfield Clinic
            has capacity. Ask for the copay grid vs today’s plan — PCP,
            specialist, ER, family out-of-pocket max.
          </li>
          <li>
            In-network doctors have a contract: they cannot bill beyond
            copay/coinsurance. Out-of-network often can. Print that in the FAQ
            before someone hears “you will never get an extra bill.”
          </li>
        </ul>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href="/questions"
            className={cn(buttonVariants({ variant: "outline" }), "h-9 px-3")}
          >
            Disruption questions
          </Link>
          <Link
            href="/glossary"
            className={cn(buttonVariants({ variant: "ghost" }), "h-9 px-3")}
          >
            Wrap, rental, balance billing
          </Link>
        </div>
      </section>
    </div>
  )
}
