'use client'
import { BroadcastIcon } from '@phosphor-icons/react'
import { useTranslations } from 'next-intl'

export type EventStatus = 'happening' | 'coming'

type EventBagdeProps = {
  status: EventStatus
}

const makeStatusConfig = (t: ReturnType<typeof useTranslations>) =>
  ({
    happening: {
      label: t('event.badge.status.happening'),
      className: 'bg-red-600',
      showIcon: true,
    },
    coming: {
      label: t('event.badge.status.coming'),
      className: 'bg-[#2DD4BF]',
      showIcon: false,
    },
  } as const)

const EventBadge = ({ status }: EventBagdeProps) => {
  const t = useTranslations()
  const cfg = makeStatusConfig(t)[status]
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
