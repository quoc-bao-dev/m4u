import { Skeleton } from '@/components/ui/skeleton'
import { Modal } from '@/core/components/common/modal'
import Rating from '@/core/components/common/Rating'
import UserAvatar from '@/core/components/UserAvatar'
import { IMAGES } from '@/core/constants/IMAGES'
import { useDevice } from '@/core/hooks'
import { getRatingI18nKey, withAlpha } from '@/core/utils'
import { QuoteIcon } from '@/icons'
import { useTranslation } from '@/locale'
import { useGetProductReview } from '@/services/review/queries'
import {
  CalendarBlankIcon,
  CaretRightIcon,
  ChartBarIcon,
} from '@phosphor-icons/react'
import { useQueryClient } from '@tanstack/react-query'
import moment from 'moment'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React, { useEffect, useMemo, useRef, useState } from 'react'

type InfoKolModalProps = {
  isOpen: boolean
  onClose: () => void
  id: any
  slug?: string
}

const InfoKolModal: React.FC<InfoKolModalProps> = ({ isOpen, onClose, id, slug }) => {
  const tProduct = useTranslations('product')
  const tNodataReviewhub = useTranslations('nodataReviewhub')
  const { t } = useTranslation()
  const { isDesktop, isMobile } = useDevice()
  const { isLoading, data: productReview } = useGetProductReview(id || 0, isOpen)
  const queryClient = useQueryClient()
  type MediaItem = { type: 'video' | 'image'; src: string }

  const mediaSources: MediaItem[] = useMemo(() => {
    const sources: MediaItem[] = []
    if (productReview?.video_review) {
      sources.push({ type: 'video', src: productReview.video_review })
    }
    if (Array.isArray(productReview?.media_other)) {
      const isVideo = (item: any) => {
        const filetype = String(item?.filetype || '').toLowerCase()
        const mime = String(item?.mime_type || '').toLowerCase()
        const url = String(item?.media || '').toLowerCase()
        if (mime.startsWith('video/')) return true
        if (['mp4', 'mov', 'webm', 'm4v', 'mkv'].includes(filetype)) return true
        if (/[\.](mp4|mov|webm|m4v|mkv)(\?|#|$)/.test(url)) return true
        return false
      }
      for (const m of productReview.media_other) {
        if (!m?.media) continue
        sources.push({ type: isVideo(m) ? 'video' : 'image', src: m.media })
      }
    }
    return sources
  }, [productReview])

  const [activeIndex, setActiveIndex] = useState<number>(0)
  const activeItem = mediaSources[activeIndex]
  const mainVideoRef = useRef<HTMLVideoElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [mainVideoHeight, setMainVideoHeight] = useState<number>(0)

  // Cập nhật chiều cao dựa vào video lớn
  useEffect(() => {
    if (!isOpen) return
    const targetEl = containerRef.current
    if (!targetEl) return

    const updateHeight = () => {
      setMainVideoHeight(targetEl.clientHeight)
    }

    updateHeight()

    let resizeObserver: ResizeObserver | null = null
    if (typeof window !== 'undefined' && 'ResizeObserver' in window) {
      resizeObserver = new ResizeObserver(() => updateHeight())
      resizeObserver.observe(targetEl)
    } else {
      if (typeof window !== 'undefined') {
        ; (window as any).addEventListener('resize', updateHeight)
      }
    }

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect()
      } else {
        if (typeof window !== 'undefined') {
          ; (window as any).removeEventListener('resize', updateHeight)
        }
      }
    }
  }, [isOpen, activeIndex])

  // Tự động phát khi đổi nguồn
  useEffect(() => {
    if (!isOpen) return
    if (activeItem?.type !== 'video') return
    const play = async () => {
      try {
        await mainVideoRef.current?.play()
      } catch { }
    }
    play()
  }, [activeItem, isOpen])

  // Reset active index when mediaSources change
  useEffect(() => {
    setActiveIndex(0)
  }, [isOpen, mediaSources.length])

  // Đồng bộ view_see vào cache danh sách KOLs để tránh refetch dư thừa
  useEffect(() => {
    if (!isOpen) return
    if (!productReview?.id) return
    queryClient.setQueryData(
      ['dataReviewHubDetailInfinite', slug],
      (oldData: any) => {
        if (!oldData?.pages) return oldData
        const pages = oldData.pages.map((page: any) => {
          const reviewList = page?.review?.data
          if (!Array.isArray(reviewList)) return page
          const newReviewList = reviewList.map((item: any) =>
            item?.id === productReview.id
              ? { ...item, view_see: productReview.view_see }
              : item
          )
          return {
            ...page,
            review: {
              ...page.review,
              data: newReviewList,
            },
          }
        })
        return { ...oldData, pages }
      }
    )
  }, [isOpen, productReview?.id, productReview?.view_see, slug, queryClient])

  return (
    <Modal
      position={isDesktop ? 'center' : 'bottom'}
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-4xl xl:max-w-5xl bg-white p-3 lg:p-5 max-h-[80vh] overflow-y-auto scroll-hidden xl:max-h-none xl:p-10"
    >
      <div className="flex flex-col-reverse lg:grid grid-cols-9 gap-4 lg:gap-6 xl:gap-10 h-full">
        <div className="col-span-5 flex gap-3 lg:gap-4">
          <div
            className="flex flex-col gap-3 flex-shrink-0 overflow-auto scroll-hidden"
            style={{ maxHeight: mainVideoHeight || undefined }}
          >
            {isLoading ? (
              Array.from({ length: 5 }).map((_, idx) => (
                <Skeleton key={idx} className="flex-shrink-0 size-[64px] lg:size-[120px] rounded-lg lg:rounded-2xl" />
              ))
            ) : (
              mediaSources.map((item, idx) => (
                <div key={`${item.src}-${idx}`} className={`rounded-lg lg:rounded-2xl border ${activeIndex === idx ? ' border-pink-500' : 'border-transparent'}`}>
                  {item.type === 'video' ? (
                    <video
                      src={item.src}
                      muted
                      loop
                      playsInline
                      width={1000}
                      height={1000}
                      onClick={(e: React.MouseEvent<HTMLVideoElement>) => {
                        setActiveIndex(idx)
                        if (!isMobile) {
                          e.currentTarget.scrollIntoView({
                            block: 'center',
                            inline: 'nearest',
                            behavior: 'smooth',
                          })
                        }
                      }}
                      className={`size-[64px] lg:size-[120px] object-cover rounded-lg lg:rounded-2xl cursor-pointer`}
                    />
                  ) : (
                    <Image
                      src={item.src}
                      alt={`media-${idx}`}
                      width={1000}
                      height={1000}
                      onClick={(e) => {
                        setActiveIndex(idx)
                        if (!isMobile) {
                          ; (e.currentTarget as HTMLImageElement).scrollIntoView({
                            block: 'center',
                            inline: 'nearest',
                            behavior: 'smooth',
                          })
                        }
                      }}
                      className="size-[64px] lg:size-[120px] object-cover rounded-lg lg:rounded-2xl cursor-pointer"
                    />
                  )}
                </div>
              )))}
          </div>
          <div className="relative w-full" ref={containerRef}>
            {isLoading ? (
              <Skeleton className="w-full object-cover rounded-2xl xl:rounded-3xl aspect-[375/666]" />
            ) : (
              <>
                {activeItem?.type === 'video' && (
                  <div className="absolute top-3 left-3 size-9 rounded-full bg-black/50 flex items-center justify-center">
                    <CaretRightIcon weight="fill" className="size-5 text-white" />
                  </div>
                )}
                {activeItem?.type === 'video' ? (
                  <video
                    ref={mainVideoRef}
                    src={activeItem.src}
                    muted
                    loop
                    playsInline
                    width={1000}
                    height={1000}
                    onLoadedMetadata={() =>
                      setMainVideoHeight(containerRef.current?.clientHeight || 0)
                    }
                    className="w-full object-cover rounded-2xl xl:rounded-3xl aspect-[375/666]"
                  />
                ) : (
                  <Image
                    src={activeItem?.src || ''}
                    alt="main-media"
                    width={1000}
                    height={1000}
                    onLoad={() => setMainVideoHeight(containerRef.current?.clientHeight || 0)}
                    className="w-full object-cover rounded-2xl xl:rounded-3xl aspect-[375/666]"
                  />
                )}
              </>
            )}
          </div>
        </div>
        <div
          className="col-span-4 flex flex-col gap-3 xl:gap-4"
          style={{ maxHeight: mainVideoHeight || undefined }}
        >
          <div className="flex gap-3 items-center">
            {isLoading ? (
              <Skeleton className="size-[40px] lg:size-[52px] flex-shrink-0 rounded-full" />
            ) : (
              <UserAvatar
                src={productReview?.client?.avatar}
                userName={productReview?.client?.fullname}
                size={isMobile ? 40 : 52}
                className='flex-shrink-0'
              />
            )}

            <div className="flex flex-col w-full">
              {isLoading ? (
                <>
                  <Skeleton className="w-[20%] h-6" />
                  <Skeleton className="w-[70%] h-5 mt-1" />
                </>
              ) : (
                <>
                  <h3 className="text-sm lg:text-lg font-bold text-greyscale-900">
                    {productReview?.client?.fullname}
                  </h3>
                  <p className="text-xs lg:text-sm text-greyscale-900">
                    {productReview?.quantity_reviews} {tProduct('reviews')}
                  </p>
                </>
              )}
            </div>
          </div>
          <div className="flex gap-2 justify-between">
            {isLoading ? (
              <>
                <Skeleton className="w-[40%] h-5" />
                <Skeleton className="w-[30%] h-5" />
              </>
            ) : (
              <>
                <div className="flex gap-2 items-center">
                  <CalendarBlankIcon
                    weight="fill"
                    className="size-5 text-greyscale-400"
                  />
                  <p className="text-sm font-medium text-greyscale-400">
                    {moment(productReview?.date_review || '').format('DD/MM/YYYY')}
                  </p>
                </div>
                <div className="flex gap-2 items-center">
                  <ChartBarIcon
                    weight="fill"
                    className="size-5 text-greyscale-400"
                  />
                  <p className="text-sm font-medium text-greyscale-400">
                    {productReview?.view_see} {tProduct('views')}
                  </p>
                </div>
              </>
            )}
          </div>
          <div className="flex flex-col gap-6 lg:flex-1 lg:overflow-y-auto scroll-hidden">
            {isLoading ? (
              <Skeleton className="w-full h-32 rounded-lg" />
            ) : (
              <div className="p-2 rounded-lg flex gap-3 items-center"
                style={{
                  backgroundColor: withAlpha(productReview?.background_color || '#FE6BBA', 0.2)
                }}>
                <div className="w-[91px] lg:w-[106px] aspect-[106/112] rounded-lg bg-white flex justify-center items-center">
                  <Image
                    src={productReview?.image || IMAGES.deal1}
                    alt="deal"
                    width={1000}
                    height={1000}
                    className="size-full object-contain p-2"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-[10px] font-bold text-greyscale-900">
                    {productReview?.code}
                  </h3>
                  <p className="text-sm font-normal text-greyscale-900">
                    {productReview?.name}
                  </p>
                </div>
              </div>
            )}

            {isLoading ? (
              <Skeleton className="w-full h-28 rounded-lg" />
            ) : (
              <div className="flex gap-4 xl:gap-8 items-end justify-center lg:justify-start">
                <div className="flex flex-col items-center">
                  <p className="text-xl font-bold text-greyscale-400">
                    <span className="text-pink-600 text-[32px] lg:text-[40px]">
                      {Number(productReview?.evaluate || 0).toFixed(1)}
                    </span>
                    /5
                  </p>
                  <p className="text-sm lg:text-base font-bold text-pink-600">
                    {t(getRatingI18nKey(productReview?.evaluate))}
                  </p>
                </div>
                <div className="flex flex-col gap-1 lg:gap-2">
                  {productReview?.list_evaluate.map((item: any) => (
                    <div key={item?.id} className="flex gap-3 items-center">
                      <Rating
                        value={Number(item?.star ?? item?.evaluate)}
                        readOnly
                        maxWidth={isDesktop ? 136 : 96}
                      />
                      <p className="text-xs lg:text-sm font-semibold text-[#4E5969]">
                        {item?.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {isLoading ? (
              <Skeleton className="w-full h-20 rounded-lg" />
            ) : (
              <div className="relative pt-5 lg:pt-9 pl-8 lg:pl-9 flex-1 overflow-y-auto scroll-hidden">
                <QuoteIcon className="size-7 lg:size-9 text-neutral-200 absolute top-0 left-0" />
                <p className="text-sm lg:text-base font-normal text-greyscale-800">
                  {productReview?.content_evaluate || tNodataReviewhub('noData')}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal >
  )
}

export default InfoKolModal
