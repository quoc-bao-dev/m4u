import axiosInstance from '@/core/http/axiosInstance'
import { ConnectParams, ListNotificationsParams } from './type'

export const apiNotification = {
  getConnection: (params: ConnectParams) => {
    return axiosInstance.get('socket/connect', {
      params,
    })
  },

  getListNotifications: (params: ListNotificationsParams | null) => {
    return axiosInstance.get('notification/getListNotification', {
      params,
    })
  },
}
