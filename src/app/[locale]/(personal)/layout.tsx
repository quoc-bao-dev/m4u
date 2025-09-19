'use client'

import { Container } from '@/core/components'
import { IMAGES } from '@/core/constants/IMAGES'
import { PersonalSidebar } from '@/modules/personal'
import { PropsWithChildren } from 'react'

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="py-[96px] relative overflow-visible min-h-screen">
      <img
        src={IMAGES.topGradient2}
        alt="top-gradient"
        className="hidden lg:block absolute -z-30 top-0 w-full object-cover pointer-events-none -translate-y-1/2 scale-x-[-1.3] opacity-60"
      />
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 relative z-10">
          <aside className="hidden lg:block lg:col-span-4 xl:col-span-3">
            <div className="lg:h-[calc(100vh-162px)] lg:sticky lg:top-[96px]">
              <PersonalSidebar />
            </div>
          </aside>
          <section className="lg:col-span-8 xl:col-span-9">
            <div className="lg:p-5 lg:bg-white lg:rounded-2xl lg:shadow-[0px_4px_24px_0px_#0000000F] lg:min-h-[calc(100vh-162px)] relative overflow-hidden">
              {/* Main table content area - children */}
              <div className="relative z-10">{children}</div>
              <div className="hidden lg:block absolute -bottom-6 left-0 right-0 z-8 translate-y-3/4 scale-x-[-1.8] overflow-hidden">
                <img
                  src={IMAGES.topGradient2}
                  alt="bg-table"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </section>
        </div>
      </Container>
    </div>
  )
}

export default Layout
