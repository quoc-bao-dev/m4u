import { Container, Grid } from '@/core/components'
import { RegisterCTA } from '../cta'

const BeautyReviewerSection = () => {
  return (
    <Container>
      <Grid className="grid-cols-1 md:grid-cols-2 md:mt-0 gap-4 lg:gap-16">
        <div className="">
          <p className="text-[24px] md:text-[42px] lg:text-[54px] xl:text-[64px] font-bold text-gray-900 leading-[120%]">
            <span className="text-gray-400">Chỉ cần yêu thích làm đẹp,</span> ai
            cũng có thể trở thành Reviewer!
          </p>
        </div>
        <div className="">
          <div className="space-y-2 text-[16px] md:text-[18px] lg:text-[24px] text-gray-700">
            <p className="">
              Biến những trải nghiệm làm đẹp hằng ngày thành thu nhập. Dù bạn là
              sinh viên, nhân viên văn phòng hay nội trợ, hãy để chúng tôi giúp
              bạn khởi đầu.
            </p>
            <p className="">
              Nhận ngay 10% hoa hồng khi giới thiệu bạn bè mua hàng thành công.
            </p>
          </div>
          <RegisterCTA className="mt-8" label="Đăng ký trải nghiệm" />
        </div>
      </Grid>
    </Container>
  )
}

export default BeautyReviewerSection
