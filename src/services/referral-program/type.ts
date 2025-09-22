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
