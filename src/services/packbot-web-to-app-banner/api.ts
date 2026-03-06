import { envConfig } from '@/core/config'
import axiosInstance from '@/core/http/axiosInstance'

import { GetPackbotWebToAppBannerResponse } from './type'

export const packbotWebToAppBannerApi = {
    getPackbotWebToAppBanner: () =>
        axiosInstance.get<GetPackbotWebToAppBannerResponse>(
            '/get_banner_web_to_app',
            {
                baseURL: envConfig.adminUrl,
            }
        ),
}

