import { useEffect, useMemo, useState } from 'react'
import { formatSecondsToDdHhMmSs, parseDdHhMmSsToSeconds } from '@/core/utils/time'

export function useCountdown(ddHhMmSs?: string | null) {
  const [remainingSeconds, setRemainingSeconds] = useState<number | null>(null)

  useEffect(() => {
    const seconds = parseDdHhMmSsToSeconds(ddHhMmSs)
    setRemainingSeconds(seconds)
  }, [ddHhMmSs])

  useEffect(() => {
    if (remainingSeconds === null) return
    if (remainingSeconds <= 0) return
    const timer = window.setInterval(() => {
      setRemainingSeconds((prev) => (prev && prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => window.clearInterval(timer)
  }, [remainingSeconds])

  const formatted = useMemo(() => {
    if (remainingSeconds === null) return ''
    return formatSecondsToDdHhMmSs(remainingSeconds)
  }, [remainingSeconds])

  return {
    remainingSeconds,
    formatted,
    isEnded: remainingSeconds !== null && remainingSeconds <= 0,
    reset: (raw?: string | null) => setRemainingSeconds(parseDdHhMmSsToSeconds(raw)),
  }
}


