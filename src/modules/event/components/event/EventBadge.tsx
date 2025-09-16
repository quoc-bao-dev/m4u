'use client'
import { BroadcastIcon } from '@phosphor-icons/react'

export type EventStatus = 'happening' | 'coming'

type EventBagdeProps = {
  status: EventStatus
}

const statusConfig: Record<
  EventStatus,
  { label: string; className: string; showIcon?: boolean }
> = {
  happening: {
    label: 'Happening',
    className: 'bg-red-600',
    showIcon: true,
  },
  coming: {
    label: 'Coming soon',
    className: 'bg-[#2DD4BF]',
    showIcon: false,
  },
}

const EventBadge = ({ status }: EventBagdeProps) => {
  const cfg = statusConfig[status]
  return (
    <div
      className={`flex items-center gap-1 rounded-full py-2 px-3 ${cfg.className}`}
    >
      {cfg.showIcon && <BroadcastIcon className="text-white" />}
      <span className="text-xs font-medium text-white">{cfg.label}</span>
    </div>
  )
}

export default EventBadge
