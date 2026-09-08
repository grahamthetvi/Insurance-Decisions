"use client"

import { PageKicker, PageLead, PageTitle, Callout } from "@/components/callout"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { MEETING } from "@/lib/meeting-notes"

export default function MeetingPage() {
  return (
    <div>
      <PageKicker>{MEETING.district}</PageKicker>
      <PageTitle>{MEETING.title}</PageTitle>
      <PageLead>{MEETING.posture}</PageLead>
      <Callout className="mt-6" tone="ink" title="How to read these">
        Working notes, not minutes. If a bullet sounds like a promise
        (covers pharmacy, no lasers, 98% of providers), treat it as something
        said in the room until it is on a specimen policy or a disruption file.
      </Callout>
      <Accordion multiple className="mt-8" defaultValue={["climate", "numbers"]}>
        {MEETING.blocks.map((block) => (
          <AccordionItem key={block.id} value={block.id} className="border-b">
            <AccordionTrigger className="py-4 text-left hover:no-underline">
              <span className="pr-4">
                <span className="font-heading block text-lg font-normal">
                  {block.heading}
                </span>
                <span className="mt-1 block text-sm font-normal text-muted-foreground">
                  {block.gist}
                </span>
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
                {block.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              {block.watchFor ? (
                <p className="mt-3 border-l-2 border-gold pl-3 text-sm">
                  <span className="font-medium">Watch for. </span>
                  {block.watchFor}
                </p>
              ) : null}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
