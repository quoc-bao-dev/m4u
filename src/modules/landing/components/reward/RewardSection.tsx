'use client'

import { Container, Section } from '@/core/components'
import React from 'react'
import RewardCard from './RewardCard'
import { HandCoinsIcon, TagIcon, TicketIcon } from '@phosphor-icons/react'
import { BlurCircle1, BlurCircle2 } from '@/core/components/animated/blur'

// Animation config removed for performance; see git history if needed

const RewardSection = () => {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null)

  return (
    <div className="py-[48px] md:py-[96px]">
      <Section
        background={
          <>
            <div className="absolute top-[-100px] hidden xl:block">
              <BlurCircle1 />
            </div>
            <div className="absolute top-[-200px] left-[300px] hidden xl:block">
              <BlurCircle2 />
            </div>
          </>
        }
      >
        <h1 className="text-[24px] sm:text-[32px] md:text-[64px] text-gray-700 font-bold text-center">
          ✨ Khám phá những ưu đãi đặc biệt
        </h1>
        <p className="text-[18px] md:text-[24px] text-gray-700 text-center">
          Trải nghiệm các sản phẩm hot nhất mà không tốn một xu.
        </p>

        <div className="md:pt-20"></div>
        <Container className="max-w-full md:max-w-[1150px] px-4">
          <div className="mt-10 relative flex  md:flex-row items-stretch justify-between gap-4 md:gap-10 w-full">
            {/* Elastic connector between the first two cards */}
            <div className="pointer-events-none rounded-full absolute bottom-1/2 left-1/2 -translate-x-1/3 translate-y-1/2 size-[40rem] opacity-50 bg-radial from-[#4AD29594] via-transparent to-transparent"></div>
            <div className="pointer-events-none rounded-full absolute bottom-1/2 left-1/2 -translate-x-2/3 translate-y-1/3 size-[40rem] opacity-50 bg-radial from-[#8080F1] via-transparent to-transparent"></div>

            <div
              className={`transition-transform duration-200 ease-out  ${
                activeIndex !== null && activeIndex !== 0
                  ? 'md:translate-x-6'
                  : ''
              }`}
            >
              <RewardCard
                icon={
                  <span>
                    <TagIcon
                      weight="fill"
                      className="size-[16px] md:size-[31px]"
                    />
                  </span>
                }
                label="Giảm giá sản phẩm"
                title="50%"
                bgColor="bg-[#E8FBF5]"
                iconColor="text-emerald-500"
                elasticColor="#E8FBF5"
                isActive={activeIndex === 0}
                isDimmed={activeIndex !== null && activeIndex !== 0}
                onMouseEnter={() => setActiveIndex(0)}
                onMouseLeave={() => setActiveIndex(null)}
                baseRotate={0}
                rotateOnHover={0}
              />
            </div>

            <div
              className={`transition-transform duration-200 ease-out ${
                activeIndex !== null && activeIndex !== 1
                  ? 'md:translate-x-6'
                  : ''
              }`}
            >
              <RewardCard
                icon={
                  <span>
                    <TicketIcon weight="fill" className="size-[16px] md:size-[31px]" />
                  </span>
                }
                label="Voucher mua hàng"
                title="9,000+"
                bgColor="bg-[#FDEAB7]"
                iconColor="text-amber-500"
                elasticColor="#FDEAB7"
                isActive={activeIndex === 1}
                isDimmed={activeIndex !== null && activeIndex !== 1}
                onMouseEnter={() => setActiveIndex(1)}
                onMouseLeave={() => setActiveIndex(null)}
                baseRotate={-10}
                rotateOnHover={-8}
              />
            </div>

            <div
              className={`transition-transform duration-200 ease-out ${
                activeIndex !== null && activeIndex !== 2
                  ? 'md:translate-x-6'
                  : ''
              }`}
            >
              <RewardCard
                icon={
                  <span>
                    <HandCoinsIcon weight="fill" className="size-[16px] md:size-[31px]" />
                  </span>
                }
                label="Chiết khấu lên đến"
                title="20%"
                bgColor="bg-[#E7F7FE]"
                iconColor="text-sky-500"
                elasticColor="#E7F7FE"
                isActive={activeIndex === 2}
                isDimmed={activeIndex !== null && activeIndex !== 2}
                onMouseEnter={() => setActiveIndex(2)}
                onMouseLeave={() => setActiveIndex(null)}
                baseRotate={0}
                disableElastic
                rotateOnHover={-8}
                activeScale={activeIndex === 2 ? 1.08 : 1.05}
              />
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}

