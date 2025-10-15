'use client'

import { Container } from '@/core/components'
import { useTranslations } from 'next-intl'
import AccordionItem from './AccordionItem'
import { useGetTerms } from '@/services/term'
import type { TermItem, TermResponse } from '@/services/term/type'
import { useMemo } from 'react'

const TermNBenefitSection = () => {
  const t = useTranslations('termBenefit')

  const { data: terms, isLoading } = useGetTerms()

  const termItems = useMemo<TermItem[]>(() => {
    return (terms as TermResponse | undefined)?.data ?? []
  }, [terms])

  return (
    <section className=" pb-[60px] md:py-[96px]">
      <Container className="space-y-3 px-3 xl:px-[200px]">
        <h2 className="text-title-sect font-bold text-gray-400 xl:pb-5">
          <span className="text-gray-900">{t('benefits')} </span> & {t('terms')}
        </h2>

        {isLoading && (
          <div className="space-y-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="bg-white rounded-xl p-5">
                <div className="flex items-center justify-between">
                  <div className="h-5 w-48 bg-gray-200 animate-pulse rounded" />
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
          termItems.map((item: TermItem, index: number) => (
            <AccordionItem
              key={item.id}
              title={item.title}
              defaultOpen={index === 0}
              className="bg-white"
            >
              <div
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
            </AccordionItem>
          ))}
      </Container>
    </section>
  )
}

export default TermNBenefitSection
