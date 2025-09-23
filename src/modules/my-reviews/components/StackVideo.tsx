'use client'

import { Image } from '@phosphor-icons/react'

interface MediaItem {
  id: string
  src: string
  type: 'image' | 'video'
  thumbnail?: string
}

interface StackVideoProps {
  media: MediaItem[]
}

const PLACEHOLDER = 'https://via.placeholder.com/60x60.png?text=No+Video'

const StackVideo = ({ media }: StackVideoProps) => {
  if (!media || media.length === 0) return null

  const displayMedia = media.slice(0, 3)
  const remainingCount = media.length - 3

  return (
    <div className="relative w-[100px] h-[60px]">
      {displayMedia.map((item, index) => {
        return (
          <div
            key={item.id}
            className="absolute top-0 right-0 w-[60px] h-[60px] rounded-[4px] border-2 border-white shadow-[0_0_3px_0_rgba(0,0,0,0.15)] overflow-hidden"
            style={{
              transform: `translateX(${-index * 12}px)`,
              zIndex: displayMedia.length - index,
            }}
          >
            {item.type === 'video' ? (
              <video
                className="w-full h-full object-cover"
                autoPlay={index === 0}
                muted
                loop
                playsInline
              >
                <source src={item.src} />
              </video>
            ) : (
              <img
                src={item.thumbnail || item.src || PLACEHOLDER}
                alt="Media thumbnail"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = PLACEHOLDER
                }}
              />
            )}
          </div>
        )
      })}

      {remainingCount > 0 && (
        <div
          className="absolute bottom-1 right-1 px-1 py-0.5 rounded-[4px] flex items-center justify-center"
          style={{
            background: 'rgba(0, 0, 0, 0.40)',
            zIndex: displayMedia.length + 1,
          }}
        >
          <Image size={14} className="text-white" />
          <span className="text-[12px] text-white font-medium">
            +{remainingCount}
          </span>
        </div>
      )}
    </div>
  )
}

export default StackVideo
