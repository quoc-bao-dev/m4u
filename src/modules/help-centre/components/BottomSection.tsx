'use client'

import { Container } from '@/core/components'
import Button from '@/core/components/ui/button'
import { useGetHelpCentre } from '@/services/help-centre/queries'
import { stripFontSize } from '../utils/html'
import { Link } from '@/locale'

const BottomSection = () => {
  const { data, isLoading } = useGetHelpCentre()

  return (
    <section className="pt-12">
      <Container>
        <div className="text-center">
          {isLoading ? (
            <div className="space-y-3">
              <div className="mx-auto h-8 md:h-12 w-3/4 rounded bg-gray-200 animate-pulse" />
              <div className="mx-auto h-4 md:h-5 w-5/6 rounded bg-gray-200 animate-pulse" />
            </div>
          ) : (
            <>
              <div
                className="font-primary !text-[24px] md:!text-[48px] !leading-[140%] !tracking-[0%] [&_p]:!m-0"
                dangerouslySetInnerHTML={{
                  __html: stripFontSize(
                    data?.data?.title_mid ?? 'We’re here for you anytime ✨'
                  ),
                }}
              />
              <div
                className="mt-4 font-primary !text-[14px] md:!text-[16px] !leading-[140%] [&_p]:!m-0"
                dangerouslySetInnerHTML={{
                  __html: stripFontSize(data?.data?.content_mid ?? ''),
                }}
              />
            </>
          )}
        </div>
      </Container>

      <div className="pt-12">
        <div className="relative w-full md:pt-[28.99%] pt-[40%]">
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d738.3328150457521!2d106.69852635459264!3d10.78104053469397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752fd24c4be867%3A0xea7d9cc2776f699!2sGalaxy%20Office%20-%20Cho%20thu%C3%AA%20V%C4%83n%20ph%C3%B2ng%20TPHCM!5e0!3m2!1svi!2s!4v1759140727919!5m2!1svi!2s"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      <Container>
        <div className="pt-12 text-center px-4">
          {isLoading ? (
            <div className="space-y-3">
              <div className="mx-auto h-8 md:h-12 w-2/3 rounded bg-gray-200 animate-pulse" />
              <div className="mx-auto h-4 md:h-5 w-5/6 rounded bg-gray-200 animate-pulse" />
              <div className="pt-4 md:pt-6 flex justify-center">
                <div className="h-10 w-40 rounded bg-gray-200 animate-pulse" />
              </div>
            </div>
          ) : (
            <>
              <div
                className="font-primary !text-[24px] md:!text-[48px] !leading-[140%] !tracking-[0%] [&_p]:!m-0"
                dangerouslySetInnerHTML={{
                  __html: stripFontSize(data?.data?.title_footer ?? ''),
                }}
              />
              <div
                className="mt-4 font-primary !text-[16px] md:!text-[24px] !leading-[100%] text-center [&_p]:!m-0"
                dangerouslySetInnerHTML={{
                  __html: stripFontSize(data?.data?.content_footer ?? ''),
                }}
              />
              <div className="pt-4 md:pt-10 flex justify-center">
                <Link href={'/trial-registration'}>
                  <Button size="md">
                    {data?.data?.title_button || 'Claim your spot today'}
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </Container>
    </section>
  )
}

export default BottomSection
