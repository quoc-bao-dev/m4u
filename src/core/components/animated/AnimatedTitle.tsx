'use client'
import { motion, useInView, type Variants } from 'framer-motion'
import React from 'react'

interface Letter {
  id: number
  letter: string
}

interface AnimatedTitleProps {
  heroPerTitle: Letter[]
  className?: string
  delay?: number
  style?: React.CSSProperties
  duration?: number
}

export default function AnimatedTitle({
  heroPerTitle,
  className,
  delay = 0,
  style,
  duration,
}: AnimatedTitleProps) {
  const ref = React.useRef<HTMLSpanElement | null>(null)
  const inView = useInView(ref, { once: true, margin: '-20% 0px' })

  const computedStagger = React.useMemo(() => {
    const count = heroPerTitle?.length ?? 0
    if (!duration || duration <= 0 || count === 0) return 0.05
    const per = duration / count
    return Math.max(0.01, Math.min(per, 0.2))
  }, [duration, heroPerTitle?.length])

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: computedStagger, delayChildren: delay },
    },
  }

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        damping: 15,
        stiffness: 20,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: 'spring' as const,
        damping: 15,
        stiffness: 20,
      },
    },
  }

  return (
    <motion.span
      ref={ref}
      className={className}
      variants={container}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      style={{ ...style }}
    >
      {heroPerTitle.map((e) => (
        <motion.span key={e.id.toString()} variants={child}>
          {e.letter}
        </motion.span>
      ))}
    </motion.span>
  )
}
