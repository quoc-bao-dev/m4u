import { envConfig } from '@/core/config'
import axiosInstance from '@/core/http/axiosInstance'

const apiHome = {
  getHomePage() {
    return axiosInstance.get<any>(`/HomePage`, {
      baseURL: envConfig.adminUrl,
    })
  },
}

export default apiHome
