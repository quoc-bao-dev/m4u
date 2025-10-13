'use client'

const RightContentSkeleton = () => {
  return (
    <div className="order-1 xl:order-2 xl:w-5/12 space-y-6">
      <div className="xl:max-w-12/12 2xl:max-w-10/12 mx-auto">
        {/* QR Code Section Skeleton */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">
          {/* QR Code skeleton */}
          <div className="flex flex-col items-center space-y-4">
            <div className="w-48 h-48 bg-greyscale-200 rounded-lg" />
            <div className="space-y-2 text-center">
              <div className="h-4 w-32 bg-greyscale-200 rounded mx-auto" />
              <div className="h-3 w-24 bg-greyscale-200 rounded mx-auto" />
            </div>
          </div>
        </div>

        {/* Stats Section Skeleton */}
        <div className="py-5">
          <div className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">
            {/* Stats title skeleton */}
            <div className="h-6 w-32 bg-greyscale-200 rounded mb-4" />

            {/* Stats grid skeleton */}
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="text-center space-y-2">
                  <div className="h-8 w-12 bg-greyscale-200 rounded mx-auto" />
                  <div className="h-3 w-16 bg-greyscale-200 rounded mx-auto" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* User List Skeleton */}
        <div className="flex-1">
          <div className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">
            {/* User list title skeleton */}
            <div className="h-6 w-40 bg-greyscale-200 rounded mb-4" />

            {/* User list items skeleton */}
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, idx) => (
                <div key={idx} className="flex items-center space-x-3">
                  {/* Avatar skeleton */}
                  <div className="w-10 h-10 bg-greyscale-200 rounded-full" />
                  {/* User info skeleton */}
                  <div className="flex-1 space-y-1">
                    <div className="h-4 w-24 bg-greyscale-200 rounded" />
                    <div className="h-3 w-16 bg-greyscale-200 rounded" />
                  </div>
                  {/* Status skeleton */}
                  <div className="h-6 w-16 bg-greyscale-200 rounded-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RightContentSkeleton
