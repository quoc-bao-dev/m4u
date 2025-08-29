import { cn } from '@/core/utils'
import { PropsWithChildren, ReactNode } from 'react'

type SectionProps = {
  background?: ReactNode
  className?: string
} & PropsWithChildren

const Section = ({ children, background, className }: SectionProps) => {
  return (
    <div className={cn('relative', className)}>
      {background && <div className="absolute inset-0">{background}</div>}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  )
}

export default Section
