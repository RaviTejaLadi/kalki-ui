import { cn } from '@/utils';
import React from 'react';

/**
 * A placeholder block that pulses while content is loading.
 *
 * @component
 * @example
 * ```tsx
 * <Skeleton className="w-20 h-4" />
 * ```
 *
 * @param {React.HTMLAttributes<HTMLDivElement>} props - The component props
 * @param {string} [props.className] - Additional CSS classes (typically width/height)
 *
 * @returns {JSX.Element} A pulsing rounded placeholder div
 */
const Skeleton = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-background/10', className)}
      {...props}
    />
  );
};

export { Skeleton };
