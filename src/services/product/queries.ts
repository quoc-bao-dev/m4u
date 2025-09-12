import { useQuery } from '@tanstack/react-query'
import { productApi } from './api'

export const useGetProductList = () => {
  const queryFn = async () => {
    const response = await productApi.getProductList()
    return response.data
  }
  return useQuery({
    queryKey: ['product-list'],
    queryFn: queryFn,
  })
}

export const useGetProductDetail = ({ slug }: { slug: string }) => {
  const queryFn = async () => {
    const response = await productApi.getProductDetail({ slug })
    return response.data
  }
  return useQuery({
    queryKey: ['product-detail', slug],
    queryFn: queryFn,
    enabled: !!slug,
  })
}
