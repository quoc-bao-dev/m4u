'use client'
import { Logo } from '@/core/components/brand'
import { Container, Grid } from '@/core/components/common'
import { cn } from '@/core/utils'
import WaterMark from './WaterMark'
import { memo } from 'react'
import { useTranslations } from 'next-intl'
import { useGetInfo, useGetInfoContact } from '@/services/info/queries'
import { Link } from '@/locale'

type FooterProps = {
  className?: string
}

const Footer = ({ className }: FooterProps) => {
  const t = useTranslations('footer')
  const { data: infoContact } = useGetInfoContact()

  const { data: info } = useGetInfo()
  return (
    <div
      className={cn(
        `bg-[#3B82F6] text-white ${className} overflow-hidden pt-[100px]`
      )}
    >
      {/* TOOO: check scroll */}
      {/* <div className="hidden md:block absolute bottom-[-145px] -translate-x-1/2 left-[50%]">
        <WaterMark />
      </div> */}

      <div className="hidden absolute bottom-0 w-full overflow-hidden md:flex justify-center pointer-events-none">
        <div className="-mb-[145px] pointer-events-none">
          <WaterMark />
        </div>
      </div>

      <div className=""></div>
      <Container className="py-10 md:py-28">
        <div className="flex flex-col gap-10 md:gap-24">
          {/* Top content */}
          <Grid className="items-start gap-10 md:gap-6 lg:gap-10 md:grid-cols-12">
            {/* Left: Logo + contact */}
            <div className="md:col-span-7 lg:col-span-8">
              <div className="flex flex-col md:flex-row gap-6">
                <Logo className="w-14 h-14 text-white" />
                <div className="flex flex-col gap-2 text-sm md:text-[13px] lg:text-sm opacity-90">
                  <div className="flex flex-col md:flex-row md:items-center gap-1 lg:gap-6">
                    <span className="max-w-[200px]">
                      {infoContact?.address}
                    </span>
                    {/* <span className="hidden md:inline-block">•</span> */}
                    <span className="truncate">{infoContact?.phone}</span>
                    {/* <span className="hidden md:inline-block">•</span> */}
                    <a
                      href="mailto:hello@logoipsum.com"
                      className="hover:opacity-100 hover:underline"
                    >
                      {infoContact?.email}
                    </a>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-100 mt-2">
                {t('headOffice')}: {info?.contact_address_head_office}
              </p>
            </div>

            {/* Right: Sitemap + social */}
            <div className="md:col-span-5 lg:col-span-4 flex flex-col gap-6">
              <div className="md:flex justify-end">
                <div className="flex gap-5 flex-col">
                  <div className="grid items-baseline justify-between">
                    <h4 className="text-xs tracking-[0.12em] font-semibold uppercase opacity-80">
                      {t('sitemap')}
                    </h4>
                  </div>

                  <div className="flex gap-6 text-sm">
                    <nav className="flex flex-col gap-2">
                      <Link href="/" className="hover:underline cursor-pointer">
                        {t('home')}
                      </Link>
                      <Link
                        href="/trial-registration"
                        className="hover:underline cursor-pointer"
                      >
                        {t('joinTrial')}
                      </Link>
                      <Link
                        href="/review-hub"
                        className="hover:underline cursor-pointer"
                      >
                        {t('newsfeed')}
                      </Link>
                    </nav>
                    <nav className="flex flex-col gap-2">
                      <Link
                        href="/donation-charity"
                        className="hover:underline cursor-pointer"
                      >
                        {t('newsEvents')}
                      </Link>
                      <Link
                        href="/event"
                        className="hover:underline cursor-pointer"
                      >
                        {t('account')}
                      </Link>
                    </nav>
                  </div>
                </div>
              </div>

              {/* Social (mobile) */}
              <div className="md:hidden flex items-center gap-4 pt-2">
                {/* TODO: map social */}
                <a
                  href={info?.link_contact_instagram}
                  aria-label="Instagram"
                  className="opacity-90 hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-white"
                  >
                    <path
                      d="M12 7.2A4.8 4.8 0 1 0 12 16.8 4.8 4.8 0 1 0 12 7.2ZM12 14.8A2.8 2.8 0 1 1 12 9.2 2.8 2.8 0 1 1 12 14.8Z"
                      fill="currentColor"
                    />
                    <path
                      d="M17 0H7C3.13401 0 0 3.13401 0 7V17C0 20.866 3.13401 24 7 24H17C20.866 24 24 20.866 24 17V7C24 3.13401 20.866 0 17 0ZM22 17C22 19.7614 19.7614 22 17 22H7C4.23858 22 2 19.7614 2 17V7C2 4.23858 4.23858 2 7 2H17C19.7614 2 22 4.23858 22 7V17Z"
                      fill="currentColor"
                    />
                    <circle cx="18.2" cy="5.8" r="1.2" fill="currentColor" />
                  </svg>
                </a>

                {/* TODO: map social */}
                <a
                  href={info?.link_contact_facebook}
                  aria-label="Facebook"
                  className="opacity-90 hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-white"
                  >
                    <path
                      d="M22 12.06C22 6.505 17.523 2 12 2S2 6.505 2 12.06C2 17.08 5.657 21.245 10.438 22V14.97H7.898V12.06H10.438V9.845C10.438 7.325 11.93 5.94 14.214 5.94C15.308 5.94 16.453 6.135 16.453 6.135V8.61H15.193C13.953 8.61 13.562 9.38 13.562 10.17V12.06H16.336L15.892 14.97H13.562V22C18.343 21.245 22 17.08 22 12.06Z"
                      fill="currentColor"
                    />
                  </svg>
                </a>

                <a
                  href={info?.link_contact_tiktok}
                  aria-label="Facebook"
                  className="opacity-90 hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_21583_3078)">
                      <path
                        d="M16.4608 4.00883C15.4105 3.30649 14.6531 2.18226 14.4164 0.872401C14.3655 0.58946 14.3372 0.297991 14.3372 0H10.9858L10.9804 13.7798C10.9242 15.3229 9.68611 16.5616 8.16884 16.5616C7.69698 16.5616 7.253 16.4407 6.86182 16.2295C5.96505 15.7454 5.3514 14.7811 5.3514 13.6715C5.3514 12.0777 6.61538 10.7808 8.16835 10.7808C8.45831 10.7808 8.73653 10.83 8.9996 10.9143V7.40412C8.72724 7.36599 8.45048 7.34241 8.16835 7.34241C4.76708 7.34241 2 10.1814 2 13.6715C2 15.8126 3.04248 17.7074 4.63359 18.8532C5.63549 19.5751 6.85449 20 8.16884 20C11.5701 20 14.3372 17.1611 14.3372 13.6715V6.68372C15.6515 7.65144 17.2622 8.22184 19 8.22184V4.7834C18.0641 4.7834 17.1923 4.49796 16.4608 4.00883Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_21583_3078">
                        <rect width="20" height="20" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </a>
                <a
                  href={info?.link_contact_shoppe}
                  aria-label="Facebook"
                  className="opacity-90 hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <img
                    src="/image/icon/shopee.png"
                    alt=""
                    className="size-[20px]"
                  />
                </a>
              </div>
            </div>
          </Grid>

          {/* Bottom: copyright */}
          <div className="flex justify-between ">
            <div className="flex items-center justify-between pt-2 text-xs text-gray-100 opacity-80">
              <p>{t('copyright')}</p>
              <div className="hidden md:flex items-center gap-4" />
            </div>

            <div className="hidden md:flex items-center gap-4">
              {/* TODO: map social */}
              <a
                href={info?.link_contact_instagram}
                aria-label="Instagram"
                className="opacity-90 hover:opacity-100 transition-opacity cursor-pointer"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-white"
                >
                  <path
                    d="M12 7.2A4.8 4.8 0 1 0 12 16.8 4.8 4.8 0 1 0 12 7.2ZM12 14.8A2.8 2.8 0 1 1 12 9.2 2.8 2.8 0 1 1 12 14.8Z"
                    fill="currentColor"
                  />
                  <path
                    d="M17 0H7C3.13401 0 0 3.13401 0 7V17C0 20.866 3.13401 24 7 24H17C20.866 24 24 20.866 24 17V7C24 3.13401 20.866 0 17 0ZM22 17C22 19.7614 19.7614 22 17 22H7C4.23858 22 2 19.7614 2 17V7C2 4.23858 4.23858 2 7 2H17C19.7614 2 22 4.23858 22 7V17Z"
                    fill="currentColor"
                  />
                  <circle cx="18.2" cy="5.8" r="1.2" fill="currentColor" />
                </svg>
              </a>

              {/* TODO: map social */}
              <a
                href={info?.link_contact_facebook}
                aria-label="Facebook"
                className="opacity-90 hover:opacity-100 transition-opacity cursor-pointer"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-white"
                >
                  <path
                    d="M22 12.06C22 6.505 17.523 2 12 2S2 6.505 2 12.06C2 17.08 5.657 21.245 10.438 22V14.97H7.898V12.06H10.438V9.845C10.438 7.325 11.93 5.94 14.214 5.94C15.308 5.94 16.453 6.135 16.453 6.135V8.61H15.193C13.953 8.61 13.562 9.38 13.562 10.17V12.06H16.336L15.892 14.97H13.562V22C18.343 21.245 22 17.08 22 12.06Z"
                    fill="currentColor"
                  />
                </svg>
              </a>

              <a
                href={info?.link_contact_tiktok}
                aria-label="Facebook"
                className="opacity-90 hover:opacity-100 transition-opacity cursor-pointer"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_21583_3078)">
                    <path
                      d="M16.4608 4.00883C15.4105 3.30649 14.6531 2.18226 14.4164 0.872401C14.3655 0.58946 14.3372 0.297991 14.3372 0H10.9858L10.9804 13.7798C10.9242 15.3229 9.68611 16.5616 8.16884 16.5616C7.69698 16.5616 7.253 16.4407 6.86182 16.2295C5.96505 15.7454 5.3514 14.7811 5.3514 13.6715C5.3514 12.0777 6.61538 10.7808 8.16835 10.7808C8.45831 10.7808 8.73653 10.83 8.9996 10.9143V7.40412C8.72724 7.36599 8.45048 7.34241 8.16835 7.34241C4.76708 7.34241 2 10.1814 2 13.6715C2 15.8126 3.04248 17.7074 4.63359 18.8532C5.63549 19.5751 6.85449 20 8.16884 20C11.5701 20 14.3372 17.1611 14.3372 13.6715V6.68372C15.6515 7.65144 17.2622 8.22184 19 8.22184V4.7834C18.0641 4.7834 17.1923 4.49796 16.4608 4.00883Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_21583_3078">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </a>
              <a
                href={info?.link_contact_shoppe}
                aria-label="Facebook"
                className="opacity-90 hover:opacity-100 transition-opacity cursor-pointer z-50 relative"
              >
                <img
                  src="/image/icon/shopee.png"
                  alt=""
                  className="size-[20px]"
                />
              </a>
            </div>
          </div>
        </div>
        <div className="md:hidden pt-10"></div>
      </Container>
    </div>
  )
}

export default memo(Footer)
