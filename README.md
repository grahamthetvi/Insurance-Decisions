# Ball-Chatham insurance committee briefing

A working notebook for the Ball-Chatham CUSD insurance committee. It decodes the Troxell self-funded (Unified Schools) offering, keeps a plain-English glossary of what was said in the room, and gives you a place to drop the next vendor’s numbers so you are not starting from a blank legal pad each time.

This is **not** advice, a recommendation, or a substitute for the packet, the stop-loss specimen, or counsel. The dollars on the Quote lab come from the Troxell packet (effective **1/1/2027**, contract basis **12/15**). Meeting color (renewal climate, “no lasers,” network overlap) is labeled as what was said, not as a guarantee.

## The number that matters

Against the packet’s fully-insured comparison of **$6,410,422**, the **Expected** self-funded year at a $150,000 specific deductible is **$6,763,333.33** — about **$353k more**, not less.

If that $6.41M is **current** premium and a fully-insured renewal is really ~20% (~**$7.69M**), Expected self-funding **wins**. If $6.41M is already the 2027 fully-insured quote, Expected self-funding **costs more**. The Quote lab has a toggle for those two readings. Stare at Expected and Maximum, not only the Great (70%) column.

## Run locally

```bash
npm install
npm run dev -- --hostname 0.0.0.0 --port 43127
```

Then open [http://127.0.0.1:43127](http://127.0.0.1:43127). Any uncommon port is fine; do not assume 3000.

## What lives where

| Route | What it is |
| --- | --- |
| `/` | The decision: self-fund vs this year’s fully-insured renewal |
| `/quote` | Interactive Troxell math (claims year + renewal %) |
| `/how-it-works` | How money moves; the unbundled stack |
| `/network` | Three-tier (SCA / Aetna wrap / out-of-network) |
| `/glossary` | Lasers, aggregate, PBM, 12/15, … |
| `/meeting` | Working notes from the Troxell meeting |
| `/questions` | Board-ready follow-ups, including a 186 call script |
| `/compare` | Troxell + current climate, plus future offerings (this browser) |
| `/rules` | How to judge any later bid |
| `/notes` | Private scratch pad (this browser only) |

Future vendor offerings: add structured data in `src/lib/vendors.ts` (seeds) and/or on the Compare page (saved in the browser). Quote arithmetic lives in `src/lib/quote-data.ts` — do not paste conflicting figures into pages.

## Deploy

This is a standard Next.js app. It can be deployed on Vercel or GitHub Pages.

### GitHub Pages
A GitHub Actions workflow is included at `.github/workflows/deploy.yml`. In your GitHub repository settings under **Settings > Pages**, set **Source** to **GitHub Actions**. On every push to `main`, the static site is built with `output: "export"` and published to GitHub Pages. Compare and Notes use `localStorage`; they will not follow you across devices unless you copy them out.
