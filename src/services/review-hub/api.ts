import { envConfig } from '@/core/config'
import axiosInstance from '@/core/http/axiosInstance'

const apiReviewHub = {
  getDataReviewHub: ({
    per_page,
    current_page,
  }: {
    per_page?: number
    current_page?: number
  }) =>
    axiosInstance.get<any>('/dataReviewHub', {
      params: {
        per_page,
        current_page,
      },
      baseURL: envConfig.adminUrl,
    }),

  dataReviewHubProduct: (
    id_product: number,
    {
      per_page,
      current_page,
    }: {
      per_page?: number
      current_page?: number
    }
  ) =>
    axiosInstance.get<any>(`/dataReviewHubProduct/${id_product}`, {
      params: {
        per_page,
        current_page,
      },
      baseURL: envConfig.adminUrl,
    }),

  dataReviewHubDetail: (
    slug: string,
    {
      per_page,
      current_page,
    }: {
      per_page?: number
      current_page?: number
    }
  ) =>
    axiosInstance.get<any>(`/products/getDetailReview/${slug}`, {
      params: {
        current_page,
        per_page,
      },
      baseURL: envConfig.adminUrl,
    }),

  getProductRelationListReviewHub: ({ id }: { id: string }) =>
    axiosInstance.get<any>('dataReviewHubOther', {
      baseURL: envConfig.adminUrl,
      params: { id, per_page: 2 },
    }),
}

export default apiReviewHub
