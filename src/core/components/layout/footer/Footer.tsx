import Link from 'next/link'

import { Logo } from '@/core/components/brand'
import { Container, Grid } from '@/core/components/common'
import { cn } from '@/core/utils'
import WaterMark from './WaterMark'

type FooterProps = {
  className?: string
}

const Footer = ({ className }: FooterProps) => {
  return (
    <div className={cn(`bg-[#3B82F6] text-white ${className}`)}>
      <div className="hidden md:block absolute bottom-0 translate-x-1/2">
        <WaterMark />
      </div>
      <Container className="py-10 md:py-20">
        <div className="flex flex-col gap-10">
          {/* Top content */}
          <Grid className="items-start gap-10 md:gap-6 lg:gap-10 md:grid-cols-12">
            {/* Left: Logo + contact */}
            <div className="md:col-span-7 lg:col-span-8">
              <div className="flex flex-col md:flex-row gap-6">
                <Logo className="w-14 h-14 text-white" />
                <div className="flex flex-col gap-2 text-sm md:text-[13px] lg:text-sm opacity-90">
                  <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-6">
                    <span className="">
                      1901 Thornridge Cir. Shiloh, Hawaii 81063
                    </span>
                    {/* <span className="hidden md:inline-block">•</span> */}
                    <span>+1 891 989-11-91</span>
                    {/* <span className="hidden md:inline-block">•</span> */}
                    <a
                      href="mailto:hello@logoipsum.com"
                      className="hover:opacity-100 opacity-90 underline-offset-4 hover:underline"
                    >
                      hello@logoipsum.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Sitemap + social */}
            <div className="md:col-span-5 lg:col-span-4 flex flex-col gap-6">
              <div className="flex items-baseline justify-between">
                <h4 className="text-xs tracking-[0.12em] uppercase opacity-80">
                  Sitemap
                </h4>
                <div className="hidden md:flex items-center gap-4">
                  <a
                    href="#"
                    aria-label="Instagram"
                    className="opacity-90 hover:opacity-100 transition-opacity"
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
                  <a
                    href="#"
                    aria-label="Facebook"
                    className="opacity-90 hover:opacity-100 transition-opacity"
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
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <nav className="flex flex-col gap-2">
                  <Link
                    href="#"
                    className="opacity-90 hover:opacity-100 transition-opacity"
                  >
                    Trang chủ
                  </Link>
                  <Link
                    href="#"
                    className="opacity-90 hover:opacity-100 transition-opacity"
                  >
                    Tham gia dùng thử
                  </Link>
                  <Link
                    href="#"
                    className="opacity-90 hover:opacity-100 transition-opacity"
                  >
                    Newsfeed
                  </Link>
                </nav>
                <nav className="flex flex-col gap-2">
                  <Link
                    href="#"
                    className="opacity-90 hover:opacity-100 transition-opacity"
                  >
                    Tin tức & Sự kiện
                  </Link>
                  <Link
                    href="#"
                    className="opacity-90 hover:opacity-100 transition-opacity"
                  >
                    Tài khoản
                  </Link>
                </nav>
              </div>

              {/* Social (mobile) */}
              <div className="md:hidden flex items-center gap-4 pt-2">
                <a
                  href="#"
                  aria-label="Instagram"
                  className="opacity-90 hover:opacity-100 transition-opacity"
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
                <a
                  href="#"
                  aria-label="Facebook"
                  className="opacity-90 hover:opacity-100 transition-opacity"
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
              </div>
            </div>
          </Grid>

          {/* Bottom: copyright */}
          <div className="flex items-center justify-between pt-2 text-xs text-gray-100 opacity-80">
            <p>© 2025 — Copyright Mask4U. All rights reserved.</p>
            <div className="hidden md:flex items-center gap-4" />
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Footer
