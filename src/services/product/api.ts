import axiosInstance from '@/core/http/axiosInstance'
import { ProductDetailResponse, ProductListResponse } from './type'

export const productApi = {
  getProductList: () =>
    axiosInstance.get<ProductListResponse>('/api/products/getList', {
      baseURL: 'https://m4u-admin.fmrp.vn/',
    }),

  getProductDetail: ({ slug }: { slug: string }) =>
    axiosInstance.get<ProductDetailResponse>(
      `/api/products/getDetail/${slug}`,
      {
        baseURL: 'https://m4u-admin.fmrp.vn/',
      }
    ),
}
