import { cn } from '@/core/utils'
import { PropsWithChildren } from 'react'

type ContainerProps = {
  className?: string
} & PropsWithChildren

const RevertContainer = ({ children, className }: ContainerProps) => {
  return (
    <div className={cn('-mx-6 md:-mx-8 lg:-mx-12 xl:-mx-20 ', className)}>
      {children}
    </div>
  )
}

export default RevertContainer
