import {
  EventSection,
  GiveTodaySection,
  HeroSection,
  QuestionSection,
} from '@/modules/event'

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
