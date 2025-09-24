'use client'
import { Skeleton } from '@/components/ui/skeleton'
import { Timer } from '@/core/components'
import Rating from '@/core/components/common/Rating'
import Button from '@/core/components/ui/button'
import UserAvatar from '@/core/components/UserAvatar'
import { useDevice, useToast } from '@/core/hooks'
import { withAlpha } from '@/core/utils'
import { useRouter, useTranslation } from '@/locale'
import { useAuth } from '@/modules/auth'
import { useCartIconStore } from '@/modules/trial-registration/stores/useCartIconStore'
import { useCartStore } from '@/modules/trial-registration/stores/useCartStore'
import useModalRegistration from '@/modules/trial-registration/stores/useModalRegistration'
import { PenIcon } from '@phosphor-icons/react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useRef, useState } from 'react'

const Info = ({ data, isLoading }: { data: any, isLoading: boolean }) => {
  const { isMobile, isDesktop } = useDevice()
  const { t } = useTranslation()
  const router = useRouter()
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const itemRefs = useRef<(HTMLImageElement | null)[]>([])

  const tProduct = useTranslations('product')
  const { isAuthenticated } = useAuth()

  const { openCart } = useCartIconStore()
  const { showSuccess, showError } = useToast()
  const { addItem, isItemInCart } = useCartStore()
  const { open: openModalRegistration } = useModalRegistration()

  const handleRegistration = () => {
    if (!isAuthenticated) {
      openModalRegistration({
        productId: data?.id,
        productImage: data?.image,
        productName: data?.name,
        productBrand: data?.code,
        productColor: data?.background_color,
      })
    } else {
      if (!isItemInCart(data?.id)) {
        addItem(data?.id)
        showSuccess(t('cart.addedToCart'))
        openCart()
      } else {
        showError(t('cart.alreadyInCart'))
      }
    }
  }

  return (
    <div className="p-3 py-6 lg:p-6 xl:p-12 bg-yellow-100 flex flex-col lg:flex-row gap-4 lg:gap-6 xl:gap-8 md:rounded-3xl w-full">
      <div className="flex flex-col-reverse lg:flex-row gap-3 lg:h-[300px] xl:h-[350px] flex-shrink-0">
        <div className="relative">
          <div className="lg:hidden absolute right-0 w-20 xl:w-full h-full xl:h-20 bg-gradient-to-l xl:bg-gradient-to-t from-yellow-100 to-transparent pointer-events-none" />
          <div className="hidden lg:block absolute bottom-0 right-0 w-20 lg:w-full h-full lg:h-20 bg-gradient-to-l lg:bg-gradient-to-t from-yellow-100 to-transparent pointer-events-none" />

          <div
            ref={containerRef}
            className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto overflow-y-hidden lg:overflow-x-hidden h-full scroll-hidden w-fit flex-shrink-0"
          >
            {isLoading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} className="flex-shrink-0 size-24 xl:size-30 rounded-2xl " />
              ))
            ) : (
              data?.list_images?.map((img: string, index: number) => (
                <Image
                  key={`thumb-${index}`}
                  src={img}
                  alt={`product-thumb-${index + 1}`}
                  width={1000}
                  height={1000}
                  ref={(el) => {
                    itemRefs.current[index] = el
                  }}
                  onClick={() => {
                    setActiveIndex(index)
                    const el = itemRefs.current[index]
                    const isVertical = isDesktop
                    el?.scrollIntoView({
                      behavior: 'smooth',
                      block: isVertical ? 'center' : 'nearest',
                      inline: isVertical ? 'nearest' : 'center',
                    })
                  }}
                  className={`size-24 xl:size-30 bg-white rounded-2xl object-cover cursor-pointer ${activeIndex === index
                    ? 'border border-[#FF8092]'
                    : 'border border-transparent'
                    }`}
                />
              )))}
          </div>
        </div>
        <div className="relative size-full lg:size-[300px] xl:size-[350px] flex-shrink-0">
          {isLoading ? (
            <Skeleton className="size-full rounded-2xl object-cover" />
          ) : (
            <Image
              src={data?.list_images[activeIndex] ?? '/image/product/image-nodata.png'}
              alt="top-reviewer"
              width={1000}
              height={1000}
              className="size-full rounded-2xl object-cover bg-white"
            />
          )}
          <div className="xl:hidden absolute bottom-2 right-2 flex items-center gap-1.5">
            {data?.time_left_dd_hh_mm_ss && data?.time_left_dd_hh_mm_ss !== "0:00:00:00" ? <Timer initTime={data?.time_left_dd_hh_mm_ss} /> : null}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5 justify-center flex-1">
        <div className="flex flex-col gap-1 xl:gap-3 w-full">
          {isLoading ? (
            <>
              <Skeleton className="w-[20%] h-7" />
              <Skeleton className="w-[70%] h-8" />
              <Skeleton className="w-[100%] h-10" />
            </>
          ) : (
            <>
              <h2 className="text-xs lg:text-base xl:text-xl font-bold text-greyscale-900">
                {data?.code}
              </h2>
              <h3 className="text-base lg:text-2xl xl:text-[32px] xl:leading-[100%] font-normal text-greyscale-900">
                {data?.name}
              </h3>
              <div className="flex gap-3 justify-between w-full mt-2 lg:mt-0">
                <div className="flex items-center gap-1 2xl:gap-3">
                  <Rating
                    value={Number(data?.average_star)}
                    readOnly
                    maxWidth={isMobile ? 116 : 136}
                  />
                  <p className="whitespace-nowrap text-sm lg:text-xl text-greyscale-500">
                    <span className="text-greyscale-900 font-medium">{data?.average_star.toFixed(1)} </span>
                    ({data?.quantity_reviews} {tProduct('reviews')})
                  </p>
                </div>
                <div className="hidden xl:flex items-center gap-1.5">
                  {data?.time_left_dd_hh_mm_ss && data?.time_left_dd_hh_mm_ss !== "0:00:00:00" ? <Timer initTime={data?.time_left_dd_hh_mm_ss} className='!pr-0 !pb-0'/> : null}
                </div>
              </div>
            </>
          )}
        </div>
        {isLoading ? (
          <Skeleton className="w-[100%] h-24" />
        ) : (
          <div className="flex flex-col-reverse xl:flex-row gap-3 justify-between xl:items-center w-full">
            <div className="flex flex-col gap-1">
              <h4 className="text-lg lg:text-xl xl:text-2xl font-bold text-[#F5222D]">
                ⚡ {tProduct('slotsLeft', { count: data?.limit_people - data?.count_join })}
              </h4>
              <p className="text-sm lg:text-base xl:text-xl text-greyscale-600">
                <span className="text-greyscale-900 font-bold">
                  {data?.count_join} {tProduct('users')}
                </span>{' '}
                {tProduct('enrolledTrial')}
              </p>
            </div>
            <div className="flex -space-x-2 lg:-space-x-4">
              {data?.review?.data?.slice(0, 5).map((kol: any, index: number) => (
                <UserAvatar
                  key={`${kol.id}-${index}`}
                  src={kol?.client?.avatar}
                  userName={kol?.client?.fullname}
                  size={isMobile ? 40 : 48}
                />
              ))}
              {data?.review?.total > 5 && (
                <div className="flex-shrink-0 size-10 lg:size-12 rounded-full object-cover border-2 border-white bg-black flex items-center justify-center text-white text-base font-semibold">
                  +{data?.review?.total - 5}
                </div>
              )}
            </div>
          </div>
        )}

        {/* isSig === 0 nhảy qua đánh giá  */}
        {data?.isSig === 0 ?
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              router.push(`/submit-review/${data?.id_review}`)
            }}
            className="transform-gpu border-gradient-button-dynamic bg-white w-fit mt-2 py-2 px-3 sm:py-4 sm:px-5 md:py-2 md:px-5 rounded-full cursor-pointer flex items-center gap-3"
            style={{
              color: data?.background_color,
              transition: 'all 300ms ease',
              boxShadow: `0px 2px 4px ${withAlpha(data?.background_color, 0.26)}, -2px -2px 8px ${withAlpha(data?.background_color, 0.7)} inset, 2px 2px 8px -5px ${withAlpha(data?.background_color, 0.7)} inset`,
              '--accent-color': data?.background_color,
            } as React.CSSProperties}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = data?.background_color
              e.currentTarget.style.color = '#fff'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff'
              e.currentTarget.style.color = data?.background_color
            }}
          >
            <span className="truncate text-xs sm:text-base/[21px] ">{t('product.writeYourReview')}</span>
            <PenIcon />
          </button>
          :
          data?.isSig === null ?
            <Button onClick={handleRegistration}>{tProduct('registerBtn')}</Button>
            : null
        }
      </div>
    </div>
  )
}

export default Info
