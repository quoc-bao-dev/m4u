import { useLanguageSwitch } from '@/locale'
import { useQuery } from '@tanstack/react-query'
import { helpCentreApi } from './api'

export const useGetHelpCentre = () => {
  const { currentLocale } = useLanguageSwitch()
  const _locale = currentLocale
  const queryFn = async () => {
    const response = await helpCentreApi.getHelpCentre({ _local: _locale })
    return response.data
  }
  return useQuery({
    queryKey: ['help-centre', _locale],
    queryFn,
  })
}
