'use client'

import { Container } from '@/core/components'
import { AccordionItem } from '@/modules/trial-registration'
import { useTranslations } from 'next-intl'

const QuestionSection = () => {
  const t = useTranslations('event.questions')
  return (
    <section className=" pb-[60px] md:py-[96px]">
      <Container className="space-y-3 xl:px-[200px]">
        <h2 className="text-title-sect font-bold text-gray-400 pb-5">
          <span className="text-gray-900">{t('titleLead')}</span>
          {t('titleTail')}
        </h2>

        <AccordionItem
          title={t('perksTitle')}
          defaultOpen={true}
          className="bg-white"
        >
          <div className="space-y-2 pl-5">
            <p>{t('intro')}</p>
            <ul className="list-disc space-y-2">
              <li>
                <strong>{t('bullets.freeTrials.label')}</strong>{' '}
                {t('bullets.freeTrials.desc')}
              </li>
              <li>
                <strong>{t('bullets.earnings.label')}</strong>{' '}
                {t('bullets.earnings.desc')}
              </li>
              <li>
                <strong>{t('bullets.earlyAccess.label')}</strong>{' '}
                {t('bullets.earlyAccess.desc')}
              </li>
              <li>
                <strong>{t('bullets.support.label')}</strong>{' '}
                {t('bullets.support.desc')}
              </li>
              <li>
                <strong>{t('bullets.community.label')}</strong>{' '}
                {t('bullets.community.desc')}
              </li>
            </ul>
          </div>
        </AccordionItem>

        <AccordionItem title={t('placeholder1Title')} className="bg-white">
          <p>{t('placeholder1')}</p>
        </AccordionItem>

        <AccordionItem title={t('placeholder2Title')} className="bg-white">
          <p>{t('placeholder2')}</p>
        </AccordionItem>
      </Container>
    </section>
  )
}

export default QuestionSection
