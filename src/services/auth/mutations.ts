import { tokenManager } from '@/core/http/axiosInstance'
import { useAuth } from '@/modules/auth'
import { authApi } from '@/services/auth/api'
import { LoginRequest, LoginResponse } from '@/services/auth/type'
import { useMutation } from '@tanstack/react-query'

export const useLogin = () => {
  const { setUser } = useAuth()

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
