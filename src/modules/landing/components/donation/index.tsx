import { OrbitingCircles } from '@/components/magicui/orbiting-circles'
import { IMAGES } from '@/core/constants/IMAGES'
import Image from 'next/image'

const Donation = () => {
  return (
    <div className="py-20 relative flex h-[80vh] w-full flex-col items-center justify-center overflow-hidden">
      <div className="relative flex flex-col justify-center items-center gap-6 w-[464px]">
        <Image
          src={IMAGES.heart1}
          alt="heart"
          width={24}
          height={24}
          className="absolute top-4 -right-4"
        />
        <Image
          src={IMAGES.heart2}
          alt="heart"
          width={24}
          height={24}
          className="absolute bottom-1/2 left-0"
        />
        <h2 className="text-[40px]/[100%] font-semibold text-greyscale-700 text-center">
          <span className="text-greyscale-400">
            Chung tay lan tỏa yêu thương,
          </span>
          đồng hành cùng mẹ đơn thân
        </h2>
        <div className="flex flex-col items-center gap-3">
          <h3 className="text-4xl font-bold text-pink-600">1,234,567,890đ</h3>
          <p className="text-base text-greyscale-700">Đã được quyên góp!</p>
        </div>
        <button className="border border-[#3B82F6] hover:bg-[#3B82F6] hover:text-white transition-all duration-300 py-4 px-5 rounded-full text-base font-semibold text-[#3B82F6] cursor-pointer">
          Tìm hiểu thêm
        </button>
      </div>
      <OrbitingCircles radius={600} speed={0.8}>
        <div className="flex-shrink-0 size-32 rounded-full overflow-hidden">
          <Image
            src={IMAGES.donation1}
            alt="donation"
            width={1000}
            height={1000}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="size-6 rounded-full bg-purple-300/72"></div>
        <div className="flex-shrink-0 size-32 rounded-full overflow-hidden">
          <Image
            src={IMAGES.donation2}
            alt="donation"
            width={100}
            height={100}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="size-4 rounded-full bg-[#887EF9]/72"></div>
        <div className="flex-shrink-0 size-32 rounded-full overflow-hidden">
          <Image
            src={IMAGES.donation3}
            alt="donation"
            width={100}
            height={100}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="size-6 rounded-full bg-[#FCD34D]/72"></div>
        <div className="flex-shrink-0 size-32 rounded-full overflow-hidden">
          <Image
            src={IMAGES.donation4}
            alt="donation"
            width={100}
            height={100}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="size-6 rounded-full bg-[#FF8092]/72"></div>

      </OrbitingCircles>
      <OrbitingCircles iconSize={30} radius={330} reverse speed={0.8}>
        <div className="flex-shrink-0 size-[100px] rounded-full overflow-hidden">
          <Image
            src={IMAGES.donation5}
            alt="donation"
            width={500}
            height={500}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="size-4 rounded-full bg-[#FF8092]/72"></div>
        <div className="size-4 rounded-full bg-[#38BDF8]/72"></div>
        <div className="flex-shrink-0 size-[100px] rounded-full overflow-hidden">
          <Image
            src={IMAGES.donation6}
            alt="donation"
            width={500}
            height={500}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="size-6 rounded-full bg-[#FFC4E3]/72"></div>
        <div className="flex-shrink-0 size-[100px] rounded-full overflow-hidden">
          <Image
            src={IMAGES.donation7}
            alt="donation"
            width={500}
            height={500}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="size-4 rounded-full bg-[#A0DFF9]/72"></div>
      </OrbitingCircles>
    </div>
  )
}

export default Donation
