import { tokenManager } from '@/core/http/axiosInstance'
import { useRouter } from '@/locale'
import { useAuth } from '@/modules/auth'
import { chatStore } from '@/modules/chat-bot/store/chatStore'
import { authApi } from '@/services/auth/api'
import {
  LoginRequest,
  LoginResponse,
  SignUpRequest,
} from '@/services/auth/type'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useChatSession } from '../chat-bot'

export const useLogin = () => {
  const { setUser } = useAuth()
  const queryClient = useQueryClient()
  const { data: chatSession } = useChatSession()

  return useMutation({
    mutationFn: async (data: LoginRequest) => {
      const response = await authApi.login({
        ...data,
        vsession: chatSession?.vsession,
      })
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
  const router = useRouter()
  const { clearMessages } = chatStore()
  return useMutation({
    mutationFn: async (token: string) => {
      const response = await authApi.logout(token)
      return response.data
    },
    onSuccess: async () => {
      // Clear chat messages
      clearMessages()

      // Remove chat session from localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem('chat-session')
        window.localStorage.removeItem('chatbot_closed_date')
      }

      // Invalidate chat-session query to get new vsession
      await queryClient.invalidateQueries({ queryKey: ['chat-session'] })

      // Refetch new session immediately
      await queryClient.refetchQueries({ queryKey: ['chat-session'] })

      queryClient.invalidateQueries({ queryKey: ['product-list'] })
      router.push('/')
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

export const useSendOTPForgotPassword = () => {
  return useMutation({
    mutationFn: async (data: { phone: string }) => {
      const response = await authApi.senOTPForgotPassword(data)
      return response.data
    },
  })
}

export const useCheckOTPForgotPassword = () => {
  return useMutation({
    mutationFn: async (data: { phone: string; key_code: string }) => {
      const response = await authApi.checkOTPForgotPassword(data)
      return response.data
    },
  })
}

export const useSaveNewPassword = () => {
  return useMutation({
    mutationFn: async (data: {
      phone: string
      key_code: string
      password: string
    }) => {
      const response = await authApi.saveNewPassword(data)
      return response.data
    },
  })
}
