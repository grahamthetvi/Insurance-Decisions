export function usd(value: number, digits = 0): string {
  const abs = Math.abs(value)
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  }).format(abs)
  if (value < 0) return `(${formatted})`
  return formatted
}

export function usdCompact(value: number): string {
  const sign = value < 0 ? "-" : ""
  const abs = Math.abs(value)
  if (abs >= 1_000_000) {
    return `${sign}$${(abs / 1_000_000).toFixed(2)}M`
  }
  if (abs >= 1_000) {
    return `${sign}$${Math.round(abs / 1_000)}k`
  }
  return `${sign}${usd(abs)}`
}

export function pct(value: number, digits = 0): string {
  return `${value.toFixed(digits)}%`
}

export function signedUsd(value: number): string {
  if (value < 0) return usd(value)
  if (value === 0) return usd(0)
  return `+${usd(value)}`
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

export function interpolate(
  points: Array<{ x: number; y: number }>,
  x: number,
): number {
  if (points.length === 0) return 0
  const sorted = [...points].sort((a, b) => a.x - b.x)
  if (x <= sorted[0].x) return sorted[0].y
  if (x >= sorted[sorted.length - 1].x) return sorted[sorted.length - 1].y
  for (let i = 0; i < sorted.length - 1; i++) {
    const left = sorted[i]
    const right = sorted[i + 1]
    if (x >= left.x && x <= right.x) {
      const span = right.x - left.x
      const t = span === 0 ? 0 : (x - left.x) / span
      return lerp(left.y, right.y, t)
    }
  }
  return sorted[sorted.length - 1].y
}

export function findBreakEven(
  captiveAt: (claimsPct: number) => number,
  fullyInsured: number,
  from = 70,
  to = 120,
): number | null {
  const lowCost = captiveAt(from)
  const highCost = captiveAt(to)
  if (lowCost >= fullyInsured && highCost >= fullyInsured) return null
  if (lowCost <= fullyInsured && highCost <= fullyInsured) return null
  let lo = from
  let hi = to
  for (let i = 0; i < 40; i++) {
    const mid = (lo + hi) / 2
    if (captiveAt(mid) > fullyInsured) hi = mid
    else lo = mid
  }
  return (lo + hi) / 2
}
