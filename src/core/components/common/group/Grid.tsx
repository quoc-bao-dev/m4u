import { cn } from '@/core/utils';
import { PropsWithChildren } from 'react';

type GridProps = {
  className?: string;
} & PropsWithChildren;

const Grid = ({ children, className }: GridProps) => {
  return <div className={cn('grid', className)}>{children}</div>;
};

export default Grid;
