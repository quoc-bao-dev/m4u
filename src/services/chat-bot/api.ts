import axiosInstance from '@/core/http/axiosInstance'

import { CreateChatSessionResponse, GetInfoScriptResponse } from './type'
import { envConfig } from '@/core/config'

export const chatBotApi = {
  getSession: () =>
    axiosInstance.get<CreateChatSessionResponse>('/script/createSession', {
      baseURL: envConfig.adminUrl,
    }),

  getInfoScript: () =>
    axiosInstance.get<GetInfoScriptResponse>('/script/get_info_script', {
      baseURL: envConfig.adminUrl,
    }),
}
