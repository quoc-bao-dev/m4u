export interface EventStatus {
  id: number
  name: string
  color: string
}

export interface Event {
  id: number
  code: string
  background_color: string
  count_view: number
  count_join: number
  name: string
  content: string
  image: string
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
  time_left_dd_hh_mm_ss: string
  status_now: EventStatus
  type_sponsor: 1 | 2
}

export interface EventListLink {
  url: string | null
  label: string
  active: boolean
}

export interface EventListResponse {
  current_page: number
  data: Event[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: EventListLink[]
  next_page_url: string | null
  path: string
  per_page: number
  prev_page_url: string | null
  to: number
  total: number
}

export interface EventListParams {
  current_page?: number
  per_page?: number
  id?: number
  type_event_articles?: number
  search?: string
  status?: number
}

// Event Detail Types
export interface EventInfo {
  title: string
  content: string
  key_index: number
  language: string
}

export interface EventImage {
  id: number
  id_event_articles: number
  image: string
  order_by: number
  created_at: string
  updated_at: string
}

export interface EventProduct {
  id: number
  code: string
  name: string
  image: string
  slug: string
}

export interface EventDetailData {
  id: number
  code: string
  background_color: string
  count_view: number
  count_join: number
  name: string
  content: string
  image: string
  image_sponsor: string | null
  name_sponsor: string | null
  type_sponsor: 1 | 2
  sponsor: number

  prizes: number
  total_product: number
  total_money_prizes: number
  type_event_articles: number
  slug: string
  date_start_event: string
  date_end_event: string
  time_left_dd_hh_mm_ss: string
  status_now: EventStatus
  info_event: EventInfo[]
  list_images: EventImage[]
  list_product: EventProduct[]
}

export interface EventDetailResponse {
  result: boolean
  data: EventDetailData
}
