---
name: insurance-committee-research
description: Researches employer health-plan terms, verifies Troxell/self-funding/stop-loss/PBM facts, and checks quote arithmetic for the Ball-Chatham insurance committee briefing. Use when adding a vendor offering, when the user pastes a new quote, when a term is unclear, or when numbers might be wrong.
---

# Insurance committee research

## Scope

Briefing tool for Ball-Chatham CUSD. Plain English. Never vendor-marketing voice. Never mention the private medication aside (no class or brand names). No extra markdown docs — put explanations in the app (`src/app`, glossary, questions, compare).

## Workflow

1. **Classify the source** before writing anything:
   - Packet (printed Troxell figures)
   - Meeting note (`src/lib/meeting-notes.ts`)
   - Public web (cite URL)
   - Inference (phonetic guess, market logic)
2. **Look up contested terms** with WebSearch / WebFetch (Truveris, SmithRx Connect 360, aggregate stop-loss, lasers, 12/15, network rental, SCA). Quote what the source says. Do not upgrade it into a district fact.
3. **Check math** against `src/lib/quote-data.ts` and `src/lib/money.ts`. Expected $150k total is $6,763,333.33; packet FI is $6,410,422. Show Expected and Maximum. Interpolate only from the four printed columns. Rx $312,760 is an uncapped reprice estimate, not a guarantee.
4. **If confirmed**, update `src/lib/glossary.ts`, `src/lib/questions.ts`, and/or Compare (`src/lib/vendors.ts` seeds and/or `STORAGE_KEY` localStorage shape). Do not hardcode conflicting numbers in pages.
5. **Flag unconfirmed items** in UI copy (“likely”, “as presented”, “confirm on the specimen”). Keep Truevarous→Truveris and arraget→aggregate labeled until the user confirms.

## Do not

- Invent premiums, networks, or legal promises
- Lead with the Great (70%) column as if it were the forecast
- Commit `/uploads` or vendor PDFs
