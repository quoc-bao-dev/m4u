import { envConfig } from '@/core/config'
import axiosInstance from '@/core/http/axiosInstance'
import type { ProductListResponse } from '@/services/product/type'

export const productDonationApi = {
  getDonationList: ({ _local }: { _local?: string }) =>
    axiosInstance.get<ProductListResponse>('products/getList', {
      baseURL: envConfig.adminUrl,
      params: { _local, is_contribute: 1 },
    }),
}
