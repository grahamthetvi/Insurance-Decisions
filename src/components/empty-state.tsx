import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export function EmptyState({
  title,
  children,
  className,
}: {
  title: string
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-dashed border-foreground/20 bg-card/60 px-5 py-8 text-center",
        className,
      )}
    >
      <p className="font-heading text-lg">{title}</p>
      <div className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
        {children}
      </div>
    </div>
  )
}
