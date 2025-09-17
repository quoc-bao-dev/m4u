import ReviewHub from '@/modules/review-hub/review-hub-list'
import React from 'react'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('reviewHub')
  return {
    title: t('title'),
    description: t('description'),
  }
}

const ReviewHubPage = () => {
  return (
    <main>
      <ReviewHub />
    </main>
  )
}

export default ReviewHubPage
