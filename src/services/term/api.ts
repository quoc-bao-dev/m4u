import { envConfig } from '@/core/config'
import axiosInstance from '@/core/http/axiosInstance'
import type { TermResponse } from './type'

export const termApi = {
  getTerms: ({ _local }: { _local?: string }) =>
    axiosInstance.get<TermResponse>('/terms', {
      baseURL: envConfig.adminUrl,
      params: { _local },
    }),
}
