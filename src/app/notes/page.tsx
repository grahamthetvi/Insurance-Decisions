import { PageKicker, PageLead, PageTitle, Callout } from "@/components/callout"
import { NotesPad } from "@/components/notes-pad"

export default function NotesPage() {
  return (
    <div>
      <PageKicker>Private working notes</PageKicker>
      <PageTitle>This pad does not go to the board packet unless you copy it there.</PageTitle>
      <PageLead>
        Use it for 186 call notes, a number you do not trust yet, or the
        sentence you want to say next meeting. It saves in this browser only.
        It is not a shared committee drive.
      </PageLead>
      <Callout className="mt-6" tone="ink">
        Packet math belongs in the Quote lab. Vendor structure belongs on
        Compare. This page is for the leftover human part.
      </Callout>
      <div className="mt-8">
        <NotesPad />
      </div>
    </div>
  )
}
