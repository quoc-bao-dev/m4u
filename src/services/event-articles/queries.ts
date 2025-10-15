import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import { eventArticlesApi } from './api'
import { EventArticleListParams } from './type'

export const useGetEventArticleList = (
  params: EventArticleListParams = {},
  options?: { enabled?: boolean }
) => {
  const queryFn = async () => {
    const response = await eventArticlesApi.getEventArticleList(params)
    return response.data
  }

  return useQuery({
    queryKey: ['event-article-list', params],
    queryFn: queryFn,
    enabled: options?.enabled ?? true,
  })
}

export const useInfiniteEventArticleList = (
  params: Omit<EventArticleListParams, 'current_page'> & {
    per_page?: number
  },
  options?: { enabled?: boolean }
) => {
  return useInfiniteQuery({
    queryKey: ['event-article-list-infinite', params],
    initialPageParam: 1,
    enabled: options?.enabled ?? true,
    queryFn: async ({ pageParam }) => {
      const response = await eventArticlesApi.getEventArticleList({
        ...params,
        current_page: Number(pageParam) || 1,
        per_page: params.per_page ?? 10,
      })
      return response.data
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage) return undefined
      const { current_page, last_page } = lastPage
      return current_page < last_page ? current_page + 1 : undefined
    },
  })
}
