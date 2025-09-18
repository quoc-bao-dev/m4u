import { useQuery } from '@tanstack/react-query'
import { apiReview } from './api'

export const useGetListReviewHistory = () => {
  const queryFn = async () => {
    const response = await apiReview.getListReviewHistory()
    return response.data
  }
  return useQuery({
    queryKey: ['listReviewHistory'],
    queryFn: queryFn,
  })
}
