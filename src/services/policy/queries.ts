import { useQuery } from '@tanstack/react-query'
import { policyApi } from './api'
import type { GetGeneralPolicyResponse } from './type'

export const useGetGeneralPolicy = () => {
    const queryFn = async (): Promise<GetGeneralPolicyResponse> => {
        const response = await policyApi.getGeneralPolicy()
        return response.data
    }

    return useQuery({
        queryKey: ['general-policy'],
        queryFn,
    })
}

