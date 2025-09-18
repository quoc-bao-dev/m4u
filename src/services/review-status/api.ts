import axiosInstance from '@/core/http/axiosInstance'
import { ReviewStatusResponse } from './type'
import { envConfig } from '@/core/config'

const apiReviewStatus = {
  getReviewStatus: () =>
    axiosInstance.get<ReviewStatusResponse>('/type_status_review', {
      baseURL: envConfig.adminUrl,
    }),
}

export default apiReviewStatus
