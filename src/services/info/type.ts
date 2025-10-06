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
