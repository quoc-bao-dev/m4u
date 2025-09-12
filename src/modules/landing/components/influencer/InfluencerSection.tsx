'use client'

import Image from 'next/image'
import { Container, Section } from '@/core/components/common/group'
import { RegisterCTA } from '../cta'
import { useGetHomePage } from '@/services/home/queries'
import { Skeleton } from '@/components/ui/skeleton'

const InfluencerSection = () => {
  const { isLoading, data: homePage } = useGetHomePage()
  const data = homePage?.section9
  console.log(data)
  return (
    <Section className=" py-8 md:py-14">
      <Container className="">
        <div className="flex flex-col lg:flex-row items-center gap-6 xl:gap-10 rounded-3xl bg-[#FFFAED] pb-10 md:pb-0">
          {/* Left: Image */}
          <div
            className="relative w-full lg:w-1/2 overflow-hidden rounded-3xl max-w-[800px] "
            style={{ aspectRatio: '845/600' }}
          >
            <Image
              src="/image/influencer/image-01.png"
              alt="influencer"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Right: Content */}
          <div className="w-full md:flex-1 md:max-w-[620px] text-center md:text-left">
            {isLoading ? (
              <Skeleton className="w-4/5 h-24" />
            ) : (
              <div
                className="text-[24px] lg:text-[40px] 2xl:text-[64px] font-bold leading-tight text-[#0F172A]"
                dangerouslySetInnerHTML={{ __html: data?.title }}
              >
                {/* <span className="text-gray-400">Biến đam mê làm đẹp</span>{' '}
              <br className="hidden xl:block" />
              thành thu nhập! */}
              </div>
            )}
            {isLoading ? (
              <Skeleton className="w-[90%] h-9 mt-2" />
            ) : (
              <p className="mt-4 text-gray-600 text-base sm:text-lg">
                {data?.subtitle}
              </p>
            )}
            <RegisterCTA
              className="mt-6 inline-flex"
              label="Đăng ký trải nghiệm ngay"
            />
          </div>
        </div>
      </Container>
    </Section>
  )
}

export default InfluencerSection
