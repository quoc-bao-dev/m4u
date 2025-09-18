import { useQuery } from '@tanstack/react-query'
import { reviewApi } from './api'

export const useGetTypeEvaluate = () => {
  const queryFn = async () => {
    const response = await reviewApi.getTypeEvaluate()
    return response.data
  }
  return useQuery({
    queryKey: ['type-evaluate'],
    queryFn: queryFn,
  })
}

export const useListReview = () => {
  const queryFn = async () => {
    const response = await reviewApi.listReview()
    return response.data
  }
  return useQuery({
    queryKey: ['list-review'],
    queryFn: queryFn,
  })
}

export const useGetProductReview = () => {
  const queryFn = async () => {
    const response = await reviewApi.getProductReview()
    return response.data.data
  }
  return useQuery({
    queryKey: ['get-product-review'],
    queryFn: queryFn,
  })
}
