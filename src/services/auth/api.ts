import axiosInstance from '@/core/http/axiosInstance'
import {
  LoginRequest,
  LoginResponse,
  UserRequest,
  UserResponse,
  SignUpRequest,
} from './type'
import { envConfig } from '@/core/config'

export const authApi = {
  login: (data: LoginRequest) =>
    axiosInstance.post<LoginResponse>('/login', data, {
      baseURL: envConfig.accountUrl,
    }),

  logout: (token: string) =>
    axiosInstance.post(
      '/logout',
      { token },
      {
        baseURL: envConfig.accountUrl,
      }
    ),

  userInfo: (data: UserRequest) =>
    axiosInstance.post<UserResponse>('/get_info_account', data, {
      baseURL: envConfig.accountUrl,
    }),

  start_sign_up: (data: SignUpRequest) =>
    axiosInstance.post<any>('/start_sign_up', data, {
      baseURL: envConfig.accountUrl,
    }),

  sign_up: (data: any) =>
    axiosInstance.post<any>('/sign_up', data, {
      baseURL: envConfig.accountUrl,
    }),

  senOTPForgotPassword: (data: { phone: string }) =>
    axiosInstance.post('/send_otp_forgot_password', data, {
      baseURL: envConfig.accountUrl,
    }),
  checkOTPForgotPassword: (data: { phone: string; key_code: string }) =>
    axiosInstance.post('/check_otp_forgot_password', data, {
      baseURL: envConfig.accountUrl,
    }),
  saveNewPassword: (data: {
    phone: string
    key_code: string
    password: string
  }) =>
    axiosInstance.post('/forgot_password', data, {
      baseURL: envConfig.accountUrl,
    }),
}
