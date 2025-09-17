import axiosInstance from '@/core/http/axiosInstance'

import { envConfig } from '@/core/config'

export const trialRegistrationApi = {
  appendReviewProduct: ({ id_product }: { id_product: number[] }) =>
    axiosInstance.post<any>(
      '/appendReviewProduct',
      { id_product },
      { baseURL: envConfig.adminUrl }
    ),
}
