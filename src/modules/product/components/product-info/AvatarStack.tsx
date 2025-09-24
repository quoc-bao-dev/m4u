import { useCallback } from 'react'
import { useTranslation } from '@/locale'
import UserAvatar from '@/core/components/UserAvatar'
import { useDevice } from '@/core/hooks'

interface AvatarStackProps {
  className?: string
  limitPeople: number
  participation: number
  data: any
}

const AvatarStack = ({
  className = '',
  limitPeople,
  participation,
  data,
}: AvatarStackProps) => {
  const { t } = useTranslation()
  const { isDesktop } = useDevice()

  const Avatar = useCallback(({ src }: { src: string }) => {
    return (
      <div className="size-[40px] lg:size-[64px] rounded-full bg-white border-2 border-white shadow-sm flex items-center justify-center">
        <img
          src={src}
          alt="avatar"
          className="size-full object-cover rounded-full"
        />
      </div>
    )
  }, [])
  return (
    <div className={`flex flex-col space-y-[12px] ${className}`}>
      {/* Profile Pictures Row */}
      {/* <div className="flex -space-x-[8px]">
        {[1, 2, 3, 4].map((i) => (
          <Avatar key={i} src={`/image/reviewer-carousel/image-0${i}.jpg`} />
        ))}
        <div className="size-[40px] lg:size-[64px] rounded-full bg-gray-800 text-white flex items-center justify-center text-lg font-medium">
          1K
        </div>
      </div> */}
      <div className="flex -space-x-2 lg:-space-x-4">
        {data?.data?.slice(0, 5).map((kol: any, index: number) => (
          <UserAvatar
            key={`${kol.id}-${index}`}
            src={kol?.client?.avatar}
            userName={kol?.client?.fullname}
            size={isDesktop ? 64 : 40}
          />
        ))}
        {data?.total > 5 && (
          <div className="flex-shrink-0 size-[40px] lg:size-[64px] rounded-full object-cover border-2 border-white bg-black flex items-center justify-center text-white text-base font-semibold">
            +{data?.total - 5}
          </div>
        )}
      </div>

      {/* Social Proof Text */}
      <div className="">
        {limitPeople > 0 && (
          <p className="text-[#F5222D] text-[18px] md:text-[24px] font-bold">
            ⚡ {t('product.slotsLeft', { count: limitPeople - participation })}
          </p>
        )}
        <p className="text-[14px] md:text-[20px] text-greyscale-400">
          <span className="text-greyscale-900 font-bold">
            {participation} {t('product.users')}
          </span>{' '}
          {t('product.enrolledTrial')}
        </p>
      </div>
    </div>
  )
}

export default AvatarStack
