'use client'

import { useGetFeedback } from '@/services/feedback'
import FeedbackContent from './FeedbackContent'
import FeedbackForm from './FeedbackForm'

const FeedBack = () => {
  const { data: feedbackData, isLoading, error } = useGetFeedback()

  if (isLoading) {
    return (
      <section className="relative z-50">
        <div className="pt-4 sm:pt-6">
          <div className="animate-pulse">
            <div className="h-6 sm:h-8 bg-gray-200 rounded w-1/3 mb-4 sm:mb-6"></div>
            <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
              <div className="w-full lg:w-[45%]">
                <div className="h-24 sm:h-32 bg-gray-200 rounded mb-3 sm:mb-4"></div>
                <div className="h-16 sm:h-20 bg-gray-200 rounded"></div>
              </div>
              <div className="flex-1 h-80 sm:h-96 bg-gray-200 rounded-2xl sm:rounded-3xl"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error || !feedbackData?.data) {
    return (
      <section className="relative z-50">
        <div className="pt-4 sm:pt-6">
          <h1 className="text-xl sm:text-2xl leading-[140%] font-semibold text-gray-900 font-primary">
            Feedback submission
          </h1>
          <div className="pt-4 sm:pt-6 text-center">
            <p className="text-red-500">Error loading feedback content</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative z-50">
      <div className="pt-2 sm:pt-4">
        <h1 className="text-xl sm:text-2xl leading-[140%] font-semibold text-gray-900 font-primary">
          {feedbackData.data.title_main}
        </h1>
      </div>

      <div className="pt-4 sm:pt-6 flex flex-col lg:flex-row gap-4 sm:gap-6">
        <FeedbackContent
          title={feedbackData.data.title}
          content={feedbackData.data.content}
          image={feedbackData.data.image}
        />

        <FeedbackForm
          titleExperience={feedbackData.data.title_experience}
          titleImprove={feedbackData.data.title_improve}
          titleFeedback={feedbackData.data.title_feedback}
        />
      </div>
    </section>
  )
}

export default FeedBack
