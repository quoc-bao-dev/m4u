'use client'

import { LeftContentSkeleton } from '../left-content'
import { RightContentSkeleton } from '../right-content'

const ReferralSkeleton = () => {
  return (
    <main className="h-full min-h-0 overflow-auto">
      <div className="py-2">
        {/* Title skeleton */}
        <div className="h-8 w-48 bg-greyscale-200 rounded animate-pulse" />
      </div>
      <div className="flex flex-col xl:flex-row gap-5 max-w-7xl mx-auto pb-8">
        {/* Left Column Skeleton */}
        <LeftContentSkeleton />

        {/* Right Column Skeleton */}
        <RightContentSkeleton />
      </div>
    </main>
  )
}

export default ReferralSkeleton