export default RewardSection

// Unused demo blur kept for reference; disable to satisfy linter
/*
const Blur = () => {
  return (
    <svg
      width="622"
      height="622"
      viewBox="0 0 622 622"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.g
        filter="url(#filter0_f_17992_5719)"
        initial={ANIMATION_CONFIG.blur1.initial}
        animate={ANIMATION_CONFIG.blur1.animate}
        transition={ANIMATION_CONFIG.blur1.transition}
        style={{ willChange: 'transform' }}
      >
        <circle
          cx="188.567"
          cy="188.567"
          r="188.567"
          transform="matrix(0.941927 -0.335817 -0.335817 -0.941927 196.648 551.882)"
          fill="url(#paint0_linear_17992_5719)"
          fill-opacity="0.3"
        />
      </motion.g>
      <defs>
        <filter
          id="filter0_f_17992_5719"
          x="0.272186"
          y="0.271942"
          width="621.338"
          height="621.338"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="61.025"
            result="effect1_foregroundBlur_17992_5719"
          />
        </filter>
        <linearGradient
          id="paint0_linear_17992_5719"
          x1="99.1011"
          y1="236.086"
          x2="322.654"
          y2="250.929"
          gradientUnits="userSpaceOnUse"
        >
          <motion.stop
            offset="0%"
            animate={{
              stopColor: ['#4AD295', '#FFADD6', '#5EB2FC', '#4AD295'],
            }}
            transition={ANIMATION_CONFIG.blur1.gradientTransition}
          />
          <motion.stop
            offset="100%"
            animate={{
              stopColor: ['#5EB2FC', '#FFADD6', '#4AD295', '#5EB2FC'],
            }}
            transition={ANIMATION_CONFIG.blur1.gradientTransition}
          />
        </linearGradient>
      </defs>
    </svg>
  )
}

const Blur2 = () => {
  return (
    <svg
      width="753"
      height="753"
      viewBox="0 0 753 753"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.g
        filter="url(#filter0_f_17992_5718)"
        initial={ANIMATION_CONFIG.blur2.initial}
        animate={ANIMATION_CONFIG.blur2.animate}
        transition={ANIMATION_CONFIG.blur2.transition}
        style={{ willChange: 'transform' }}
      >
        <circle
          cx="253.864"
          cy="253.864"
          r="253.864"
          transform="matrix(0.941927 -0.335817 -0.335817 -0.941927 222.504 700.747)"
          fill="url(#paint0_linear_17992_5718)"
          fill-opacity="0.35"
        />
      </motion.g>
      <defs>
        <filter
          id="filter0_f_17992_5718"
          x="0.39035"
          y="0.390106"
          width="751.967"
          height="751.967"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="61.025"
            result="effect1_foregroundBlur_17992_5718"
          />
        </filter>
        <linearGradient
          id="paint0_linear_17992_5718"
          x1="253.864"
          y1="0"
          x2="253.864"
          y2="507.728"
          gradientUnits="userSpaceOnUse"
        >
          <motion.stop
            offset="0%"
            animate={{
              stopColor: ['#5EB2FC', '#FFADD6', '#B3B3FC', '#5EB2FC'],
            }}
            transition={ANIMATION_CONFIG.blur2.gradientTransition}
          />
          <motion.stop
            offset="100%"
            animate={{
              stopColor: ['#B3B3FC', '#FFADD6', '#5EB2FC', '#B3B3FC'],
            }}
            transition={ANIMATION_CONFIG.blur2.gradientTransition}
          />
        </linearGradient>
      </defs>
    </svg>
  )
}
*/