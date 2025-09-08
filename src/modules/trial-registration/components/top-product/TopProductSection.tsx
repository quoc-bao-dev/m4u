import { Container } from '@/core/components'
import Image from 'next/image'
import TopProductCard from './TopProductCard'

const TopProductSection = () => {
  return (
    <>
      <section className="bg-yellow-100 relative">
        <div className="absolute bottom-0 left-0 z-0">
          <img
            src="/image/trial/image-decor-01.png"
            alt=""
            className="w-[400px]"
          />
        </div>
        <div className="absolute top-0 right-0">
          <img
            src="/image/trial/image-decor-02.png"
            alt=""
            className="w-[100px]"
          />
        </div>
        <Container className="relative z-10">
          <div className="grid grid-cols-2">
            {/* Left */}
            <div className="h-full flex items-center">
              <h2 className="text-[64px] text-gray-400 font-bold leading-[120%]">
                <span className="text-gray-900">Top 3 sản phẩm</span> được quan
                tâm nhiều nhất
              </h2>
            </div>
            {/* Right */}
            <div className="h-full">
              <div className="w-full flex items-center justify-center pt-5">
                <div className="relative w-[700px] pt-50">
                  <div className="absolute left-[50px] top-[135px]">
                    <TopProductCard
                      image="/image/trial/image-02.png"
                      count={6900}
                    />
                  </div>
                  <div className="absolute left-[286px] top-[40px]">
                    <TopProductCard
                      image="/image/trial/image-03.png"
                      count={8800}
                    />
                  </div>
                  <div className="absolute left-[510px] top-[200px]">
                    <TopProductCard
                      image="/image/trial/image-04.png"
                      count={1300}
                    />
                  </div>
                  <div className="absolute left-[10px] bottom-[30px]">
                    <div className="w-[200px] text-center">
                      <p className="w-[80%] mx-auto text-gray-50">
                        Panthetoin Deep Moisture Mask
                      </p>
                    </div>
                  </div>

                  <div className="absolute left-[250px] bottom-[70px]">
                    <div className="w-[200px] text-center">
                      <p className="w-[80%] mx-auto text-gray-50">
                        Panthetoin Deep Moisture Mask
                      </p>
                    </div>
                  </div>

                  <div className="absolute right-[10px] bottom-[30px]">
                    <div className="w-[200px] text-center">
                      <p className="w-[80%] mx-auto text-gray-50">
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
