export interface TermsQuestionItem {
  id: number
  title: string
  content: string
}

export interface GetTermsQuestionsResponse {
  result: boolean
  data: TermsQuestionItem[]
}
