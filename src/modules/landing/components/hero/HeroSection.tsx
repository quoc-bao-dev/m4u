"use client"
import { Container, Section } from '@/core/components/common/group'
import { useEffect } from 'react'
import HeroBackground from './HeroBackground'
import HeroContent from './HeroContent'
import LiveStreamComponent from './LiveStreamComponent'
import LiveStreamShow from './LiveStreamShow'

const HeroSection = () => {
  //lấy chiều cao của viewport
  useEffect(() => {
    const inner = window.innerHeight
    const visual = (window.visualViewport && window.visualViewport.height) || inner
    const initial = Math.min(inner, visual)
    const root = document.documentElement
    root.style.setProperty('--vh-initial', `${initial * 0.01}px`)
  }, [])

  return (
    <>
      <div className="relative h-[calc(var(--vh-initial,1vh)*100)] flex flex-col overflow-hidden">
        <div className="flex-1 min-h-0">
          <Section
            background={
              <>
                <HeroBackground />
              </>
            }
            className="h-full"
          >
            <Container className="h-full">
              <HeroContent />
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
