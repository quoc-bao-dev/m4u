import { useQuery } from '@tanstack/react-query'
import apiReviewHub from './api'

export const useGetDataReviewHub = () => {
  const queryFn = async () => {
    const response = await apiReviewHub.getDataReviewHub({
      per_page: 10,
      current_page: 1,
    })
    return response.data
  }
  return useQuery({
    queryKey: ['getDataReviewHub'],
    queryFn: queryFn,
  })
}