import { cn } from '@/utils';
import React from 'react';

/**
 * A component that displays a loading skeleton animation.
 *
 * @component
 * @param {Object} props - The component props
 * @param {string} [props.className] - Additional CSS class names to apply to the skeleton
 * @param {React.HTMLAttributes<HTMLDivElement>} props - Standard HTML div attributes
 *
 * @returns {JSX.Element} A div element with pulse animation and rounded corners
 *
 * @example
 * ```tsx
 * <Skeleton className="w-20 h-4" />
 * ```
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
