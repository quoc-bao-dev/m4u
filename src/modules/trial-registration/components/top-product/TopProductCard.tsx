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
      <div className="text-center">
        <p className="text-[32px] font-bold text-gray-900">{formattedCount}</p>
        <p className="text-gray-400 text-[20px]">reviews</p>
      </div>

      <div className="relative mt-4">
        <div className="relative z-10 w-[140px] h-[140px] rounded-full border border-gray-200 bg-white overflow-hidden flex items-center justify-center shadow-sm">
          <Image src={image} alt={alt} width={160} height={160} />
        </div>
      </div>
    </div>
  )
}

export default TopProductCard
