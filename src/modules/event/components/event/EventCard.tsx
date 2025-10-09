'use client'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import EventBadge from './EventBadge'
import EventFrame from './EventFrame'
import EventServerBadge from './EventServerBadge'

type EventCardProps = {
  status: 'happening' | 'coming' | 'ended'
  date: string
  title: string
  productCount: number | string
  fundAmount: string
  imageSrc: string
  slug?: string
  // Server badge props
  typeSponsor?: number
  idStatus?: number
  serverBadgeName?: string
  serverBadgeColor?: string
  useServerBadge?: boolean
}

const statusConfig: Record<
  EventCardProps['status'],
  { label: string; className: string; showIcon?: boolean }
> = {
  happening: { label: 'Happening', className: 'bg-red-600', showIcon: true },
  coming: { label: 'Coming soon', className: 'bg-[#2DD4BF]', showIcon: false },
  ended: { label: 'Ended', className: 'bg-gray-500', showIcon: false },
}

const EventCard = ({
  status,
  date,
  title,
  productCount,
  fundAmount,
  imageSrc,
  slug,
  typeSponsor,
  idStatus,
  serverBadgeName,
  serverBadgeColor,
  useServerBadge = false,
}: EventCardProps) => {
  const t = useTranslations('event.card')
  const cfg = statusConfig[status]
  return (
    <div className="flex flex-col gap-4 shadow-lg/5 rounded-xl pb-4 hover:shadow-xl/5 transition-all duration-300 h-full">
      <EventFrame>
        <Image
          src={imageSrc}
          alt="event"
          width={300}
          height={240}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </EventFrame>
      <div className="px-4 flex flex-col gap-4 flex-1">
        <div className="flex items-center justify-between gap-4">
          {useServerBadge && serverBadgeName && serverBadgeColor ? (
            <EventServerBadge
              id={idStatus}
              name={serverBadgeName}
              color={serverBadgeColor}
              showIcon={status === 'happening'}
            />
          ) : (
            <EventBadge status={status} />
          )}
          <p className="text-base font-normal text-greyscale-700">{date}</p>
        </div>
        <h4 className=" text-base lg:text-lg 2xl:text-2xl font-bold text-greyscale-900">
          {title}
        </h4>
        <div className=" mt-auto hidden md:flex items-center gap-3">
          <div className="flex items-center justify-center p-3 rounded-full bg-greyscale-800">
            <Image
              src="/image/donation/logoWhite.png"
              alt="icon"
              width={28}
              height={28}
            />
          </div>
          <p className="text-base font-medium text-greyscale-700">
            {t('fundName')}
          </p>
        </div>

        <div className="md:hidden">
          <p className="text-sm text-greyscale-700 line-clamp-2">
            {t('mobileDesc')}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-xs xl:text-sm font-normal text-greyscale-700 truncate">
              {typeSponsor === 1 ? t('totalPrizePool') : t('totalProducts')}
            </p>
            <p className="text-base lg:text-lg 2xl:text-2xl font-semibold text-orange-500">
              {productCount}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xs xl:text-sm font-normal text-greyscale-700 truncate">
              {t('totalFundsConverted')}
            </p>
            <p className="text-base lg:text-lg 2xl:text-2xl font-semibold text-orange-500">
              {fundAmount}
              <span className="text-sm underline">đ</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventCard
