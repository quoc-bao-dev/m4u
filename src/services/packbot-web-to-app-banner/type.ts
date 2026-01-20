export type PackbotWebToAppBannerItem = {
    title: string | null
    content: string
    is_background: number
    hidden_button: number
    image: string
    image_mobile: string
}

export type GetPackbotWebToAppBannerData = {
    banner: PackbotWebToAppBannerItem[]
}

export type GetPackbotWebToAppBannerResponse = {
    result: boolean
    data: GetPackbotWebToAppBannerData
}

