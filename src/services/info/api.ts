import { envConfig } from '@/core/config'
import axiosInstance from '@/core/http/axiosInstance'

const apiInfo = {
  getInfoContact() {
    return axiosInstance.get<any>(`/getInfoContact`, {
      baseURL: envConfig.adminUrl,
    })
  },
  
}

export default apiInfo
