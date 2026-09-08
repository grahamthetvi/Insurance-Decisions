"use client"

import { useState } from "react"
import { NOTES_KEY } from "@/lib/vendors"
import { useStorageString, writeStorage } from "@/lib/browser-storage"
import { Callout } from "@/components/callout"
import { EmptyState } from "@/components/empty-state"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

const STARTER = `Working notes (this browser only)

- Who I still need to call:
- What I still do not believe:
- What I would need in writing before a vote:
`

export function NotesPad() {
  const stored = useStorageString(NOTES_KEY)
  const blocked = stored === "__blocked__"
  const text = blocked ? "" : stored
  const [writeError, setWriteError] = useState<string | null>(null)
  const [savedAt, setSavedAt] = useState<string | null>(null)

  function persist(next: string) {
    try {
      writeStorage(NOTES_KEY, next)
      setSavedAt(new Date().toLocaleTimeString())
      setWriteError(null)
    } catch {
      setWriteError(
        "Could not save. Private mode, blocked storage, or a full disk will do this. Copy the text out if it matters.",
      )
    }
  }

  const empty = text.trim().length === 0
  const error =
    writeError ??
    (blocked
      ? "This browser would not let the scratch pad read local storage."
      : null)

  return (
    <div className="space-y-4">
      {error ? (
        <Callout tone="risk" title="Storage problem">
          {error}
        </Callout>
      ) : null}

      {empty ? (
        <EmptyState title="Nothing in this browser yet.">
          These notes never go to a server. They live on this device, under{" "}
          <code className="text-foreground">{NOTES_KEY}</code>. Use this for
          186 call notes, a hallway conversation, or the sentence you want to
          say at the next meeting.
        </EmptyState>
      ) : null}

      <div className="paper-card rounded-xl p-4 sm:p-5">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <p className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
            Scratch pad
          </p>
          <p className="text-xs text-muted-foreground">
            {savedAt ? `Saved ${savedAt}` : "Autosaves as you type"}
          </p>
        </div>
        <Textarea
          value={text}
          onChange={(e) => persist(e.target.value)}
          placeholder="Type here. This stays in this browser."
          className="min-h-[280px] bg-background font-sans text-base leading-relaxed"
        />
        <div className="mt-3 flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => persist(empty ? STARTER : text)}
            disabled={!empty || blocked}
          >
            Insert a starter outline
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => persist("")}
            disabled={empty || blocked}
          >
            Clear
          </Button>
        </div>
      </div>
    </div>
  )
}
