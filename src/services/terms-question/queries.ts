import { useQuery } from '@tanstack/react-query'
import termsQuestionApi from './api'
import { useLanguageSwitch } from '@/locale'

export const useGetTermsQuestions = () => {
  const { currentLocale } = useLanguageSwitch()
  const _locale = currentLocale
  return useQuery({
    queryKey: ['termsQuestion', 'list', _locale],
    queryFn: termsQuestionApi.getTermsQuestions,
  })
}
