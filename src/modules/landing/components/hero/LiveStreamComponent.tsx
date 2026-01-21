'use client'

import { useMemo } from 'react'
import { Container } from '@/core/components'
import AvatarStack from './AvatarStack'
import LiveStreamTracking from './LiveStreamTracking'
import { useTranslations } from 'next-intl'
import { useGetViewReviewer } from '@/services/home/queries'
import type { Reviewer } from '@/services/home/type'
import { Link } from '@/locale'

const LiveStreamComponent = () => {
  const t = useTranslations('hero.liveStream')

  const { data: viewReviewer } = useGetViewReviewer({
    per_page: 4,
    current_page: 1,
    option: 'full',
  })

  // Map dữ liệu và lấy 4 avatars đầu tiên
  const avatars = useMemo<Reviewer[]>(() => {
    if (!viewReviewer?.data) return []
    return viewReviewer.data.slice(0, 4).map((reviewer: Reviewer) => ({
      fullname: reviewer.fullname,
      count_review: reviewer.count_review,
      avatar: reviewer.avatar,
    }))
  }, [viewReviewer])

  // Tính toán số lượng còn lại
  const remainingCount = useMemo(() => {
    if (!viewReviewer?.total) return 0
    const displayedCount = avatars.length
    return Math.max(0, viewReviewer.total - displayedCount)
  }, [viewReviewer?.total, avatars.length])

  return (
    <Link href="/review-hub">
      <div className="bg-[#FFF0F8] py-2 xl:py-4 2xl:py-8- cursor-pointer">
        <Container>
          <div className="flex flex-row items-center justify-between gap-2 md:gap-6">
            {/* Live Stream Badge */}
            <div className="flex items-center md:justify-start justify-center ">
              <LiveStreamTracking />
            </div>

            {/* Members Section */}
            <div className="flex flex-col md:flex-row items-end gap-2">
              {/* Member Info */}
              <div className="text-right">
                <p className="text-gray-900 text-sm sm:text-lg md:text-lg font-bold truncate">
                  {t('membersOnline')}{' '}
                  <span className="lg:hidden text-[#F5222D] font-bold">
                    {/* {remainingCount > 0 ? `${remainingCount}+` : ''}{' '} */}
                    {`${1000}+`}
                    {t('singleMoms')}
                  </span>{' '}
                </p>
                <p className="text-xs sm:text-sm lg:text-base ">
                  <span className="hidden lg:block text-[#F5222D] font-bold">
                    {`${1000}+`}
                    {t('singleMoms')}
                    <br />
                  </span>{' '}
                  <span className="text-[#4B5563] truncate">
                    {t('participatingInGroup')}
                  </span>
                </p>
              </div>

              {/* Avatar Stack */}
              <AvatarStack avatars={avatars} remainingCount={1000} />
            </div>
          </div>
        </Container>
      </div>
    </Link>
  )
}

export default LiveStreamComponent
