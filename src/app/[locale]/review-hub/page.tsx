import ReviewHub from '@/modules/review-hub/review-hub-list'
import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Review Hub',
  description: 'Review Hub',
}

const ReviewHubPage = () => {

  return (
    <main>
      <ReviewHub />
    </main>
  )
}

export default ReviewHubPage
