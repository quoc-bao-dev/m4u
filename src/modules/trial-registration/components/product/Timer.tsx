'use client'

import React from 'react'

interface TimerProps {
  initTime: string // Formats supported: D:HH:MM:SS or HH:MM:SS
}

const parseInitTimeToSeconds = (initTime: string): number => {
  const segments = initTime.split(':').map((v) => parseInt(v, 10))
  if (segments.some((n) => Number.isNaN(n) || n < 0)) return 0

  let days = 0
  let hours = 0
  let minutes = 0
  let seconds = 0

  if (segments.length === 4) {
    ;[days, hours, minutes, seconds] = segments
  } else if (segments.length === 3) {
    ;[hours, minutes, seconds] = segments
  } else {
    return 0
  }

  return days * 86400 + hours * 3600 + minutes * 60 + seconds
}

const secondsToParts = (totalSeconds: number) => {
  const days = Math.floor(totalSeconds / 86400)
  const remainingAfterDays = totalSeconds % 86400
  const hours = Math.floor(remainingAfterDays / 3600)
  const remainingAfterHours = remainingAfterDays % 3600
  const minutes = Math.floor(remainingAfterHours / 60)
  const seconds = remainingAfterHours % 60
  return { days, hours, minutes, seconds }
}

const Timer: React.FC<TimerProps> = ({ initTime }) => {
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
    <div className="flex justify-end pr-3 pb-3">
      <div className="relative flex items-center gap-1.5">
        <div className="size-[30px]- sm:size-[38px]- w-[38px] h-[42px]"></div>
        {segments.map((segment, index, arr) => (
          <React.Fragment key={`${segment}-${index}`}>
            <div className="flex items-center justify-center flex-col gap-0.5 size-[30px]- sm:size-[38px]- w-[38px] h-[42px] py-1 px-1 rounded-[10px] sm:rounded-[12px] bg-[#FF3B30] shadow-[0px_4px_24px_0px_#0000001A]">
              <span className="text-center text-white text-sm sm:text-base font-bold leading-none">
                {segment}
              </span>
              <span className="text-white text-[11px]! sm:text-sm font-bold leading-none">
                {index === 0 && 'ngày'}
                {index === 1 && 'giờ'}
                {index === 2 && 'phút'}
                {index === 3 && 'giây'}
              </span>
            </div>
            {index < arr.length - 1 && (
              <span className="text-[#FF3B30] text-xl sm:text-2xl font-bold">
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
