'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {
  icon?: React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode
  phone?: string
  note?: React.ReactNode
  link?: string
}

const InfoItem: React.FC<Props> = ({
  icon,
  title,
  description,
  phone,
  note,
  link,
}) => {
  const router = useRouter()

  const handleClick = () => {
    if (!link) return
    const url = link.trim()

    if (/^(tel:|mailto:)/i.test(url)) {
      window.location.href = url
      return
    }
    if (/^https?:\/\//i.test(url)) {
      window.open(url, '_blank', 'noopener,noreferrer')
      return
    }
    if (/^\//.test(url)) {
      router.push(url)
      return
    }
    window.location.href = url
  }

  return (
    <div
      className={`flex flex-col gap-3 md:p-5 ${link ? 'cursor-pointer' : ''}`}
      onClick={handleClick}
      role={link ? ('link' as const) : undefined}
      tabIndex={link ? 0 : -1}
      onKeyDown={(e) => {
        if (!link) return
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleClick()
        }
      }}
    >
      <div className="flex md:flex-col gap-3 items-center md:items-start">
        <div className="size-10 shrink-0 flex items-center justify-center">
          {icon}
        </div>

        {title ? (
          <p className="font-primary font-semibold text-[18px] md:text-[24px] leading-[140%] tracking-[0%] text-gray-900">
            {title}
          </p>
        ) : null}
      </div>

      <div className="flex-1 flex flex-col gap-2">
        {description ? (
          <p className="font-primary font-normal text-[14px] md:text-[16px] leading-[100%] tracking-[0%] text-gray-600">
            {description}
          </p>
        ) : null}

        {phone ? (
          <div className="mt-0">
            <a
              href={`tel:${phone.replace(/\s|\+/g, '')}`}
              className="font-primary font-normal text-[16px] leading-[140%] align-middle"
              style={{
                background:
                  'linear-gradient(91.72deg, #0094FF 3.01%, #0047FF 99.46%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent',
                display: 'inline-block',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {phone}
            </a>

            <div className="h-px w-full bg-[#DDE1E7] my-5" />

            {note ? (
              <p className="font-primary font-normal text-[14px] md:text-[16px] leading-[140%] text-gray-600">
                {note}
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default InfoItem
