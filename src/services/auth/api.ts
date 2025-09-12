import axiosInstance from '@/core/http/axiosInstance'
import { LoginRequest, LoginResponse, UserRequest, UserResponse } from './type'

export const authApi = {
  login: (data: LoginRequest) =>
    axiosInstance.post<LoginResponse>('/login', data, {
      baseURL: 'https://m4u-accounts.fmrp.vn/api/',
    }),

  userInfo: (data: UserRequest) =>
    axiosInstance.post<UserResponse>('/get_info_account', data, {
      baseURL: 'https://m4u-accounts.fmrp.vn/api/',
    }),
}
