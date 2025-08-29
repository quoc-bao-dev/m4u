import { cn } from '@/core/utils';
import { PropsWithChildren } from 'react';

type ContainerProps = {
  className?: string;
} & PropsWithChildren;

const Container = ({ children, className }: ContainerProps) => {
  return <div className={cn('container mx-auto', className)}>{children}</div>;
};

export default Container;
