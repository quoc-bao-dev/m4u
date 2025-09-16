'use client'
import { Skeleton } from '@/components/ui/skeleton'
import SvgScrollDraw from '@/core/components/animated/SvgScrollDraw'
import { VectorCommision } from '@/icons'
import { useGetHomePage } from '@/services/home/queries'
import Image from 'next/image'

const CommisionSection = () => {
  const { isLoading, data: homePage } = useGetHomePage()
  const data = homePage?.section4

  return (
    <div className="relative py-12 px-3 xl:p-24 flex flex-col items-end gap-4 xl:gap-10">
      <div className="lg:px-3 w-full flex flex-col gap-1 items-center lg:items-end">
        {isLoading ? (
          <Skeleton className="w-3/5 h-12" />
        ) : (
          <div
            className="2xl:text-6xl xl:text-5xl text-2xl text-center font-bold text-greyscale-700"
            dangerouslySetInnerHTML={{ __html: data?.title }}
          />
        )}

        {isLoading ? (
          <Skeleton className="w-4/5 h-7" />
        ) : (
          <p className="2xl:text-2xl xl:text-xl text-base text-center text-greyscale-700">
            {data?.subtitle}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1  lg:grid-cols-3 xl:grid-cols-4 2xl:gap-8 gap-4 w-full px-3 xl:px-0">
        <div className="relative hidden xl:block">
          <div className="absolute 2xl:left-24 -left-10 2xl:-top-52 -top-60  max-w-none select-none pointer-events-none squiggle-les">
            <SvgScrollDraw
              className="squiggle-les"
              strokeColor="#FF8092"
              strokeWidth={1}
              start="top center"
              end="+=800"
              scrub
              triggerTarget=".squiggle-les"
              showMarker
              markerType="arrow"
              markerColor="#FF8092"
              markerSize={10}
            >
              <VectorCommision width={1306} height={836} />
            </SvgScrollDraw>
          </div>
        </div>
        {isLoading
          ? // Skeleton cho 3 cards
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="rounded-3xl border border-gray-100">
                <div className="rounded-t-3xl bg-gray-200 h-16 flex items-center justify-center">
                  <Skeleton className="w-32 h-6" />
                </div>
                <div className="relative overflow-hidden rounded-3xl bg-white -mt-7 w-full aspect-[425/290]">
                  <div className="p-6 flex flex-col gap-3">
                    <Skeleton className="w-24 h-8" />
                    <Skeleton className="w-1/2 h-4" />
                    <Skeleton className="w-1/2 h-4" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-[40%] aspect-[230/315]">
                    <Skeleton className="w-full h-full rounded-lg" />
                  </div>
                </div>
              </div>
            ))
          : data?.tab?.map((item: any, index: number) => {
              const gradientClasses = [
                'bg-gradient-to-r from-[#37CFFF] via-[#0D57C6] to-[#0F5ED6]',
                'bg-gradient-to-r from-[#B0FF4B] to-[#11876B]',
                'bg-gradient-to-r from-[#D9EDFF] via-[#5236FF]/70 to-[#5236FF]',
              ]

              const textColors = [
                'text-blue-600',
                'text-green-600',
                'text-indigo-600',
              ]

              const bgColors = [
                'from-blue-400',
                'from-green-600',
                'from-indigo-600',
              ]

              return (
                <div key={index} className="rounded-3xl border border-gray-100">
                  <h2
                    className={`rounded-t-3xl flex justify-center items-center gap-1 pt-3 pb-10 px-2 font-normal 2xl:text-2xl xl:text-lg text-base text-white ${gradientClasses[index]}`}
                  >
                    <Image
                      src={item.icon}
                      alt={item.title_header || ''}
                      width={100}
                      height={100}
                      className="size-6 xl:size-7"
                    />
                    {item.title_header}
                  </h2>
                  <div className="relative overflow-hidden rounded-3xl bg-white -mt-7 w-full aspect-[425/290]">
                    <div className="p-6 flex flex-col gap-1">
                      <p
                        className={`${textColors[index]} 2xl:text-4xl text-2xl font-medium capitalize`}
                      >
                        {item.title}
                      </p>
                      <p className="text-[#555555] 2xl:text-base xl:text-sm text-base font-medium pr-[20%]">
                        {item.subtitle}
                      </p>
                    </div>
                    <div
                      className={`${bgColors[index]} bottom-0 -right-10 size-40 absolute pointer-events-none rounded-full opacity-50 bg-radial via-transparent to-transparent`}
                    ></div>
                    <div
                      className={`${bgColors[index]} -bottom-20 right-10 size-40 absolute pointer-events-none rounded-full opacity-50 bg-radial via-transparent to-transparent`}
                    ></div>

                    <Image
                      src={item.img}
                      alt={item.title || ''}
                      width={500}
                      height={500}
                      className="w-[40%] aspect-[230/315] object-cover ml-auto absolute bottom-0 right-0"
                    />
                  </div>
                </div>
              )
            })}
      </div>
    </div>
  )
}

export default CommisionSection
