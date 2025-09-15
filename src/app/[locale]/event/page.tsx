import {
  EventSection,
  GiveTodaySection,
  HeroSection,
  QuestionSection,
} from '@/modules/event'
import React from 'react'

const Page = () => {
  return (
    <main>
      <HeroSection />
      <EventSection />
      <QuestionSection />
      <GiveTodaySection />
    </main>
  )
}

export default Page
