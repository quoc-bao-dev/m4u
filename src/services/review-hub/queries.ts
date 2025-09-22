import { useQuery } from '@tanstack/react-query'
import apiReviewHub from './api'

export const useGetDataReviewHub = () => {
  const queryFn = async () => {
    const response = await apiReviewHub.getDataReviewHub({
      per_page: 9,
      current_page: 1,
    })
    return response.data.data.data
  }
  return useQuery({
    queryKey: ['getDataReviewHub'],
    queryFn: queryFn,
  })
}

export const useGetDataReviewHubProduct = (id_product: number) => {
  const queryFn = async () => {
    const response = await apiReviewHub.dataReviewHubProduct(id_product, {
      per_page: 10,
      current_page: 1,
    })
    return response.data.data
  }
  return useQuery({
    queryKey: ['dataReviewHubProduct', id_product],
    queryFn: queryFn,
  })
}

export const useGetDataReviewHubDetail = (slug: string) => {
  const queryFn = async () => {
    const response = await apiReviewHub.dataReviewHubDetail(slug, {
      per_page: 10,
      current_page: 1,
    })
    return response.data.data
  }
  return useQuery({
    queryKey: ['dataReviewHubDetail', slug],
    queryFn: queryFn,
    enabled: !!slug,
  })
}
