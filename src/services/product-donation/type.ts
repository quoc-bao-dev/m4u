// donataion

export interface Product {
  id: number
  code: string
  name: string
  content: string
  image: string
  slug: string
  date_end_promotion: string | null
  time_left_dd_hh_mm_ss: string | null
  background_color: string | null
  color_header: string | null
  average_star: number
  limit_people: number
  count_join: number
  quantity_reviews: number
  isSig: number
  evaluate: number
  video_review: string
  id_review: number
}

export interface ProductListLink {
  url: string | null
  label: string
  active: boolean
}

export interface ProductListResponse {
  current_page: number
  data: Product[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: ProductListLink[]
  next_page_url: string | null
  path: string
  per_page: number
  prev_page_url: string | null
  to: number
  total: number
}
