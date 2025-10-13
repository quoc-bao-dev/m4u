import { useLanguageSwitch } from '@/locale'
import { useQuery } from '@tanstack/react-query'
import { termApi } from './api'
import type { TermResponse } from './type'

export const useGetTerms = () => {
  const { currentLocale } = useLanguageSwitch()
  const _locale = currentLocale

  const queryFn = async (): Promise<TermResponse> => {
    const response = await termApi.getTerms({ _local: _locale })
    return response.data
  }

  return useQuery({
    queryKey: ['terms', _locale],
    queryFn,
  })
}
