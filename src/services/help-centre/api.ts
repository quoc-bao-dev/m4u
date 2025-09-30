import { envConfig } from '@/core/config'
import axiosInstance from '@/core/http/axiosInstance'
import { HelpCentreResponse } from './type'

export const helpCentreApi = {
  getHelpCentre: ({ _local }: { _local?: string }) =>
    axiosInstance.get<HelpCentreResponse>('HelpCentre', {
      baseURL: envConfig.adminUrl,
      params: { _local },
    }),
}
