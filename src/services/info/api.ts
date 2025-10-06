import { envConfig } from '@/core/config'
import axiosInstance from '@/core/http/axiosInstance'
import { InfoDataArticlesResponse } from './type'

const apiInfo = {
  getInfoContact() {
    return axiosInstance.get<any>(`/getInfoContact`, {
      baseURL: envConfig.adminUrl,
    })
  },

  getInfoDataArticles() {
    return axiosInstance.get<InfoDataArticlesResponse>(`/info_data_articles`, {
      baseURL: envConfig.serviceUrl,
    })
  },
}

export default apiInfo
