'use client'

import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import EventCard from './EventCard'

type EventItem = {
  id: string
  status: 'happening' | 'coming'
  date: string
  title: string
  productCount: number | string
  fundAmount: string
  imageSrc: string
}

const EventCarouselEmbla = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true,
    slidesToScroll: 1,
    duration: 40
  })

  const [, setSelectedIndex] = useState(0)

  const events: EventItem[] = [
    {
      id: 'e1',
      status: 'happening',
      date: '06/09/2025',
      title: 'Livelihood assistance for single mothers in underserved communities.',
      productCount: 69,
      fundAmount: '1,234,567',
      imageSrc: '/image/donation/event.jpg'
    },
    {
      id: 'e2',
      status: 'coming',
      date: '06/09/2025',
      title: 'Livelihood assistance for single mothers in underserved communities.',
      productCount: 69,
      fundAmount: '1,234,567',
      imageSrc: '/image/donation/event1.jpg'
    },
    {
      id: 'e3',
      status: 'coming',
      date: '06/09/2025',
      title: 'Livelihood assistance for single mothers in underserved communities.',
      productCount: 69,
      fundAmount: '1,234,567',
      imageSrc: '/image/donation/event2.jpg'
    },
    // {
    //   id: 'e4',
    //   status: 'happening',
    //   date: '15/10/2025',
    //   title: 'Educational support programs for children of single mothers.',
    //   productCount: 45,
    //   fundAmount: '987,654',
    //   imageSrc: '/image/donation/event.jpg'
    // },
    // {
    //   id: 'e5',
    //   status: 'coming',
    //   date: '20/11/2025',
    //   title: 'Healthcare access initiatives for single parent families.',
    //   productCount: 32,
    //   fundAmount: '756,321',
    //   imageSrc: '/image/donation/event1.jpg'
    // },
    // {
    //   id: 'e6',
    //   status: 'coming',
    //   date: '05/12/2025',
    //   title: 'Job training and skill development workshops.',
    //   productCount: 58,
    //   fundAmount: '1,456,789',
    //   imageSrc: '/image/donation/event2.jpg'
    // }
  ]

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index)
  }, [emblaApi])

  const onInit = useCallback(() => {
    // no-op
  }, [])

  const onSelect = useCallback((api: any) => {
    setSelectedIndex(api.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!emblaApi) return
    onInit()
    onSelect(emblaApi)
    emblaApi.on('reInit', onInit)
    emblaApi.on('select', onSelect)
    return () => {
      emblaApi.off('reInit', onInit)
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onInit, onSelect])

  return (
    <div className="w-full flex items-stretch will-change-transform transform-gpu">
      <div className="flex-1 overflow-hidden xl:overflow-visible will-change-transform transform-gpu">
        <div className="embla will-change-transform transform-gpu" ref={emblaRef}>
          <div className="embla__container flex will-change-transform transform-gpu pl-2">
            {events.map((e, index) => (
              <div
                key={e.id}
                className="embla__slide mr-4 pb-5 flex-shrink-0 flex-[0_0_auto] basis-[66.666%] sm:basis-[60%] md:basis-1/2 xl:basis-[calc(100%/3-14px)]"
                onClick={() => scrollTo(index)}
              >
                <EventCard
                  status={e.status}
                  date={e.date}
                  title={e.title}
                  productCount={e.productCount}
                  fundAmount={e.fundAmount}
                  imageSrc={e.imageSrc}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventCarouselEmbla


