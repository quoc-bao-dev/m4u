'use client'

import { Container } from '@/core/components'
import FilterBar from './FilterBar'
import EventCard from './EventCard'

const EventSection = () => {
  return (
    <section className="py-[60px]">
      <Container>
        {/* Filter */}
        <FilterBar />
        <div className="pt-8"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <EventCard
            status="happening"
            date="06/09/2025"
            title="Livelihood assistance for single mothers in underserved communities."
            productCount={69}
            fundAmount={'1,234,567'}
            imageSrc="/image/donation/event.jpg"
          />

          <EventCard
            status="happening"
            date="06/09/2025"
            title="Livelihood assistance for single mothers in underserved communities."
            productCount={69}
            fundAmount={'1,234,567'}
            imageSrc="/image/donation/event.jpg"
          />

          <EventCard
            status="happening"
            date="06/09/2025"
            title="Livelihood assistance for single mothers in underserved communities."
            productCount={69}
            fundAmount={'1,234,567'}
            imageSrc="/image/donation/event.jpg"
          />
          <EventCard
            status="happening"
            date="06/09/2025"
            title="Livelihood assistance for single mothers in underserved communities."
            productCount={69}
            fundAmount={'1,234,567'}
            imageSrc="/image/donation/event.jpg"
          />

          <EventCard
            status="happening"
            date="06/09/2025"
            title="Livelihood assistance for single mothers in underserved communities."
            productCount={69}
            fundAmount={'1,234,567'}
            imageSrc="/image/donation/event.jpg"
          />

          <EventCard
            status="happening"
            date="06/09/2025"
            title="Livelihood assistance for single mothers in underserved communities."
            productCount={69}
            fundAmount={'1,234,567'}
            imageSrc="/image/donation/event.jpg"
          />
        </div>
      </Container>
    </section>
  )
}

export default EventSection
