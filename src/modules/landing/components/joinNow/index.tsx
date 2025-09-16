'use client'

import Button from '@/core/components/ui/button'
import ScrollReveal from '@/core/components/animated/ScrollReveal'
import {
  CoinsIcon,
  HandHeartIcon,
  PencilSimpleLineIcon,
  ShareFatIcon,
  StarIcon,
  type Icon,
} from '@phosphor-icons/react'
import { useGetHomePage } from '@/services/home/queries'
import { Skeleton } from '@/components/ui/skeleton'
import Image from 'next/image'

// Interface định nghĩa cấu trúc dữ liệu cho mỗi bước tham gia
interface JoinStep {
  id: number
  icon: Icon
  title: string
  description: string
  stepNumber: string
}

// Dữ liệu các bước tham gia - dễ dàng thêm/sửa/xóa sau này
const joinSteps: JoinStep[] = [
  {
    id: 1,
    icon: PencilSimpleLineIcon,
    title: 'Đăng ký & Trải nghiệm',
    description:
      'Đăng ký nhóm trải nghiệm để nhận các sản phẩm làm đẹp hot nhất hoàn toàn miễn phí.',
    stepNumber: '01',
  },
  {
    id: 2,
    icon: StarIcon,
    title: 'Sáng tạo nội dung',
    description:
      'Viết những bài đánh giá chân thật về sản phẩm để chia sẻ đến cộng đồng.',
    stepNumber: '02',
  },
  {
    id: 3,
    icon: ShareFatIcon,
    title: 'Chia sẻ & Thu nhập',
    description:
      'Chia sẻ link giới thiệu và nhận hoa hồng hấp dẫn khi bạn bè mua hàng.',
    stepNumber: '03',
  },
  {
    id: 4,
    icon: CoinsIcon,
    title: 'Tạo doanh thu',
    description: 'Nhận 10% doanh thu khi bạn bè mua hàng',
    stepNumber: '04',
  },
  {
    id: 5,
    icon: HandHeartIcon,
    title: 'Gieo mầm hạnh phúc',
    description:
      'Cùng chúng tôi đóng góp vào các quỹ từ thiện để lan tỏa giá trị tốt đẹp.',
    stepNumber: '05',
  },
]

const JoinNow = () => {
  const { isLoading, data: homePage } = useGetHomePage()
  const data = homePage?.section5

  return (
    <div className="py-12 px-3 xl:py-24 xl:px-24 flex flex-col gap-10 justify-center items-center">
      <div className="flex flex-col items-center gap-2 xl:gap-4 w-full">
        {isLoading ? (
          <Skeleton className="w-3/5 h-12" />
        ) : (
          <div
            className="2xl:text-6xl xl:text-5xl text-2xl text-center font-bold text-greyscale-700"
            dangerouslySetInnerHTML={{ __html: data?.title }}
          >
            {/* Tham gia ngay, <br className="lg:hidden" />
            <span className="text-greyscale-400">lợi ích liền tay!</span> */}
          </div>
        )}
        {isLoading ? (
          <Skeleton className="w-4/5 h-7" />
        ) : (
          <p className="2xl:text-2xl xl:text-xl text-base text-center text-greyscale-700">
            {data?.subtitle}
          </p>
        )}
      </div>
      <div className="relative w-full">
        {/* Đường kẻ nối chỉ từ điểm đầu đến điểm cuối */}
        <div className="absolute top-0 bottom-0 lg:top-[calc(100%-102px)] lg:bottom-[106px] left-3.5 lg:left-[10%] lg:right-[10%] h-full lg:h-0.5 border-r-2 lg:border-t-2 border-dashed border-green-500 z-0"></div>

        <div className="grid grid-cols-1 lg:grid-cols-5 2xl:gap-8 lg:gap-4 gap-6 w-full">
          {data?.tab.map((step: any, index: number) => {
            // const IconComponent = step.icon
            return (
              <ScrollReveal
                key={index}
                direction="up"
                duration={0.6}
                delay={index * 0.15}
                distance={30}
                start="top 90%"
              >
                <div className="h-full relative flex flex-col gap-3 lg:gap-8 items-center justify-between">
                  <span className="absolute top-0 left-0 lg:hidden size-8 border-8 border-green-100 rounded-full bg-green-500"></span>

                  <div className="flex flex-col gap-3 xl:gap-8 items-center">
                    {/* Icon container với background và hiệu ứng xoay */}
                    <div className="relative size-[70px] xl:size-[100px] bg-[#2DD4BF] rounded-[20px] flex justify-center items-center">
                      <div className="size-[70px] xl:size-[100px] bg-[#2DD4BF]/30 rounded-[20px] absolute top-0 left-0 -rotate-15"></div>
                      {/* <IconComponent
                        weight="fill"
                        className="z-1 relative size-11 text-white"
                      /> */}
                      <Image
                        src={step.img}
                        alt={step.title || ''}
                        width={100}
                        height={100}
                        className="size-11 text-white z-10"
                      />
                    </div>
                    {/* Nội dung mô tả bước */}
                    <div className="flex flex-col gap-2 xl:gap-4 items-center px-7 lg:px-3">
                      <h3 className="text-center 2xl:text-2xl xl:text-xl text-base font-bold text-greyscale-700">
                        {step.title}
                      </h3>
                      <p className="2xl:text-base text-sm text-greyscale-700 text-center">
                        {step.subtitle}
                      </p>
                    </div>
                  </div>
                  {/* Số thứ tự bước */}
                  <div className="flex flex-col gap-8 items-center relative z-10">
                    <span className="hidden lg:block size-8 border-8 border-green-100 rounded-full bg-green-500"></span>
                    <span className="text-silver-sand-900 font-medium text-2xl lg:text-[40px]">
                      {step.name_step}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
      <Button>{data?.title_button}</Button>
    </div>
  )
}

export default JoinNow
