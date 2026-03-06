import { useQuery } from '@tanstack/react-query'
import apiLanguage from './api'

export const useGetLanguageCurrent = () => {
    const fetchLanguageCurrent = async () => {
        const response = await apiLanguage.getLanguageCurrent()
        return response.data.data
    }
  return useQuery({
    queryKey: ['languageCurrent'],
    queryFn: fetchLanguageCurrent,
  })
}
