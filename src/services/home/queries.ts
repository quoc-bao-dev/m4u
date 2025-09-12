import { useQuery } from '@tanstack/react-query'
import apiHome from './service'

export const useGetHomePage = () => {
  const fetchHomePage = async () => {
    const response = await apiHome.getHomePage()
    return response.data.data
  }
  return useQuery({
    queryKey: ['homePage'],
    queryFn: fetchHomePage,
  })
}
