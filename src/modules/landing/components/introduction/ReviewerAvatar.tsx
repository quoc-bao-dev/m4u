import { cn } from '@/core/utils'

interface ReviewerAvatarProps {
  src: string
  className?: string
  imageClassName?: string
  name: string
  jobTitle: string
  labelPosition: 'top' | 'bottom'
  rotateDeg?: number
}

const ReviewerAvatar = ({
  src,
  className = '',
  imageClassName = '',
  name,
  jobTitle,
  labelPosition,
  rotateDeg = 0,
}: ReviewerAvatarProps) => {
  const labelContent = (
    <div className="text-center">
      <h3 className="font-bold text-dark">{name}</h3>
      <p className="text-dark">{jobTitle}</p>
    </div>
  )

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      {labelPosition === 'top' && labelContent}
      <div className="relative">
        <img
          src={src}
          alt={name}
          className={cn(
            `size-20 rounded-full object-cover border-4 border-[#BBBEFA] ${imageClassName}`
          )}
        />
      </div>
      {labelPosition === 'bottom' && labelContent}
    </div>
  )
}

export default ReviewerAvatar
