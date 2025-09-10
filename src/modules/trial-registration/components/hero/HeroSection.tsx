'use client'
import { AnimatedTitle, Container } from '@/core/components'
import { motion, type Variants } from 'framer-motion'
import AvatarStack from './AvatarStack'
import HeroImage from './HeroImage'
import ScrollDownCTA from './ScrollDownCTA'
import TestimonialCard from './TestimonialCard'

const HeroSection = () => {
  const containerVariants: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.12 },
    },
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
                  <motion.h1
                    className="text-title font-bold leading-[110%]"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.6 }}
                  >
                    <AnimatedTitle
                      className="text-gray-900"
                      heroPerTitle={[
                        { id: 1, letter: 'T' },
                        { id: 2, letter: 'h' },
                        { id: 3, letter: 'a' },
                        { id: 4, letter: 'm' },
                        { id: 5, letter: ' ' },
                        { id: 6, letter: 'g' },
                        { id: 7, letter: 'i' },
                        { id: 8, letter: 'a' },
                      ]}
                      delay={0}
                    />{' '}
                    <AnimatedTitle
                      className="text-[#FF8092] truncate"
                      heroPerTitle={[
                        { id: 1, letter: 't' },
                        { id: 2, letter: 'r' },
                        { id: 3, letter: 'ả' },
                        { id: 4, letter: 'i' },
                        { id: 5, letter: ' ' },
                        { id: 6, letter: 'n' },
                        { id: 7, letter: 'g' },
                        { id: 8, letter: 'h' },
                        { id: 9, letter: 'i' },
                        { id: 10, letter: 'ệ' },
                        { id: 11, letter: 'm' },
                      ]}
                      delay={0.3}
                    />
                  </motion.h1>
                </div>

                {/* Sub-headline */}
                <p className="text-desc font-medium text-gray-800">
                  viết review nhận ngay ưu đãi
                </p>
                {/* Social Proof Section */}
                <AvatarStack />
              </div>
            </div>
            {/* Center */}
            <div className="md:w-[30%] md:absolute left-1/2 top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 ">
              <div className="md:block flex justify-center w-full">
                <HeroImage />
              </div>
            </div>
            {/* Left */}
            <div className="w-full md:w-[30%]">
              <TestimonialCard />
            </div>
          </div>
        </Container>
      </div>
      <ScrollDownCTA />
    </section>
  )
}

export default HeroSection
