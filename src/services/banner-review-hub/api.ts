import { envConfig } from '@/core/config'
import axiosInstance from '@/core/http/axiosInstance'
import { BannerReviewHubResponse } from './type'

export const bannerReviewHubApi = {
  getBannerReviewHub: () =>
    axiosInstance.get<BannerReviewHubResponse>('BannerReviewHub', {
      baseURL: envConfig.adminUrl,
    }),
}
