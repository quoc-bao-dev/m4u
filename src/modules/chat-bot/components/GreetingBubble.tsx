import { useEffect, useState } from 'react'

type GreetingBubbleProps = {
  greeting: string
  loopTime?: number
  hidden?: boolean
}

const DEFAULT_LOOP_TIME = 6000

const GreetingBubble = ({
  greeting,
  loopTime = DEFAULT_LOOP_TIME,
  hidden,
}: GreetingBubbleProps) => {
  const [displayText, setDisplayText] = useState('')

  useEffect(() => {
    if (hidden) return

    let typingTimer: number | undefined
    let loopTimer: number | undefined

    const startTyping = () => {
      let currentIndex = 0
      setDisplayText('')
      typingTimer = window.setInterval(() => {
        setDisplayText(greeting.slice(0, currentIndex + 1))
        currentIndex += 1

        if (currentIndex === greeting.length) {
          if (typingTimer) {
            window.clearInterval(typingTimer)
          }
          loopTimer = window.setTimeout(() => {
            startTyping()
          }, loopTime)
        }
      }, 80)
    }

    startTyping()

    return () => {
      if (typingTimer) {
        window.clearInterval(typingTimer)
      }
      if (loopTimer) {
        window.clearTimeout(loopTimer)
      }
    }
  }, [greeting, loopTime, hidden])

  if (hidden) return null

  if (!displayText) return null

  return (
    <div className="absolute -top-3 right-[90%] md:right-[80%] ">
      <div className="px-3 py-1 rounded-t-[12px] rounded-l-[12px] bg-[#F466AA] text-white">
        <p className="text-sm leading-[24px] font-medium truncate">
          {displayText}
        </p>
      </div>
    </div>
  )
}

export default GreetingBubble
