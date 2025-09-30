import Image from 'next/image'
import React from 'react'

const HeroBackground = ({
  isBackground,
  banners,
  currentIndex,
}: {
  isBackground: boolean
  banners: { image?: string; alt?: string }[]
  currentIndex: number
}) => {

  return (
    <div className="h-full">
      <div className="absolute inset-0 w-full h-full z-[2]" data-is-bg={isBackground ? '1' : '0'}>
        {isBackground && (banners.length > 0) ? (
          <>
            {banners.map((b, i) => (
              <Image
                key={i}
                src={b.image || ''}
                alt={b.alt || 'Hero Background'}
                fill
                priority={i === 0}
                quality={100}
                className={`w-full object-fill transition-opacity duration-700 ${currentIndex === i ? 'opacity-100' : 'opacity-0'}`}
              />
            ))}
          </>
        ) : (
          <>
            <video
              className="hidden lg:block w-full object-cover h-full "
              src="/image/hero-baner/hero.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              style={{ maxWidth: '100%' }}
            />
            <video
              className="block lg:hidden w-full object-cover h-full "
              src="/image/hero-baner/heroMB.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              style={{ maxWidth: '100%' }}
            />
          </>
        )}
      </div>
    </div>
  )
}

export default HeroBackground
