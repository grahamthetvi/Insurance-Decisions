import type { Metadata } from "next"
import { Source_Sans_3, Source_Serif_4, Geist_Mono } from "next/font/google"
import { TooltipProvider } from "@/components/ui/tooltip"
import { BinderShell } from "@/components/binder-shell"
import "./globals.css"

const sans = Source_Sans_3({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
})

const serif = Source_Serif_4({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
})

const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Ball-Chatham insurance briefing",
  description:
    "A working notebook for the Ball-Chatham insurance committee: Troxell self-funding math, glossary, and a way to compare later offerings.",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${serif.variable} ${mono.variable} light h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <TooltipProvider>
          <BinderShell>{children}</BinderShell>
        </TooltipProvider>
      </body>
    </html>
  )
}
