import { tokenManager } from '@/core/http/axiosInstance'
import { useAuth } from '@/modules/auth'
import { authApi } from '@/services/auth/api'
import {
  LoginRequest,
  LoginResponse,
  SignUpRequest,
} from '@/services/auth/type'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useLogin = () => {
  const { setUser } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: LoginRequest) => {
      const response = await authApi.login(data)
      return response.data
    },
    onSuccess: async (response: LoginResponse) => {
      // Only proceed if result is true and token exists
      if (response.result === true && response.token) {
        // Lấy thông tin user sau khi login thành công
        tokenManager.setTokens(response.token)
        queryClient.invalidateQueries({ queryKey: ['product-list'] })

        try {
          const userResponse = await authApi.userInfo({ token: response.token })
          if (userResponse.data.result) {
            setUser(userResponse.data.info)
          }
        } catch (error) {
          console.error('Error fetching user info:', error)
        }
      }
    },
    onError: (error) => {
      console.error('Login error:', error)
    },
  })
}

export const useLogout = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (token: string) => {
      const response = await authApi.logout(token)
      return response.data
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['product-list'] })
    },
  })
}

export const useStartSignUp = () => {
  return useMutation({
    mutationFn: async (data: SignUpRequest) => {
      const response = await authApi.start_sign_up(data)
      return response.data
    },
  })
}

export const useSignUp = () => {
  const { setUser } = useAuth()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: SignUpRequest) => {
      const response = await authApi.sign_up(data)
      return response.data
    },
    onSuccess: async (response: LoginResponse) => {
      if (response.result === true && response.token) {
        // Lấy thông tin user sau khi login thành công
        tokenManager.setTokens(response.token)
        try {
          const userResponse = await authApi.userInfo({ token: response.token })
          if (userResponse.data.result) {
            setUser(userResponse.data.info)
          }
          queryClient.invalidateQueries({ queryKey: ['product-list'] })
        } catch (error) {
          console.error('Error fetching user info:', error)
        }
      }
    },
    onError: (error) => {
      console.error('Login error:', error)
    },
  })
}
