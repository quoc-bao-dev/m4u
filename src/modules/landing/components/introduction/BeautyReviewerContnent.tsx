'use client'
import { useGetHomePage } from '@/services/home/queries'
import { Container, Grid } from '@/core/components'
import { RegisterCTA } from '../cta'
import Link from 'next/link'
import { Skeleton } from '@/components/ui/skeleton'

const BeautyReviewerSection = () => {
  const { isLoading, data: homePage } = useGetHomePage()
  const data = homePage?.section2

  return (
    <Container>
      <Grid className="grid-cols-1 md:grid-cols-2 md:mt-0 gap-4 lg:gap-16">
        {isLoading ? (
          <Skeleton className="w-full h-full" />
        ) : (
          <div
            className="text-[24px] md:text-[42px] lg:text-[54px] xl:text-[64px] font-bold text-gray-900 leading-[120%]"
            dangerouslySetInnerHTML={{ __html: data?.title }}
          >
            {/* <span className="text-gray-400">Chỉ cần yêu thích làm đẹp,</span> ai
            cũng có thể trở thành Reviewer! */}
          </div>
        )}
        <div className="">
          {isLoading ? (
            <Skeleton className="w-full h-28" />
          ) : (
            <div
              className="space-y-2 text-[16px] md:text-[18px] lg:text-[24px] text-gray-700"
              dangerouslySetInnerHTML={{ __html: data?.content }}
            >
              {/* Biến những trải nghiệm làm đẹp hằng ngày thành thu nhập. Dù bạn là
              sinh viên, nhân viên văn phòng hay nội trợ, hãy để chúng tôi giúp
              bạn khởi đầu. */}
            </div>
          )}
          <Link href={'/vi/trial-registration'}>
            <RegisterCTA className="mt-8" label="Đăng ký trải nghiệm" />
          </Link>
        </div>
      </Grid>
    </Container>
  )
}

export default BeautyReviewerSection
