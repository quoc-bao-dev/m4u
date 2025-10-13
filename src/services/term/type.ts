export type TermItem = {
  id: number
  title: string
  content: string
}

export type TermResponse = {
  result: boolean
  data: TermItem[]
}
