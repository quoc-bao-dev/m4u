import { useQuery } from '@tanstack/react-query'
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
