import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'

const HeroImage = ({
  duration = 2.5,
  delay = 0,
  src = '/image/trial/image-01.png',
  alt = 'Hero Image',
  width = 300,
  height = 300,
  className = 'w-full',
}) => {
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
