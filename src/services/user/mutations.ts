import { tokenManager } from '@/core/http/axiosInstance'
import { useAuth } from '@/modules/auth'
import { authApi } from '@/services/auth/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { userApi } from './api'

export const useUpdateAccount = () => {
  const queryClient = useQueryClient()
  const { setUser } = useAuth()

  return useMutation({
    mutationFn: userApi.updateAccount,
    onSuccess: async (data, variables) => {
      // Lấy token hiện tại để fetch lại user info
      const token = tokenManager.getAccessToken()

      if (token) {
        try {
          // Fetch lại thông tin user mới từ server
          const userResponse = await authApi.userInfo({ token })
          if (userResponse.data?.result && userResponse.data.info) {
            // Cập nhật user state với thông tin mới
            setUser(userResponse.data.info)
          }
        } catch (error) {
          console.error('Error refreshing user info after update:', error)
          queryClient.invalidateQueries({ queryKey: ['user'] })
        }
      }
    },
    onError: (error) => {
      console.error('Update account error:', error)
    },
  })
}

export const useUpdatePassword = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: userApi.updatePassword,
    onSuccess: (data, variables) => {},
    onError: (error) => {
      console.error('Update password error:', error)
    },
  })
}

export const useUpdateAvatar = () => {
  const queryClient = useQueryClient()
  const { setUser } = useAuth()

  return useMutation({
    mutationFn: userApi.updateAvatar,
    onSuccess: async (data, variables) => {
      // Lấy token hiện tại để fetch lại user info
      const token = tokenManager.getAccessToken()

      if (token) {
        try {
          // Fetch lại thông tin user mới từ server để có avatar URL mới
          const userResponse = await authApi.userInfo({ token })
          if (userResponse.data?.result && userResponse.data.info) {
            // Cập nhật user state với thông tin mới (bao gồm avatar URL mới)
            setUser(userResponse.data.info)
          }
        } catch (error) {
          console.error(
            'Error refreshing user info after avatar update:',
            error
          )
          queryClient.invalidateQueries({ queryKey: ['user'] })
        }
      }
    },
    onError: (error) => {
      console.error('Update avatar error:', error)
    },
  })
}
