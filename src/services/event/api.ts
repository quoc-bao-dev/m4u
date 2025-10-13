import { envConfig } from '@/core/config'
import axiosInstance from '@/core/http/axiosInstance'
import {
  EventListResponse,
  EventListParams,
  EventDetailResponse,
  InfoBannerEventResponse,
} from './type'

export const eventApi = {
  getEventList: (params: EventListParams) =>
    axiosInstance.get<EventListResponse>('api_list_data', {
      baseURL: envConfig.serviceUrl,
      params: {
        current_page: params.current_page || 1,
        per_page: params.per_page || 10,
        ...(params.id && { id: params.id }),
        ...(params.type_event_articles && {
          type_event_articles: params.type_event_articles,
        }),
        ...(params.search && { search: params.search }),
        ...(params.status && { status: params.status }),
      },
    }),

  getEventDetail: (slug: string) =>
    axiosInstance.get<EventDetailResponse>(`api_list_detail/${slug}`, {
      baseURL: envConfig.serviceUrl,
    }),

  getInfoBannerEvent: () =>
    axiosInstance.get<InfoBannerEventResponse>('getInfoBannerEvent', {
      baseURL: envConfig.adminUrl,
    }),
}
