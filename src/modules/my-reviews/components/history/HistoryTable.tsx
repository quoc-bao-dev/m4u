'use client'

import { useGetListReviewHistory } from '@/services/review/queries'
import { ReviewHistoryItem } from '@/services/review/type'
import { useEffect, useMemo, useState } from 'react'
import { useTableFilter } from '../../stores/useTableFilter'
import NoData from '../../../trial-registration/components/product/NoData'

type ReviewItem = {
  id: string
  orderId: string
  products: {
    brand: string
    productName: string
    productImage: string
  }[]
  date: string
  time: string
  status: 'completed' | 'pending' | 'cancelled' | 'processing'
}

const statusChip = (status: ReviewItem['status']) => {
  switch (status) {
    case 'completed':
      return (
        <span className="inline-flex items-center gap-2 text-xs text-greyscale-600">
          <span className="size-1.5 rounded-full bg-green-500" /> Completed
        </span>
      )
    case 'pending':
      return (
        <span className="inline-flex items-center gap-2 text-xs text-greyscale-600">
          <span className="size-1.5 rounded-full bg-yellow-500" /> Pending
        </span>
      )
    case 'cancelled':
      return (
        <span className="inline-flex items-center gap-2 text-xs text-greyscale-600">
          <span className="size-1.5 rounded-full bg-red-500" /> Cancelled
        </span>
      )
    case 'processing':
      return (
        <span className="inline-flex items-center gap-2 text-xs text-greyscale-600">
          <span className="size-1.5 rounded-full bg-blue-500" /> Processing
        </span>
      )
  }
}
const getStatusFromNumber = (status: number): ReviewItem['status'] => {
  switch (status) {
    case 1:
      return 'completed'
    case 2:
      return 'pending'
    case 3:
      return 'cancelled'
    case 4:
      return 'processing'
    default:
      return 'pending'
  }
}

