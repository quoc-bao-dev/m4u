import { useCallback } from 'react'

interface AvatarStackProps {
  className?: string
}

const AvatarStack = ({ className = '' }: AvatarStackProps) => {
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
      <div className="flex -space-x-[8px]">
        {[1, 2, 3, 4].map((i) => (
          <Avatar key={i} src={`/image/reviewer-carousel/image-0${i}.jpg`} />
        ))}
        <div className="size-[40px] lg:size-[64px] rounded-full bg-gray-800 text-white flex items-center justify-center text-lg font-medium">
          1K
        </div>
      </div>

      {/* Social Proof Text */}
      <p className="text-sm lg:text-[16px] font-medium text-gray-700">
        1,000+ mẹ đơn thân đã tham gia
      </p>
    </div>
  )
}

export default AvatarStack
