'use client'
import { motion, type Variants, easeOut } from 'framer-motion'
import { cn } from '@/core/utils/cn'

type RevealTextProps = {
  children: React.ReactNode
  className?: string
  stagger?: number
  duration?: number
  delay?: number
}

const RevealText = ({
  children,
  className,
  stagger = 0.12,
  duration = 0.8,
  delay = 0,
}: RevealTextProps) => {
  const containerVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger } },
  }

  const item: Variants = {
    hidden: { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
    show: {
      opacity: 1,
      clipPath: 'inset(0 0% 0 0)',
      transition: { duration, ease: easeOut, delay },
    },
  }

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
      className={cn('inline-block', className)}
    >
      <motion.span
        variants={item}
        style={{ display: 'inline-block', willChange: 'clip-path, opacity' }}
      >
        {children}
      </motion.span>
    </motion.span>
  )
}

export default RevealText
