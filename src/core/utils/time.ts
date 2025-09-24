// Parse chuỗi "dd:hh:mm:ss" -> tổng giây
export function parseDdHhMmSsToSeconds(raw?: string | null): number | null {
  if (!raw || typeof raw !== 'string') return null
  const parts = raw.split(':')
  if (parts.length !== 4) return null
  const [dStr, hStr, mStr, sStr] = parts
  const d = Number(dStr)
  const h = Number(hStr)
  const m = Number(mStr)
  const s = Number(sStr)
  if ([d, h, m, s].some((n) => Number.isNaN(n) || n < 0)) return null
  return d * 86400 + h * 3600 + m * 60 + s
}

// Định dạng tổng giây -> "Xd YYh ZZm WWs"
export function formatSecondsToDdHhMmSs(totalSeconds: number): string {
  const total = Math.max(Math.floor(totalSeconds), 0)
  const days = Math.floor(total / 86400)
  const hours = Math.floor((total % 86400) / 3600)
  const minutes = Math.floor((total % 3600) / 60)
  const seconds = total % 60
  const pad2 = (n: number) => String(n).padStart(2, '0')
  return `${days}d ${pad2(hours)}h ${pad2(minutes)}m ${pad2(seconds)}s`
}

export function isDdHhMmSsZero(raw?: string | null): boolean {
  const seconds = parseDdHhMmSsToSeconds(raw)
  return seconds !== null && seconds <= 0
}


