import { useQuery } from '@tanstack/react-query'
import apiHome from './api'
import { useLanguageSwitch } from '@/locale/hooks/useLanguageSwitch'

export const useGetHomePage = () => {
  const { currentLocale } = useLanguageSwitch()

  const fetchHomePage = async () => {
    const response = await apiHome.getHomePage()
    return response.data.data
  }

  return useQuery({
    queryKey: ['homePage', currentLocale],
    queryFn: fetchHomePage,
  })
}
