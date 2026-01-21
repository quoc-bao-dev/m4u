'use client'
import { Container, Section } from '@/core/components/common/group'
import { useEffect, useMemo, useState } from 'react'
import { ArrowLeftIcon, ArrowRightIcon } from '@phosphor-icons/react'
import { useGetHomePage } from '@/services/home/queries'
import HeroBackground from './HeroBackground'
import HeroContent from './HeroContent'
import LiveStreamComponent from './LiveStreamComponent'
import LiveStreamShow from './LiveStreamShow'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { useDevice } from '@/core/hooks'

const HeroSection = () => {
  const { isMobile } = useDevice()
  //lấy chiều cao của viewport
  useEffect(() => {
    const inner = window.innerHeight
    const visual =
      (window.visualViewport && window.visualViewport.height) || inner
    const initial = Math.min(inner, visual)
    const root = document.documentElement
    root.style.setProperty('--vh-initial', `${initial * 0.01}px`)
  }, [])

  const { data: homePage } = useGetHomePage()
  const section1 = homePage?.section1
  const normalized = useMemo(() => {
    const list = Array.isArray(section1?.banner) ? section1?.banner : []
    return list.map((b: any) =>
      typeof b === 'string'
        ? { image: b }
        : {
          image: b?.image ?? b?.url,
          image_mobile: b?.image_mobile,
          title: b?.title,
          content: b?.content,
          is_background: b?.is_background,
          hidden_button: b?.hidden_button,
        }
    )
  }, [section1?.banner])

  // controls centralized here; child components are fully controlled by props now
  const dotCount = normalized.length
  const [dotIndex, setDotIndex] = useState(0)
  const currentBanner = normalized?.[dotIndex] || {}
  const isBackground =
    (currentBanner as any)?.is_background === 1 ||
    (currentBanner as any)?.is_background === '1'

  // auto advance slide every 5s
  useEffect(() => {
    if (normalized.length <= 1) return
    const id = setInterval(() => {
      setDotIndex((p) => (p + 1) % Math.max(normalized.length, 1))
    }, 6000)
    return () => clearInterval(id)
  }, [normalized.length])

  return (
    <>
      <div className="relative h-[calc(var(--vh-initial,1vh)*100)] flex flex-col overflow-hidden">
        <div className="flex-1 min-h-0">
          <Section
            background={
              <>
                {isBackground && (currentBanner as any)?.image ? (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`bg-${dotIndex}`}
                      className="absolute inset-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.7, ease: 'easeInOut' }}
                    >
                      <Image
                        src={
                          isMobile
                            ? (currentBanner as any)?.image_mobile ||
                            (currentBanner as any).image
                            : (currentBanner as any).image
                        }
                        alt="Hero Background"
                        fill
                        className="object-cover w-full h-full"
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>
                ) : (
                  <HeroBackground />
                )}
              </>
            }
            className="h-full"
          >
            <Container className="h-full">
              <HeroContent
                titleHtmlOverride={
                  isBackground ? (currentBanner as any)?.title : undefined
                }
                contentHtmlOverride={
                  isBackground ? (currentBanner as any)?.content : undefined
                }
                isBackground={isBackground}
                banners={normalized}
                currentIndex={dotIndex}
                hiddenButton={(currentBanner as any)?.hidden_button == 1}
              />
              <div className="absolute z-20 bottom-3 lg:bottom-6 right-6 md:right-8 lg:right-12 xl:right-20 flex gap-4 items-center">
                <button
                  onClick={() =>
                    setDotIndex(
                      (p) =>
                        (p - 1 + normalized.length) %
                        Math.max(normalized.length, 1)
                    )
                  }
                  className="p-2 lg:p-3 2xl:p-4 rounded-full border border-white hover:bg-white/20 transition-all duration-300 cursor-pointer group"
                >
                  <ArrowLeftIcon
                    weight="bold"
                    className="text-white size-7 group-hover:scale-110 transition-all duration-300"
                  />
                </button>
                <button
                  onClick={() =>
                    setDotIndex((p) => (p + 1) % Math.max(normalized.length, 1))
                  }
                  className="p-2 lg:p-3 2xl:p-4 rounded-full border border-white hover:bg-white/20 transition-all duration-300 cursor-pointer group"
                >
                  <ArrowRightIcon
                    weight="bold"
                    className="text-white size-7 group-hover:scale-110 transition-all duration-300"
                  />
                </button>
              </div>
              <div className="absolute inset-x-0 left-1/2 bottom-6 hidden xl:flex items-center justify-between px-3">
                <div className="flex items-center gap-2">
                  {Array.from({ length: dotCount }).map((_, i) => (
                    <button
                      key={i}
                      aria-label={`Go to slide ${i + 1}`}
                      onClick={() => setDotIndex(i)}
                      className={
                        'h-3 w-3 2xl:h-[18px] 2xl:w-[18px] rounded-full transition-all duration-300 ' +
                        (dotIndex === i ? 'bg-[#FE6BBA] !w-10' : 'bg-white')
                      }
                    />
                  ))}
                </div>
              </div>
            </Container>
          </Section>
        </div>
        <div className="relative z-10 ">
          <LiveStreamComponent />
        </div>
      </div>
      <LiveStreamShow />
    </>
  )
}

export default HeroSection
