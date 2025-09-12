'use client'

import { motion } from 'framer-motion'

interface SalyProps {
  children: React.ReactNode
  className?: string
}

const SalyAnimation: React.FC<SalyProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      <motion.div
        animate={{
          y: [0, -10, 0], // Trôi lên xuống
          rotate: [-5, 5, -5], // Lắc đều trái phải
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

export default SalyAnimation
