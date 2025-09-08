import { Container } from '@/core/components'

const ReviewCTASection = () => {
  return (
    <section className="py-[96px] bg-[#FBF7F0]">
      <Container>
        <div className="flex gap-6">
          <h2 className="w-[40%] text-center text-[44px] leading-[120%] md:text-[56px] lg:text-[64px] font-bold text-gray-400 ">
            Còn chần chờ gì nữa mà không{' '}
            <span className="text-gray-900">trở thành</span>
            <br />
            <span className="text-gray-900">reviewer ngay?</span>
          </h2>

          <div className=" flex-1">
            <div className="w-full h-[280px] lg:h-[360px] rounded-2xl border-2 border-dashed border-gray-300 bg-white/60 flex items-center justify-center text-gray-400">
              Carousel placeholder
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default ReviewCTASection
