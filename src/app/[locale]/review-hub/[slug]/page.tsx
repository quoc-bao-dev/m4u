import ReviewHubDetail from '@/modules/review-hub/review-hub-detail'
import React from 'react'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

const ReviewHubDetailPage = () => {
  return <ReviewHubDetail />
}

export default ReviewHubDetailPage

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('reviewHub')
  return {
    title: t('title'),
    description: t('description'),
  }
}
