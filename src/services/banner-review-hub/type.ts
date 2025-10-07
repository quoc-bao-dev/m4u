export interface Client {
  id: number
  fullname: string
  phone: string
  birthday: string
  email: string | null
  type_client: number
  avatar: string | null
  address: string
}

export interface Review {
  id: number
  id_client: number
  content_evaluate: string
  evaluate: number
  view_see: number
  client: Client
}

export interface ClientJoin {
  fullname: string
  avatar: string
}

export interface BannerReviewHubData {
  title: string
  subtitle: string
  image: string
  countClientReview: number
  Review: Review[]
  ClientJoin: ClientJoin[]
}

export interface BannerReviewHubResponse {
  result: boolean
  data: BannerReviewHubData
}
