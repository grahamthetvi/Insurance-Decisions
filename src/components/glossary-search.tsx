"use client"

import { useMemo, useState } from "react"
import { GLOSSARY, type GlossaryEntry } from "@/lib/glossary"
import { EmptyState } from "@/components/empty-state"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const TAGS = Array.from(new Set(GLOSSARY.flatMap((e) => e.tags))).sort()

function matches(entry: GlossaryEntry, q: string, tag: string | null) {
  if (tag && !entry.tags.includes(tag)) return false
  if (!q) return true
  const hay = [
    entry.term,
    entry.oneLiner,
    entry.body,
    entry.whyItMatters,
    ...(entry.alsoHeardAs ?? []),
    ...entry.tags,
  ]
    .join(" ")
    .toLowerCase()
  return hay.includes(q)
}

export function GlossarySearch() {
  const [query, setQuery] = useState("")
  const [tag, setTag] = useState<string | null>(null)
  const q = query.trim().toLowerCase()

  const results = useMemo(
    () => GLOSSARY.filter((e) => matches(e, q, tag)),
    [q, tag],
  )

  return (
    <div className="space-y-6">
      <div className="paper-card rounded-xl p-4 sm:p-5">
        <label htmlFor="glossary-q" className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
          Find a term
        </label>
        <Input
          id="glossary-q"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="laser, aggregate, wrap, 12/15, PBM…"
          className="mt-2 h-10 bg-background text-base"
        />
        <div className="mt-3 flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setTag(null)}
            className={cn(
              "rounded-full border px-2.5 py-0.5 text-xs",
              tag === null
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border hover:bg-muted",
            )}
          >
            All
          </button>
          {TAGS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTag((cur) => (cur === t ? null : t))}
              className={cn(
                "rounded-full border px-2.5 py-0.5 text-xs capitalize",
                tag === t
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border hover:bg-muted",
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {results.length === 0 ? (
        <EmptyState title="No terms match that search.">
          Try <span className="text-foreground">laser</span>,{" "}
          <span className="text-foreground">aggregate</span>,{" "}
          <span className="text-foreground">wrap</span>, or{" "}
          <span className="text-foreground">PBM</span>. Spelling in the room was
          messy on purpose — “arraget” and “Truevarous” are in here as also-heard-as.
        </EmptyState>
      ) : (
        <ul className="space-y-4">
          {results.map((entry) => (
            <li
              key={entry.id}
              id={entry.id}
              className="paper-card scroll-mt-24 rounded-xl p-4 sm:p-6"
            >
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h2 className="font-heading text-xl">{entry.term}</h2>
                {entry.alsoHeardAs?.length ? (
                  <p className="text-xs text-muted-foreground">
                    Also heard as: {entry.alsoHeardAs.join(" · ")}
                  </p>
                ) : null}
              </div>
              <p className="mt-2 text-base leading-relaxed">{entry.oneLiner}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {entry.body}
              </p>
              <p className="mt-3 border-l-2 border-gold pl-3 text-sm leading-relaxed">
                <span className="font-medium text-foreground">Why it matters. </span>
                {entry.whyItMatters}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {entry.tags.map((t) => (
                  <Badge key={t} variant="outline" className="capitalize">
                    {t}
                  </Badge>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
