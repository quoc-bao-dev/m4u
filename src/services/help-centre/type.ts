export type HelpCentreResponse = {
  result: boolean
  data: HelpCentreData
}

export type HelpCentreData = {
  title: string
  messager: {
    content: string
    link: string
  }
  zalo: {
    content: string
    link: string
  }
  hotline: {
    content: string
    phone: string
  }
  title_mid: string
  content_mid: string
  title_footer: string
  content_footer: string
  title_button: string
  image: string[]
  link_goole_map?: string
}
