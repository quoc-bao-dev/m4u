import { Fragment } from 'react'

const Timer = ({ time }: { time: string }) => {
  return (
    <>
      {time
        .split(':')
        .slice(0, 3)
        .map((segment, index, arr) => (
          <Fragment key={`${segment}-${index}`}>
            <div className="size-[36px] rounded-[12px] bg-[#FF3B30] shadow-[0px_4px_24px_0px_#0000001A] flex items-center justify-center">
              <span className="text-white font-bold leading-none">
                {segment.padStart(2, '0')}
              </span>
            </div>
            {index < arr.length - 1 && (
              <span className="text-[#FF3B30] text-2xl font-bold">:</span>
            )}
          </Fragment>
        ))}
    </>
  )
}

export default Timer
