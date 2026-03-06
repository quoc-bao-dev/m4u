import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { eventApi } from './api'
import {
  EventListParams,
  EventListResponse,
  InfoBannerEventResponse,
} from './type'

export const useGetEventList = (
  params: EventListParams = {},
  options?: { enabled?: boolean }
) => {
  const queryFn = async () => {
    const response = await eventApi.getEventList(params)
    return response.data
  }

  return useQuery({
    queryKey: ['event-list', params],
    queryFn: queryFn,
    enabled: options?.enabled ?? true,
  })
}

export const useGetEventDetail = (slug: string) => {
  const queryFn = async () => {
    const response = await eventApi.getEventDetail(slug)
    return response.data
  }

  return useQuery({
    queryKey: ['event-detail', slug],
    queryFn: queryFn,
    enabled: !!slug,
  })
}

export const useGetInfoBannerEvent = (options?: { enabled?: boolean }) => {
  const queryFn = async () => {
    const response = await eventApi.getInfoBannerEvent()
    return response.data
  }

  return useQuery<InfoBannerEventResponse>({
    queryKey: ['info-banner-event'],
    queryFn: queryFn,
    enabled: options?.enabled ?? true,
  })
}

export const useInfiniteEventList = (
  params: Omit<EventListParams, 'current_page'> & { per_page?: number },
  options?: { enabled?: boolean }
) => {
  return useInfiniteQuery<EventListResponse>({
    queryKey: ['event-list-infinite', params],
    initialPageParam: 1,
    enabled: options?.enabled ?? true,
    queryFn: async ({ pageParam }) => {
      const response = await eventApi.getEventList({
        ...params,
        current_page: Number(pageParam) || 1,
        per_page: params.per_page ?? 6,
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
