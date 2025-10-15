'use client'

import UserAvatar from '@/core/components/common/UserAvatar'
import { useTranslation } from '@/locale/hooks'
import { ClientJoin } from '@/services/banner-review-hub'

interface AvatarStackProps {
  className?: string
  clientJoin?: ClientJoin[]
  countClientReview?: number
}

const AvatarStack = ({
  className = '',
  clientJoin,
  countClientReview,
}: AvatarStackProps) => {
  const { t } = useTranslation()

  // Sử dụng dữ liệu từ API hoặc fallback
  const displayAvatars = clientJoin?.slice(0, 4) || []
  const displayCount = countClientReview || 1000

  return (
    <div className={`flex flex-col space-y-[12px] ${className}`}>
      {/* Profile Pictures Row */}
      <div className="flex -space-x-[8px]">
        {displayAvatars.map((client, index) => (
          <UserAvatar
            key={index}
            userName={client.fullname}
            src={client.avatar}
            size={40}
            className="size-[40px] lg:size-[64px]"
          />
        ))}
        {displayAvatars.length < 4 &&
          [1, 2, 3, 4].slice(0, 4 - displayAvatars.length).map((i) => (
            <div
              key={`fallback-${i}`}
              className="size-[40px] lg:size-[64px] rounded-full bg-white border-2 border-white shadow-sm"
            >
              <UserAvatar
                userName={`User ${i}`}
                src={`/image/reviewer-carousel/image-0${i}.jpg`}
                size={40}
                className="lg:w-16 lg:h-16"
              />
            </div>
          ))}
        <div className="size-[40px] lg:size-[64px] rounded-full bg-gray-800 text-white flex items-center justify-center text-lg font-medium">
          {displayCount >= 1000
            ? `${Math.floor(displayCount / 1000)}K`
            : '+' + displayCount}
        </div>
      </div>

      {/* Social Proof Text */}
      <p className="text-sm lg:text-[16px] font-medium text-gray-700">
        +{displayCount}
        {t('trialHero.singleMomsJoined')}
      </p>
    </div>
  )
}

export default AvatarStack
