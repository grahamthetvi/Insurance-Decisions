"use client"

import { useMemo, useState, type FormEvent, type ReactNode } from "react"
import {
  INTAKE_TEMPLATE,
  LASER_LABEL,
  MODEL_LABEL,
  PROVENANCE_LABEL,
  SEED_OFFERINGS,
  STORAGE_KEY,
  normalizeOffering,
  parseOfferingsJson,
  validateOffering,
  type FundingModel,
  type LaserStatus,
  type SourceProvenance,
  type VendorOffering,
} from "@/lib/vendors"
import { usd } from "@/lib/money"
import { useStorageString, writeStorage } from "@/lib/browser-storage"
import { Callout } from "@/components/callout"
import { EmptyState } from "@/components/empty-state"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

const MODELS = Object.keys(MODEL_LABEL) as FundingModel[]
const LASERS = Object.keys(LASER_LABEL) as LaserStatus[]
const PROVENANCES = Object.keys(PROVENANCE_LABEL) as SourceProvenance[]

type Draft = Omit<VendorOffering, "id" | "locked">

function blankDraft(): Draft {
  return {
    ...INTAKE_TEMPLATE,
    pros: [],
    cons: [],
    openQuestions: [],
  }
}

function parseNum(s: string): number | null {
  const t = s.replace(/[$,%\s]/g, "")
  if (!t) return null
  const n = Number(t)
  return Number.isFinite(n) && n >= 0 ? n : null
}

function parseLines(s: string): string[] {
  return s
    .split("\n")
    .map((line) => line.replace(/^[-•\s]+/, "").trim())
    .filter((line) => line.length > 0)
}

function linesToText(list: string[]): string {
  return list.join("\n")
}

function parseCustom(raw: string, blocked: boolean): {
  offerings: VendorOffering[]
  error: string | null
} {
  if (blocked) {
    return {
      offerings: [],
      error:
        "This browser would not let Compare read local storage. Extra companies will not persist.",
    }
  }
  if (!raw) return { offerings: [], error: null }
  try {
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) {
      throw new Error("bad shape")
    }
    const seedIds = new Set(SEED_OFFERINGS.map((s) => s.id))
    const offerings: VendorOffering[] = []
    for (const item of parsed) {
      const row = normalizeOffering(item)
      if (row && !seedIds.has(row.id) && !row.locked) offerings.push(row)
    }
    return { offerings, error: null }
  } catch {
    return {
      offerings: [],
      error:
        "Saved offerings could not be read. They may be corrupted. Reset custom offerings below, or add the company again.",
    }
  }
}

function Field({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-xs tracking-wide text-muted-foreground uppercase">
        {label}
      </span>
      {children}
    </label>
  )
}

