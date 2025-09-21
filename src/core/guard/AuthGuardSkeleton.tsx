'use client'

import { Container } from '@/core/components'
import { IMAGES } from '@/core/constants/IMAGES'

const AuthGuardSkeleton = () => {
  return (
    <div className="py-[96px] relative overflow-visible min-h-screen">
      <img
        src={IMAGES.topGradient2}
        alt="top-gradient"
        className="hidden lg:block absolute -z-30 top-0 w-full object-cover pointer-events-none -translate-y-1/2 scale-x-[-1.3] opacity-60"
      />
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 relative z-10">
          {/* Sidebar Skeleton */}
          <aside className="hidden lg:block lg:col-span-4 xl:col-span-3">
            <div className="lg:h-[calc(100vh-162px)] lg:sticky lg:top-[96px]">
              <div className="bg-white rounded-2xl shadow-[0px_4px_24px_0px_#0000000F] p-6">
                {/* Avatar Skeleton */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3"></div>
                  </div>
                </div>

                {/* Menu Items Skeleton */}
                <div className="space-y-4">
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-1/3"></div>
                  <div className="space-y-2">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded animate-pulse flex-1"></div>
                      </div>
                    ))}
                  </div>

                  <div className="h-3 bg-gray-200 rounded animate-pulse w-1/4 mt-6"></div>
                  <div className="space-y-2">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded animate-pulse flex-1"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content Skeleton */}
          <section className="lg:col-span-8 xl:col-span-9">
            <div className="lg:p-5 lg:bg-white lg:rounded-2xl lg:shadow-[0px_4px_24px_0px_#0000000F] lg:min-h-[calc(100vh-162px)] relative overflow-hidden">
              {/* Header Skeleton */}
              <div className="mb-6">
                <div className="h-8 bg-gray-200 rounded animate-pulse w-1/3 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
              </div>

              {/* Content Cards Skeleton */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 mb-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="h-5 bg-gray-200 rounded animate-pulse w-1/3"></div>
                      <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Table Skeleton */}
              <div className="bg-white rounded-xl border border-gray-100">
                {/* Table Header */}
                <div className="grid grid-cols-4 gap-4 p-4 border-b border-gray-100">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="h-4 bg-gray-200 rounded animate-pulse"
                    ></div>
                  ))}
                </div>

                {/* Table Rows */}
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-4 gap-4 p-4 border-b border-gray-50 last:border-b-0"
                  >
                    {[...Array(4)].map((_, j) => (
                      <div
                        key={j}
                        className="h-4 bg-gray-200 rounded animate-pulse"
                      ></div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Loading Text */}
              <div className="flex items-center justify-center mt-8">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-pink-500 rounded-full animate-bounce"></div>
                  <div
                    className="w-4 h-4 bg-pink-500 rounded-full animate-bounce"
                    style={{ animationDelay: '0.1s' }}
                  ></div>
                  <div
                    className="w-4 h-4 bg-pink-500 rounded-full animate-bounce"
                    style={{ animationDelay: '0.2s' }}
                  ></div>
                  <span className="ml-3 text-gray-500 font-medium">
                    Đang kiểm tra xác thực...
                  </span>
                </div>
              </div>

              {/* Background Gradient */}
              <div className="hidden lg:block absolute -bottom-6 left-0 right-0 z-8 translate-y-3/4 scale-x-[-1.8] overflow-hidden">
                <img
                  src={IMAGES.topGradient2}
                  alt="bg-table"
                  className="w-full h-auto opacity-30"
                />
              </div>
            </div>
          </section>
        </div>
      </Container>
    </div>
  )
}

export default AuthGuardSkeleton