const HistoryTable = () => {
  // Lấy bộ lọc từ global state
  const { activeTab, searchQuery, dateRange } = useTableFilter()

  // Log bộ lọc ra console
  useEffect(() => {
    console.log('🔍 Current filters:', {
      activeTab,
      searchQuery,
      dateRange: {
        from: dateRange.from?.toISOString(),
        to: dateRange.to?.toISOString(),
      },
    })
  }, [activeTab, searchQuery, dateRange])

  // Call API hook
  const {
    data: reviewHistoryData,
    isLoading,
    error,
  } = useGetListReviewHistory()

  // Process data with useMemo
  const processedReviews = useMemo(() => {
    if (!reviewHistoryData?.data) return []

    return reviewHistoryData.data.map((item: ReviewHistoryItem) => ({
      id: item.id.toString(),
      orderId: item.code_review,
      products: item.clients_review.map((clientReview) => ({
        brand:
          clientReview.products?.[0]?.name?.split(' ')[0] || 'Unknown Brand',
        productName: clientReview.products?.[0]?.name || 'Unknown Product',
        productImage:
          clientReview.products?.[0]?.image ||
          '/image/product/image-nodata.png',
      })),
      date: new Date(item.created_at).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      time: new Date(item.created_at).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }),
      status: getStatusFromNumber(item.status),
    }))
  }, [reviewHistoryData])

  // Helper function to convert status number to string

  // Loading skeleton component
  const SkeletonRow = () => (
    <tr className="border-t border-dashed border-greyscale-100 first:border-t-0">
      <td className="px-3 py-5">
        <div className="h-4 bg-greyscale-200 rounded animate-pulse w-20"></div>
      </td>
      <td className="px-3 py-5">
        <div className="flex items-start gap-3">
          <div className="size-14 bg-greyscale-200 rounded-lg animate-pulse"></div>
          <div className="min-w-0 flex-1">
            <div className="h-3 bg-greyscale-200 rounded animate-pulse mb-2 w-16"></div>
            <div className="h-4 bg-greyscale-200 rounded animate-pulse w-32"></div>
          </div>
        </div>
      </td>
      <td className="px-3 py-5">
        <div className="h-4 bg-greyscale-200 rounded animate-pulse w-24 mb-1"></div>
        <div className="h-3 bg-greyscale-200 rounded animate-pulse w-16"></div>
      </td>
      <td className="px-3 py-5">
        <div className="h-4 bg-greyscale-200 rounded animate-pulse w-20"></div>
      </td>
      <td className="px-3 py-5">
        <div className="h-8 bg-greyscale-200 rounded-full animate-pulse w-20 mx-auto"></div>
      </td>
    </tr>
  )

  // Mobile card component
  const MobileCard = ({ item }: { item: ReviewItem }) => {
    const [showAllProducts, setShowAllProducts] = useState(false)
    const firstProduct = item.products[0]
    const remainingProducts = item.products.slice(1)

    return (
      <div className="px-4 py-3 bg-white rounded-3xl mb-3">
        {/* Header: Order ID, Time, Status */}
        <div className="flex justify-between items-end mb-3">
          <div className="text-base text-greyscale-900 font-medium">
            {item.orderId}
          </div>
          <div className="text-right">
            <div className="text-sm text-greyscale-900">{item.date}</div>
            <div className="text-xs text-greyscale-400">{item.time}</div>
          </div>
          <div>{statusChip(item.status)}</div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#E5E7EB] mb-3"></div>

        {/* Product List */}
        <div className="space-y-3">
          {/* First product */}
          <div className="flex items-start gap-3">
            <div className="size-14 rounded-lg overflow-hidden bg-greyscale-100 border border-greyscale-200 flex-shrink-0">
              <img
                src={firstProduct.productImage}
                alt={firstProduct.productName}
                width={56}
                height={56}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs text-greyscale-500">
                {firstProduct.brand}
              </div>
              <div className="text-sm font-medium text-greyscale-900 truncate">
                {firstProduct.productName}
              </div>
            </div>
          </div>

          {/* Show more products if there are any */}
          {remainingProducts.length > 0 && (
            <>
              {showAllProducts ? (
                remainingProducts.map((product, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="size-14 rounded-lg overflow-hidden bg-greyscale-100 border border-greyscale-200 flex-shrink-0">
                      <img
                        src={product.productImage}
                        alt={product.productName}
                        width={56}
                        height={56}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs text-greyscale-500">
                        {product.brand}
                      </div>
                      <div className="text-sm font-medium text-greyscale-900 truncate">
                        {product.productName}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center gap-2 text-sm text-greyscale-500">
                  <span>+{remainingProducts.length} products</span>
                  <button
                    onClick={() => setShowAllProducts(true)}
                    className="text-greyscale-400 hover:text-greyscale-600"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-[#E5E7EB] mt-3 mb-3"></div>

        {/* Footer: Time left, Action button */}
        <div className="flex justify-between items-center">
          <div className="text-sm text-orange-600">
            3 days left to submit your review
          </div>
          <button className="px-4 py-2 bg-pink-600 text-white text-sm font-medium hover:bg-pink-600/80 transition-colors rounded-full">
            Review
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-6 h-full min-h-0 flex flex-col">
      <div className="flex-1 min-h-0 overflow-y-auto">
        {/* Desktop Table */}
        <div className="hidden md:block">
          <table className="w-full">
            {/* Table header */}
            <thead className="sticky top-0">
              <tr className="bg-greyscale-50 text-xs font-medium text-greyscale-500 bg-[#F2F3F5] ">
                <th className="w-20 px-3 py-3 text-left rounded-l-lg ">
                  Order ID
                </th>
                <th className="px-3 py-3 text-left truncate">Product Info</th>
                <th className="w-32 px-3 py-3 text-left truncate">
                  Time created
                </th>
                <th className="w-24 px-3 py-3 text-left truncate">
                  Order Status
                </th>
                <th className="w-24 px-3 py-3 text-center rounded-r-lg">
                  Action
                </th>
              </tr>
            </thead>

            {/* Table body */}
            <tbody>
              {isLoading ? (
                // Show skeleton loading
                Array.from({ length: 5 }).map((_, index) => (
                  <SkeletonRow key={index} />
                ))
              ) : error ? (
                // Show error state
                <tr>
                  <td colSpan={5} className="px-3 py-8 text-center">
                    <div className="text-greyscale-500">
                      <p className="text-sm">Error loading review history</p>
                      <p className="text-xs mt-1">Please try again later</p>
                    </div>
                  </td>
                </tr>
              ) : processedReviews.length === 0 ? (
                // Show empty state with NoData component
                <tr>
                  <td colSpan={5} className="px-3 py-8">
                    <NoData
                      title="No review history found"
                      description="Your review history will appear here when you complete reviews."
                      className="h-[400px]"
                    />
                  </td>
                </tr>
              ) : (
                // Show actual data
                processedReviews.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t border-dashed border-greyscale-100 first:border-t-0 hover:bg-greyscale-50/50"
                  >
                    {/* Order ID */}
                    <td className="px-3 py-5">
                      <div className="text-sm text-greyscale-900 font-medium truncate">
                        {item.orderId}
                      </div>
                    </td>

                    {/* Product Info */}
                    <td className="px-3 py-5">
                      <div className="space-y-3">
                        {item.products.map((product, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="size-14 rounded-lg overflow-hidden bg-greyscale-100 border border-greyscale-200 flex-shrink-0">
                              <img
                                src={product.productImage}
                                alt={product.productName}
                                width={56}
                                height={56}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="min-w-0">
                              <div className="text-xs text-greyscale-500">
                                {product.brand}
                              </div>
                              <div className="text-sm font-medium text-greyscale-900 truncate">
                                {product.productName}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </td>

                    {/* Time created */}
                    <td className="px-3 py-5">
                      <div className="text-sm text-greyscale-900">
                        {item.date}
                      </div>
                      <div className="text-xs text-greyscale-400">
                        {item.time}
                      </div>
                    </td>

                    {/* Order Status */}
                    <td className="px-3 py-5">{statusChip(item.status)}</td>

                    {/* Action */}
                    <td className="px-3 py-5 w-[160px]">
                      <button className="w-full cursor-pointer px-4 py-2 bg-pink-600 text-white text-sm font-medium hover:bg-pink-600/80 transition-colors rounded-full">
                        Review
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden">
          {isLoading ? (
            // Show skeleton loading for mobile
            Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="px-4 py-3 bg-white rounded-3xl mb-3">
                <div className="animate-pulse">
                  <div className="flex justify-between items-end mb-3">
                    <div className="h-4 bg-greyscale-200 rounded w-20"></div>
                    <div className="h-4 bg-greyscale-200 rounded w-16"></div>
                    <div className="h-4 bg-greyscale-200 rounded w-16"></div>
                  </div>
                  <div className="border-t border-[#E5E7EB] mb-3"></div>
                  <div className="flex items-start gap-3 mb-3">
                    <div className="size-14 bg-greyscale-200 rounded-lg"></div>
                    <div className="flex-1">
                      <div className="h-3 bg-greyscale-200 rounded w-16 mb-2"></div>
                      <div className="h-4 bg-greyscale-200 rounded w-32"></div>
                    </div>
                  </div>
                  <div className="border-t border-[#E5E7EB] mb-3"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-4 bg-greyscale-200 rounded w-32"></div>
                    <div className="h-8 bg-greyscale-200 rounded-full w-20"></div>
                  </div>
                </div>
              </div>
            ))
          ) : error ? (
            // Show error state for mobile
            <div className="px-4 py-8 text-center">
              <div className="text-greyscale-500">
                <p className="text-sm">Error loading review history</p>
                <p className="text-xs mt-1">Please try again later</p>
              </div>
            </div>
          ) : processedReviews.length === 0 ? (
            // Show empty state for mobile
            <div className="px-4 py-8">
              <NoData
                title="No review history found"
                description="Your review history will appear here when you complete reviews."
                className="h-[400px]"
              />
            </div>
          ) : (
            // Show actual data as cards
            processedReviews.map((item) => (
              <MobileCard key={item.id} item={item} />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default HistoryTable
