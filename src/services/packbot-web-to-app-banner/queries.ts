import { useQuery } from '@tanstack/react-query'

import { packbotWebToAppBannerApi } from './api'

export const useGetPackbotWebToAppBanner = (options?: {
    enabled?: boolean
}) => {
    return useQuery({
        queryKey: ['packbot-web-to-app-banner'],
        enabled: options?.enabled,
        queryFn: async () => {
            const response = await packbotWebToAppBannerApi.getPackbotWebToAppBanner()
            return response.data
        },
    })
}

