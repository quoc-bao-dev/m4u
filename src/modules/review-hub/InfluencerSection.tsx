'use client'

import Image from 'next/image'
import { RegisterCTA } from '../landing/components/cta'
import Button from '@/core/components/ui/button'

const Influencer = () => {
  return (
    <div className="w-full flex flex-col md:flex-row items-center gap-6 xl:gap-10 rounded-3xl bg-[#FFFAED] pb-10 md:pb-0">
      {/* Left: Image */}
      <div className="relative w-full md:w-1/2 aspect-[845/600] overflow-hidden rounded-3xl">
        <Image
          src="/image/influencer/image-01.png"
          alt="influencer"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Right: Content */}
      <div className="w-full md:flex-1 flex flex-col gap-2 lg:gap-4 text-left px-3 md:px-0">
        <h2 className="text-[24px] lg:text-[40px] 2xl:text-[64px] font-bold leading-tight text-[#0F172A]">
          <span className="text-gray-400">Biến đam mê làm đẹp</span>{' '}
          <br className="hidden xl:block" />
          thành thu nhập!
        </h2>
        <p className="text-gray-600 text-base lg:text-lg">
          Đăng ký để dùng sản phẩm miễn phí và kiếm tiền từ review của bạn.
        </p>
        <Button>Đăng ký trải nghiệm ngay </Button>
      </div>
    </div>
  )
}

export default Influencer
