'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { RegisterCTA } from '../cta'
import { useGetHomePage } from '@/services/home/queries'
import { Skeleton } from '@/components/ui/skeleton'
import { Link } from '@/locale'
import { motion } from 'framer-motion'

const HeroContent = ({
  titleHtmlOverride,
  contentHtmlOverride,
  isBackground,
  banners,
  currentIndex,
}: {
  titleHtmlOverride?: string
  contentHtmlOverride?: string
  isBackground: boolean
  banners: { image?: string; alt?: string; title?: string; content?: string }[]
  currentIndex: number
}) => {
  const { isLoading, data: homePage } = useGetHomePage()
  const data = homePage?.section1
  const [titleHtml, setTitleHtml] = useState<string>('')
  const [contentHtml, setContentHtml] = useState<string>('')
  useEffect(() => {
    const meta = (banners?.[currentIndex] as any) || {}
    setTitleHtml(meta?.title || '')
    setContentHtml(meta?.content || '')
  }, [banners, currentIndex])


  const displayTitle = titleHtmlOverride ?? titleHtml
  const displayContent = contentHtmlOverride ?? contentHtml

  return (
    <div className="relative flex flex-col lg:grid grid-cols-1 grid-rows-[1fr_auto] md:grid-rows-1 md:grid-cols-2 gap-4 lg:gap-12 h-full">
      <div className="lg:space-y-8 h-fit lg:h-full md:py-10 lg:py-0">
        <div className="flex items-center w-full md:h-full mt-20 md:mt-0">
          <div className="w-full">
            {/* Main Heading */}
            <div className="space-y-4 w-full">
              <div className="text-[42px] md:text-[48px] lg:text-[64px] xl:text-[72px] 2xl:text-[88px]">
                {isLoading ? (
                  <Skeleton className="w-4/5 h-36" />
                ) : (
                  <motion.div
                    key={`title-${currentIndex}`}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ type: 'spring', stiffness: 140, damping: 48, mass: 1.2 }}
                    style={{ willChange: 'transform, opacity' }}
                    className="hero-title font-bold leading-[120%]! md:leading-none"
                    dangerouslySetInnerHTML={{ __html: displayTitle }}
                  />
                )}
              </div>

              <div className="text-xl lg:text-3xl xxl:text-[48px] text-gray-700 leading-relaxed">
                {isLoading ? (
                  <Skeleton className="w-4/5 h-24" />
                ) : (
                  <motion.div
                    key={`content-${currentIndex}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    style={{ willChange: 'transform, opacity' }}
                    className="hero-subtitle"
                    dangerouslySetInnerHTML={{ __html: displayContent }}
                  />
                )}
              </div>
            </div>
            {/* CTA Button */}
            <div className="hidden md:block w-fit">
              <Link href={'/trial-registration'} className='w-fit'>
                <RegisterCTA className="mt-4" label={data?.title_button} />
              </Link>
            </div>

            <div className="block md:hidden">
              <Link href={'/trial-registration'}>
                <RegisterCTA className="mt-4" label={data?.title_button} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Right Content - Slider (Fade). Hidden when background image is enabled */}
      {!isBackground && (
        <div className="relative flex-1 flex h-full min-h-0">
          {isLoading ? (
            <Skeleton className="w-full h-[80%] mt-auto" />
          ) : (
            <div className="relative h-full w-full">
              {(banners?.length ? banners : [
                { image: '', alt: 'Hero Banner' },
              ]).map((item, idx) => (
                <div
                  key={idx}
                  className="absolute inset-0 transition-opacity duration-1500 ease-in-out"
                  style={{ opacity: currentIndex === idx ? 1 : 0 }}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={item.image || '/image/hero-baner/image-02.png'}
                      alt={item.alt || 'Hero Banner'}
                      fill
                      className="md:max-h-full lg:pt-20 xl:pt-40 object-contain object-bottom h-full"
                      priority={idx === 0}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default HeroContent
