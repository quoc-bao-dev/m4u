'use client'

import React from 'react'
import { useTranslation } from '@/locale'

interface TimerProps {
  initTime: string // Formats supported: D:HH:MM:SS or HH:MM:SS
}

const parseInitTimeToSeconds = (initTime: string): number => {
  const parts = initTime.split(':').map(Number)
  if (parts.length === 4) {
    // D:HH:MM:SS format
    const [days, hours, minutes, seconds] = parts
    return days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60 + seconds
  } else if (parts.length === 3) {
    // HH:MM:SS format
    const [hours, minutes, seconds] = parts
    return hours * 60 * 60 + minutes * 60 + seconds
  } else {
    // Invalid format, return 0
    return 0
  }
}

const secondsToParts = (totalSeconds: number) => {
  const days = Math.floor(totalSeconds / (24 * 60 * 60))
  const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60))
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60)
  const seconds = totalSeconds % 60

  return { days, hours, minutes, seconds }
}

const Timer: React.FC<TimerProps> = ({ initTime }) => {
  const { t } = useTranslation()
  const initialSeconds = React.useMemo(
    () => parseInitTimeToSeconds(initTime),
    [initTime]
  )
  const [remainingSeconds, setRemainingSeconds] =
    React.useState<number>(initialSeconds)

  React.useEffect(() => {
    setRemainingSeconds(initialSeconds)
  }, [initialSeconds])

  React.useEffect(() => {
    if (remainingSeconds <= 0) return
    const intervalId = window.setInterval(() => {
      setRemainingSeconds((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => window.clearInterval(intervalId)
  }, [remainingSeconds])

  const { days, hours, minutes, seconds } = secondsToParts(remainingSeconds)
  const segments = [days, hours, minutes, seconds].map((n) =>
    String(n).padStart(2, '0')
  )

  return (
    <div className="flex justify-end pr-2 xl:pr-3 pb-2 xl:pb-3">
      <div className="relative flex items-center gap-0.5 xl:gap-1.5">
        {segments.map((segment, index, arr) => (
          <React.Fragment key={`${segment}-${index}`}>
            <div className="flex items-center justify-center flex-col gap-0.5 size-[30px] xl:size-[38px] 2xl:size-[42px] py-1 px-1 rounded-md xl:rounded-[12px] bg-[#FF3B30] shadow-[0px_4px_24px_0px_#0000001A]">
              <span className="text-center text-white text-xs xl:text-base font-bold leading-none">
                {segment}
              </span>
              <span className="text-white text-[8px] xl:text-xs font-bold leading-none">
                {index === 0 && t('timer.days')}
                {index === 1 && t('timer.hours')}
                {index === 2 && t('timer.minutes')}
                {index === 3 && t('timer.seconds')}
              </span>
            </div>
            {index < arr.length - 1 && (
              <span className="text-[#FF3B30] text-base xl:text-2xl font-bold">
                :
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default Timer
