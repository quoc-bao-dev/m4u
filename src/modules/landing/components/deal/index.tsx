'use client'

import { Lightning } from '@/icons'
import { ArrowLeftIcon, ArrowRightIcon, PenIcon, StarIcon, PauseIcon, PlayIcon } from '@phosphor-icons/react'
import Image from 'next/image'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Button from '@/core/components/ui/button'
import { useGetHomePage } from '@/services/home/queries'
import { Skeleton } from '@/components/ui/skeleton'
import { Link, useRouter } from '@/locale'
import { useTranslations } from 'next-intl'
import { getRatingI18nKey, withAlpha } from '@/core/utils'
import { Timer } from '@/core/components'
import Rating from '@/core/components/common/Rating'
import { useAuth } from '@/modules/auth'
import { useToast } from '@/core/hooks'
import { useCartIconStore } from '@/modules/trial-registration/stores/useCartIconStore'
import { useCartStore } from '@/modules/trial-registration/stores/useCartStore'
import useModalRegistration from '@/modules/trial-registration/stores/useModalRegistration'

const Deal: React.FC = () => {
  const { isLoading, data: homePage } = useGetHomePage()
  const data = homePage?.section7
  const deals = homePage?.product_outstanding
  const router = useRouter()

  const t = useTranslations()
  const tProduct = useTranslations('product')

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    dragFree: true,
    align: 'center',
    containScroll: 'trimSnaps',
  })
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const bgRef = useRef<HTMLDivElement | null>(null)

  // Nhân bản deals 3 lần để vẫn loop mượt khi ít phần tử
  const displayDeals = useMemo(() => {
    if (!deals?.length) return []
    const repeatTimes = 3
    return Array.from({ length: repeatTimes }, () => deals).flat()
  }, [deals])

  // Video controls per-card
  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({})
  const [playingIndex, setPlayingIndex] = useState<number | null>(null)
  const togglePlay = useCallback((index: number) => {
    const current = videoRefs.current[index]
    if (!current) return
    if (playingIndex != null && playingIndex !== index) {
      const prev = videoRefs.current[playingIndex]
      try { prev?.pause() } catch { }
    }
    if (playingIndex === index) {
      try { current.pause() } catch { }
      setPlayingIndex(null)
    } else {
      try { current.play() } catch { }
      setPlayingIndex(index)
    }
  }, [playingIndex])

  // Registration logic (dùng thử)
  const { isAuthenticated } = useAuth()
  const { openCart } = useCartIconStore()
  const { showSuccess, showError } = useToast()
  const { addItem, isItemInCart } = useCartStore()
  const { open: openModalRegistration } = useModalRegistration()

  const onRegister = useCallback((deal: any, e?: any) => {
    if (e && typeof e.stopPropagation === 'function') {
      e.stopPropagation(); e.preventDefault()
    }
    const productId = deal?.id
    if (!productId) return
    if (!isAuthenticated) {
      openModalRegistration({
        productId,
        productImage: deal?.image,
        productName: deal?.name,
        productBrand: deal?.code,
        productColor: deal?.background_color,
      })
      return
    }
    if (!isItemInCart(productId)) {
      addItem(productId)
      showSuccess(t('cart.addedToCart'))
      openCart()
    } else {
      showError(t('cart.alreadyInCart'))
    }
  }, [addItem, isAuthenticated, isItemInCart, openCart, openModalRegistration, showError, showSuccess])

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap())
    }
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
    onSelect()
    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi])

  useEffect(() => {
    const hex = displayDeals?.[selectedIndex]?.background_color ?? '#000000'
    if (bgRef.current) {
      bgRef.current.style.background = `radial-gradient(ellipse, ${hex}66 0%, transparent 65%)`
    }
  }, [selectedIndex, displayDeals])

  const handlePrev = useCallback(() => {
    emblaApi?.scrollPrev()
  }, [emblaApi])

  const handleNext = useCallback(() => {
    emblaApi?.scrollNext()
  }, [emblaApi])

  const handleSelect = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index)
    },
    [emblaApi]
  )

  if (!isLoading && deals?.length === 0) return null

  return (
    <div className="relative py-12 xl:py-24 flex flex-col items-center justify-center gap-4 xl:gap-10">
      {/* Vòng tròn mờ đổi màu */}
      <div
        ref={bgRef}
        className="z-[2] absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 w-[120%] h-[100%] rounded-full blur-lg pointer-events-none"
      />

      <div className="z-[3] flex justify-between items-center w-full px-3 lg:px-10 xl:px-24">
        <div className="flex flex-col gap-2 xl:gap-4 w-full">
          {isLoading ? (
            <Skeleton className="w-3/5 h-12" />
          ) : (
            <div
              className="2xl:text-6xl xl:text-5xl text-2xl text-center lg:text-left font-bold text-greyscale-700"
              dangerouslySetInnerHTML={{ __html: data?.title }}
            >
              {/* Cơ hội độc quyền <br className="lg:hidden" />
            <span className="text-greyscale-400">dành cho bạn</span> */}
            </div>
          )}
          {isLoading ? (
            <Skeleton className="w-4/5 h-7" />
          ) : (
            <p className="2xl:text-2xl xl:text-xl text-base text-center xl:text-left text-greyscale-700">
              {data?.subtitle}
            </p>
          )}
        </div>
        <div className="hidden xl:flex gap-4 items-center">
          <button
            onClick={handlePrev}
            className="p-5 rounded-full bg-white border border-greyscale-200 hover:bg-greyscale-200"
          >
            <ArrowLeftIcon
              weight="bold"
              className="text-greyscale-700 size-7"
            />
          </button>
          <button
            onClick={handleNext}
            className="p-5 rounded-full bg-white border border-greyscale-200 hover:bg-greyscale-200"
          >
            <ArrowRightIcon
              weight="bold"
              className="text-greyscale-700 size-7"
            />
          </button>
        </div>
      </div>

      {/* Viewport */}
      <div className="z-[3] w-full px-0 lg:px-10 xl:px-32 cursor-default select-none">
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex items-center gap-4 lg:gap-3 h-full w-full">
            {isLoading ? (
              <>
                <Skeleton className="w-full h-[500px]" />
                <Skeleton className="w-full h-[500px]" />
                <Skeleton className="w-full h-[500px]" />
              </>
           ) : (
            displayDeals?.map((deal: any, index: number) => {
                return (
                  <div
                    key={`wrapper-${index}-${deal.id}`}
                    className="shrink-0 basis-1/3 cursor-pointer w-full"
                    onClick={() => handleSelect(index)}
                    role="button"
                    aria-label={`Chuyển tới ưu đãi ${index + 1}`}
                  >
                    <div
                      key={`deal-${index}-${deal.id}`}
                      className={`deal-card relative rounded-3xl h-fit w-full select-none transition-transform duration-300 ${index === selectedIndex
                        ? ''
                        : 'scale-[0.9] lg:scale-[0.8] opacity-90'
                        }`}
                    >
                      <div className="w-full aspect-square bg-white/50 rounded-t-3xl relative overflow-hidden">
                        <div
                          className="absolute inset-0 z-[0]"
                          style={{
                            background: `radial-gradient(circle, white 0%, ${deal?.background_color}26 )`,
                          }}
                        />
                        <div className="absolute z-[2] top-3 xl:top-4 left-3 xl:left-4 flex items-center gap-1 bg-white rounded-full py-0.5 px-1.5 text-xs xl:text-base font-medium text-greyscale-900">
                          <StarIcon
                            weight="fill"
                            className="size-3 xl:size-5 text-yellow-600"
                          />
                          {deal?.average_star.toFixed(1)}
                        </div>
                        <div className="absolute z-[2] bottom-3 xl:bottom-4 right-3 xl:right-4 flex items-center gap-1.5">
                          {deal?.time_left_dd_hh_mm_ss && deal?.time_left_dd_hh_mm_ss !== "0:00:00:00"
                            ? <Timer initTime={deal?.time_left_dd_hh_mm_ss} className='!pr-0 !pb-0' />
                            : null
                          }
                        </div>
                        <Image
                          src={deal.image}
                          alt="deal"
                          width={500}
                          height={500}
                          className="w-full h-full object-contain rounded-t-3xl p-6 xl:p-10 z-[1] relative"
                        />
                      </div>
                      <div className='bg-white rounded-b-3xl w-full'>
                        <div
                          className="p-3 xl:p-5 w-full flex flex-col gap-1 rounded-b-3xl min-w-[230px]"
                          style={{ backgroundColor: withAlpha(deal?.background_color, 0.3) }}
                        >
                          <h3 className="text-xs xl:text-sm font-bold text-greyscale-900">
                            {deal?.code}
                          </h3>
                          <h3 className="text-greyscale-900 text-sm xl:text-lg truncate">
                            {deal?.name}
                          </h3>
                          <div className="py-1">
                            <div className="relative w-full h-1.5">
                              <div className="relative" style={{ width: `${deal?.count_join / deal?.limit_people * 100}%` }}>
                                <div className="h-1.5 w-full rounded-full bg-gradient-to-r from-[#FF9800] via-[#EF6C00] to-[#FF8500]" />
                                <Lightning className="size-5 xl:size-6 absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2" />
                              </div>
                              <div className="opacity-20 absolute top-0 left-0 h-1.5 w-full rounded-full bg-gradient-to-r from-[#FF9800] via-[#EF6C00] to-[#FF8500]" />
                            </div>
                          </div>
                          <p className="text-xs xl:text-sm text-greyscale-700">
                            {deal?.count_join}/{deal?.limit_people} {tProduct('participation')}
                          </p>
                          {deal?.isSig === 0 ?
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                router.push(`/submit-review/${deal?.id_review}`)
                              }}
                              className="transform-gpu border-gradient-button-dynamic bg-white w-fit mt-2 py-2 px-3 sm:py-4 sm:px-5 md:py-2 md:px-5 rounded-full cursor-pointer flex items-center gap-3"
                              style={{
                                color: deal?.background_color,
                                transition: 'all 300ms ease',
                                boxShadow: `0px 2px 4px ${withAlpha(deal?.background_color, 0.26)}, -2px -2px 8px ${withAlpha(deal?.background_color, 0.7)} inset, 2px 2px 8px -5px ${withAlpha(deal?.background_color, 0.7)} inset`,
                                '--accent-color': deal?.background_color,
                              } as React.CSSProperties}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = deal?.background_color
                                e.currentTarget.style.color = '#fff'
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '#ffffff'
                                e.currentTarget.style.color = deal?.background_color
                              }}
                            >
                              <span className="truncate text-xs sm:text-base/[21px] ">{tProduct('writeYourReview')}</span>
                              <PenIcon />
                            </button>
                            :
                            deal?.isSig === 1 ?
                              <div className='xl:pt-2 flex gap-3 items-center'>
                                {deal?.video_review && (
                                  <div className='relative cursor-pointer group' onClick={() => togglePlay(index)}>
                                    <div className={`absolute size-7 2xl:size-9 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center bg-black/50 rounded-full transition-opacity duration-200 pointer-events-none ${playingIndex === index ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
                                      {playingIndex === index ? (
                                        <PauseIcon weight="fill" className="size-5 text-white" />
                                      ) : (
                                        <PlayIcon weight="fill" className="size-5 text-white" />
                                      )}
                                    </div>
                                    <video ref={(el) => { videoRefs.current[index] = el }} muted loop playsInline src={deal?.video_review || ""} className='w-15.5 lg:w-16 aspect-[65/83] rounded-lg object-cover' />
                                  </div>
                                )}
                                <div className='flex flex-col gap-1'>
                                  <Rating value={deal?.evaluate || 0} maxWidth={96} readOnly />
                                  <p className='text-xs font-semibold text-[#4E5969]'>{t(getRatingI18nKey(deal?.evaluate))}</p>
                                </div>
                              </div>
                              :
                              <button
                                onClick={(e) => onRegister(deal, e)}
                                className="bg-white flex w-fit mt-2 py-2 px-3 sm:py-4 sm:px-5 md:py-2 md:px-5 rounded-full cursor-pointer"
                                style={{
                                  border: `1px solid ${deal?.background_color}`,
                                  color: deal?.background_color,
                                  transition: 'all 300ms ease',
                                  boxShadow: `0px 2px 2px ${withAlpha(deal?.background_color, 0.26)}, -2px -2px 6px ${withAlpha(deal?.background_color, 0.7)} inset, 2px 2px 8px -5px ${withAlpha(deal?.background_color, 0.7)} inset`,
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.backgroundColor = deal?.background_color
                                  e.currentTarget.style.color = '#fff'
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor = '#ffffff'
                                  e.currentTarget.style.color = deal?.background_color
                                }}
                              >
                                <span className="truncate text-xs sm:text-base/[21px]">{tProduct('register')}</span>
                              </button>
                          }
                        </div>
                      </div>

                    </div>
                  </div>
                )
              }))}
          </div>
        </div>
      </div>

      {/* Mobile navigation buttons */}
      <div className="xl:hidden flex gap-4 items-center">
        <button
          onClick={handlePrev}
          className="p-4 xl:p-5 rounded-full bg-white border border-greyscale-200 hover:bg-greyscale-200 transition-all duration-300 cursor-pointer group"
        >
          <ArrowLeftIcon
            weight="bold"
            className="text-greyscale-700 size-7 group-hover:scale-110 transition-all duration-300"
          />
        </button>
        <button
          onClick={handleNext}
          className="p-4 xl:p-5 rounded-full bg-white border border-greyscale-200 hover:bg-greyscale-200 transition-all duration-300 cursor-pointer group"
        >
          <ArrowRightIcon
            weight="bold"
            className="text-greyscale-700 size-7 group-hover:scale-110 transition-all duration-300"
          />
        </button>
      </div>

      <Link href="/trial-registration">
        <Button>{data?.title_button}</Button>
      </Link>
    </div>
  )
}

export default Deal
