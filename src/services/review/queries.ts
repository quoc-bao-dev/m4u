import { useQuery } from '@tanstack/react-query'
import { apiReview } from './api'

export const useGetListReviewHistory = ({
  activeTab,
  searchQuery,
  dateStart,
  dateEnd,
}: {
  activeTab?: string
  searchQuery?: string
  dateStart?: string
  dateEnd?: string
}) => {
  const queryFn = async () => {
    const response = await apiReview.getListReviewHistory({
      activeTab,
      searchQuery,
      dateStart,
      dateEnd,
    })
    return response.data
  }
  return useQuery({
    queryKey: ['listReviewHistory', activeTab, searchQuery, dateStart, dateEnd],
    queryFn: queryFn,
  })
}
