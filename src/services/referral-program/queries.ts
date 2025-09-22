import { useQuery } from '@tanstack/react-query'
import { apiReferralProgram } from './api'

export const useReferralProgramQuery = () => {
  const queryFn = async () => {
    const response = await apiReferralProgram.getReferralProgram()
    return response.data.data
  }
  return useQuery({
    queryKey: ['referral-program'],
    queryFn: queryFn,
  })
}
