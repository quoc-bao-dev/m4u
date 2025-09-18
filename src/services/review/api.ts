import axiosInstance from '@/core/http/axiosInstance'
import { envConfig } from '@/core/config'

export const reviewApi = {
  getTypeEvaluate: () =>
    axiosInstance.get<any>('/type_evaluate', { baseURL: envConfig.adminUrl }),

  listReview: () =>
    axiosInstance.post<any>('/list_review', { baseURL: envConfig.adminUrl }),

  getProductReview: () =>
    axiosInstance.get<any>(`/get_product_review/57`, {
      baseURL: envConfig.adminUrl,
    }),

  submitReview: (data: FormData) =>
    axiosInstance.post<any>(
      '/submitReview/57',
      data,
      {
        baseURL: envConfig.adminUrl,
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    ),
}
