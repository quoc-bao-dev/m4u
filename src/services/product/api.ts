import axiosInstance from '@/core/http/axiosInstance'
import { ProductDetailResponse, ProductListResponse } from './type'

export const productApi = {
  getProductList: ({ _local }: { _local?: string }) =>
    axiosInstance.get<ProductListResponse>('/api/products/getList', {
      baseURL: 'https://m4u-admin.fmrp.vn/',
      params: { _local },
    }),
  getProductRelationList: ({ _local, id }: { _local?: string; id: string }) =>
    axiosInstance.get<ProductListResponse>('/api/products/getList', {
      baseURL: 'https://m4u-admin.fmrp.vn/',
      params: { _local, id },
    }),

  getProductDetail: ({ slug, _local }: { slug: string; _local?: string }) =>
    axiosInstance.get<ProductDetailResponse>(
      `/api/products/getDetail/${slug}`,
      {
        baseURL: 'https://m4u-admin.fmrp.vn/',
        params: { _local },
      }
    ),
}
