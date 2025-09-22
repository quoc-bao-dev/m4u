import { envConfig } from '@/core/config'
import axiosInstance from '@/core/http/axiosInstance'
import { ReferralProgramContentResponse } from './type'

export const apiReferralProgram = {
  getReferralProgram: () =>
    axiosInstance.get<ReferralProgramContentResponse>('/get_referral_program', {
      baseURL: envConfig.adminUrl,
    }),
}
