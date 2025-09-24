import { useQuery } from '@tanstack/react-query'
import { apiNotification } from './api'
import { ConnectParams, ListNotificationsParams } from './type'

export const useGetConnection = (data: ConnectParams) => {
  const queryFn = async () => {
    const response = await apiNotification.getConnection(data)
    return response.data
  }
  return useQuery({
    queryKey: ['connection', data.user_id, data.user_name],
    queryFn: queryFn,
    enabled: !!data.user_id && !!data.user_name,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    staleTime: Infinity,
  })
}

export const useGetListNotifications = (
  params: ListNotificationsParams | null
) => {
  const queryFn = async () => {
    const response = await apiNotification.getListNotifications(params)
    return response.data
  }
  return useQuery({
    queryKey: ['list-notifications', params],
    queryFn: queryFn,
  })
}
