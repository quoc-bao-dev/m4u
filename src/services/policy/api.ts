import { envConfig } from '@/core/config'
import axiosInstance from '@/core/http/axiosInstance'
import type { GetGeneralPolicyResponse } from './type'

export const policyApi = {
    getGeneralPolicy: () =>
        axiosInstance.get<GetGeneralPolicyResponse>('/GenenalPolicy', {
            baseURL: envConfig.adminUrl,
        }),
}

