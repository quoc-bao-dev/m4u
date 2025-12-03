import { useQuery } from '@tanstack/react-query'

import { chatBotApi } from './api'

export const useChatSession = () => {
  return useQuery({
    queryKey: ['chat-session'],
    queryFn: async () => {
      // Ưu tiên dùng session cache trong localStorage để tránh gọi API lại
      try {
        if (typeof window !== 'undefined') {
          const cached = window.localStorage.getItem('chat-session')
          if (cached) {
            return JSON.parse(cached)
          }
        }
      } catch {
        // ignore cache errors, fallback to API
      }

      const response = await chatBotApi.getSession()

      // Lưu cache lại để lần sau không cần gọi API
      try {
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(
            'chat-session',
            JSON.stringify(response.data)
          )
        }
      } catch {
        // ignore storage errors
      }

      return response.data
    },
  })
}

export const usePackbotIntro = () => {
  return useQuery({
    queryKey: ['packbot-intro'],
    queryFn: async () => {
      const response = await chatBotApi.getInfoScript()
      return response.data
    },
  })
}
