export type DonationsAndCharitySection1 = {
  title: string
  money_charity: string
  content_share: string
}

export type DonationsAndCharitySection2 = {
  title: string
  content: string
}

export type DonationsAndCharitySection3 = {
  title: string
  content: string
}

export type DonationsAndCharitySection4 = {
  title: string
  content: string
  image: string
}

export type DonationsAndCharityData = {
  section1: DonationsAndCharitySection1
  section2: DonationsAndCharitySection2
  section3: DonationsAndCharitySection3
  section4: DonationsAndCharitySection4
}

export type DonationsAndCharityResponse = {
  result: boolean
  data: DonationsAndCharityData
}
