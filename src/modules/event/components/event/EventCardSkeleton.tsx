'use client'
import { Container } from '@/core/components'

const EventCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 shadow-lg/5 rounded-xl pb-4 h-full animate-pulse">
      {/* Image skeleton */}
      <div className="relative w-full h-[240px] bg-greyscale-200 rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-greyscale-200 via-greyscale-300 to-greyscale-200 animate-pulse" />
      </div>

      <div className="px-4 flex flex-col gap-4 flex-1">
        {/* Badge and date skeleton */}
        <div className="flex items-center justify-between gap-4">
          <div className="h-6 w-20 bg-greyscale-200 rounded-full" />
          <div className="h-4 w-16 bg-greyscale-200 rounded" />
        </div>

        {/* Title skeleton */}
        <div className="space-y-2">
          <div className="h-5 w-full bg-greyscale-200 rounded" />
          <div className="h-5 w-3/4 bg-greyscale-200 rounded" />
        </div>

        {/* Fund info skeleton - hidden on mobile */}
        <div className="mt-auto hidden md:flex items-center gap-3">
          <div className="w-10 h-10 bg-greyscale-200 rounded-full" />
          <div className="h-4 w-24 bg-greyscale-200 rounded" />
        </div>

        {/* Mobile description skeleton */}
        <div className="md:hidden space-y-1">
          <div className="h-3 w-full bg-greyscale-200 rounded" />
          <div className="h-3 w-2/3 bg-greyscale-200 rounded" />
        </div>

        {/* Stats skeleton */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <div className="h-3 w-20 bg-greyscale-200 rounded" />
            <div className="h-6 w-12 bg-greyscale-200 rounded" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="h-3 w-24 bg-greyscale-200 rounded" />
            <div className="h-6 w-16 bg-greyscale-200 rounded" />
          </div>
        </div>
      </div>
    </div>
  )
}

const EventRelativeSectionSkeleton = () => {
  return (
    <section className="py-10">
      <Container className="max-w-[1440px]">
        {/* Title skeleton */}
        <div className="text-center">
          <div className="h-10 w-64 bg-greyscale-200 rounded mx-auto animate-pulse" />
        </div>

        {/* Mobile carousel skeleton */}
        <div className="pt-6 md:hidden">
          <div className="flex gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="min-w-0 flex-[0_0_85%]">
                <EventCardSkeleton />
              </div>
            ))}
          </div>
        </div>

        {/* Tablet/Desktop grid skeleton */}
        <div className="pt-6 hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <EventCardSkeleton key={index} />
          ))}
        </div>
      </Container>
    </section>
  )
}

export default EventRelativeSectionSkeleton
export { EventCardSkeleton }
