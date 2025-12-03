export type CreateChatSessionResponse = {
  result: boolean
  vsession: string
}

export type ProductIngredient = {
  id: number
  id_product: number
  title: string
  name: string
  content: string
  key_index: number
  language: string
  created_at: string
  updated_at: string
  product_uses: number
}

export type ProductTag = {
  name: string
}

export type Product = {
  id: number
  code: string
  is_use: number
  color_header: string
  background_color: string
  limit_people: number
  count_join: number
  average_star: number
  quantity_reviews: number
  contribute: number
  name: string
  content: string
  language: string
  image: string
  slug: string
  date_end_promotion: string
  isSig: number | null
  isLimit: number
  ingredients: ProductIngredient[]
  tags: ProductTag[]
}

export type ChatMessageItem = {
  id: number
  id_client: number
  vsession: string
  id_chat_parent: number
  is_read: number
  type_send: number // 0 -> chat bot, 2 -> user
  event: string
  event_app: string | null
  message: string
  file: string | null
  suport_items: number
  created_at: string
  updated_at: string
  id_script: number
  id_script_detail: number
  id_event_app: number | null
  json_item: string | null
  show_move_event: string | null
  is_function: string | null
  language_default: string
  option_filter: unknown
  id_product: number | null
  is_multiple: number
  hidden: number
  next: string | null | boolean
  event_show?: string | null
  options?: ChatMessageOption[]
  seconds_to_wait?: number
  products?: Product
}

export type ChatHistoryResponse = {
  result: boolean
  data: ChatMessageItem[]
  current_page: number
  per_page: number
  next_page_url: string | null
  prev_page_url: string | null
  next: boolean
}
export type ChatMessageOption = {
  id: number
  id_script?: number
  name: string
  level?: number
  link?: string | null
  content: string | null
  language?: string
  file?: string | null
  type_send?: number
  event_show?: string
  event_app?: string | null
  show_move_event?: string | null
  id_event_app?: number | null
  active_start?: number
  end_to_reset?: number
  end_to_web?: number
  seconds_to_wait?: number
  next: string
  start?: number
  icon?: string
  icon_active?: string
}

export type ChatMessageResponse = {
  result: boolean
  data: ChatMessageItem
  next: string | null | boolean
  end_to_reset?: 0 | 1
}

// Info script (Packbot introduction)
export type InfoScriptData = {
  id: number
  content: string
  language: string
}

export type GetInfoScriptResponse = {
  result: boolean
  data: InfoScriptData
}
