'use client'

import { AnimatedHTMLTitle, AnimatedTitle, Container } from '@/core/components'
import { useTranslation } from '@/locale/hooks'
import { useGetBannerReviewHub } from '@/services/banner-review-hub'
import { motion, type Variants } from 'framer-motion'
import { useMemo } from 'react'
import AvatarStack from './AvatarStack'
import HeroImage from './HeroImage'
import ScrollDownCTA from './ScrollDownCTA'
import TestimonialCard from './TestimonialCard'

// Hàm format title từ API
const formatTitleFromAPI = (htmlTitle: string) => {
  if (!htmlTitle) return null

  // Remove font-size styles nhưng giữ lại màu sắc và class
  let formattedTitle = htmlTitle
    .replace(/style="[^"]*font-size:[^"]*"/gi, '') // Remove font-size
    .replace(/style="[^"]*"/gi, (match) => {
      // Nếu style chỉ còn color, giữ lại
      const cleanStyle = match
        .replace(/font-size:[^;]*;?/gi, '')
        .replace(/;+/g, ';')
        .replace(/^;|;$/g, '')
      return cleanStyle ? `style="${cleanStyle}"` : ''
    })
    .replace(/style=""/gi, '') // Remove empty style attributes

  // Xử lý xuống dòng - thay thế <br> và \n bằng space
  formattedTitle = formattedTitle
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  return formattedTitle
}

// Skeleton component cho HeroSection
const HeroSectionSkeleton = () => {
  return (
    <section className="relative md:h-[100svh] pt-[90px] md:pt-0 overflow-hidden">
      <div className="absolute left-0 right-0 bottom-0 md:-bottom-[50%] z-0 scale-[700%] md:scale-100">
        <img
          src="/blur/blur-hero-01.png"
          alt=""
          className="scale-[130%] w-full"
        />
      </div>
      <div className="md:absolute top-1/2 left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-full mb-10 md:mb-0">
        <Container>
          <div className="flex flex-col md:flex-row justify-between relative">
            {/* Right - Title & Avatar Skeleton */}
            <div className="w-full md:w-[35%]">
              <div className="flex flex-col space-y-[16px]">
                {/* Title Skeleton */}
                <div className="space-y-[8px]">
                  <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>

                {/* Subtitle Skeleton */}
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                </div>

                {/* Avatar Stack Skeleton */}
                <div className="flex flex-col space-y-[12px]">
                  <div className="flex -space-x-[8px]">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="size-[40px] lg:size-[64px] rounded-full bg-gray-200 animate-pulse"
                      />
                    ))}
                    <div className="size-[40px] lg:size-[64px] rounded-full bg-gray-200 animate-pulse"></div>
                  </div>
                  <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Center - Image Skeleton */}
            <div className="md:w-[30%] md:absolute left-1/2 top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
              <div className="md:block flex justify-center w-full">
                <div className="w-full h-64 md:h-96 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>
            </div>

            {/* Left - Testimonial Skeleton */}
            <div className="w-full md:w-[30%]">
              <div className="w-full md:h-[506px] flex flex-col relative">
                <div className="flex items-end gap-3 mb-4">
                  <div className="w-10 h-8 bg-gray-200 rounded animate-pulse"></div>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <div
                        key={star}
                        className="w-6 h-6 bg-gray-200 rounded animate-pulse"
                      />
                    ))}
                  </div>
                </div>

                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>

                <div className="mt-8 animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-24 mb-1"></div>
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  )
}

const HeroSection = () => {
  const { t } = useTranslation()

  // Fetch banner review hub data
  const {
    data: bannerData,
    isLoading,
    error,
  } = useGetBannerReviewHub({
    enabled: true,
  })

  // Memoize the animated title characters for performance
  const joinTitleChars = useMemo(() => {
    const joinText = t('trialHero.joinTitle')
    return joinText.split('').map((letter, index) => ({
      id: index + 1,
      letter: letter,
    }))
  }, [t])

  const experienceTitleChars = useMemo(() => {
    const experienceText = t('trialHero.experienceTitle')
    return experienceText.split('').map((letter, index) => ({
      id: index + 1,
      letter: letter,
    }))
  }, [t])

  const containerVariants: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.12 },
    },
  }

  // Hiển thị skeleton khi đang loading
  if (isLoading) {
    return <HeroSectionSkeleton />
  }

  return (
    <section className="relative md:h-[100svh] pt-[90px]  md:pt-0 overflow-hidden">
      <div className="absolute left-0 right-0 bottom-0 md:-bottom-[50%] z-0 scale-[700%] md:scale-100">
        <img
          src="/blur/blur-hero-01.png"
          alt=""
          className="scale-[130%] w-full"
        />
      </div>
      <div className="md:absolute top-1/2 left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-full mb-10 md:mb-0">
        <Container>
          <div className="flex flex-col md:flex-row justify-between relative">
            {/* Right */}
            <div className="w-full md:w-[35%]">
              <div className="flex flex-col space-y-[16px]">
                {/* Main Headline */}
                <div className="space-y-[8px]">
                  {bannerData?.data?.title ? (
                    <motion.h1
                      className="text-title font-bold leading-[110%]"
                      variants={containerVariants}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, amount: 0.3 }}
                    >
                      <AnimatedHTMLTitle
                        htmlContent={bannerData.data.title}
                        delay={0}
                        disableViewportDetection={true}
                      />
                    </motion.h1>
                  ) : (
                    <motion.h1
                      className="text-title font-bold leading-[110%]"
                      variants={containerVariants}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, amount: 0.3 }}
                    >
                      <AnimatedTitle
                        className="text-gray-900"
                        heroPerTitle={joinTitleChars}
                        delay={0}
                      />{' '}
                      <AnimatedTitle
                        className="text-[#FF8092] truncate"
                        heroPerTitle={experienceTitleChars}
                        delay={0.3}
                      />
                    </motion.h1>
                  )}
                </div>

                {/* Sub-headline */}
                <p className="text-desc font-medium text-gray-800">
                  {t('trialHero.writeReviewGetOffer')}
                </p>
                {/* Social Proof Section */}
                <AvatarStack
                  clientJoin={bannerData?.data?.ClientJoin}
                  countClientReview={bannerData?.data?.countClientReview}
                />
              </div>
            </div>
            {/* Center */}
            <div className="md:w-[30%] md:absolute left-1/2 top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 ">
              <div className="md:block flex justify-center w-full">
                <HeroImage src={bannerData?.data?.image} alt="Hero Banner" />
              </div>
            </div>
            {/* Left */}
            <div className="w-full md:w-[30%]">
              <TestimonialCard reviews={bannerData?.data?.Review} />
            </div>
          </div>
        </Container>
      </div>
      <ScrollDownCTA label={t('hero.viewNow')} />
    </section>
  )
}

export default HeroSection
