import { envConfig } from '@/core/config'
import axiosInstance from '@/core/http/axiosInstance'
import { InfoDataArticlesResponse, GetInfoResponse } from './type'

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

  getInfo() {
    return axiosInstance.get<GetInfoResponse>(`/get_info`, {
      baseURL: envConfig.adminUrl,
    })
  },
}

export default apiInfo
