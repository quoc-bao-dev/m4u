import { useQuery } from '@tanstack/react-query'
import { bannerReviewHubApi } from './api'

export const useGetBannerReviewHub = (options?: { enabled?: boolean }) => {
  const queryFn = async () => {
    const response = await bannerReviewHubApi.getBannerReviewHub()
    return response.data
  }

  return useQuery({
    queryKey: ['banner-review-hub'],
    queryFn: queryFn,
  })
}
