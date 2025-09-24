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

export const useGetViewReviewer = ({
  per_page,
  current_page,
}: {
  per_page?: number
  current_page?: number
}) => {
  const fetchViewReviewer = async () => {
    const response = await apiHome.getViewReviewer({ per_page, current_page })
    return response.data.data
  }
  return useQuery({
    queryKey: ['viewReviewer', per_page, current_page],
    queryFn: fetchViewReviewer,
  })
}