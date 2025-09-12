'use client'

import React from 'react'
import Image from 'next/image'
import { RegisterCTA } from '../cta'
import Link from 'next/link'
import { useGetHomePage } from '@/services/home/queries'
import { Skeleton } from '@/components/ui/skeleton'

const HeroContent = () => {
  const { isLoading, data: homePage } = useGetHomePage()
  const data = homePage?.section1

  return (
    <div className="grid grid-cols-1 grid-rows-[1fr_auto] md:grid-rows-1 md:grid-cols-2 lg:gap-12 h-full">
      {/* Left Content */}
      <div className="lg:space-y-8 lg:h-full md:py-10 lg:py-0">
        <div className="flex items-center w-full md:h-full mt-20 md:mt-0">
          <div className="w-full">
            {/* Main Heading */}
            <div className="space-y-4 w-full">
              <style jsx>{`
                .hero-title {
                  font-size: 24px;
                }

                .hero-subtitle {
                  font-size: 12px;
                }

                .hero-image {
                  width: 50%;
                  height: 50%;
                }

                @media (min-height: 600px) {
                  .hero-title {
                    font-size: inherit;
                  }

                  .hero-subtitle {
                    font-size: inherit;
                  }

                  .hero-image {
                    width: inherit;
                    height: inherit;
                  }
                }
              `}</style>

              <div className="text-[42px] md:text-[48px] lg:text-[64px] xl:text-[72px] 2xl:text-[88px]">
                {isLoading ? (
                  <Skeleton className="w-4/5 h-36" />
                ) : (
                  <h1
                    className="hero-title font-bold leading-[120%] md:leading-none"
                    dangerouslySetInnerHTML={{ __html: data?.title }}
                  />
                )}
              </div>

              <div className="text-xl lg:text-3xl xxl:text-[48px] text-gray-700 leading-relaxed">
              {isLoading ? (
                  <Skeleton className="w-4/5 h-24" />
                ) : (
                <div
                  className="hero-subtitle "
                  dangerouslySetInnerHTML={{ __html: data?.content }}
                />
                )}
              </div>
            </div>
            {/* CTA Button */}
            <div className="hidden md:block">
              <Link href={'/vi/trial-registration'}>
                <RegisterCTA
                  className="mt-4"
                  label="Đăng ký trải nghiệm ngay"
                />
              </Link>
            </div>

            <div className="block md:hidden">
              <Link href={'/vi/trial-registration'}>
                <RegisterCTA className="mt-4" label="Đăng ký ngay" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Right Content - Image */}
      <div className="relative md:mt-0 h-[367px] md:h-full min-h-0 ">
        <div className="relative h-full w-full flex justify-end items-end left-22 -top-70 md:top-0">
          <div className="relative w-[90%] h-[90%] lg:w-[90%] lg:h-[90%] flex items-end justify-end">
            <div className="hero-image ">
              <Image
                src="/image/hero-baner/image-02.png"
                alt="Hero Banner"
                fill
                className="md:max-h-full xl:pt-40 object-contain object-bottom h-full"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroContent
