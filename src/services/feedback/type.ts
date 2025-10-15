export type FeedbackResponse = {
  result: boolean
  data: FeedbackData
}

export type FeedbackData = {
  title_main: string
  title: string
  content: string
  title_experience: string
  title_improve: string
  title_feedback: string
  image: string
}

// Types for get improve feedback API
export type ImproveFeedbackResponse = {
  result: boolean
  data: ImproveFeedbackData
}

export type ImproveFeedbackData = {
  [key: string]: StarLikeItem[]
}

export type StarLikeItem = {
  id_star_like: number
  name_star_like: string
  improve: ImproveItem[]
}

export type ImproveItem = {
  id: number
  id_star_like: number
  name: string
  type: number
  key_main: string
}

// Types for send feedback API
export type SendFeedbackRequest = {
  star_like: number // 1-5
  content_feedback: string
  improve: string[] // array of key_main values
  file?: File[] // optional files
}

export type SendFeedbackResponse = {
  result: boolean
  message?: string
}
