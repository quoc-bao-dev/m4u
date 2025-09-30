import { envConfig } from '@/core/config'
import axiosInstance from '@/core/http/axiosInstance'
import {
  FeedbackResponse,
  ImproveFeedbackResponse,
  SendFeedbackRequest,
  SendFeedbackResponse,
} from './type'

export const feedbackApi = {
  getFeedback: ({ _local }: { _local?: string }) =>
    axiosInstance.get<FeedbackResponse>('Feedback', {
      baseURL: envConfig.adminUrl,
      params: { _local },
    }),

  getImproveFeedback: ({ _local }: { _local?: string }) =>
    axiosInstance.get<ImproveFeedbackResponse>(
      'feedback/get_improve_feedback',
      {
        baseURL: envConfig.accountUrl,
        params: { _local },
      }
    ),

  sendFeedback: (data: SendFeedbackRequest) => {
    const formData = new FormData()

    // Add required fields
    formData.append('star_like', data.star_like.toString())
    formData.append('content_feedback', data.content_feedback)

    // Add improve array
    data.improve.forEach((item, index) => {
      formData.append(`improve[${index}]`, item)
    })

    // Add files if provided
    if (data.file && data.file.length > 0) {
      data.file.forEach((file, index) => {
        formData.append(`file[${index}]`, file)
      })
    }

    return axiosInstance.post<SendFeedbackResponse>(
      'feedback/send_feedback',
      formData,
      {
        baseURL: envConfig.accountUrl,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
  },
}
