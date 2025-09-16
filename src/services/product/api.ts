import { envConfig } from '@/core/config'
import axiosInstance from '@/core/http/axiosInstance'
import { ProductDetailResponse, ProductListResponse } from './type'

export const productApi = {
  getProductList: ({ _local }: { _local?: string }) =>
    axiosInstance.get<ProductListResponse>('products/getList', {
      baseURL: envConfig.adminUrl,
      params: { _local },
    }),
  getProductRelationList: ({ _local, id }: { _local?: string; id: string }) =>
    axiosInstance.get<ProductListResponse>('products/getList', {
      baseURL: envConfig.adminUrl,
      params: { _local, id, per_page: 3 },
    }),

  getProductDetail: ({ slug, _local }: { slug: string; _local?: string }) =>
    axiosInstance.get<ProductDetailResponse>(`products/getDetail/${slug}`, {
      baseURL: envConfig.adminUrl,
      params: { _local },
    }),
}
