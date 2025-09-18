export type ReviewHistoryListResponse = {
  current_page: number
  data: ReviewHistoryItem[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: {
    url: string | null
    label: string
    active: boolean
  }[]
  next_page_url: string | null
  path: string
  per_page: number
  prev_page_url: string | null
  to: number
  total: number
}

export type ReviewHistoryItem = {
  id: number
  code_review: string
  id_client: number
  created_at: string
  updated_at: string
  status: number
  date_status: string | null
  staff_status: number
  clients_review: ClientReview[]
}

export type ClientReview = {
  id: number
  id_review: number
  code_review: string
  id_product: number
  id_client: number
  active: number
  date_active_review: string
  created_at: string
  updated_at: string
  is_review: number
  video_review: string
  evaluate: number
  content_evaluate: string | null
  date_review: string | null
  products: Product[]
}

export type Product = {
  id: number
  code: string
  name: string
  image: string
  content: string
  slug: string
  active: number
  created_at: string
  updated_at: string
  date_end_promotion: string
  background_color: string
  color_header: string
  limit_people: number
  count_join: number
  average_star: number
  quantity_reviews: number
  language: string
}
