import { envConfig } from '@/core/config'
import axiosInstance from '@/core/http/axiosInstance'
import { ReviewHistoryListResponse } from './type'

export const apiReview = {
  getListReviewHistory: ({
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
    axiosInstance.post<ReviewHistoryListResponse>(
      '/list_review',
      {
        search: searchQuery,
        status: activeTab,
        date_start_sign_up: dateStart,
        date_end_sign_up: dateEnd,
        per_page,
        current_page,
      },
      {
        baseURL: envConfig.adminUrl,
      }
    ),

  getTypeEvaluate: () =>
    axiosInstance.get<any>('/type_evaluate', { baseURL: envConfig.adminUrl }),

  getProductReview: () =>
    axiosInstance.get<any>(`/get_product_review/57`, {
      baseURL: envConfig.adminUrl,
    }),

  submitReview: (data: FormData) =>
    axiosInstance.post<any>('/submitReview/57', data, {
      baseURL: envConfig.adminUrl,
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
}
