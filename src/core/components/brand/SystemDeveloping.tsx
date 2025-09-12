'use client'

import { Link } from '@/locale'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import SalyAnimation from '../animated/SalyAnimation'
import Button from '../ui/button'
import VideoWrapper from '@/components/VideoWrapper'
// import { Button } from '@/components/ui/button'

type DevelopingProps = {
  classNameParent?: string
}

const SystemDeveloping = ({ classNameParent }: DevelopingProps) => {
  const router = useRouter()

  return (
    <>
      <div
        className={`px-6 h-screen flex flex-col space-y-8 items-center justify-center`}
      >
        <VideoWrapper
          src="/image/background.mp4"
          playbackRate={0.3}
          className="absolute inset-0 -z-10 w-full h-full object-cover pointer-events-none opacity-80"
        />
        <SalyAnimation className="aspect-square 3xl:w-[12%] 2xl:w-[28%] xl:w-[28%] lg:w-[25%] md:w-[40%] w-[65%]">
          <Image
            src="/image/system/robo-upcoming.svg"
            width={500}
            height={500}
            alt="error"
            className="size-full object-contain aspect-square"
          />
        </SalyAnimation>

        <div className="text-center flex flex-col justify-center items-center gap-9">
          <div className="space-y-2">
            <h1 className="3xl:text-[36px] 2xl:text-[32px] xxl:text-[30px] xl:text-[28px] md:text-[28px] text-[24px] 3xl:!leading-[56px] 2xl:!leading-[46px] xxl:!leading-[46px] xl:!leading-[42px] md:!leading-[38px] !leading-[34px] tracking-[-2%] font-bold text-pink-600">
              Coming Soon!
            </h1>
            <h5 className="3xl:!text-lg xl:!text-lg !text-lg !tracking-[1%] font-medium text-[#17181A]">
              This page is under development, please check back later!
            </h5>
          </div>

          <Link href={'/'}>
            <Button size="sm">Back to Home</Button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default SystemDeveloping
