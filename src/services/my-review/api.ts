import { envConfig } from '@/core/config/envConfig'
import axiosInstance from '@/core/http/axiosInstance'
import { MyReviewResponse, MyReviewStatusResponse } from './type'

export const apiMyReview = {
  getMyReview: ({
    activeTab,
    searchQuery,
    dateStart,
    dateEnd,
    per_page,
    current_page,
  }: {
    activeTab?: string
    searchQuery?: string
    dateStart?: string
    dateEnd?: string
    per_page?: number
    current_page?: number
  }) =>
    axiosInstance.get<MyReviewResponse>(
      'get_my_review',

      {
        baseURL: envConfig.adminUrl,
        params: {
          search: searchQuery,
          status: activeTab,
          date_start_sign_up: dateStart,
          date_end_sign_up: dateEnd,
          per_page,
          current_page,
        },
      }
    ),
  getMyReviewStatus: () =>
    axiosInstance.get<MyReviewStatusResponse>('type_active_review', {
      baseURL: envConfig.adminUrl,
    }),
}
