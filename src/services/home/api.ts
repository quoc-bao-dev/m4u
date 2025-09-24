import { envConfig } from '@/core/config'
import axiosInstance from '@/core/http/axiosInstance'

const apiHome = {
  getHomePage() {
    return axiosInstance.get<any>(`/HomePage`, {
      baseURL: envConfig.adminUrl,
    })
  },
  
  getViewReviewer({
    per_page,
    current_page,
  }: {
    per_page?: number
    current_page?: number
  }) {
    return axiosInstance.get<any>(`/viewReviewer`, {
      params: {
        per_page,
        current_page,
      },
      baseURL: envConfig.accountUrl,
    })
  },
}

export default apiHome
