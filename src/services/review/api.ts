import { envConfig } from '@/core/config'
import axiosInstance from '@/core/http/axiosInstance'
import { ReviewHistoryListResponse } from './type'

export const apiReview = {
  getListReviewHistory: () =>
    axiosInstance.post<ReviewHistoryListResponse>(
      '/list_review',
      {},
      {
        baseURL: envConfig.adminUrl,
      }
    ),
}
