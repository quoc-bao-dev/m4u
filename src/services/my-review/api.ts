import { envConfig } from '@/core/config/envConfig'
import axiosInstance from '@/core/http/axiosInstance'
import { MyReviewResponse } from './type'

export const apiMyReview = {
  getMyReview: () =>
    axiosInstance.get<MyReviewResponse>('get_my_review', {
      baseURL: envConfig.adminUrl,
    }),
}
