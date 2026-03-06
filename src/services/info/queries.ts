import { useQuery } from '@tanstack/react-query'
import apiInfo from './api'
import { GetInfoResponse } from './type'

export const useGetInfoContact = () => {
  const queryFn = async () => {
    const response = await apiInfo.getInfoContact()
    return response.data.data
  }
  return useQuery({
    queryKey: ['infoContact'],
    queryFn: queryFn,
  })
}

export const useGetInfoDataArticles = () => {
  const queryFn = async () => {
    const response = await apiInfo.getInfoDataArticles()
    return response.data
  }
  return useQuery({
    queryKey: ['infoDataArticles'],
    queryFn: queryFn,
  })
}

export const useGetInfo = () => {
  const queryFn = async () => {
    const response = await apiInfo.getInfo()
    return response.data as GetInfoResponse
  }
  return useQuery<GetInfoResponse>({
    queryKey: ['getInfo'],
    queryFn: queryFn,
  })
}
