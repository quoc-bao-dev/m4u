import Image from 'next/image'

const EventImage = ({ src }: { src: string }) => {
  return (
    <div className="relative ">
      <div className="absolute inset-0  rounded-[8%] overflow-hidden z-0">
        <Image src={src} alt="" fill className="object-cover px-0.5 pb-0.5" />
      </div>
      <div className="absolute bottom-[4%] right-[2%] z-10 size-[38px] md:size-[70px] lg:size-[70px] xl:size-[80px] 2xl:size-[90px]">
        <Image src="/image/logo/logo.svg" alt="" width={100} height={100} />
      </div>
      <img
        src="/image/frame/image-01.svg"
        className="w-full relative z-0"
        alt=""
      />
    </div>
  )
}

export default EventImage
