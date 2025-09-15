import axiosInstance from '@/core/http/axiosInstance'
import { LoginRequest, LoginResponse, UserRequest, UserResponse } from './type'
import { envConfig } from '@/core/config'

export const authApi = {
  login: (data: LoginRequest) =>
    axiosInstance.post<LoginResponse>('/login', data, {
      baseURL: envConfig.accountUrl,
    }),

  userInfo: (data: UserRequest) =>
    axiosInstance.post<UserResponse>('/get_info_account', data, {
      baseURL: envConfig.accountUrl,
    }),
}
