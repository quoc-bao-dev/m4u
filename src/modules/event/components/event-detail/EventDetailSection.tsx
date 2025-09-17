'use client'

import { Container } from '@/core/components'
import { HeaderEvent } from '../head'
import DetailTabs from './DetailTabs'
import EventBlog from './EventBlog'
import EventContent from './EventContent'
import EventSidebar from './EventSidebar'
import { useTranslations } from 'next-intl'

const EventDetailSection = () => {
  const t = useTranslations('event.detail.tabs')
  return (
    <Container className="max-w-[1440px] pt-[100px]">
      <HeaderEvent />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-8 ">
        <div className="col-span-1 lg:col-span-8">
          <EventContent />
          <div className="lg:hidden pt-5">
            <EventSidebar status={'active'} />
          </div>
          <div className="pt-5">
            {/* Tabs */}
            <DetailTabs
              tabs={[t('eventRules'), t('eligibility'), t('newUserTask')]}
              defaultActive={t('eventRules')}
            />
            {/* gắn blog vào đây */}
            <div className="pt-6">
              <EventBlog />
            </div>
          </div>
        </div>
        <div className="col-span-1 hidden lg:block lg:col-span-4 ">
          <div className="sticky lg:top-10 2xl:top-20">
            <EventSidebar status={'active'} />
          </div>
        </div>
      </div>
    </Container>
  )
}

export default EventDetailSection
