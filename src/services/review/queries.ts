import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { apiReview } from './api'

export const useGetTypeEvaluate = () => {
  const queryFn = async () => {
    const response = await apiReview.getTypeEvaluate()
    return response.data
  }
  return useQuery({
    queryKey: ['type-evaluate'],
    queryFn: queryFn,
  })
}

export const useGetProductReview = () => {
  const queryFn = async () => {
    const response = await apiReview.getProductReview()
    return response.data.data
  }
  return useQuery({
    queryKey: ['get-product-review'],
    queryFn: queryFn,
  })
}

export const useGetListReviewHistory = ({
  activeTab,
  searchQuery,
  dateStart,
  dateEnd,
}: {
  activeTab?: string
  searchQuery?: string
  dateStart?: string
  dateEnd?: string
}) => {
  const queryFn = async () => {
    const response = await apiReview.getListReviewHistory({
      activeTab,
      searchQuery,
      dateStart,
      dateEnd,
    })
    return response.data
  }
  return useQuery({
    queryKey: ['listReviewHistory', activeTab, searchQuery, dateStart, dateEnd],
    queryFn: queryFn,
  })
}

export const useGetListProductReview = (id_review: number) => {
  const queryFn = async () => {
    const response = await apiReview.getListProductReview(id_review)
    return response.data.data
  }
  return useQuery({
    queryKey: ['listProductReview', id_review],
    queryFn: queryFn,
    enabled: !!id_review,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
  })
}

export const useInfiniteListReviewHistory = ({
  activeTab,
  searchQuery,
  dateStart,
  dateEnd,
  perPage = 5,
}: {
  activeTab?: string
  searchQuery?: string
  dateStart?: string
  dateEnd?: string
  perPage?: number
}) => {
  return useInfiniteQuery({
    queryKey: [
      'infiniteListReviewHistory',
      activeTab,
      searchQuery,
      dateStart,
      dateEnd,
      perPage,
    ],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await apiReview.getListReviewHistory({
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
      const next = lastPage.current_page + 1
      return next <= lastPage.last_page ? next : undefined
    },
  })
}
