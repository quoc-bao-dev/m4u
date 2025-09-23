'use client'
/* Mock data: replace with hook when available */
const MOCK_REVIEWS = [
  {
    id: 1,
    product: {
      brand: 'MANYO',
      name: 'Panthetoin Deep Moisture Mask',
      image: '/image/product/image-01.png',
    },
    review: {
      rating: 5,
      title: 'Excellent',
      excerpt:
        'Such a pleasant surprise! I got to try premium products for free and even picked...',
      mediaCount: 3,
      avatar: '/image/avatar/image-01.png',
    },
    reward: '50% discount coupon',
    date: '16 Sep 2025',
    time: '04:20 PM',
    status: 'Reward paid',
    action: 'View details',
  },
  {
    id: 2,
    product: {
      brand: 'MANYO',
      name: 'Panthetoin Deep Moisture Mask',
      image: '/image/product/image-01.png',
    },
    review: {
      rating: 5,
      title: 'Excellent',
      excerpt:
        'Such a pleasant surprise! I got to try premium products for free and even picked...',
      mediaCount: 2,
      avatar: '/image/avatar/image-01.png',
    },
    reward: '69,000 đ',
    date: '16 Sep 2025',
    time: '04:20 PM',
    status: 'Accepted',
    action: 'View details',
  },
  {
    id: 3,
    product: {
      brand: 'MANYO',
      name: 'Panthetoin Deep Moisture Mask',
      image: '/image/product/image-01.png',
    },
    review: {
      rating: 5,
      title: 'Excellent',
      excerpt:
        'Such a pleasant surprise! I got to try premium products for free and even picked...',
      mediaCount: 2,
      avatar: '/image/avatar/image-01.png',
    },
    reward: 'Buy 1 get 1 coupon',
    date: '16 Sep 2025',
    time: '04:20 PM',
    status: 'Rejected',
    action: 'Rewrite review',
  },
]

const StatusDot = ({ color }: { color: string }) => (
  <span
    className="inline-block w-2 h-2 rounded-full"
    style={{ backgroundColor: color }}
  />
)

const Table = () => {
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
                  Product info
                </th>
                <th className="px-3 py-3 text-left align-middle">Review</th>
                <th className="px-3 py-3 text-left align-middle w-[160px]">
                  Reward
                </th>
                <th className="px-3 py-3 text-left align-middle w-[160px]">
                  Date time
                </th>
                <th className="px-3 py-3 text-left align-middle w-[140px]">
                  Status
                </th>
                <th className="px-3 py-3 text-center rounded-r-lg align-middle w-[160px]">
                  Action
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody>
              {MOCK_REVIEWS.map((row) => (
                <tr
                  key={row.id}
                  className="border-t border-dashed first:border-t-0 border-greyscale-200 hover:bg-greyscale-50/50"
                >
                  {/* Product info */}
                  <td className="px-3 py-5 align-middle">
                    <div className="flex items-center gap-3">
                      <div className="size-14 rounded-lg overflow-hidden bg-greyscale-100 border border-greyscale-200 flex-shrink-0">
                        <img
                          src={row.product.image}
                          alt={row.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs text-greyscale-500">
                          {row.product.brand}
                        </div>
                        <div className="text-sm font-medium text-greyscale-900 truncate">
                          {row.product.name}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Review */}
                  <td className="px-3 py-5 align-middle">
                    <div className="flex items-start gap-3">
                      <div className="flex items-center gap-1 text-yellow-500 mt-0.5">
                        {Array.from({ length: row.review.rating }).map(
                          (_, i) => (
                            <svg
                              key={i}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-4 h-4"
                            >
                              <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                          )
                        )}
                      </div>
                      <div className="flex-1 ">
                        <div className="text-sm font-medium text-greyscale-900 truncate">
                          {row.review.title}
                        </div>
                        <div className="text-xs text-greyscale-500 mt-1 line-clamp-2">
                          {row.review.excerpt}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ">
                        <img
                          src={row.review.avatar}
                          alt="avatar"
                          className="w-10 h-10 rounded-md object-cover flex-shrink-0"
                        />
                        <span className="text-xs text-greyscale-500">
                          +{row.review.mediaCount}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Reward */}
                  <td className="px-3 py-5 align-middle">
                    <div className="text-sm text-greyscale-900 truncate">
                      {row.reward}
                    </div>
                  </td>

                  {/* Date time */}
                  <td className="px-3 py-5 align-middle">
                    <div className="text-sm text-greyscale-900 truncate">
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
                          row.status === 'Reward paid'
                            ? '#10B981'
                            : row.status === 'Accepted'
                            ? '#2563EB'
                            : '#EF4444'
                        }
                      />
                      <span className="text-xs text-greyscale-700 truncate">
                        {row.status}
                      </span>
                    </div>
                  </td>

                  {/* Action */}
                  <td className="px-3 py-5 w-[160px] align-middle">
                    <button className="truncate w-full cursor-pointer px-4 py-2 bg-pink-600 text-white text-sm font-medium hover:bg-pink-600/80 transition-colors rounded-full">
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
        {MOCK_REVIEWS.map((row) => (
          <div
            key={row.id}
            className="px-4 py-3 bg-white rounded-3xl border border-greyscale-200"
          >
            <div className="flex justify-between items-end mb-3 text-xs text-greyscale-500">
              <div className="text-greyscale-900 font-medium truncate">
                {row.date}
              </div>
              <div className="truncate">{row.time}</div>
            </div>
            <div className="border-t border-[#E5E7EB] mb-3"></div>
            <div className="flex items-start gap-3 mb-3">
              <div className="size-14 rounded-lg overflow-hidden bg-greyscale-100 border border-greyscale-200 flex-shrink-0">
                <img
                  src={row.product.image}
                  alt={row.product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-greyscale-500">
                  {row.product.brand}
                </div>
                <div className="text-sm font-medium text-greyscale-900 truncate">
                  {row.product.name}
                </div>
                <div className="mt-2 flex items-center gap-1 text-yellow-500">
                  {Array.from({ length: row.review.rating }).map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <div className="text-xs text-greyscale-500 mt-1 line-clamp-2">
                  {row.review.excerpt}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <img
                  src={row.review.avatar}
                  alt="avatar"
                  className="w-10 h-10 rounded-md object-cover"
                />
                <span className="text-xs text-greyscale-500">
                  +{row.review.mediaCount}
                </span>
              </div>
            </div>
            <div className="border-t border-[#E5E7EB] mb-3"></div>
            <div className="flex justify-between items-center">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-greyscale-100 border border-greyscale-200">
                <StatusDot
                  color={
                    row.status === 'Reward paid'
                      ? '#10B981'
                      : row.status === 'Accepted'
                      ? '#2563EB'
                      : '#EF4444'
                  }
                />
                <span className="text-xs text-greyscale-700 truncate">
                  {row.status}
                </span>
              </div>
              <button className="px-4 py-2 bg-pink-600 text-white text-sm font-medium hover:bg-pink-600/80 transition-colors rounded-full truncate">
                {row.action}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Table
