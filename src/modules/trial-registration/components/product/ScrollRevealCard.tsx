'use client'

import { motion } from 'framer-motion'
import { useInView } from '@/core/hooks/useInView'

interface ScrollRevealCardProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  className?: string
}

const ScrollRevealCard: React.FC<ScrollRevealCardProps> = ({
  children,
  delay = 0,
  duration = 0.6,
  className = '',
}) => {
  const { ref, isInView } = useInView<HTMLDivElement>({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    triggerOnce: true,
  })

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y: 50,
        scale: 0.95,
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              scale: 1,
            }
          : {
              opacity: 0,
              y: 80,
              scale: 0.95,
            }
      }
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for smooth animation
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default ScrollRevealCard
