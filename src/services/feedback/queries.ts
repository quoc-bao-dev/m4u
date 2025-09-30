import { useLanguageSwitch } from '@/locale'
import { useMutation, useQuery } from '@tanstack/react-query'
import { feedbackApi } from './api'
import { SendFeedbackRequest } from './type'

export const useGetFeedback = () => {
  const { currentLocale } = useLanguageSwitch()
  const _locale = currentLocale
  const queryFn = async () => {
    const response = await feedbackApi.getFeedback({ _local: _locale })
    return response.data
  }
  return useQuery({
    queryKey: ['feedback', _locale],
    queryFn,
  })
}

export const useGetImproveFeedback = () => {
  const { currentLocale } = useLanguageSwitch()
  const _locale = currentLocale
  const queryFn = async () => {
    const response = await feedbackApi.getImproveFeedback({ _local: _locale })
    return response.data
  }
  return useQuery({
    queryKey: ['improve-feedback', _locale],
    queryFn,
  })
}

export const useSendFeedback = () => {
  return useMutation({
    mutationFn: async (data: SendFeedbackRequest) => {
      const response = await feedbackApi.sendFeedback(data)
      return response.data
    },
    onSuccess: (data) => {
      console.log('Feedback sent successfully:', data)
    },
    onError: (error) => {
      console.error('Error sending feedback:', error)
    },
  })
}
