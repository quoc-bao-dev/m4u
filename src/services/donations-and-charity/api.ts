import { envConfig } from '@/core/config'
import axiosInstance from '@/core/http/axiosInstance'
import { DonationsAndCharityResponse } from './type'

export const donationsAndCharityApi = {
  getDonationsAndCharity: () =>
    axiosInstance.get<DonationsAndCharityResponse>('/donations_and_charity', {
      baseURL: envConfig.adminUrl,
    }),
}
