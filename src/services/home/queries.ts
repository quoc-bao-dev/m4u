import { useQuery } from '@tanstack/react-query'
import apiHome from './api'
import { useLanguageSwitch } from '@/locale/hooks/useLanguageSwitch'
import type { ViewReviewerResponse } from './type'

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
  option = 'short',
}: {
  per_page?: number
  current_page?: number
  option?: 'full' | 'short'
}) => {
  const fetchViewReviewer = async () => {
    const response = await apiHome.getViewReviewer({ per_page, current_page })
    if (option === 'full') {
      return response.data as ViewReviewerResponse
    }
    return response.data.data
  }
  return useQuery({
    queryKey: ['viewReviewer', per_page, current_page],
    queryFn: fetchViewReviewer,
  })
}
