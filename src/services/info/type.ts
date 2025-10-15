export interface TypeEventArticle {
  id: number
  name: string
  count: number
  color: string
}

export interface ListStatus {
  id: number
  name: string
  color: string
  count: number
}

export interface InfoDataArticlesResponse {
  result: boolean
  _locale: string
  type_event_articles: TypeEventArticle[]
  list_status: ListStatus[]
}

export interface GetInfoResponse {
  contact_data_place_google_map: string
  contact_phone_branch_office: string
  contact_address_branch_office: string
  contact_phone_head_office: string
  contact_address_head_office: string
  contact_email: string
  contact_phone: string
  link_contact_zalo: string
  link_contact_telegram: string
  link_contact_facebook: string
  address_our_location: string
  link_contact_instagram: string
}
