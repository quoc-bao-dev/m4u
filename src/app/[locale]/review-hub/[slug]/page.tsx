import ReviewHubDetail from '@/modules/review-hub/review-hub-detail'
import React from 'react'

interface ReviewHubDetailPageProps {
  params: Promise<{
      slug: string;
  }>;
}

const ReviewHubDetailPage = async ({ params }: ReviewHubDetailPageProps) => {
  const { slug } = await params
  return <ReviewHubDetail slug={slug} />
}

export default ReviewHubDetailPage
