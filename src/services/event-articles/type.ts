export interface EventStatus {
  id: number
  name: string
  color: string
}

export interface EventArticle {
  id: number
  code: string
  background_color: string
  count_view: number
  count_join: number
  name: string | null
  content: string
  image: string | null
  image_sponsor: string | null
  name_sponsor: string | null
  sponsor: number
  prizes: number
  total_money_prizes: number
  total_product: number
  type_event_articles: number
  slug: string
  date_start_event: string
  date_end_event: string
  type_sponsor: 1 | 2
  time_left_dd_hh_mm_ss: string
  status_now: EventStatus
}

export interface EventArticleListLink {
  url: string | null
  label: string
  active: boolean
}

export interface EventArticleListResponse {
  current_page: number
  data: EventArticle[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: EventArticleListLink[]
  next_page_url: string | null
  path: string
  per_page: number
  prev_page_url: string | null
  to: number
  total: number
}

export interface EventArticleListParams {
  id_product?: number
  current_page?: number
  per_page?: number
  type_event_articles?: number
  search?: string
  status?: number
}
