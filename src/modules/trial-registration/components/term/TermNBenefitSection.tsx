'use client'

import { Container } from '@/core/components'
import { useTranslations } from 'next-intl'
import AccordionItem from './AccordionItem'

const TermNBenefitSection = () => {
  const t = useTranslations('termBenefit')
  return (
    <section className=" pb-[60px] md:py-[96px]">
      <Container className="space-y-3 xl:px-[200px]">
        <h2 className="text-title-sect font-bold text-gray-400 pb-5">
          <span className="text-gray-900">{t('benefits')} </span> & {t('terms')}
        </h2>

        <AccordionItem
          title={t('memberBenefits')}
          defaultOpen={true}
          className="bg-white"
        >
          <ul className="list-disc space-y-2 pl-5">
            <li>{t('benefit1')}</li>
            <li>{t('benefit2')}</li>
            <li>{t('benefit3')}</li>
            <li>{t('benefit4')}</li>
            <li>{t('benefit5')}</li>
          </ul>
        </AccordionItem>

        <AccordionItem title={t('memberBenefits')} className="bg-white">
          <p>{t('placeholder1')}</p>
        </AccordionItem>

        <AccordionItem title={t('memberBenefits')} className="bg-white">
          <p>{t('placeholder2')}</p>
        </AccordionItem>
      </Container>
    </section>
  )
}

export default TermNBenefitSection
