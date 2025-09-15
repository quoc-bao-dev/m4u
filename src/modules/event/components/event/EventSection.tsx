'use client'

import { Container } from '@/core/components'
import FilterBar from './FilterBar'

const EventSection = () => {
  return (
    <section>
      <Container>
        {/* Filter */}
        <FilterBar />
      </Container>
    </section>
  )
}

export default EventSection
