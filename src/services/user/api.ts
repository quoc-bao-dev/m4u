import axiosInstance from '@/core/http/axiosInstance'
import { envConfig } from '@/core/config'

export const userApi = {
  updateAccount: (data: {
    token: string
    gender?: string
    fullname?: string
    address?: string
    avatar?: string
    phone?: string
    birthday?: string
  }) =>
    axiosInstance.post('/update_account', data, {
      baseURL: envConfig.accountUrl,
    }),

  updatePassword: (data: {
    token: string
    password: string
    type?: string
  }) => {
    data.type = !data.type ? 'password' : data.type
    return axiosInstance.post('/update_password', data, {
      baseURL: envConfig.accountUrl,
    })
  },

  updateAvatar: (data: { token: string; avatar: File }) => {
    const formData = new FormData()
    formData.append('token', data.token)
    formData.append('avatar', data.avatar)

    return axiosInstance.post('/update_account', formData, {
      baseURL: envConfig.accountUrl,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
}
