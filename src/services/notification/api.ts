import axiosInstance from '@/core/http/axiosInstance'
import { ConnectParams, ListNotificationsParams } from './type'
import { envConfig } from '@/core/config'

export const apiNotification = {
  getConnection: (params: ConnectParams) => {
    return axiosInstance.get('socket/connect', {
      params,
      baseURL: envConfig.adminUrl,
    })
  },

  getListNotifications: (params: ListNotificationsParams | null) => {
    return axiosInstance.get('notification/getListNotification', {
      params,
      baseURL: envConfig.adminUrl,
    })
  },

  getStatusNotification: () => {
    return axiosInstance.get('notification/CountNotification', {
      baseURL: envConfig.adminUrl,
    })
  },

  markAllAsRead: () => {
    return axiosInstance.post(
      'notification/readAllNotification',
      {},
      {
        baseURL: envConfig.adminUrl,
      }
    )
  },
}
