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

  getTypeEvaluate: () =>
    axiosInstance.get<any>('/type_evaluate', { baseURL: envConfig.adminUrl }),

  getProductReview: () =>
    axiosInstance.get<any>(`/get_product_review/57`, {
      baseURL: envConfig.adminUrl,
    }),
    
  getListProductReview: (id_review: number) =>
    axiosInstance.get<any>(`/get_list_product_review/${id_review}`, {
      baseURL: envConfig.adminUrl,
    }),

  submitReview: (id_review_product: number, data: FormData) =>
    axiosInstance.post<any>(`/submitReview/${id_review_product}`, data, {
      baseURL: envConfig.adminUrl,
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
}
