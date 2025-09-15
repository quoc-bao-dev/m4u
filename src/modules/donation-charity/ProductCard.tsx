import { IMAGES } from '@/core/constants/IMAGES'
import { PolygonBg } from '@/icons'
import Image from 'next/image'

interface ProductCardProps {
  brand: string
  productName: string
  contributionPercentage: number
  imageSrc?: string
  className?: string
  scale?: number
  colorScheme?: 'yellow' | 'pink' | 'blue' | 'green'
}

const ProductCard = ({ 
  brand, 
  productName, 
  contributionPercentage, 
  imageSrc = IMAGES.deal2,
  className = '',
  scale = 0.8,
  colorScheme = 'yellow'
}: ProductCardProps) => {
  // Color schemes
  const colorSchemes = {
    yellow: {
      polygon: '#FCD34D',
      card: 'bg-yellow-300',
      bottom: 'bg-yellow-500'
    },
    pink: {
      polygon: '#F472B6',
      card: 'bg-pink-300',
      bottom: 'bg-pink-500'
    },
    blue: {
      polygon: '#60A5FA',
      card: 'bg-blue-300',
      bottom: 'bg-blue-500'
    },
    green: {
      polygon: '#34D399',
      card: 'bg-green-300',
      bottom: 'bg-green-500'
    }
  }

  const colors = colorSchemes[colorScheme]
  return (
    <div 
      className={`flex flex-col h-full items-center w-[400px] ${className}`}
      style={{ 
        transform: `scale(${scale})`,
        transformOrigin: 'bottom center'
      }}
    >
      <div className='relative w-[90%] aspect-square'>
        <PolygonBg className={`absolute inset-0 pointer-events-none`} style={{ color: colors.polygon }} />
        <Image 
          src={imageSrc} 
          alt={productName} 
          width={1000} 
          height={1000} 
          className='object-cover absolute inset-0' 
        />
      </div>

      <div className={`-mt-[20%] w-full flex flex-col rounded-t-lg rounded-b-[28px] ${colors.card}`}>
        <div className='p-4 pt-36 flex flex-col items-center justify-center'>
          <h3 className={`text-base font-bold text-greyscale-900`}>
            {brand}
          </h3>
          <p className={`h-16 text-2xl font-medium text-greyscale-700 text-center line-clamp-2`}>
            {productName}
          </p>
        </div>
        <div className={`p-4 pt-1.5 ${colors.bottom} shadow-[0px_-5.58px_4.18px_0px_#C8A23BBF_inset] rounded-b-[28px]`}>
          <p className={`text-xl text-greyscale-700 text-center`}>
            <span className='font-bold'>{contributionPercentage}% </span> contribution
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
