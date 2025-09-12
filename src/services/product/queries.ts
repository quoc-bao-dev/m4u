import { useLanguageSwitch } from '@/locale'
import { useQuery } from '@tanstack/react-query'
import { productApi } from './api'

export const useGetProductList = () => {
  const { currentLocale } = useLanguageSwitch()
  const _locale = currentLocale
  const queryFn = async () => {
    const response = await productApi.getProductList({ _local: _locale })
    return response.data
  }
  return useQuery({
    queryKey: ['product-list', _locale],
    queryFn: queryFn,
  })
}

export const useGetProductDetail = ({ slug }: { slug: string }) => {
  const { currentLocale } = useLanguageSwitch()
  const _locale = currentLocale
  const queryFn = async () => {
    const response = await productApi.getProductDetail({
      slug,
      _local: _locale,
    })
    return response.data
  }
  return useQuery({
    queryKey: ['product-detail', { slug, _locale }],
    queryFn: queryFn,
    enabled: !!slug,
  })
}
