import axiosInstance from '@/core/http/axiosInstance'
import { ProductListResponse } from './type'

export const productApi = {
  getProductList: () =>
    axiosInstance.get<ProductListResponse>('/api/products/getList', {
      baseURL: 'https://m4u-admin.fmrp.vn/',
    }),
}
