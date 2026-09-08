"use client"

import { useMemo, useState, type FormEvent, type ReactNode } from "react"
import {
  LASER_LABEL,
  MODEL_LABEL,
  SEED_OFFERINGS,
  STORAGE_KEY,
  type FundingModel,
  type LaserStatus,
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

type Draft = Omit<VendorOffering, "id" | "locked">

function blankDraft(): Draft {
  return {
    name: "",
    company: "",
    model: "unknown",
    network: "",
    pbm: "",
    tpa: "",
    stopLoss: "",
    specificDeductible: null,
    lasers: "unknown",
    expectedAnnualCost: null,
    maxAnnualCost: null,
    renewalPct: null,
    localSupport: "",
    notes: "",
  }
}

function parseNum(s: string): number | null {
  const t = s.replace(/[$,%\s]/g, "")
  if (!t) return null
  const n = Number(t)
  return Number.isFinite(n) ? n : null
}

function isOffering(value: unknown): value is VendorOffering {
  if (!value || typeof value !== "object") return false
  const o = value as Record<string, unknown>
  return typeof o.id === "string" && typeof o.name === "string"
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
    if (!Array.isArray(parsed) || !parsed.every(isOffering)) {
      throw new Error("bad shape")
    }
    const seedIds = new Set(SEED_OFFERINGS.map((s) => s.id))
    return {
      offerings: parsed.filter((o) => !seedIds.has(o.id) && !o.locked),
      error: null,
    }
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
          Seeded rows are the packet plus the current fully-insured climate. Extra companies you add stay in this browser under {STORAGE_KEY} until someone writes them into the repo.
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
                </td>
                <td className="py-3 pr-3">{MODEL_LABEL[o.model]}</td>
                <td className="py-3 pr-3 tabular-nums">
                  {o.expectedAnnualCost == null
                    ? "—"
                    : usd(o.expectedAnnualCost)}
                  {o.renewalPct != null ? (
                    <span className="mt-0.5 block text-xs text-muted-foreground">
                      ~{o.renewalPct}% renewal climate
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
        {SEED_OFFERINGS.map((o) => (
          <article key={o.id} className="paper-card rounded-xl p-4 sm:p-5">
            <p className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
              {MODEL_LABEL[o.model]}
            </p>
            <h3 className="font-heading mt-1 text-lg">{o.name}</h3>
            <p className="text-sm text-muted-foreground">{o.company}</p>
            <p className="mt-3 text-sm leading-relaxed">{o.notes}</p>
            <dl className="mt-3 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
              <div>
                Stop-loss
                <p className="text-foreground">{o.stopLoss}</p>
              </div>
              <div>
                Local support
                <p className="text-foreground">{o.localSupport}</p>
              </div>
            </dl>
          </article>
        ))}
      </div>

      {custom.length === 0 ? (
        <EmptyState title="No additional vendor offerings yet.">
          When the next company sits down, put them here — even if you only have
          a name and a model. Numbers can stay blank. For a briefing that
          everyone on the committee should see, also add a seed in{" "}
          <code className="text-foreground">src/lib/vendors.ts</code>.
        </EmptyState>
      ) : (
        <ul className="space-y-3">
          {custom.map((o) => (
            <li key={o.id} className="paper-card rounded-xl p-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-heading text-lg">{o.name}</p>
                  <p className="text-sm text-muted-foreground">{o.company}</p>
                </div>
                <Badge variant="outline">{MODEL_LABEL[o.model]}</Badge>
              </div>
              {o.notes ? (
                <p className="mt-2 text-sm leading-relaxed">{o.notes}</p>
              ) : (
                <p className="mt-2 text-sm text-muted-foreground">
                  No notes yet.
                </p>
              )}
            </li>
          ))}
        </ul>
      )}

      <form
        onSubmit={submit}
        className="paper-card space-y-4 rounded-xl p-4 sm:p-6"
      >
        <div>
          <h2 className="font-heading text-xl">
            {editingId ? "Edit this offering" : "Add a future offering"}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Do not invent premiums. Leave cost fields blank until you have a packet line.
          </p>
        </div>
        {formError ? (
          <Callout tone="risk" title="Need two fields">
            {formError}
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
    </div>
  )
}
