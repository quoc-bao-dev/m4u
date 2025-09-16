'use client'
import { IMAGES } from '@/core/constants/IMAGES'
import { MoneySavingIcon, PackagePercentIcon, TagPercentIcon, WomanIcon } from '@/icons'
import { BankIcon, SuitcaseSimpleIcon, UserIcon, UsersFourIcon } from '@phosphor-icons/react'
import Image from 'next/image'
import React from 'react'

const Line = ({ className }: { className?: string }) => (
  <svg
    width="122"
    height="19"
    viewBox="0 0 122 19"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.559998 9.36499C0.559998 13.7833 4.14172 17.365 8.56 17.365C12.9783 17.365 16.56 13.7833 16.56 9.36499C16.56 4.94671 12.9783 1.36499 8.56 1.36499C4.14172 1.36499 0.559998 4.94671 0.559998 9.36499ZM121.56 9.36499L106.56 0.704736V18.0252L121.56 9.36499ZM8.56 9.36499V10.865H108.06V9.36499V7.86499H8.56V9.36499Z"
      fill="#D1D5DB"
    />
  </svg>
)

const LineHorizontal = ({ className, height }: { className?: string, height?: string }) => (
  <svg
    width="18"
    height={height || "122"}
    viewBox="0 0 18 122"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M9 121.73C13.4183 121.73 17 118.148 17 113.73C17 109.312 13.4183 105.73 9 105.73C4.58172 105.73 1 109.312 1 113.73C1 118.148 4.58172 121.73 9 121.73ZM9 0.72998L0.339747 15.73L17.6603 15.73L9 0.72998ZM9 113.73L10.5 113.73L10.5 14.23L9 14.23L7.5 14.23L7.5 113.73L9 113.73Z"
      fill="#D1D5DB"
    />
  </svg>
)

const ModalSection = () => {
  return (
    <div className="py-12 xl:p-24 2xl:px-40 w-full h-full flex flex-col items-center justify-center gap-5 xl:gap-10">
      <div className="px-3 xl:px-0 flex flex-col xl:flex-row items-center justify-center gap-4 xl:gap-10">
        <h2 className="text-center xl:text-left text-2xl xl:text-5xl 2xl:text-[64px] 2xl:leading-[100%] font-bold text-greyscale-400">
          <span className="text-gradient-blue-black whitespace-nowrap">
            Our Charity Fund Model:
          </span>{' '}
          <br />
          Beauty for a Purpose
        </h2>
        <p className="text-center xl:text-left text-base xl:text-2xl text-greyscale-700">
          A portion of our revenue and your community contributions are
          channeled directly into the M4U for Community Fund, dedicated to
          supporting single mothers in Vietnam.
        </p>
      </div>
      <div className="flex flex-col justify-center items-center gap-0 xl:gap-4 2xl:gap-6 w-full">
        <div className="xl:hidden flex justify-around items-center w-full">
          <div className="relative size-[120px] xl:size-[200px] 2xl:size-[250px] bg-indigo-500 rounded-full flex-shrink-0 flex flex-col gap-2 items-center justify-center p-3 xl:p-6 overflow-visible">
            <span className="absolute z-[-1] inset-0 m-8 rounded-full bg-indigo-500 opacity-20 animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite]" />
            <span className="absolute z-[-1] inset-0 m-11 rounded-full bg-indigo-500 opacity-60 animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite]" />
            <MoneySavingIcon className="size-9 xl:size-[72px]" />
            <p className="text-xs xl:text-lg 2xl:text-xl font-semibold text-white text-center">Funding Sources</p>
          </div>
          <div className="relative size-[120px] xl:size-[200px] 2xl:size-[250px] bg-orange-600 rounded-full flex-shrink-0 flex flex-col gap-2 items-center justify-center p-3 xl:p-6 overflow-visible">
            <span className="absolute z-[-1] inset-0 m-8 rounded-full bg-orange-600 opacity-20 animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite]" />
            <span className="absolute z-[-1] inset-0 m-11 rounded-full bg-orange-600 opacity-60 animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite]" />
            <WomanIcon className="size-9 xl:size-[72px]" />
            <p className="text-xs xl:text-lg 2xl:text-xl font-semibold text-white text-center">Funding Sources</p>
          </div>
        </div>
        <div className="flex justify-evenly items-center w-full xl:hidden">
          <LineHorizontal height="64" className="rotate-[145deg] xl:hidden" />
          <LineHorizontal height="64" className="rotate-[215deg] xl:hidden" />
        </div>
        <div className="flex justify-center items-center gap-4 2xl:gap-8 w-full">
          <div className="hidden relative size-[120px] xl:size-[200px] 2xl:size-[250px] bg-indigo-500 rounded-full flex-shrink-0 xl:flex flex-col gap-2 items-center justify-center p-3 xl:p-6 overflow-visible">
            <span className="absolute z-[-1] inset-0 m-8 rounded-full bg-indigo-500 opacity-20 animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite]" />
            <span className="absolute z-[-1] inset-0 m-11 rounded-full bg-indigo-500 opacity-60 animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite]" />
            <MoneySavingIcon className="size-9 xl:size-[72px]" />
            <p className="text-xs xl:text-lg 2xl:text-xl font-semibold text-white text-center">Funding Sources</p>
          </div>

          <Line className="flex-shrink-0 hidden xl:block" />
          <div className="relative lg:w-1/3 w-2/3">
            <svg
              viewBox="0 0 483 481"
              className="w-full h-auto"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_44_469)">
                <path
                  d="M76.52 417.44C69.93 410.04 63.46 403.21 57.48 395.99C32.26 365.58 14.29 331.53 5.77998 292.73C-5.48002 241.33 -0.310019 191.49 21.56 143.83C43.08 96.9301 74.77 58.4301 120.27 32.6201C160.34 9.89012 201.55 17.7001 231.12 53.1401C237.74 61.0801 237.71 61.0601 232.62 69.9201C181.82 158.2 130.67 246.28 80.47 334.9C66.87 358.91 67.11 385.17 75.88 411.24C76.35 412.64 76.86 414.04 77.28 415.46C77.36 415.69 77.08 416.04 76.52 417.44Z"
                  fill="#FE6BBA"
                >
                  <animate
                    id="anim1"
                    attributeName="fill"
                    values="#FE6BBA; #FCE4EC; #F8BBD9; #FE6BBA"
                    dur="6s"
                    begin="0s"
                    repeatCount="indefinite"
                  />
                </path>
                <path
                  d="M184.29 6.75012C209.65 1.64012 235.27 -1.43996 261.12 0.670044C313.4 4.95006 359.81 23.9004 399.21 58.7404C439.71 94.5503 465.06 139.6 477.46 191.93C482.46 213.05 484.66 234.7 481.21 256.28C475.75 290.43 455.5 312.29 422.73 322.61C416.43 324.59 409.78 325.43 403.31 326.88C399.83 327.66 397.99 326.259 396.23 323.19C376.77 289.34 357.15 255.58 337.57 221.81C305.4 166.32 273.59 110.62 240.9 55.4503C227.17 32.2703 205.45 19.1303 179.35 13.1603C176.7 12.5503 174.01 12.1102 171.33 11.5802C171.29 11.1402 171.25 10.6796 171.2 10.2296C175.56 9.05963 179.87 7.6401 184.29 6.75012Z"
                  fill="#F8BBD9"
                >
                  <animate
                    id="anim2"
                    attributeName="fill"
                    values="#F8BBD9; #FE6BBA; #FCE4EC; #F8BBD9"
                    dur="6s"
                    begin="0s"
                    repeatCount="indefinite"
                  />
                </path>
                <path
                  d="M474.85 295.69C475.22 295.88 475.62 296.06 476.01 296.24C473.35 304.33 470.9 312.49 468.01 320.49C455.03 356.36 435.809 388.33 408.03 414.77C373.9 447.249 333.79 468.05 287.3 476.63C268.2 480.16 249.02 481.39 229.72 480.4C188.55 478.31 149.56 468.46 114.84 445.42C94.5201 431.93 81.3203 413.12 78.2903 388.5C76.1203 370.86 79.4902 353.78 86.4202 337.38C87.8002 334.12 90.2305 334.26 92.9504 334.26C120.76 334.26 148.57 334.22 176.38 334.2C226.67 334.15 276.96 334.13 327.25 334.06C350.89 334.03 374.54 334.13 398.18 333.79C428.01 333.37 452.45 321.22 471.95 298.82C472.88 297.75 473.88 296.73 474.85 295.69Z"
                  fill="#FCE4EC"
                >
                  <animate
                    id="anim3"
                    attributeName="fill"
                    values="#FCE4EC; #F8BBD9; #FE6BBA; #FCE4EC"
                    dur="6s"
                    begin="0s"
                    repeatCount="indefinite"
                  />
                </path>
              </g>
              <defs>
                <clipPath id="clip0_44_469">
                  <rect width="482.88" height="480.73" fill="white" />
                </clipPath>
              </defs>
            </svg>

            <div className='absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center gap-2 xl:gap-4'>
              <Image src={IMAGES.logo} alt='logo' width={200} height={200} className='size-10 xl:size-20' />
              <p className='text-greyscale-900 text-[10px] xl:text-xl font-semibold text-center'>Charity<br className='xl:hidden' /> Fund</p>
            </div>

            <div className="absolute top-[18%] left-[10%] w-[20%] text-white flex flex-col items-center justify-center gap-0.5 xl:gap-1">
              <TagPercentIcon className="size-6 xl:size-10 2xl:size-12" />
              <div className="text-center text-[9px] xl:text-xs">
                % discount on each
                <br />
                product sold
              </div>
            </div>

            <div className="absolute top-[20%] right-[9%] w-[20%] text-white flex flex-col items-center justify-center gap-0.5 xl:gap-1">
              <PackagePercentIcon className="size-6 xl:size-10 2xl:size-12" />
              <div className="text-center text-[9px] xl:text-xs">
                % commission from Referrer/ Reviewer/Seller
              </div>
            </div>

            <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2 text-white flex flex-col items-center justify-center gap-0.5 xl:gap-1">
              <div className="text-center text-[9px] xl:text-xs">
                <div className="flex items-center justify-center gap-1">
                  <UsersFourIcon className="size-6 xl:size-10 2xl:size-12" />
                </div>
                Direct donations
                <br />
                from the community
              </div>
            </div>
          </div>
          <Line className="flex-shrink-0 hidden xl:block" />
          <div className="hidden relative size-[120px] xl:size-[200px] 2xl:size-[250px] bg-orange-600 rounded-full flex-shrink-0 xl:flex flex-col gap-2 items-center justify-center p-3 xl:p-6 overflow-visible">
            <span className="absolute z-[-1] inset-0 m-8 rounded-full bg-orange-600 opacity-20 animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite]" />
            <span className="absolute z-[-1] inset-0 m-11 rounded-full bg-orange-600 opacity-60 animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite]" />
            <WomanIcon className="size-9 xl:size-[72px]" />
            <p className="text-xs xl:text-lg 2xl:text-xl font-semibold text-white text-center">Funding Sources</p>
          </div>
        </div>
        <LineHorizontal className="h-8 lg:h-16 xl:h-auto flex-shrink-0 my-4 xl:my-0" />
        <div className="w-full md:w-fit px-4 xl:px-0">
          <div className="flex items-center justify-evenly w-full p-3 xl:p-4 2xl:p-6 gap-6 rounded-4xl 2xl:rounded-[48px] border-2 border-greyscale-300">
            <div className="w-24 lg:w-32 flex flex-col gap-1 items-center justify-center">
              <BankIcon className="size-8 2xl:size-12 text-pink-600" />
              <p className="text-xs xl:text-sm 2xl:text-base text-greyscale-800">
                Government
              </p>
            </div>
            <div className="w-24 lg:w-32 flex flex-col gap-1 items-center justify-center">
              <SuitcaseSimpleIcon className="size-8 2xl:size-12 text-pink-600" />
              <p className="text-xs xl:text-sm 2xl:text-base text-greyscale-800">
                Organizations
              </p>
            </div>
            <div className="w-24 lg:w-32 flex flex-col gap-1 items-center justify-center">
              <UserIcon className="size-8 2xl:size-12 text-pink-600" />
              <p className="text-xs xl:text-sm 2xl:text-base text-greyscale-800">
                Individuals
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ModalSection
