'use client'
import Container from '@/core/components/common/group/Container'
import { useGetHelpCentre } from '@/services/help-centre/queries'
import Image from 'next/image'
import { stripFontSize } from '../utils/html'
import InfoItem from './InfoItem'

const TopSection = () => {
  const { data, isLoading } = useGetHelpCentre()
  const topImages = data?.data?.image ?? []

  return (
    <Container>
      <div className="w-[80%] mx-auto overflow-hidden text-center mb-6 font-primary !leading-[140%] !tracking-[0%] !text-[24px] md:!text-[64px] [&_p]:!m-0">
        <p
          className="!m-0"
          dangerouslySetInnerHTML={{
            __html: stripFontSize(data?.data?.title ?? 'Help centre'),
          }}
        />
      </div>

      <div className="flex flex-col md:flex-row md:gap-[20px] xl:gap-[80px] gap-6 py-6 md:py-[36px] px-0">
        {/* Left column: image collage */}
        <div className="relative md:w-[50%] xl:w-[60%]">
          <div className="relative w-full pt-[77.31%]">
            <div className="absolute top-0 left-0 w-[36.75%]">
              <div className="relative w-full pt-[100%] rounded-[12.17%] border-[4px] border-white overflow-hidden shadow-sm">
                {isLoading ? (
                  <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                ) : (
                  <Image
                    src={
                      topImages[0] || '/image/reviewer-carousel/image-01.jpg'
                    }
                    alt="help-1"
                    fill
                    className="object-cover"
                  />
                )}
              </div>
            </div>

            <div className="absolute top-0 right-[5.49%] w-[48.62%]">
              <div className="relative w-full pt-[100%] rounded-[6.69%] border-[4px] border-white overflow-hidden shadow-sm">
                {isLoading ? (
                  <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                ) : (
                  <Image
                    src={
                      topImages[1] || '/image/reviewer-carousel/image-02.jpg'
                    }
                    alt="help-2"
                    fill
                    className="object-cover"
                  />
                )}
              </div>
            </div>

            <div className="absolute bottom-[3.95%] left-[14.24%] w-[36.83%]">
              <div className="relative w-full pt-[100%] rounded-[8.84%] border-[4px] border-white overflow-hidden shadow-sm">
                {isLoading ? (
                  <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                ) : (
                  <Image
                    src={
                      topImages[2] || '/image/reviewer-carousel/image-03.jpg'
                    }
                    alt="help-3"
                    fill
                    className="object-cover"
                  />
                )}
              </div>
            </div>

            <div className="absolute bottom-0 right-0 w-[39.7%]">
              <div className="relative w-full pt-[100%] rounded-[8.21%] border-[4px] border-white overflow-hidden shadow-sm">
                {isLoading ? (
                  <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                ) : (
                  <Image
                    src={
                      topImages[3] || '/image/reviewer-carousel/image-04.jpg'
                    }
                    alt="help-4"
                    fill
                    className="object-cover"
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right column: info items */}
        <div className="md:flex-1 flex flex-col gap-4 md:gap-0">
          {isLoading ? (
            <>
              <div className="flex items-center gap-4 py-2">
                <div className="size-10 rounded bg-gray-200 animate-pulse" />
                <div className="flex-1 h-5 rounded bg-gray-200 animate-pulse" />
              </div>
              <div className="flex items-center gap-4 py-2">
                <div className="size-10 rounded bg-gray-200 animate-pulse" />
                <div className="flex-1 h-5 rounded bg-gray-200 animate-pulse" />
              </div>
              <div className="flex items-center gap-4 py-2">
                <div className="size-10 rounded bg-gray-200 animate-pulse" />
                <div className="flex-1 h-5 rounded bg-gray-200 animate-pulse" />
              </div>
            </>
          ) : (
            <>
              <InfoItem
                link={data?.data.messager.link!}
                icon={
                  <img
                    src="/image/help-centre/image-01.png"
                    alt="Messenger"
                    className="size-10"
                  />
                }
                title="Messenger"
                description={
                  data?.data?.messager?.content || '24/7 · Everyday of the week'
                }
              />
              <InfoItem
                link={data?.data.zalo.link!}
                icon={
                  <img
                    src="/image/help-centre/image-02.png"
                    alt="M4U chat"
                    className="size-10"
                  />
                }
                title="M4U chat"
                description={
                  data?.data?.zalo?.content ||
                  '24/7 · Always online, always listening'
                }
              />
              <InfoItem
                icon={
                  <img
                    src="/image/help-centre/image-03.png"
                    alt="Hotline"
                    className="size-10"
                  />
                }
                title="Hotline"
                phone={data?.data?.hotline?.phone}
                note={data?.data?.hotline?.content}
              />
            </>
          )}
        </div>
      </div>
    </Container>
  )
}

export default TopSection
