'use client'

import React, { useEffect, useMemo, useState } from 'react'

/**
 * AnnouncementCountdownCard
 * ------------------------------------------------------------------
 * A single-file React component styled with Tailwind.
 * - Megaphone area is an <img> so you can pass any link later.
 * - Precise mm:ss countdown with days/hours/minutes (no seconds shown visually).
 * - All copy is customizable via props.
 * - Button exposes onJoin callback.
 */

export default function AnnouncementCountdownCard({
  imageUrl = '',
  imageAlt = 'Megaphone',
  targetDate = '2025-10-01T00:00:00+07:00', // 01 October 2025 (Asia/Ho_Chi_Minh)
  dateLabel = '01 October 2025',
  headline = 'WINNERS WILL BE ANNOUNCED',
  buttonText = 'JOIN NOW',
  onJoin = () => {},
}) {
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
      <div className="mt-2 text-gray-600 text-sm">{label}</div>
    </div>
  )

  return (
    <div className="w-[457px]">
      {/* Megaphone image */}
      <img
        src={imageUrl}
        alt={imageAlt}
        className="absolute -left-12 -top-16 size-[160px] object-contain drop-shadow-md pointer-events-none select-none"
      />

      {/* Countdown */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <NumberBox value={days} label="day" />
        <span className="text-3xl -mt-4">:</span>
        <NumberBox value={hours} label="hour" />
        <span className="text-3xl -mt-4">:</span>
        <NumberBox value={minutes} label="minute" />
      </div>
      <div className="pt-10"></div>
      <div className="relative w-full flex justify-between mx-auto">
        <LeftFrame />
        <RightFrame />
        <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2">
          <p className="text-center text-[24px] font-medium text-gray-800">
            {dateLabel}
          </p>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-[50%]">
          <p className="text-center text-[24px] text-gray-800 truncate">
            {headline}
          </p>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 translate-y-1/2 bottom-0">
          <div className="relative">
            <button className="bg-pink-600 text-white font-semibold w-[345px] py-2 rounded-xl relative">
              {buttonText}
            </button>
            <div className="absolute w-full h-full bg-pink-600/20 rounded-xl top-0 -rotate-[5deg]"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

const LeftFrame = () => {
  return (
    <svg
      viewBox="0 0 98 86"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-[100px]"
    >
      <path
        d="M35.0715 84.9869H0.806641V1.0993H97.1967"
        stroke="#FF8092"
        stroke-width="2.01653"
        stroke-miterlimit="10"
      />
    </svg>
  )
}

const RightFrame = () => {
  return (
    <svg
      viewBox="0 0 103 86"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-[100px]"
    >
      <path
        d="M74.7686 84.9869H101.992V1.3009L-0.447966 1.3009"
        stroke="#FF8092"
        stroke-width="2.01653"
        stroke-miterlimit="10"
      />
    </svg>
  )
}
