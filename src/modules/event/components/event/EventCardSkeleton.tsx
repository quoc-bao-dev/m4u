'use client'
import { Skeleton } from '@/components/ui/skeleton'

const EventCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 shadow-lg/5 rounded-xl pb-4">
      {/* Image skeleton */}
      <div className="relative w-full h-[240px] rounded-xl overflow-hidden">
        <Skeleton className="w-full h-full" />
      </div>

      <div className="px-4 flex flex-col gap-4">
        {/* Badge and date row */}
        <div className="flex items-center justify-between gap-4">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-4 w-16" />
        </div>

        {/* Title skeleton */}
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-3/4" />

        {/* Fund name section (hidden on mobile) */}
        <div className="hidden md:flex items-center gap-3">
          <Skeleton className="w-12 h-12 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>

        {/* Mobile description (hidden on desktop) */}
        <div className="md:hidden">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-6 w-16" />
          </div>
          <div className="flex flex-col gap-1">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-6 w-20" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventCardSkeleton
