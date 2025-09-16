'use client'

import { useEffect, useMemo, useState } from 'react'

type CountdownProps = {
  targetDate: string
}

export default function Countdown({ targetDate }: CountdownProps) {
  const target = useMemo(() => new Date(targetDate).getTime(), [targetDate])
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  const diff = Math.max(0, target - now)
  const totalMinutes = Math.floor(diff / (1000 * 60))
  const days = Math.floor(totalMinutes / (60 * 24))
  const hours = Math.floor((totalMinutes - days * 24 * 60) / 60)
  const minutes = totalMinutes % 60

  const NumberBox = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="rounded-2xl bg-red-500 text-white text-3xl font-semibold tracking-tight shadow-lg size-[64px] flex items-center justify-center text-center">
        {String(value).padStart(2, '0')}
      </div>
      <div className="mt-2 text-gray-600 text-xl md:text">{label}</div>
    </div>
  )

  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      <NumberBox value={days} label="day" />
      <span className="text-3xl -mt-8 text-red-500">:</span>
      <NumberBox value={hours} label="hour" />
      <span className="text-3xl -mt-8 text-red-500">:</span>
      <NumberBox value={minutes} label="minute" />
    </div>
  )
}
