import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { apiMyReview } from './api'

export function useMyReview({
  activeTab,
  searchQuery,
  dateStart,
  dateEnd,
  perPage = 5,
  enabled = true,
}: {
  activeTab?: string
  searchQuery?: string
  dateStart?: string
  dateEnd?: string
  perPage?: number
  enabled?: boolean
}) {
  return useInfiniteQuery({
    queryKey: [
      'my-review',
      activeTab,
      searchQuery,
      dateStart,
      dateEnd,
      perPage,
    ],
    enabled,
    queryFn: async ({ pageParam = 1 }) => {
      const response = await apiMyReview.getMyReview({
        activeTab,
        searchQuery,
        dateStart,
        dateEnd,
        per_page: perPage,
        current_page: pageParam as number,
      })
      return response.data
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage) return undefined
      const next = lastPage.data.current_page + 1
      return next <= lastPage.data.last_page ? next : undefined
    },
  })
}
