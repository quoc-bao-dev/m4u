import SvgScrollDraw from '@/core/components/animated/SvgScrollDraw'
import { IMAGES } from '@/core/constants/IMAGES'
import { CurrencyCircleDollar, VectorCommision } from '@/icons'
import Image from 'next/image'

const CommisionSection = () => {
  return (
    <div className="relative py-12 px-3 xl:p-24 flex flex-col items-end gap-4 xl:gap-10">
      {/* Blur blobs background layer */}
      {/* <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-visible"
      >
      </div> */}

      <div className="lg:px-3 w-fit flex flex-col gap-1 items-center lg:items-end">
        <h2 className="2xl:text-6xl xl:text-5xl text-2xl text-center font-bold text-greyscale-700">
          Lộ trình doanh thu <br className="lg:hidden" />
          <span className="text-greyscale-400">theo cấp bậc</span>
        </h2>
        <p className="2xl:text-2xl xl:text-xl text-base text-center text-greyscale-700">
          Bắt đầu từ người giới thiệu, viết review để lên Reviewer và trở thành
          Seller để tăng tỷ lệ hoa hồng.
        </p>
      </div>

      <div className="grid grid-cols-1  lg:grid-cols-3 xl:grid-cols-4 2xl:gap-8 gap-4 w-full px-3 xl:px-0">
        <div className="relative hidden xl:block">
          <div className="absolute 2xl:left-24 -left-10 2xl:-top-52 -top-60  max-w-none select-none pointer-events-none squiggle-les">
            <SvgScrollDraw
              className="squiggle-les"
              strokeColor="#FF8092"
              strokeWidth={1}
              start="top center"
              end="+=800"
              scrub
              triggerTarget=".squiggle-les"
              showMarker
              markerType="arrow"
              markerColor="#FF8092"
              markerSize={10}
            >
              <VectorCommision width={1306} height={836} />
            </SvgScrollDraw>
          </div>
        </div>
        <div className="rounded-3xl border border-gray-100">
          <h2 className="rounded-t-3xl flex justify-center items-center gap-1 pt-3 pb-10 px-2 font-normal 2xl:text-2xl xl:text-lg text-base text-white bg-gradient-to-r from-[#37CFFF] via-[#0D57C6] to-[#0F5ED6]">
            <CurrencyCircleDollar className="size-6 xl:size-7 text-blue-600" />
            Hoa hồng <span className="font-medium"> 5%</span>
          </h2>
          <div className="relative overflow-hidden rounded-3xl bg-white -mt-7 w-full aspect-[425/290]">
            <div className="p-6 flex flex-col gap-1">
              <p className="text-blue-600 2xl:text-4xl text-2xl font-medium capitalize">
                Người giới thiệu
              </p>
              <p className="text-[#555555] 2xl:text-base xl:text-sm text-base font-medium pr-[20%]">
                Chia sẻ link sản phẩm đến với bạn bè
              </p>
            </div>
            <div className="from-blue-400 bottom-0 -right-10 size-40 absolute pointer-events-none rounded-full opacity-50 bg-radial via-transparent to-transparent"></div>
            <div className="from-blue-400 -bottom-20 right-10 size-40 absolute pointer-events-none rounded-full opacity-50 bg-radial via-transparent to-transparent"></div>

            <Image
              src={IMAGES.commissionsReferral}
              alt="commissions-referral"
              width={500}
              height={500}
              className="w-[40%] aspect-[230/315] object-cover ml-auto absolute bottom-0 right-0"
            />
          </div>
        </div>
        <div className="rounded-3xl border border-gray-100">
          <h2 className="rounded-t-3xl flex justify-center items-center gap-1 pt-3 pb-10 px-2 font-normal 2xl:text-2xl xl:text-lg text-base text-white bg-gradient-to-r from-[#B0FF4B] to-[#11876B]">
            <CurrencyCircleDollar className="size-6 xl:size-7 text-green-600" />
            Hoa hồng <span className="font-medium"> 10 - 20%</span>
          </h2>
          <div className="relative overflow-hidden rounded-3xl bg-white -mt-7 w-full aspect-[425/290]">
            <div className="p-6 flex flex-col gap-1">
              <p className="text-green-600 2xl:text-4xl text-2xl font-medium capitalize">
                Reviewer
              </p>
              <p className="text-[#555555] 2xl:text-base xl:text-sm text-base font-medium pr-[20%]">
                Viết review chân thật để nhận voucher
              </p>
            </div>
            <div className="from-green-600 bottom-0 -right-10 size-40 absolute pointer-events-none rounded-full opacity-50 bg-radial via-transparent to-transparent"></div>
            <div className="from-green-600 -bottom-20 right-10 size-40 absolute pointer-events-none rounded-full opacity-50 bg-radial via-transparent to-transparent"></div>

            <Image
              src={IMAGES.commissionsReviewer}
              alt="commissions-referral"
              width={500}
              height={500}
              className="w-[40%] aspect-[230/315] object-cover ml-auto absolute bottom-0 right-0"
            />
          </div>
        </div>
        <div className="rounded-3xl border border-gray-100">
          <h2 className="rounded-t-3xl flex justify-center items-center gap-1 pt-3 pb-10 px-2 font-normal 2xl:text-2xl xl:text-lg text-base text-white bg-gradient-to-r from-[#D9EDFF] via-[#5236FF]/70 to-[#5236FF]">
            <CurrencyCircleDollar className="size-6 xl:size-7 text-indigo-600" />
            Hoa hồng <span className="font-medium"> 20 - 30%</span>
          </h2>
          <div className="relative overflow-hidden rounded-3xl bg-white -mt-7 w-full aspect-[425/290]">
            <div className="p-6 flex flex-col gap-1">
              <p className="text-indigo-600 2xl:text-4xl text-2xl font-medium capitalize">
                Seller
              </p>
              <p className="text-[#555555] 2xl:text-base xl:text-sm text-base font-medium pr-[20%]">
                Sau khi đạt đủ điểm review, bạn có thể bán hàng
              </p>
            </div>
            <div className="from-indigo-600 bottom-0 -right-10 size-40 absolute pointer-events-none rounded-full opacity-50 bg-radial via-transparent to-transparent"></div>
            <div className="from-indigo-600 -bottom-20 right-10 size-40 absolute pointer-events-none rounded-full opacity-50 bg-radial via-transparent to-transparent"></div>

            <Image
              src={IMAGES.commissionsSeller}
              alt="commissions-referral"
              width={500}
              height={500}
              className="w-[40%] aspect-[230/315] object-cover ml-auto absolute bottom-0 right-0"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommisionSection
