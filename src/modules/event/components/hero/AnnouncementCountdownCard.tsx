'use client'

import Countdown from './Countdown'

export default function AnnouncementCountdownCard({
  imageUrl = '',
  imageAlt = 'Megaphone',
  targetDate = '2025-10-01T00:00:00+07:00', // 01 October 2025 (Asia/Ho_Chi_Minh)
  dateLabel = '01 October 2025',
  headline = 'WINNERS WILL BE ANNOUNCED',
  buttonText = 'JOIN NOW',
  onJoin = () => {},
}) {
  return (
    <div className="w-[467px] mx-auto scale-[70%] md:scale-[60%] lg:scale-[70%] xl:scale-[100%] md:origin-bottom-right">
      {/* Megaphone image */}

      {/* Countdown */}
      <div className="relative w-fit mx-auto">
        <img
          src={imageUrl}
          alt={imageAlt}
          className="absolute -left-[55%] -top-[50%] size-[160px] object-contain drop-shadow-md pointer-events-none select-none"
        />
        <Countdown targetDate={targetDate} />
      </div>
      <div className="pt-10"></div>
      <div className="relative w-full flex justify-between mx-auto">
        <LeftFrame />
        <RightFrame />
        <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2">
          <p className="text-center text-[24px] font-medium text-gray-800">
            {dateLabel}
          </p>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-[50%]">
          <p className="text-center text-[24px] text-gray-800 truncate">
            {headline}
          </p>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 translate-y-1/2 bottom-0">
          <div className="relative group">
            <button className="bg-pink-600 text-white text-xl md:text-base font-semibold w-[345px] py-3 md:py-2 rounded-xl relative group-hover:bg-pink-600 transition-all duration-300">
              {buttonText}
            </button>
            <div className="-z-10 absolute w-full h-full bg-pink-600/20 rounded-xl top-0 -rotate-[5deg] group-hover:bg-pink-600/50 transition-all duration-300"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

const LeftFrame = () => {
  return (
    <svg
      viewBox="0 0 98 86"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-[100px]"
    >
      <path
        d="M35.0715 84.9869H0.806641V1.0993H97.1967"
        stroke="#FF8092"
        stroke-width="2.01653"
        stroke-miterlimit="10"
      />
    </svg>
  )
}

const RightFrame = () => {
  return (
    <svg
      viewBox="0 0 103 86"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-[100px]"
    >
      <path
        d="M74.7686 84.9869H101.992V1.3009L-0.447966 1.3009"
        stroke="#FF8092"
        stroke-width="2.01653"
        stroke-miterlimit="10"
      />
    </svg>
  )
}
