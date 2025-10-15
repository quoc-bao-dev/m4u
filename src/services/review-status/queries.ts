import { useQuery } from '@tanstack/react-query'
import apiReviewStatus from './api'
import { ReviewStatusResponse } from './type'

export const useReviewStatus = () => {
  const queryFn = async () => {
    const response = await apiReviewStatus.getReviewStatus()
    return response.data
  }
  return useQuery<ReviewStatusResponse>({
    queryKey: ['review-status'],
    queryFn: queryFn,
  })
}
