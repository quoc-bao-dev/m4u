import { Container } from '@/core/components'
import Image from 'next/image'
import TopProductCard from './TopProductCard'

const TopProductSection = () => {
  return (
    <>
      <section className="bg-yellow-100 relative">
        <div className="absolute bottom-0 left-0 z-0 hidden md:block">
          <img
            src="/image/trial/image-decor-01.png"
            alt=""
            className="w-[400px]"
          />
        </div>
        <div className="absolute top-0 right-0 hidden md:block">
          <img
            src="/image/trial/image-decor-02.png"
            alt=""
            className="w-[100px]"
          />
        </div>
        <Container className="relative z-10">
          <div className="grid md:grid-cols-2 grid-cols-1">
            {/* Left */}
            <div className="h-full flex items-center md:pt-0 pt-10">
              <h2 className="text-title-sect text-gray-400 font-bold leading-[120%]">
                <span className="text-gray-900">Top 3 sản phẩm</span> được quan
                tâm nhiều nhất
              </h2>
            </div>
            {/* Right */}
            <div className="h-full">
              <div className="pt-40 md:pt-50"></div>
              <div className="w-full flex items-center justify-center pt-5">
                <div className="relative w-[700px]">
                  <div className="absolute left-[17.14%] translate-x-[-50%] top-[17.95%] translate-y-[-50%]">
                    <TopProductCard
                      image="/image/trial/image-02.png"
                      count={6900}
                    />
                  </div>
                  <div className="absolute left-[50.1%] translate-x-[-50%] top-[0%] translate-y-[-50%]">
                    <TopProductCard
                      isTop
                      image="/image/trial/image-03.png"
                      count={8800}
                    />
                  </div>
                  <div className="absolute left-[82.86%] translate-x-[-50%]  top-[29.0%] translate-y-[-50%]">
                    <TopProductCard
                      image="/image/trial/image-04.png"
                      count={1300}
                    />
                  </div>
                  <div className="absolute left-[16.43%] translate-x-[-50%]  bottom-[5.54%] ">
                    <div className="w-[200px] text-center">
                      <p className="w-[50%] md:w-[80%] mx-auto text-gray-50 text-[12px] md:text-base">
                        Panthetoin Deep Moisture Mask
                      </p>
                    </div>
                  </div>

                  <div className="absolute left-[50.71%] translate-x-[-50%] bottom-[5.93%] translate-y-[-50%]">
                    <div className="w-[200px] text-center">
                      <p className="w-[50%] md:w-[80%] mx-auto text-gray-50 text-[12px] md:text-base">
                        Panthetoin Deep Moisture Mask
                      </p>
                    </div>
                  </div>

                  <div className="absolute right-[16.43%]  translate-x-[50%] bottom-[5.54%]">
                    <div className="w-[200px] text-center">
                      <p className="w-[50%] md:w-[80%] mx-auto text-gray-50 text-[12px] md:text-base">
                        Panthetoin Deep Moisture Mask
                      </p>
                    </div>
                  </div>
                  <Image
                    src="/image/trial/image-element-01.svg"
                    alt="image-01"
                    className="w-full"
                    width={300}
                    height={300}
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

export default TopProductSection
