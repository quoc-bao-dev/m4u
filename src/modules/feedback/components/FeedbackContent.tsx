'use client'

import Image from 'next/image'

interface FeedbackContentProps {
  title: string
  content: string
  image: string
}

const FeedbackContent = ({ title, content, image }: FeedbackContentProps) => {
  return (
    <div className="w-full lg:w-[45%] pt-1 sm:pt-2 flex flex-col gap-3 sm:gap-4 items-center lg:items-start text-center lg:text-left">
      <div className="order-2 lg:order-1">
        <h2
          className="text-xl sm:text-2xl md:text-4xl leading-[120%] font-semibold text-gray-900 font-primary"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <p className="pt-1 sm:pt-2 md:pt-4 text-xs sm:text-sm text-gray-700 font-primary">
          {content}
        </p>
      </div>
      <div className="order-1 lg:order-2 w-full">
        <div className="relative aspect-[460/545] w-[70%] sm:w-[83.79%] max-w-[460px] mx-auto lg:mx-0">
          <Image src={image} alt="feedback" fill className="object-cover" />
        </div>
      </div>
    </div>
  )
}

export default FeedbackContent
