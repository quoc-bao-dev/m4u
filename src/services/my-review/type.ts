export interface MyReviewMediaOther {
  id: number
  filetype: string
  media: string
  mime_type: string
  name_file: string
}

export interface MyReviewItem {
  id: number
  id_review: number
  code_review: string
  id_product: number
  id_client: number
  active: number
  date_active_review: string | null
  created_at: string
  updated_at: string
  is_review: number
  video_review: string
  evaluate: number
  content_evaluate: string | null
  date_review: string
  name: string
  content: string
  language: string
  image: string
  slug: string
  date_end_promotion: string
  name_status: string
  status_color: string
  media_other: MyReviewMediaOther[]
}

export interface MyReviewResponseLink {
  url: string | null
  label: string
  active: boolean
}

export interface MyReviewResponse {
  data: {
    current_page: number
    data: MyReviewItem[]
    first_page_url: string
    from: number
    last_page: number
    last_page_url: string
    links: MyReviewResponseLink[]
    next_page_url: string | null
    path: string
    per_page: number
    prev_page_url: string | null
    to: number
    total: number
  }
}
