import UserAvatar from '@/core/components/common/UserAvatar'
import { useTranslations } from 'next-intl'

interface ReviewerAvatarProps {
  src: string
  className?: string
  imageClassName?: string
  name: string
  jobTitle: string
  labelPosition: 'top' | 'bottom'
}

const ReviewerAvatar = ({
  src,
  className = '',
  imageClassName = '',
  name,
  jobTitle,
  labelPosition,
}: ReviewerAvatarProps) => {
  const t = useTranslations('product')
  const labelContent = (
    <div className="flex flex-col justify-center items-center">
      <h3 className="font-bold text-dark text-[7px] lg:text-base capitalize w-[100px] break-words text-center leading-tight overflow-wrap-anywhere whitespace-normal" style={{wordBreak: 'break-word'}}>{name}</h3>
      <p className="text-dark text-[7px] lg:text-sm">{jobTitle} {t('reviews')}</p>
    </div>
  )

  return (
    <div
      className={`flex flex-col items-center gap-2 aspect-square ${className}`}
    >
      {labelPosition === 'top' && labelContent}
      <div className="relative ">
        <UserAvatar src={src} userName={name}
          className={'size-20 aspect-square md:text-xl xl:text-3xl rounded-full object-cover border-[#BBBEFA] ' + imageClassName}
        />
        {/* <img
          src={src}
          alt={name}
          className={cn(
            `size-20 aspect-square rounded-full object-cover border-4 border-[#BBBEFA] ${imageClassName}`
          )}
        /> */}
      </div>
      {labelPosition === 'bottom' && labelContent}
    </div>
  )
}

export default ReviewerAvatar
