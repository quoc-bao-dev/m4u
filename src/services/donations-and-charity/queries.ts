import { useQuery } from '@tanstack/react-query'
import { donationsAndCharityApi } from './api'

export const useGetDonationsAndCharity = (options?: { enabled?: boolean }) => {
  const queryFn = async () => {
    const response = await donationsAndCharityApi.getDonationsAndCharity()
    return response.data
  }

  return useQuery({
    queryKey: ['donations-and-charity'],
    queryFn,
    enabled: options?.enabled ?? true,
  })
}
