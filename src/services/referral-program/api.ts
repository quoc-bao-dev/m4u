import { envConfig } from '@/core/config'
import axiosInstance from '@/core/http/axiosInstance'
import {
  ReferralIntroduceResponse,
  ReferralProgramContentResponse,
} from './type'

export const apiReferralProgram = {
  getReferralProgram: () =>
    axiosInstance.get<ReferralProgramContentResponse>('/get_referral_program', {
      baseURL: envConfig.adminUrl,
    }),
  getIntroduceInfo: () =>
    axiosInstance.get<ReferralIntroduceResponse>('/info_introduce', {
      baseURL: envConfig.accountUrl,
    }),
}
