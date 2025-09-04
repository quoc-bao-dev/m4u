'use client'

import Image from 'next/image'
import { Container, Section } from '@/core/components/common/group'
import { RegisterCTA } from '../cta'

const InfluencerSection = () => {
  return (
    <Section className=" py-8 md:py-14">
      <Container className="">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10 rounded-3xl bg-[#FFFAED]">
          {/* Left: Image */}
          <div className="relative w-full md:flex-1">
            <div
              className="relative w-full overflow-hidden rounded-3xl"
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
          </div>

          {/* Right: Content */}
          <div className="w-full md:flex-1 md:max-w-[620px] text-center md:text-left">
            <h2 className="text-[28px] sm:text-[36px] lg:text-[48px] font-bold leading-tight text-[#0F172A]">
              Biến đam mê làm đẹp
              <br />
              <span className="text-[#0B0D21]">thành </span>
              <span className="text-[#0B0D21]">thu nhập!</span>
            </h2>
            <p className="mt-4 text-gray-600 text-base sm:text-lg">
              Đăng ký để dùng sản phẩm miễn phí và kiếm tiền từ review của bạn.
            </p>
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
