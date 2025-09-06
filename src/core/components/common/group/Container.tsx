import { cn } from '@/core/utils'
import { memo, PropsWithChildren } from 'react'

type ContainerProps = {
  className?: string
} & PropsWithChildren

const Container = ({ children, className }: ContainerProps) => {
  return (
    <div className={cn('px-6 md:px-8 lg:px-12 xl:px-20 mx-auto', className)}>
      {children}
    </div>
  )
}

export default memo(Container)
