import { cn } from "@/lib/utils"

export function Callout({
  tone = "ink",
  title,
  children,
  className,
}: {
  tone?: "ink" | "save" | "risk" | "gold"
  title?: string
  children: React.ReactNode
  className?: string
}) {
  const tones = {
    ink: "border-foreground/15 bg-card",
    save: "border-save/25 bg-save/8",
    risk: "border-risk/25 bg-risk/8",
    gold: "border-gold/40 bg-gold/10",
  }
  return (
    <aside
      className={cn(
        "rounded-xl border px-4 py-3.5 text-sm leading-relaxed",
        tones[tone],
        className,
      )}
    >
      {title ? (
        <p className="font-heading mb-1 text-base font-medium">{title}</p>
      ) : null}
      <div className="text-foreground/85">{children}</div>
    </aside>
  )
}

export function PageKicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[11px] tracking-[0.2em] text-primary uppercase">
      {children}
    </p>
  )
}

export function PageTitle({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="font-heading mt-2 max-w-3xl text-3xl leading-tight tracking-tight text-balance sm:text-4xl">
      {children}
    </h1>
  )
}

export function PageLead({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
      {children}
    </p>
  )
}
