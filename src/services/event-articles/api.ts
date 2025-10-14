import { envConfig } from '@/core/config'
import axiosInstance from '@/core/http/axiosInstance'
import { EventArticleListResponse, EventArticleListParams } from './type'

export const eventArticlesApi = {
  getEventArticleList: (params?: EventArticleListParams) =>
    axiosInstance.get<EventArticleListResponse>('api_list_data', {
      baseURL: envConfig.serviceUrl,
      params: {
        current_page: params?.current_page || 1,
        per_page: params?.per_page || 10,
        ...(params?.id_product && { id_product: params.id_product }),
        ...(params?.type_event_articles && {
          type_event_articles: params.type_event_articles,
        }),
        ...(params?.search && { search: params.search }),
        ...(params?.status && { status: params.status }),
      },
    }),
}
