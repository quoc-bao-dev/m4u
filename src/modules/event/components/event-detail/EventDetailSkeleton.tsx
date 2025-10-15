'use client'
import { Skeleton } from '@/components/ui/skeleton'

const EventDetailSkeleton = () => {
  return (
    <div className="max-w-[1440px] pt-[100px]">
      {/* Header Skeleton */}
      <div className="mb-8">
        <Skeleton className="h-8 w-3/4 mb-4" />
        <Skeleton className="h-4 w-1/2 mb-2" />
        <Skeleton className="h-4 w-1/3" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-8">
        {/* Main Content Skeleton */}
        <div className="col-span-1 lg:col-span-8">
          {/* Event Content Skeleton */}
          <div className="mb-6">
            <Skeleton className="w-full h-[400px] rounded-xl mb-4" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="w-full h-24 rounded-lg" />
              ))}
            </div>
          </div>

          {/* Mobile Sidebar Skeleton */}
          <div className="lg:hidden pt-5 mb-6">
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Skeleton className="w-12 h-12 rounded-full" />
                <Skeleton className="h-4 w-32" />
              </div>
              <div className="space-y-3 mb-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <Skeleton className="h-3 w-16 mb-1" />
                  <Skeleton className="h-6 w-12" />
                </div>
                <div>
                  <Skeleton className="h-3 w-20 mb-1" />
                  <Skeleton className="h-6 w-16" />
                </div>
              </div>
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
          </div>

          {/* Event Info Tabs Skeleton */}
          <div className="pt-5">
            <div className="bg-white rounded-xl border border-gray-100">
              {/* Tabs Header */}
              <div className="border-b border-gray-100 p-4">
                <div className="flex gap-6">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <Skeleton key={index} className="h-6 w-20" />
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                <div className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-4/5" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Sidebar Skeleton */}
        <div className="col-span-1 hidden lg:block lg:col-span-4">
          <div className="sticky lg:top-10 2xl:top-20">
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Skeleton className="w-12 h-12 rounded-full" />
                <Skeleton className="h-4 w-32" />
              </div>
              <div className="space-y-3 mb-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <Skeleton className="h-3 w-16 mb-1" />
                  <Skeleton className="h-6 w-12" />
                </div>
                <div>
                  <Skeleton className="h-3 w-20 mb-1" />
                  <Skeleton className="h-6 w-16" />
                </div>
              </div>
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventDetailSkeleton
