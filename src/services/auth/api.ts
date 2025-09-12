import axiosInstance from '@/core/http/axiosInstance'
import { LoginRequest, LoginResponse, UserRequest, UserResponse } from './type'

export const authApi = {
  login: (data: LoginRequest) =>
    axiosInstance.post<LoginResponse>('/login', data),

  userInfo: (data: UserRequest) =>
    axiosInstance.post<UserResponse>('/get_info_account', data),
}
