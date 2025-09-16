'use client'

import Image from 'next/image'
import EventFrame from '../event/EventFrame'
import useEmblaCarousel from 'embla-carousel-react'
import EventImage from './EventImage'
import { useState } from 'react'

const THUMBS = [
  '/image/donation/event.jpg',
  '/image/donation/event1.jpg',
  '/image/donation/event2.jpg',
]

const EventContent = () => {
  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true,
    loop: true,
    duration: 25,
  })
  const [selectedSrc, setSelectedSrc] = useState(THUMBS[0])
  return (
    <div>
      <div className="">
        <EventImage src={selectedSrc} />
      </div>
      <div className="pt-2">
        {/* làm carousel ở đây */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-3 items-center justify-center py-1">
            {THUMBS.map((src) => (
              <div
                key={src}
                className="flex-[0_0_auto]"
                onClick={() => setSelectedSrc(src)}
              >
                <div
                  className={`relative size-[60px] md:size-[100px] xl:size-[150px] rounded-xl overflow-hidden cursor-pointer transition-shadow ${
                    src === selectedSrc
                      ? 'ring-2 ring-pink-400'
                      : 'ring-1 ring-transparent'
                  }`}
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="150px"
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventContent
