"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { NAV } from "@/lib/nav"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()
  return (
    <nav className="flex flex-col gap-1">
      {NAV.map((item, i) => {
        const active =
          item.href === "/"
            ? pathname === "/"
            : pathname === item.href || pathname.startsWith(`${item.href}/`)
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "group rounded-lg px-3 py-2.5 text-left transition-colors",
              active
                ? "bg-sidebar-accent text-sidebar-foreground"
                : "text-sidebar-foreground/75 hover:bg-sidebar-accent/70 hover:text-sidebar-foreground",
            )}
          >
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-[10px] tracking-widest text-gold">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-heading text-[15px] leading-tight">
                {item.label}
              </span>
            </div>
            <p className="mt-0.5 pl-7 text-xs text-sidebar-foreground/55 group-hover:text-sidebar-foreground/70">
              {item.blurb}
            </p>
          </Link>
        )
      })}
    </nav>
  )
}

function Brand() {
  return (
    <Link href="/" className="block px-3 pb-5 pt-1">
      <p className="font-mono text-[10px] tracking-[0.22em] text-gold uppercase">
        Insurance committee
      </p>
      <p className="font-heading mt-1 text-xl leading-tight text-sidebar-foreground">
        Ball-Chatham briefing
      </p>
      <p className="mt-2 text-xs leading-relaxed text-sidebar-foreground/60">
        A notebook for this offering — and the next one.
      </p>
    </Link>
  )
}

export function BinderShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="flex min-h-full flex-1">
      <aside className="sticky top-0 hidden h-svh w-72 shrink-0 flex-col overflow-y-auto bg-sidebar px-3 py-5 md:flex">
        <Brand />
        <NavList />
        <p className="mt-auto px-3 pt-8 text-[11px] leading-relaxed text-sidebar-foreground/45">
          Numbers from the Troxell Unified Schools packet, effective 1/1/2027.
          Not advice — a decoder.
        </p>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b bg-background/85 px-4 py-3 backdrop-blur md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger render={<Button variant="outline" size="icon" />}>
              <Menu />
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-72 border-sidebar-border bg-sidebar p-3 text-sidebar-foreground"
            >
              <SheetHeader className="sr-only">
                <SheetTitle>Sections</SheetTitle>
              </SheetHeader>
              <Brand />
              <NavList onNavigate={() => setOpen(false)} />
            </SheetContent>
          </Sheet>
          <div>
            <p className="font-mono text-[10px] tracking-[0.18em] text-primary uppercase">
              Committee briefing
            </p>
            <p className="font-heading text-base leading-tight">Ball-Chatham</p>
          </div>
        </header>
        <main className="flex-1 px-4 py-8 sm:px-8 lg:px-12 lg:py-10">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </main>
      </div>
    </div>
  )
}
