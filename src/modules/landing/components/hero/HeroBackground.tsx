'use client'

import { useDevice } from '@/core/hooks'
import BlurBackground from './BlurBackground'

const HeroBackground = () => {
  const { isMobile } = useDevice()

  return (
    <div className="h-full">
      {!isMobile ? (
        <>
          <div className="hidden xl:block">
            <BlurBackground isMobile={isMobile} />
          </div>
        </>
      ) : (
        // Mobile version - optimized static blur background without animations
        <div className="hidden xl:block absolute inset-0 w-full h-full overflow-hidden ">
          {/* Simplified static gradient for mobile performance */}
          {/* <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '100%',
              height: '100%',
              background:
                'linear-gradient(135deg, #2EA7FF 0%, #5B50FF 25%, #FF2E90 75%, #FF7A2B 100%)',
              filter: 'blur(120px)', // Reduced blur for better performance
              opacity: 0.15, // Slightly higher opacity for better visibility
              willChange: 'auto', // Disable will-change for static elements
            }}
          /> */}
          {/* Additional subtle overlay for depth */}
          <div
            className="absolute top-[20%] right-[10%] w-[40%] h-[40%] rounded-full"
            style={{
              background: 'linear-gradient(45deg, #FF2E90 0%, #FF7A2B 100%)',
              filter: 'blur(80px)',
              opacity: 0.1,
            }}
          />
        </div>
      )}
      {/* Desktop background image */}
      <div className="hidden xl:block absolute inset-0 w-full h-full -z-10">
        {/* <img
          src="/image/hero-baner/Homepage_5.gif"
          className="w-full h-full ml-10 object-cover"
          alt="Hero background"
          loading="lazy" // Lazy load for better performance
        /> */}

        <video
          className="w-full object-cover h-full"
          src="/image/hero-baner/Homepage_5.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          style={{ maxWidth: '100%' }}
        />
      </div>

      {/* Mobile background image - optimized */}
      <div className="block xl:hidden absolute inset-0 w-full h-full -z-10">
        {/* <img
          src="/image/hero-baner/Homepage_1.webp"
          className="w-full h-full object-cover"
          alt="Hero background"
          loading="eager"
          decoding="async"
          width={480}
          height={320}
          style={{ maxWidth: '100%', maxHeight: '100%' }}
          fetchPriority="high"
        /> */}
        <div className="absolute bottom-1/5 right-0 size-[16rem] rounded-full bg-[#FC96BB] opacity-50 blur-[100px]" />
        <div className="absolute bottom-1/4 -left-10 size-[16rem] rounded-full bg-[#4AD29594] opacity-50 blur-[10px]" />
        <div className="absolute bottom-1/2 -right-1/3 size-[15rem] rounded-full bg-gradient-to-r from-[#8080F1] to-[#D7D7FF] opacity-25 blur-[10px]" />
     
        <video
          className="w-full h-full object-cover"
          src="/image/hero-baner/Homepage_1.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          style={{ maxWidth: '100%', maxHeight: '100%' }}
        />
      </div>
    </div>
  )
}

export default HeroBackground
