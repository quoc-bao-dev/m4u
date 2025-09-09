import Image from 'next/image'

type TopProductCardProps = {
  count: number | string
  image: string
  alt?: string
  className?: string
}

const TopProductCard = ({
  count,
  image,
  alt = 'top-product',
  className,
}: TopProductCardProps) => {
  const formattedCount =
    typeof count === 'number' ? count.toLocaleString('en-US') : count

  return (
    <div className={`w-full flex flex-col items-center ${className ?? ''}`}>
      <div className="relative">
        <div className="absolute bottom-[86%] md:bottom-[102%] left-1/2 translate-x-[-50%]">
          <div className="text-center">
            <p className="text-xl md:text-[32px] font-bold text-gray-900">
              {formattedCount}
            </p>
            <p className="text-gray-400 text-sm md:text-[20px]">reviews</p>
          </div>
        </div>
        <div className="relative z-10  scale-[60%]  md:scale-[70%]  lg:scale-[100%] size-[140px] rounded-full border border-gray-200 bg-white overflow-hidden flex items-center justify-center shadow-sm">
          <Image src={image} alt={alt} width={160} height={160} />
        </div>
      </div>
    </div>
  )
}

export default TopProductCard
