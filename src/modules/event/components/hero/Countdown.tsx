'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useMemo, useState } from 'react'
import { parseEventDateForCountdown, calculateTimeRemaining } from '../../utils'

type CountdownProps = {
  targetDate: string
}

export default function Countdown({ targetDate }: CountdownProps) {
  const t = useTranslations('timer')

  // Parse target date using util function
  const target = useMemo(() => {
    return parseEventDateForCountdown(targetDate)
  }, [targetDate])

  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  // Calculate time remaining using util function
  const { days, hours, minutes } = calculateTimeRemaining(target, now)

  const NumberBox = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="rounded-2xl bg-red-500 text-white text-3xl font-semibold tracking-tight shadow-lg size-[64px] flex items-center justify-center text-center">
        {String(value).padStart(2, '0')}
      </div>
      <div className="mt-2 text-gray-600 text-xl md:text">{label}</div>
    </div>
  )

  return (
    <div className="flex items-center justify-center gap-4 mt-0">
      <NumberBox value={days} label={t('days')} />
      <span className="text-3xl -mt-8 text-red-500">:</span>
      <NumberBox value={hours} label={t('hours')} />
      <span className="text-3xl -mt-8 text-red-500">:</span>
      <NumberBox value={minutes} label={t('minutes')} />
    </div>
  )
}
