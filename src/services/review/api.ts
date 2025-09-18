import { envConfig } from '@/core/config'
import axiosInstance from '@/core/http/axiosInstance'
import { ReviewHistoryListResponse } from './type'

export const apiReview = {
  getListReviewHistory: ({
    activeTab,
    searchQuery,
    dateStart,
    dateEnd,
  }: {
    activeTab?: string
    searchQuery?: string
    dateStart?: string
    dateEnd?: string
  }) =>
    axiosInstance.post<ReviewHistoryListResponse>(
      '/list_review',
      {
        search: searchQuery,
        status: activeTab,
        date_start_sign_up: dateStart,
        date_end_sign_up: dateEnd,
      },
      {
        baseURL: envConfig.adminUrl,
      }
    ),
}
