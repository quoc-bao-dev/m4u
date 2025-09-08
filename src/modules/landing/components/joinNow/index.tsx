'use client'

import Button from '@/core/components/ui/button'
import {
  CoinsIcon,
  HandHeartIcon,
  PencilSimpleLineIcon,
  ShareFatIcon,
  StarIcon,
  type Icon,
} from '@phosphor-icons/react'

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
  return (
    <div className="py-12 px-3 xl:py-24 xl:px-24 flex flex-col gap-10 justify-center items-center">
      <div className="flex flex-col items-center gap-2 xl:gap-4">
        <h2 className="2xl:text-6xl xl:text-5xl text-2xl text-center font-bold text-greyscale-700">
          Tham gia ngay, <br className="lg:hidden" />
          <span className="text-greyscale-400">lợi ích liền tay!</span>
        </h2>
        <p className="2xl:text-2xl xl:text-xl text-base text-center text-greyscale-700">
          Quy trình hợp tác đơn giản, giúp bạn biến đam mê làm đẹp thành thu
          nhập.
        </p>
      </div>
      <div className="relative w-full">
        {/* Đường kẻ nối chỉ từ điểm đầu đến điểm cuối */}
        <div className="absolute top-0 bottom-0 lg:top-[calc(100%-102px)] lg:bottom-[106px] left-3.5 lg:left-[10%] lg:right-[10%] h-full lg:h-0.5 border-r-2 lg:border-t-2 border-dashed border-green-500 z-0"></div>

        <div className="grid grid-cols-1 lg:grid-cols-5 2xl:gap-8 lg:gap-4 gap-6 w-full">
          {joinSteps.map((step) => {
            const IconComponent = step.icon
            return (
              <div
                key={step.id}
                className="relative flex flex-col gap-3 lg:gap-8 items-center justify-between"
              >
                <span className="absolute top-0 left-0 lg:hidden size-8 border-8 border-green-100 rounded-full bg-green-500"></span>

                <div className="flex flex-col gap-3 xl:gap-8 items-center">
                  {/* Icon container với background và hiệu ứng xoay */}
                  <div className="relative size-[70px] xl:size-[100px] bg-[#2DD4BF] rounded-[20px] flex justify-center items-center">
                    <div className="size-[70px] xl:size-[100px] bg-[#2DD4BF]/30 rounded-[20px] absolute top-0 left-0 -rotate-15"></div>
                    <IconComponent
                      weight="fill"
                      className="z-1 relative size-11 text-white"
                    />
                  </div>
                  {/* Nội dung mô tả bước */}
                  <div className="flex flex-col gap-2 xl:gap-4 items-center px-7">
                    <h3 className="text-center 2xl:text-2xl xl:text-xl text-base font-bold text-greyscale-700">
                      {step.title}
                    </h3>
                    <p className="2xl:text-base text-sm text-greyscale-700 text-center">
                      {step.description}
                    </p>
                  </div>
                </div>
                {/* Số thứ tự bước */}
                <div className="flex flex-col gap-8 items-center relative z-10">
                  <span className="hidden lg:block size-8 border-8 border-green-100 rounded-full bg-green-500"></span>
                  <span className="text-silver-sand-900 font-medium text-2xl lg:text-[40px]">
                    {step.stepNumber}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <Button>Đăng ký trải nghiệm ngay</Button>
    </div>
  )
}

export default JoinNow
