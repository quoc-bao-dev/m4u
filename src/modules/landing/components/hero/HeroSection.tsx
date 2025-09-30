'use client'
import { Container, Section } from '@/core/components/common/group'
import { useEffect, useMemo, useState } from 'react'
import { ArrowLeftIcon, ArrowRightIcon } from '@phosphor-icons/react'
import { useGetHomePage } from '@/services/home/queries'
import HeroBackground from './HeroBackground'
import HeroContent from './HeroContent'
import LiveStreamComponent from './LiveStreamComponent'
import LiveStreamShow from './LiveStreamShow'

const HeroSection = () => {
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
    return list.map((b: any) => (typeof b === 'string' ? { image: b } : { image: b?.image ?? b?.url, title: b?.title, content: b?.content }))
  }, [section1?.banner])
  const isBackground = section1?.is_background === '1'

  // controls centralized here; child components are fully controlled by props now
  const [dotCount] = useState(section1?.banner?.length || 0)
  const [dotIndex, setDotIndex] = useState(0)

  return (
    <>
      <div className="relative h-[calc(var(--vh-initial,1vh)*100)] flex flex-col overflow-hidden">
        <div className="flex-1 min-h-0">
          <Section
            background={
              <>
                <HeroBackground isBackground={isBackground} banners={normalized} currentIndex={dotIndex} />
              </>
            }
            className="h-full"
          >
            <Container className="h-full">
              <HeroContent
                titleHtmlOverride={isBackground ? normalized[dotIndex]?.title : undefined}
                contentHtmlOverride={isBackground ? normalized[dotIndex]?.content : undefined}
                isBackground={isBackground}
                banners={normalized}
                currentIndex={dotIndex}
              />
              <div className="absolute z-20 bottom-7 left-6 md:left-8 lg:left-12 xl:left-20 flex gap-4 items-center">
                <button
                  onClick={() => setDotIndex((p) => (p - 1 + normalized.length) % Math.max(normalized.length, 1))}
                  className="p-4 xl:p-5 rounded-full border border-white hover:bg-white/20 transition-all duration-300 cursor-pointer group"
                >
                  <ArrowLeftIcon
                    weight="bold"
                    className="text-white size-7 group-hover:scale-110 transition-all duration-300"
                  />
                </button>
                <button
                  onClick={() => setDotIndex((p) => (p + 1) % Math.max(normalized.length, 1))}
                  className="p-4 xl:p-5 rounded-full border border-white hover:bg-white/20 transition-all duration-300 cursor-pointer group"
                >
                  <ArrowRightIcon
                    weight="bold"
                    className="text-white size-7 group-hover:scale-110 transition-all duration-300"
                  />
                </button>
              </div>
              <div className="absolute inset-x-0 left-1/2 bottom-6 flex items-center justify-between px-3">
                <div className="flex items-center gap-2">
                  {Array.from({ length: dotCount }).map((_, i) => (
                    <button
                      key={i}
                      aria-label={`Go to slide ${i + 1}`}
                      onClick={() => setDotIndex(i)}
                      className={'h-3 w-3 2xl:h-[18px] 2xl:w-[18px] rounded-full transition-all duration-300 ' + (dotIndex === i ? 'bg-[#FE6BBA] !w-10' : 'bg-white')}
                    />
                  ))}
                </div>
              </div>
            </Container>
          </Section>
        </div>
        <div className="relative z-10 -mt-70 md:mt-0 ">
          <LiveStreamComponent />
        </div>
      </div>
      <LiveStreamShow />
    </>
  )
}

export default HeroSection
