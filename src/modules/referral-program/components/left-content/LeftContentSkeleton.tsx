'use client'

const LeftContentSkeleton = () => {
  return (
    <div className="order-2 xl:order-1 flex-1 space-y-8">
      {/* Steps Section Skeleton */}
      <div>
        {/* Section Header Skeleton */}
        <div className="h-7 w-32 bg-greyscale-200 rounded animate-pulse mb-2" />
        <div className="h-px bg-gray-200 mb-6"></div>

        {/* Content skeleton */}
        <div className="space-y-3">
          <div className="h-4 w-full bg-greyscale-200 rounded animate-pulse" />
          <div className="h-4 w-5/6 bg-greyscale-200 rounded animate-pulse" />
          <div className="h-4 w-4/5 bg-greyscale-200 rounded animate-pulse" />
          <div className="h-4 w-3/4 bg-greyscale-200 rounded animate-pulse" />
        </div>
      </div>

      {/* Rewards Section Skeleton */}
      <div>
        {/* Section Header Skeleton */}
        <div className="h-7 w-40 bg-greyscale-200 rounded animate-pulse mb-2" />
        <div className="h-px bg-gray-200 mb-6"></div>

        {/* Rewards grid skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="space-y-2">
              {/* Title skeleton */}
              <div className="h-5 w-3/4 bg-greyscale-200 rounded animate-pulse" />
              {/* Description skeleton */}
              <div className="space-y-1">
                <div className="h-4 w-full bg-greyscale-200 rounded animate-pulse" />
                <div className="h-4 w-2/3 bg-greyscale-200 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Guidelines Section Skeleton */}
      <div>
        {/* Section Header Skeleton */}
        <div className="h-7 w-36 bg-greyscale-200 rounded animate-pulse mb-2" />
        <div className="h-px bg-gray-200 mb-6"></div>

        {/* Guidelines content skeleton */}
        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="space-y-2">
              <div className="h-4 w-full bg-greyscale-200 rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-greyscale-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LeftContentSkeleton
