'use client'
import Rating from '@/core/components/common/Rating'
import { IMAGES } from '@/core/constants/IMAGES'
import { useDevice } from '@/core/hooks'
import { StarIcon } from '@phosphor-icons/react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useRef } from 'react'

type SideImage = {
  image: string | any
  rating: number
}

type SimilarProduct = {
  id: string
  brand: string
  name: string
  rating: number
  reviews: number
  productImage: string | any
  sideImages: SideImage[]
}

const Similar = () => {
  const { isMobile, isTablet } = useDevice()
  const tProduct = useTranslations('product')
  const firstVideoRefs = useRef<Record<string, HTMLVideoElement | null>>({})
  const similarProducts: SimilarProduct[] = [
    {
      id: 'product-1',
      brand: 'MANYO',
      name: 'Panthetoin Deep Moisture Mask',
      rating: 4.0,
      reviews: 69,
      productImage: IMAGES.topProduct1,
      sideImages: [
        {
          image:
            'https://cdn2.videowise.com/converted/videos/1747066892278_wid_NjgyMjIwMGMzZjJiOTAwMDU4OGMxZTNm_h264cmobile.mp4',
          rating: 4.9,
        },
        {
          image:
            'https://cdn2.videowise.com/converted/videos/1747066892278_wid_NjgyMjIwMGMzZjJiOTAwMDU4OGMxZTNm_h264cmobile.mp4',
          rating: 4.9,
        },
        {
          image:
            'https://cdn2.videowise.com/converted/videos/1747066892278_wid_NjgyMjIwMGMzZjJiOTAwMDU4OGMxZTNm_h264cmobile.mp4',
          rating: 4.9,
        },
      ],
    },
    {
      id: 'product-2',
      brand: 'MANYO',
      name: 'Panthetoin Deep Moisture Mask',
      rating: 4.0,
      reviews: 69,
      productImage: IMAGES.topProduct2,
      sideImages: [
        {
          image:
            'https://cdn2.videowise.com/converted/videos/1747066892278_wid_NjgyMjIwMGMzZjJiOTAwMDU4OGMxZTNm_h264cmobile.mp4',
          rating: 4.9,
        },
        {
          image:
            'https://cdn2.videowise.com/converted/videos/1747066892278_wid_NjgyMjIwMGMzZjJiOTAwMDU4OGMxZTNm_h264cmobile.mp4',
          rating: 4.9,
        },
        {
          image:
            'https://cdn2.videowise.com/converted/videos/1747066892278_wid_NjgyMjIwMGMzZjJiOTAwMDU4OGMxZTNm_h264cmobile.mp4',
          rating: 4.9,
        },
      ],
    },
  ]
  return (
    <div className="flex flex-col justify-center items-center gap-4 lg:gap-10 py-12 xl:py-24 w-full px-3 lg:px-0">
      <h2 className="text-gradient-blue-black font-bold text-2xl lg:text-5xl 2xl:text-[64px] xl:leading-[100%] tracking-tight">
        {tProduct('exploreSimilarProducts')}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 xl:gap-10 2xl:gap-16">
        {similarProducts.map((product) => (
          <div
            key={product.id}
            className="flex flex-col lg:flex-row gap-3 lg:gap-5"
          >
            <div className="relative rounded-3xl overflow-hidden">
              <div className="bg-white absolute bottom-3 left-3 right-3 flex flex-col gap-1 lg:gap-2 rounded-2xl p-4 xl:p-6">
                <h2 className="text-sm xl:text-base font-bold text-greyscale-900">
                  {product.brand}
                </h2>
                <h3 className="text-base xl:text-2xl lg:leading-[100%] font-normal text-greyscale-900">
                  {product.name}
                </h3>
                <div className="flex items-center gap-3">
                  <Rating
                    value={Number(product.rating)}
                    readOnly
                    maxWidth={isMobile || isTablet ? 116 : 136}
                  />
                  <p className="text-sm xl:text-lg 2xl:text-xl leading-[80%] text-greyscale-500">
                    <span className="text-greyscale-900 font-medium">
                      {product.rating.toFixed(1)}{' '}
                    </span>
                    ({product.reviews} {tProduct('reviews')})
                  </p>
                </div>
              </div>
              <Image
                src={product.productImage}
                alt="product"
                width={1000}
                height={1000}
                className="size-full object-cover"
              />
            </div>
            <div className="flex-shrink-0 flex lg:flex-col gap-3 xl:gap-5 w-full lg:w-fit overflow-auto scroll-hidden">
              {product.sideImages.map((item, index) => (
                <div
                  key={`${product.id}-side-${index}`}
                  className="relative size-[120px] lg:size-[100px] xl:size-[145px] 2xl:size-[190px] flex-shrink-0 rounded-2xl overflow-hidden"
                >
                  <div className="absolute top-1 lg:top-2 right-1 lg:right-2 py-0.5 px-1 h-fit flex items-center gap-1 bg-white rounded-full">
                    <StarIcon
                      weight="fill"
                      className="size-3 lg:size-4 text-yellow-600"
                    />
                    <span className="text-[10px] xl:text-sm font-medium text-greyscale-900">
                      {item.rating}
                    </span>
                  </div>
                  <video
                    ref={(el) => {
                      if (index === 0) {
                        firstVideoRefs.current[product.id] = el
                      }
                    }}
                    src={item.image as string}
                    muted
                    loop
                    playsInline
                    autoPlay={index === 0}
                    onMouseEnter={(e) => {
                      if (index !== 0) {
                        const first = firstVideoRefs.current[product.id]
                        if (first) first.pause()
                        e.currentTarget.play()
                      } else {
                        e.currentTarget.play()
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (index !== 0) {
                        e.currentTarget.pause()
                        const first = firstVideoRefs.current[product.id]
                        if (first) first.play()
                      } else {
                        e.currentTarget.play()
                      }
                    }}
                    width={1000}
                    height={1000}
                    className="cursor-pointer size-full rounded-2xl object-cover bg-[#D5DEDA]"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Similar