function ProConList({
  title,
  items,
  tone,
}: {
  title: string
  items: string[]
  tone: "save" | "risk" | "gold"
}) {
  if (items.length === 0) return null
  return (
    <div>
      <p
        className={cn(
          "font-mono text-[11px] tracking-widest uppercase",
          tone === "save" && "text-save",
          tone === "risk" && "text-risk",
          tone === "gold" && "text-gold",
        )}
      >
        {title}
      </p>
      <ul className="mt-1 list-disc space-y-1 pl-5 text-sm leading-relaxed">
        {items.map((item, i) => (
          <li key={`${title}-${i}`}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

function OfferingCard({ offering }: { offering: VendorOffering }) {
  return (
    <article className="paper-card rounded-xl p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
            {MODEL_LABEL[offering.model]} · {PROVENANCE_LABEL[offering.provenance]}
          </p>
          <h3 className="font-heading mt-1 text-lg">{offering.name}</h3>
          <p className="text-sm text-muted-foreground">{offering.company}</p>
        </div>
        {offering.locked ? (
          <Badge variant="outline">Seeded</Badge>
        ) : (
          <Badge variant="secondary">This browser</Badge>
        )}
      </div>
      {offering.notes ? (
        <p className="mt-3 text-sm leading-relaxed">{offering.notes}</p>
      ) : null}
      <p className="mt-3 text-sm tabular-nums">
        Expected{" "}
        <span className="font-medium">
          {offering.expectedAnnualCost == null ? "—" : usd(offering.expectedAnnualCost)}
        </span>
        {" · "}Maximum{" "}
        <span className="font-medium">
          {offering.maxAnnualCost == null ? "—" : usd(offering.maxAnnualCost)}
        </span>
      </p>
      <div className="mt-3 space-y-3">
        <ProConList title="Why you might pick it" items={offering.pros} tone="save" />
        <ProConList title="Why you might not" items={offering.cons} tone="risk" />
        <ProConList title="Get in writing" items={offering.openQuestions} tone="gold" />
      </div>
      <dl className="mt-3 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
        <div>
          Stop-loss
          <p className="text-foreground">{offering.stopLoss || "—"}</p>
        </div>
        <div>
          Local support
          <p className="text-foreground">{offering.localSupport || "—"}</p>
        </div>
        <div>
          Source
          <p className="text-foreground">
            {PROVENANCE_LABEL[offering.provenance]}
            {offering.sourceDetail ? ` — ${offering.sourceDetail}` : ""}
          </p>
        </div>
        <div>
          Contract
          <p className="text-foreground">
            {[offering.effectiveDate, offering.contractBasis].filter(Boolean).join(" · ") || "—"}
          </p>
        </div>
      </dl>
      {offering.rxDetails || offering.aggregateDetails ? (
        <div className="mt-3 space-y-1 text-xs text-muted-foreground">
          {offering.rxDetails ? <p>Pharmacy: {offering.rxDetails}</p> : null}
          {offering.aggregateDetails ? <p>Aggregate: {offering.aggregateDetails}</p> : null}
        </div>
      ) : null}
    </article>
  )
}

const selectClass =
  "h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"

export function CompareLab() {
  const raw = useStorageString(STORAGE_KEY)
  const blocked = raw === "__blocked__"
  const parsed = useMemo(() => parseCustom(raw, blocked), [raw, blocked])
  const custom = parsed.offerings
  const readError = parsed.error
  const [draft, setDraft] = useState<Draft>(blankDraft)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formError, setFormError] = useState<string | null>(null)
  const [writeError, setWriteError] = useState<string | null>(null)
  const [importText, setImportText] = useState("")
  const [importErrors, setImportErrors] = useState<string[]>([])
  const [importedCount, setImportedCount] = useState<number | null>(null)
  const [copied, setCopied] = useState(false)

  const storageError = writeError ?? readError

  function persist(next: VendorOffering[]) {
    try {
      writeStorage(STORAGE_KEY, JSON.stringify(next))
      setWriteError(null)
    } catch {
      setWriteError(
        "Could not save offerings in this browser. Copy the fields out if you need them on another machine.",
      )
    }
  }

  const offerings = useMemo(
    () => [...SEED_OFFERINGS, ...custom],
    [custom],
  )

  const draftHints = useMemo(
    () =>
      validateOffering({
        ...draft,
        id: editingId ?? "draft",
      }).filter((hint) => hint !== "Name the offering and the company."),
    [draft, editingId],
  )

  function submit(e: FormEvent) {
    e.preventDefault()
    if (!draft.name.trim() || !draft.company.trim()) {
      setFormError("Name the offering and the company. Everything else can be “unknown” until they send a packet.")
      return
    }
    setFormError(null)
    if (editingId) {
      persist(
        custom.map((o) =>
          o.id === editingId ? { ...draft, id: editingId } : o,
        ),
      )
      setEditingId(null)
    } else {
      persist([
        ...custom,
        { ...draft, id: `custom-${crypto.randomUUID()}` },
      ])
    }
    setDraft(blankDraft())
  }

  function edit(o: VendorOffering) {
    setDraft({
      name: o.name,
      company: o.company,
      model: o.model,
      network: o.network,
      pbm: o.pbm,
      tpa: o.tpa,
      stopLoss: o.stopLoss,
      specificDeductible: o.specificDeductible,
      lasers: o.lasers,
      expectedAnnualCost: o.expectedAnnualCost,
      maxAnnualCost: o.maxAnnualCost,
      renewalPct: o.renewalPct,
      localSupport: o.localSupport,
      notes: o.notes,
      pros: [...o.pros],
      cons: [...o.cons],
      openQuestions: [...o.openQuestions],
      provenance: o.provenance,
      sourceDetail: o.sourceDetail,
      effectiveDate: o.effectiveDate,
      contractBasis: o.contractBasis,
      aggregateDetails: o.aggregateDetails,
      rxDetails: o.rxDetails,
    })
    setEditingId(o.id)
    setFormError(null)
  }

  function remove(id: string) {
    persist(custom.filter((o) => o.id !== id))
    if (editingId === id) {
      setEditingId(null)
      setDraft(blankDraft())
    }
  }

  function exportJson(): string {
    return JSON.stringify(custom, null, 2)
  }

  async function copyExport() {
    try {
      await navigator.clipboard.writeText(exportJson())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setWriteError("Copy failed in this browser. Select the JSON below and copy it by hand.")
    }
  }

  function downloadExport() {
    const blob = new Blob([exportJson()], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "vendor-offerings.json"
    a.click()
    URL.revokeObjectURL(url)
  }

  function runImport() {
    const { offerings: incoming, errors } = parseOfferingsJson(importText)
    if (incoming.length === 0) {
      setImportErrors(
        errors.length > 0 ? errors : ["Nothing to import. Paste a JSON array of offerings first."],
      )
      setImportedCount(null)
      return
    }
    const taken = new Set([...SEED_OFFERINGS, ...custom].map((o) => o.id))
    const fresh = incoming.map((o) => {
      if (taken.has(o.id)) {
        const next = { ...o, id: `custom-${crypto.randomUUID()}` }
        taken.add(next.id)
        return next
      }
      taken.add(o.id)
      return o
    })
    persist([...custom, ...fresh])
    setImportErrors(errors)
    setImportedCount(fresh.length)
    setImportText("")
  }

  return (
    <div className="space-y-8">
      {storageError ? (
        <Callout tone="risk" title="This browser could not keep the extra offerings.">
          <p>{storageError}</p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-3"
            onClick={() => persist([])}
          >
            Reset custom offerings
          </Button>
        </Callout>
      ) : null}

      <div className="overflow-x-auto paper-card rounded-xl p-4 sm:p-6">
        <h2 className="font-heading text-xl">Side by side</h2>
        <p className="mt-1 mb-4 max-w-2xl text-sm text-muted-foreground">
          Seeded rows are the packet plus the current fully-insured climate. Extra companies you add stay in this browser under {STORAGE_KEY} until someone writes them into the repo. Costs stay blank until a packet lands — do not invent a premium to fill the table.
        </p>
        <table className="w-full min-w-[880px] text-left text-sm">
          <thead>
            <tr className="border-b text-xs tracking-wide text-muted-foreground uppercase">
              <th className="py-2 pr-3 font-medium">Offering</th>
              <th className="py-2 pr-3 font-medium">Model</th>
              <th className="py-2 pr-3 font-medium">Expected / year</th>
              <th className="py-2 pr-3 font-medium">Maximum / year</th>
              <th className="py-2 pr-3 font-medium">Network / PBM</th>
              <th className="py-2 pr-3 font-medium">Lasers</th>
              <th className="py-2 font-medium" />
            </tr>
          </thead>
          <tbody>
            {offerings.map((o) => (
              <tr key={o.id} className="border-b border-border/70 align-top">
                <td className="py-3 pr-3">
                  <p className="font-medium">{o.name}</p>
                  <p className="text-xs text-muted-foreground">{o.company}</p>
                  {o.locked ? (
                    <Badge variant="outline" className="mt-1">
                      Seeded
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="mt-1">
                      This browser
                    </Badge>
                  )}
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    {PROVENANCE_LABEL[o.provenance]}
                    {o.sourceDetail ? ` · ${o.sourceDetail}` : ""}
                  </p>
                </td>
                <td className="py-3 pr-3">{MODEL_LABEL[o.model]}</td>
                <td className="py-3 pr-3 tabular-nums">
                  {o.expectedAnnualCost == null
                    ? "—"
                    : usd(o.expectedAnnualCost)}
                  {o.renewalPct != null ? (
                    <span className="mt-0.5 block text-xs text-muted-foreground">
                      {o.renewalPct}% quoted increase — not the dollar above
                    </span>
                  ) : null}
                </td>
                <td className="py-3 pr-3 tabular-nums">
                  {o.maxAnnualCost == null ? "—" : usd(o.maxAnnualCost)}
                </td>
                <td className="py-3 pr-3">
                  <p>{o.network || "—"}</p>
                  <p className="text-xs text-muted-foreground">
                    PBM: {o.pbm || "—"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    TPA: {o.tpa || "—"}
                  </p>
                </td>
                <td className="py-3 pr-3">{LASER_LABEL[o.lasers]}</td>
                <td className="py-3">
                  {o.locked ? null : (
                    <div className="flex flex-col items-end gap-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => edit(o)}
                      >
                        Edit
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => remove(o.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {offerings.length === 0 ? (
          <EmptyState className="mt-4" title="No offerings to compare.">
            Something emptied the list. Reload, or add a company below.
          </EmptyState>
        ) : null}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {offerings.map((o) => (
          <OfferingCard key={o.id} offering={o} />
        ))}
      </div>

      {custom.length === 0 ? (
        <EmptyState title="No additional vendor offerings yet.">
          When the next company sits down, put them here — even if you only have
          a name and a model. Numbers can stay blank. For a briefing that
          everyone on the committee should see, also add a seed in{" "}
          <code className="text-foreground">src/lib/vendors.ts</code>.
        </EmptyState>
      ) : null}

      <form
        onSubmit={submit}
        className="paper-card space-y-4 rounded-xl p-4 sm:p-6"
      >
        <div>
          <h2 className="font-heading text-xl">
            {editingId ? "Edit this offering" : "Add a future offering"}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Do not invent premiums. Leave cost fields blank until you have a packet line. Say where each number came from so packet, meeting color, and inference stay distinguishable.
          </p>
        </div>
        {formError ? (
          <Callout tone="risk" title="Need two fields">
            {formError}
          </Callout>
        ) : null}
        {draftHints.length > 0 ? (
          <Callout tone="gold" title="Before you save, consider">
            <ul className="list-disc pl-5">
              {draftHints.map((hint) => (
                <li key={hint}>{hint}</li>
              ))}
            </ul>
          </Callout>
        ) : null}
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Offering name">
            <Input
              value={draft.name}
              onChange={(e) => setDraft({ ...draft, name: e.target.value })}
              placeholder="e.g. Level-funded quote from X"
              className="bg-background"
            />
          </Field>
          <Field label="Company">
            <Input
              value={draft.company}
              onChange={(e) => setDraft({ ...draft, company: e.target.value })}
              placeholder="Who sat at the table"
              className="bg-background"
            />
          </Field>
          <Field label="Funding model">
            <select
              className={cn(selectClass, "bg-background")}
              value={draft.model}
              onChange={(e) =>
                setDraft({ ...draft, model: e.target.value as FundingModel })
              }
            >
              {MODELS.map((m) => (
                <option key={m} value={m}>
                  {MODEL_LABEL[m]}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Lasers">
            <select
              className={cn(selectClass, "bg-background")}
              value={draft.lasers}
              onChange={(e) =>
                setDraft({ ...draft, lasers: e.target.value as LaserStatus })
              }
            >
              {LASERS.map((m) => (
                <option key={m} value={m}>
                  {LASER_LABEL[m]}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Network">
            <Input
              value={draft.network}
              onChange={(e) => setDraft({ ...draft, network: e.target.value })}
              className="bg-background"
            />
          </Field>
          <Field label="PBM">
            <Input
              value={draft.pbm}
              onChange={(e) => setDraft({ ...draft, pbm: e.target.value })}
              className="bg-background"
            />
          </Field>
          <Field label="TPA">
            <Input
              value={draft.tpa}
              onChange={(e) => setDraft({ ...draft, tpa: e.target.value })}
              className="bg-background"
            />
          </Field>
          <Field label="Stop-loss">
            <Input
              value={draft.stopLoss}
              onChange={(e) => setDraft({ ...draft, stopLoss: e.target.value })}
              className="bg-background"
            />
          </Field>
          <Field label="Specific deductible ($)">
            <Input
              value={draft.specificDeductible ?? ""}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  specificDeductible: parseNum(e.target.value),
                })
              }
              inputMode="numeric"
              className="bg-background"
            />
          </Field>
          <Field label="Stated renewal %">
            <Input
              value={draft.renewalPct ?? ""}
              onChange={(e) =>
                setDraft({ ...draft, renewalPct: parseNum(e.target.value) })
              }
              inputMode="decimal"
              className="bg-background"
            />
          </Field>
          <Field label="Expected annual cost ($)">
            <Input
              value={draft.expectedAnnualCost ?? ""}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  expectedAnnualCost: parseNum(e.target.value),
                })
              }
              inputMode="decimal"
              className="bg-background"
            />
          </Field>
          <Field label="Maximum annual cost ($)">
            <Input
              value={draft.maxAnnualCost ?? ""}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  maxAnnualCost: parseNum(e.target.value),
                })
              }
              inputMode="decimal"
              className="bg-background"
            />
          </Field>
          <Field label="Local support">
            <Input
              value={draft.localSupport}
              onChange={(e) =>
                setDraft({ ...draft, localSupport: e.target.value })
              }
              className="bg-background"
            />
          </Field>
          <Field label="Where did the numbers come from">
            <select
              className={cn(selectClass, "bg-background")}
              value={draft.provenance}
              onChange={(e) =>
                setDraft({ ...draft, provenance: e.target.value as SourceProvenance })
              }
            >
              {PROVENANCES.map((p) => (
                <option key={p} value={p}>
                  {PROVENANCE_LABEL[p]}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Source line (packet date/page, or who said it)">
            <Input
              value={draft.sourceDetail}
              onChange={(e) =>
                setDraft({ ...draft, sourceDetail: e.target.value })
              }
              placeholder="e.g. Packet p.3, 1/1/2027; renewal % is meeting color"
              className="bg-background"
            />
          </Field>
          <Field label="Effective date">
            <Input
              value={draft.effectiveDate}
              onChange={(e) =>
                setDraft({ ...draft, effectiveDate: e.target.value })
              }
              placeholder="e.g. 1/1/2027"
              className="bg-background"
            />
          </Field>
          <Field label="Contract basis">
            <Input
              value={draft.contractBasis}
              onChange={(e) =>
                setDraft({ ...draft, contractBasis: e.target.value })
              }
              placeholder="e.g. 12/15 — confirm on the specimen"
              className="bg-background"
            />
          </Field>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <Field label="Why you might pick it (one per line)">
            <Textarea
              value={linesToText(draft.pros)}
              onChange={(e) => setDraft({ ...draft, pros: parseLines(e.target.value) })}
              placeholder={"One plain sentence per line.\nLeave blank until you know."}
              className="min-h-24 bg-background"
            />
          </Field>
          <Field label="Why you might not (one per line)">
            <Textarea
              value={linesToText(draft.cons)}
              onChange={(e) => setDraft({ ...draft, cons: parseLines(e.target.value) })}
              placeholder={"One plain sentence per line.\nName the risk, not the vibe."}
              className="min-h-24 bg-background"
            />
          </Field>
          <Field label="Get in writing (one per line)">
            <Textarea
              value={linesToText(draft.openQuestions)}
              onChange={(e) =>
                setDraft({ ...draft, openQuestions: parseLines(e.target.value) })
              }
              placeholder={"What would you need before a vote?\nOne question per line."}
              className="min-h-24 bg-background"
            />
          </Field>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Aggregate details">
            <Textarea
              value={draft.aggregateDetails}
              onChange={(e) =>
                setDraft({ ...draft, aggregateDetails: e.target.value })
              }
              placeholder="Attachment level, what it covers, what confirms it."
              className="min-h-20 bg-background"
            />
          </Field>
          <Field label="Pharmacy details">
            <Textarea
              value={draft.rxDetails}
              onChange={(e) => setDraft({ ...draft, rxDetails: e.target.value })}
              placeholder="Reprice size, rebate pass-through, watchdog fee in or extra."
              className="min-h-20 bg-background"
            />
          </Field>
        </div>
        <Field label="Notes (source the numbers)">
          <Textarea
            value={draft.notes}
            onChange={(e) => setDraft({ ...draft, notes: e.target.value })}
            placeholder="Packet date, who said it, what is still unconfirmed."
            className="min-h-24 bg-background"
          />
        </Field>
        <div className="flex flex-wrap gap-2">
          <Button type="submit">
            {editingId ? "Save changes" : "Add to this browser"}
          </Button>
          {editingId ? (
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setEditingId(null)
                setDraft(blankDraft())
                setFormError(null)
              }}
            >
              Cancel edit
            </Button>
          ) : null}
        </div>
      </form>

      <div className="paper-card space-y-4 rounded-xl p-4 sm:p-6">
        <div>
          <h2 className="font-heading text-xl">Move offerings between browsers or agents</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Copy this browser&apos;s extra offerings as JSON and hand them to the next AI agent — or paste JSON an agent prepared back in. Seeded rows are not included; they already live in{" "}
            <code className="text-foreground">src/lib/vendors.ts</code>. Bad rows are skipped and reported, never silently saved.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="outline" size="sm" onClick={copyExport} disabled={custom.length === 0}>
            {copied ? "Copied" : "Copy JSON"}
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={downloadExport} disabled={custom.length === 0}>
            Download JSON
          </Button>
        </div>
        {custom.length > 0 ? (
          <pre className="max-h-48 overflow-auto rounded-lg bg-background p-3 font-mono text-[11px] leading-relaxed">
            {exportJson()}
          </pre>
        ) : (
          <p className="text-sm text-muted-foreground">
            Nothing to export yet — add an offering above and its JSON will appear here.
          </p>
        )}
        <Field label="Paste offerings JSON (array) to import">
          <Textarea
            value={importText}
            onChange={(e) => {
              setImportText(e.target.value)
              setImportErrors([])
              setImportedCount(null)
            }}
            placeholder='[{"id": "acme-2028", "name": "…", "company": "…", "model": "level-funded", …}]'
            className="min-h-28 bg-background font-mono text-xs"
          />
        </Field>
        <div className="flex flex-wrap items-center gap-2">
          <Button type="button" size="sm" onClick={runImport} disabled={!importText.trim()}>
            Import JSON
          </Button>
          {importedCount != null ? (
            <p className="text-sm text-save">Imported {importedCount} offering{importedCount === 1 ? "" : "s"}.</p>
          ) : null}
        </div>
        {importErrors.length > 0 ? (
          <Callout tone="risk" title="Import notes">
            <ul className="list-disc pl-5">
              {importErrors.map((err) => (
                <li key={err}>{err}</li>
              ))}
            </ul>
          </Callout>
        ) : null}
      </div>
    </div>
  )
}
