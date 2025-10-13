'use client'

import { Container } from '@/core/components'
import { AccordionItem } from '@/modules/trial-registration'
import { useGetTermsQuestions } from '@/services/terms-question'
import type {
  GetTermsQuestionsResponse,
  TermsQuestionItem,
} from '@/services/terms-question/type'
import { useTranslations } from 'next-intl'
import { useMemo } from 'react'

const QuestionSection = () => {
  const t = useTranslations('event.questions')

  const { data: termsQuestions, isLoading } = useGetTermsQuestions()

  const items = useMemo<TermsQuestionItem[]>(() => {
    return (termsQuestions as GetTermsQuestionsResponse | undefined)?.data ?? []
  }, [termsQuestions])
  return (
    <section className=" pb-[60px] md:py-[96px]">
      <Container className="space-y-3 xl:px-[200px]">
        <h2 className="text-title-sect font-bold text-gray-400 pb-5">
          <span className="text-gray-900">{t('titleLead')}</span>
          {t('titleTail')}
        </h2>

        {isLoading && (
          <div className="space-y-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="bg-white rounded-xl p-5">
                <div className="flex items-center justify-between">
                  <div className="h-5 w-56 bg-gray-200 animate-pulse rounded" />
                  <div className="h-5 w-5 bg-gray-200 animate-pulse rounded" />
                </div>
                <div className="mt-3 space-y-2">
                  <div className="h-4 w-full bg-gray-100 animate-pulse rounded" />
                  <div className="h-4 w-11/12 bg-gray-100 animate-pulse rounded" />
                  <div className="h-4 w-10/12 bg-gray-100 animate-pulse rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading &&
          items.map((item: TermsQuestionItem, index: number) => (
            <AccordionItem
              key={item.id}
              title={item.title}
              defaultOpen={index === 0}
              className="bg-white"
            >
              <div
                className="prose prose-sm max-w-none px-4"
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
            </AccordionItem>
          ))}
      </Container>
    </section>
  )
}

export default QuestionSection
