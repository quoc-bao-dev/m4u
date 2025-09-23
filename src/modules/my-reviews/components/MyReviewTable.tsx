'use client'

import { Rating } from '@/core/components'
import { useMyReview } from '@/services/my-review'
import { useTranslations } from 'next-intl'
import { useMemo } from 'react'
import StackVideo from './StackVideo'
import { NoData } from '@/modules/trial-registration'

const StatusDot = ({ color }: { color: string }) => (
  <span
    className="inline-block w-2 h-2 rounded-full"
    style={{ backgroundColor: color }}
  />
)

const MyReviewTable = () => {
  const t = useTranslations('myReviews.history.table.headers')

  const { data, isLoading } = useMyReview()

  const rows = useMemo(() => {
    const items = data?.data.data ?? []

    return items.map((item) => {
      // Build media array from video_review and media_other using mime_type
      const media = [] as {
        id: string
        src: string
        type: 'image' | 'video'
        thumbnail?: string
      }[]
      if (item.video_review) {
        media.push({
          id: `video-${item.id}`,
          src: item.video_review,
          type: 'video',
          thumbnail: item.image,
        })
      }
      if (Array.isArray(item.media_other)) {
        item.media_other.forEach((m, idx) => {
          const mime = (m.mime_type || '').toLowerCase()
          const isVideo = mime.startsWith('video/')
          media.push({
            id: `m-${item.id}-${idx}`,
            src: m.media,
            type: isVideo ? 'video' : 'image',
            thumbnail: isVideo ? undefined : m.media,
          })
        })
      }

      // Format date/time from date_review
      let date = ''
      let time = ''
      if (item.date_review) {
        const d = new Date(item.date_review)
        if (!isNaN(d.getTime())) {
          date = d.toLocaleDateString()
          time = d.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })
        } else {
          // Fallback if date string is not ISO
          const parts = item.date_review.split(' ')
          date = parts.slice(0, 3).join(' ')
          time = parts.slice(3).join(' ')
        }
      }

      return {
        id: item.id,
        product: {
          brand: '',
          name: item.name,
          image: item.image,
        },
        review: {
          rating: item.evaluate,
          title: item.content_evaluate || '',
          excerpt: item.content || '',
          media,
        },
        reward: '',
        date,
        time,
        status: item.name_status,
        statusColor: item.status_color,
        action: 'View details',
      }
    })
  }, [data])

  return (
    <div className="w-full">
      {/* Desktop table */}
      <div className="hidden md:block  bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            {/* Table header */}
            <thead className="sticky top-0">
              <tr className="text-xs font-medium text-greyscale-500 bg-[#F2F3F5]">
                <th className="px-3 py-3 text-left rounded-l-lg align-middle w-[320px]">
                  {t('productInfo', { default: 'Product info' })}
                </th>
                <th className="px-3 py-3 text-left align-middle">
                  {t('review', { default: 'Review' })}
                </th>
                <th className="px-3 py-3 text-left align-middle w-[160px] truncate">
                  {t('reward', { default: 'Reward' })}
                </th>
                <th className="px-3 py-3 text-left align-middle w-[160px]">
                  {t('dateTime', { default: 'Date time' })}
                </th>
                <th className="px-3 py-3 text-left align-middle w-[140px]">
                  {t('orderStatus', { default: 'Status' })}
                </th>
                <th className="px-3 py-3 text-center rounded-r-lg align-middle w-[160px]">
                  {t('action', { default: 'Action' })}
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, idx) => (
                  <SkeletonRow key={idx} />
                ))
              ) : rows.length === 0 ? (
                <tr>
                  <td className="px-3 py-8 align-middle h-[400px]" colSpan={6}>
                    <NoData
                      title={t('myReviews.history.table.empty.title')}
                      description={t('myReviews.history.table.empty.desc')}
                    />
                  </td>
                </tr>
              ) : null}
              {!isLoading &&
                rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-t border-dashed first:border-t-0 border-greyscale-200 hover:bg-greyscale-50 transition-colors"
                  >
                    {/* Product info */}
                    <td className="px-3 py-5 align-middle">
                      <div className="flex items-center gap-4">
                        <div className="w-[60px] h-[60px] rounded-[8px] overflow-hidden bg-greyscale-100 border border-greyscale-200 flex-shrink-0">
                          <img
                            src={row.product.image}
                            alt={row.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-semibold text-greyscale-600 truncate">
                            {row.product.brand}
                          </div>
                          <div className="text-sm font-normal text-greyscale-900 truncate">
                            {row.product.name}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Review */}
                    <td className="px-3 py-5 align-middle">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0 flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <Rating
                              className="h-[16px] w-fit"
                              rate={row.review.rating || 0}
                            />
                            <span
                              className="text-xs font-semibold"
                              style={{ color: '#4E5969' }}
                            >
                              {row.review.title}
                            </span>
                          </div>
                          <div
                            className="text-xs text-greyscale-800 line-clamp-2"
                            dangerouslySetInnerHTML={{
                              __html: row.review.excerpt,
                            }}
                          ></div>
                        </div>
                        <StackVideo media={row.review.media || []} />
                      </div>
                    </td>

                    {/* Reward */}
                    <td className="px-3 py-5 align-middle"></td>

                    {/* Date time */}
                    <td className="px-3 py-5 align-middle">
                      <div className="text-sm text-greyscale-900 truncate mb-1">
                        {row.date}
                      </div>
                      <div className="text-xs text-greyscale-400 truncate">
                        {row.time}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-3 py-5 align-middle">
                      <div className="inline-flex items-center gap-2 py-1 ">
                        <StatusDot
                          color={
                            row.statusColor ||
                            (row.status === 'Reward paid'
                              ? '#10B981'
                              : row.status === 'Accepted'
                              ? '#2563EB'
                              : '#EF4444')
                          }
                        />
                        <span className="text-xs text-greyscale-700 truncate">
                          {row.status}
                        </span>
                      </div>
                    </td>

                    {/* Action */}
                    <td className="px-3 py-5 w-[160px] align-middle">
                      <button className="truncate w-full cursor-pointer px-4 py-2 text-xs bg-white text-greyscale-900 font-medium border border-greyscale-300 hover:bg-greyscale-50 transition-colors rounded-full">
                        {row.action}
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {isLoading &&
          Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="px-4 py-4 bg-white rounded-[24px]">
              <div className="animate-pulse">
                <div className="flex items-center justify-between mb-3">
                  <div className="h-4 bg-greyscale-200 rounded w-24" />
                  <div className="h-4 bg-greyscale-200 rounded w-16" />
                </div>
                <div className="border-t border-greyscale-200 mb-3" />
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-[38px] h-[38px] rounded-[4px] bg-greyscale-200" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-greyscale-200 rounded w-20" />
                    <div className="h-4 bg-greyscale-200 rounded w-40" />
                  </div>
                </div>
                <div className="border-t border-greyscale-200 mb-3" />
                <div className="flex justify-end">
                  <div className="h-8 bg-greyscale-200 rounded-full w-24" />
                </div>
              </div>
            </div>
          ))}
        {!isLoading && rows.length === 0 && (
          <div className="px-4 py-8 h-[400px]">
            <NoData
              title={t('myReviews.history.table.empty.title')}
              description={t('myReviews.history.table.empty.desc')}
            />
          </div>
        )}
        {!isLoading &&
          rows.map((row) => (
            <div
              key={row.id}
              className="px-4 py-4 bg-white rounded-[24px]"
              style={{ boxShadow: '0 4px 24px 0 rgba(0, 0, 0, 0.06)' }}
            >
              {/* Product info */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-[38px] h-[38px] rounded-[4px] overflow-hidden bg-greyscale-100 border border-greyscale-200 flex-shrink-0">
                  <img
                    src={row.product.image}
                    alt={row.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-greyscale-600 truncate">
                    {row.product.brand}
                  </div>
                  <div className="text-sm font-normal text-greyscale-900 truncate">
                    {row.product.name}
                  </div>
                </div>
              </div>

              {/* Date time and Status */}
              <div className="flex justify-between items-center mb-3">
                <div className="text-xs text-greyscale-400">
                  {row.date} · {row.time}
                </div>
                <div className="inline-flex items-center gap-2">
                  <StatusDot
                    color={
                      row.statusColor ||
                      (row.status === 'Reward paid'
                        ? '#10B981'
                        : row.status === 'Accepted'
                        ? '#2563EB'
                        : '#EF4444')
                    }
                  />
                  <span className="text-xs text-greyscale-700 truncate">
                    {row.status}
                  </span>
                </div>
              </div>

              {/* Line */}
              <div className="border-t border-greyscale-200 mb-3"></div>

              {/* Review */}
              <div className="flex justify-between items-center mb-3">
                <div className="flex-1 min-w-0 mr-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Rating
                      className="h-[16px] w-fit"
                      rate={row.review.rating || 0}
                    />
                    <span
                      className="text-xs font-semibold"
                      style={{ color: '#4E5969' }}
                    >
                      {row.review.title}
                    </span>
                  </div>
                  <div
                    className="text-xs text-greyscale-800 line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: row.review.excerpt }}
                  ></div>
                </div>
                <StackVideo media={row.review.media || []} />
              </div>

              {/* Reward placeholder */}
              <div className="mb-3">{/* Empty placeholder for reward */}</div>

              {/* Line */}
              <div className="border-t border-greyscale-200 mb-3"></div>

              {/* Button */}
              <div className="flex justify-end">
                <button className="px-4 py-2 text-xs bg-white text-greyscale-900 font-medium border border-greyscale-300 hover:bg-greyscale-50 transition-colors rounded-full">
                  {row.action}
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

const SkeletonRow = () => (
  <tr className="border-t border-dashed border-greyscale-100 first:border-t-0">
    <td className="px-3 py-5 align-middle">
      <div className="flex items-center gap-4">
        <div className="w-[60px] h-[60px] rounded-[8px] bg-greyscale-200 animate-pulse" />
        <div className="min-w-0 space-y-2">
          <div className="h-3 w-20 bg-greyscale-200 rounded animate-pulse" />
          <div className="h-4 w-40 bg-greyscale-200 rounded animate-pulse" />
        </div>
      </div>
    </td>
    <td className="px-3 py-5 align-middle">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0 space-y-2">
          <div className="h-4 w-28 bg-greyscale-200 rounded animate-pulse" />
          <div className="h-3 w-56 bg-greyscale-200 rounded animate-pulse" />
        </div>
        <div className="w-[100px] h-[60px] bg-greyscale-200 rounded animate-pulse" />
      </div>
    </td>
    <td className="px-3 py-5 align-middle">
      <div className="h-4 w-24 bg-greyscale-200 rounded animate-pulse" />
    </td>
    <td className="px-3 py-5 align-middle">
      <div className="space-y-2">
        <div className="h-4 w-24 bg-greyscale-200 rounded animate-pulse" />
        <div className="h-3 w-16 bg-greyscale-200 rounded animate-pulse" />
      </div>
    </td>
    <td className="px-3 py-5 align-middle">
      <div className="inline-flex items-center gap-2">
        <div className="size-2 rounded-full bg-greyscale-200 animate-pulse" />
        <div className="h-3 w-20 bg-greyscale-200 rounded animate-pulse" />
      </div>
    </td>
    <td className="px-3 py-5 align-middle">
      <div className="h-8 w-24 bg-greyscale-200 rounded-full animate-pulse mx-auto" />
    </td>
  </tr>
)

export default MyReviewTable
