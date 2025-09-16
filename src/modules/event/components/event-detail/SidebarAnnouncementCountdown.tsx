'use client'

import Countdown from '../hero/Countdown'

type Props = {
  time: string
  title: string
  onJoin?: () => void
  buttonText?: string
  variant?: 'pink' | 'green' | 'gray'
}

const formatDateLabel = (iso: string) => {
  try {
    const d = new Date(iso)
    const dd = String(d.getDate()).padStart(2, '0')
    const month = d.toLocaleString('en-US', { month: 'long' })
    const yyyy = d.getFullYear()
    return `${dd} ${month} ${yyyy}`
  } catch {
    return ''
  }
}

const SidebarAnnouncementCountdown = ({
  time,
  title,
  onJoin,
  buttonText = 'JOIN NOW',
  variant = 'pink',
}: Props) => {
  const dateLabel = formatDateLabel(time)

  return (
    <div className="relative w-full flex flex-col justify-between mx-auto">
      {variant !== 'gray' && (
        <>
          <div className="">
            <Countdown targetDate={time} />
          </div>
          <div className="pt-4">
            <p className="text-center text-[18px] md:text-[20px] font-medium text-gray-800">
              {dateLabel}
            </p>
          </div>
          <div className="pt-4">
            <p className="text-center text-[18px] md:text-[20px] text-gray-800 truncate">
              {title}
            </p>
          </div>
        </>
      )}

      <div className="relative z-5 pt-6">
        <div className="relative group max-w-[400px] mx-auto">
          <button
            onClick={onJoin}
            className={`text-white text-base font-semibold w-full py-3 rounded-xl relative transition-all duration-300 ${
              variant === 'green'
                ? 'bg-[#2DD4BF] group-hover:bg-[#2DD4BF]'
                : variant === 'gray'
                ? 'bg-greyscale-300 text-greyscale-700 cursor-not-allowed'
                : 'bg-pink-600 group-hover:bg-pink-600'
            }`}
            disabled={variant === 'gray'}
          >
            {buttonText}
          </button>
          <div
            className={`-z-10 absolute w-full h-full rounded-xl top-0 -rotate-[5deg] transition-all duration-300 ${
              variant === 'green'
                ? 'bg-[#2DD4BF]/40 group-hover:bg-[#2DD4BF]/60'
                : variant === 'gray'
                ? 'bg-greyscale-200'
                : 'bg-pink-600/20 group-hover:bg-pink-600/50'
            }`}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default SidebarAnnouncementCountdown
