import { cn } from '@/core/utils'

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
  const labelContent = (
    <div className="text-center">
      <h3 className="font-bold text-dark text-[7px] lg:text-base">{name}</h3>
      <p className="text-dark text-[7px] lg:text-sm">{jobTitle}</p>
    </div>
  )

  return (
    <div
      className={`flex flex-col items-center gap-2 aspect-square ${className}`}
    >
      {labelPosition === 'top' && labelContent}
      <div className="relative ">
        <img
          src={src}
          alt={name}
          className={cn(
            `size-20 aspect-square rounded-full object-cover border-4 border-[#BBBEFA] ${imageClassName}`
          )}
        />
      </div>
      {labelPosition === 'bottom' && labelContent}
    </div>
  )
}

export default ReviewerAvatar
