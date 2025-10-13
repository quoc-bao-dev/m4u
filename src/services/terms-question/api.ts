import axiosInstance from '@/core/http/axiosInstance'
import { GetTermsQuestionsResponse } from './type'
import { envConfig } from '@/core/config'

const termsQuestionApi = {
  getTermsQuestions: async () => {
    const res = await axiosInstance.get<GetTermsQuestionsResponse>(
      '/termsQuestion',
      { baseURL: envConfig.adminUrl }
    )
    return res.data
  },
}

export default termsQuestionApi
