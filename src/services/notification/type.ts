export interface ConnectParams {
  user_id: string
  user_name: string
}

export interface ConnectNotificationResponse {
  status: boolean
  db_name: string
  sever: string
  message: string
  data: string
}

export interface NotificationItem {
  id: number
  object_id: number
  object_type: string
  json_data: {
    id?: number
    id_review?: number
    active?: number
    content?: string
  }
  title: string
  content: string
  content_html: string
  created_at: string
  is_read: number
  customer_id: number
  type_customer: string
  icon: string | null
  banner: string | null
}

export interface NotificationListResponse {
  data: NotificationItem[]
  base: {
    base: string
  }
  links: {
    first: string
    last: string
    prev: string | null
    next: string | null
  }
  meta: {
    current_page: number
    from: number
    last_page: number
    links: {
      url: string | null
      label: string
      active: boolean
    }[]
    path: string
    per_page: number
    to: number
    total: number
  }
}

export interface ListNotificationsParams {
  current_page: number
  per_page: number
  status?: string
  date_start?: string
  date_end?: string
}

export interface StatusNotificationItem {
  count: number
  id: string
  name: string
  color: string
}

export interface StatusNotificationResponse {
  result: boolean
  data: StatusNotificationItem[]
}

export interface NotificationDetailResponse {
  data: NotificationItem
}
