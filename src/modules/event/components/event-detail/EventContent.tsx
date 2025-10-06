'use client'

import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import EventImage from './EventImage'

type EventContentProps = {
  mainImage: string
  images: Array<{
    id: number
    image: string
    orderBy: number
  }>
}

const EventContent = ({ mainImage, images }: EventContentProps) => {
  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true,
    loop: true,
    duration: 25,
  })

  // Tạo danh sách hình ảnh bao gồm hình chính và các hình khác với useMemo
  const allImages = useMemo(() => {
    return [mainImage, ...images.map((img) => img.image)]
  }, [mainImage, images])

  const [selectedSrc, setSelectedSrc] = useState('')

  // Cập nhật selectedSrc khi allImages thay đổi
  useEffect(() => {
    if (allImages.length > 0) {
      setSelectedSrc(allImages[0])
    }
  }, [allImages])

  // Debug function để kiểm tra click
  const handleImageClick = (src: string) => {
    console.log('Clicking image:', src)
    setSelectedSrc(src)
  }

  return (
    <div>
      <div className="">
        <EventImage src={selectedSrc} />
      </div>
      <div className="pt-2">
        {/* Carousel hình ảnh */}
        <div className="overflow-x-auto" ref={emblaRef}>
          <div className="flex gap-3 items-center justify-center- py-1 px-2">
            {allImages.map((src, index) => (
              <div
                key={`${src}-${index}`}
                className="flex-[0_0_auto]"
                onClick={() => handleImageClick(src)}
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
                    alt={`Event image ${index + 1}`}
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
