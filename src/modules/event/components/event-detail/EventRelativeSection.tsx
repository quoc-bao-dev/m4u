'use client'
import { Container } from '@/core/components'
import EventCard from '../event/EventCard'
import useEmblaCarousel from 'embla-carousel-react'

const EventRelativeSection = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'start' })
  return (
    <section className="py-10 ">
      <Container className="max-w-[1440px]">
        <h3 className="text-[32px] md:text-[40px] font-extrabold text-greyscale-900 text-center">
          Related Events
        </h3>
        {/* Mobile carousel */}
        <div className="pt-6 md:hidden">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4">
              <div className="min-w-0 flex-[0_0_85%]">
                <EventCard
                  status="coming"
                  date="06/09/2025"
                  title="Mask-a-thon Challenge: Win an iPhone 16!"
                  productCount={3}
                  fundAmount={'1,234,567,890'}
                  imageSrc="/image/donation/event.jpg"
                />
              </div>
              <div className="min-w-0 flex-[0_0_85%]">
                <EventCard
                  status="happening"
                  date="06/09/2025"
                  title="Mask-a-thon Challenge: Win an iPhone 16!"
                  productCount={3}
                  fundAmount={'1,234,567,890'}
                  imageSrc="/image/donation/event.jpg"
                />
              </div>
              <div className="min-w-0 flex-[0_0_85%]">
                <EventCard
                  status="coming"
                  date="06/09/2025"
                  title="Mask-a-thon Challenge: Win an iPhone 16!"
                  productCount={3}
                  fundAmount={'1,234,567,890'}
                  imageSrc="/image/donation/event.jpg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tablet/Desktop grid */}
        <div className="pt-6 hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <EventCard
            status="coming"
            date="06/09/2025"
            title="Mask-a-thon Challenge: Win an iPhone 16!"
            productCount={3}
            fundAmount={'1,234,567,890'}
            imageSrc="/image/donation/event.jpg"
          />
          <EventCard
            status="happening"
            date="06/09/2025"
            title="Mask-a-thon Challenge: Win an iPhone 16!"
            productCount={3}
            fundAmount={'1,234,567,890'}
            imageSrc="/image/donation/event.jpg"
          />
          <EventCard
            status="coming"
            date="06/09/2025"
            title="Mask-a-thon Challenge: Win an iPhone 16!"
            productCount={3}
            fundAmount={'1,234,567,890'}
            imageSrc="/image/donation/event.jpg"
          />
        </div>
      </Container>
    </section>
  )
}

export default EventRelativeSection
