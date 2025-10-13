import { useLanguageSwitch } from '@/locale'
import { useQuery } from '@tanstack/react-query'
import { productDonationApi } from './api'

export const useGetProductDonationList = () => {
  const { currentLocale } = useLanguageSwitch()
  const _locale = currentLocale
  const queryFn = async () => {
    const response = await productDonationApi.getDonationList({
      _local: _locale,
    })
    return response.data
  }
  return useQuery({
    queryKey: ['product-donation-list', _locale],
    queryFn,
  })
}
