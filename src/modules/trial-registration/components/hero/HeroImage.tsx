import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'

interface HeroImageProps {
  duration?: number
  delay?: number
  src?: string
  alt?: string
  width?: number
  height?: number
  className?: string
}

const HeroImage = ({
  duration = 4.5,
  delay = 0,
  src = '/image/trial/image-05.png?v=1',
  alt = 'Hero Image',
  width = 1000,
  height = 1000,
  className = 'w-full',
}: HeroImageProps) => {
  const shouldReduce = useReducedMotion()

  if (shouldReduce) {
    return (
      <div style={{ overflow: 'hidden' }}>
        <Image
          src={src}
          alt={alt}
          className={className}
          width={width}
          height={height}
          style={{ clipPath: 'circle(140% at 50% 50%)' }}
        />
      </div>
    )
  }

  return (
    <motion.div
      style={{ overflow: 'hidden' }}
      initial={{ clipPath: 'circle(0% at 50% 50%)' }}
      animate={{ clipPath: 'circle(140% at 50% 50%)' }}
      transition={{
        duration,
        ease: 'easeOut',
        delay,
      }}
    >
      <Image
        src={src}
        alt={alt}
        className={className}
        width={width}
        height={height}
      />
    </motion.div>
  )
}

export default HeroImage
