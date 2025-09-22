export interface ReferralProgramSection {
  title: string
  content: string
}

export interface ReferralProgramContentResponse {
  data: {
    one: ReferralProgramSection
    two: ReferralProgramSection
    three: ReferralProgramSection
  }
}
export interface ReferralIntroduceUser {
  id: number
  fullname: string
  email: string | null
  type_client: number
  avatar: string | null
  phone: string
  birthday: string
}

export interface ReferralIntroduceLink {
  url: string | null
  label: string
  active: boolean
}

export interface ReferralIntroduceData {
  current_page: number
  data: ReferralIntroduceUser[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: ReferralIntroduceLink[]
  next_page_url: string | null
  path: string
  per_page: number
  prev_page_url: string | null
  to: number
  total: number
}

export interface ReferralIntroduceResponse {
  result: boolean
  guest: number
  review: number
  data: ReferralIntroduceData
}
