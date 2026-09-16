import React, { CSSProperties, ReactNode, forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/utils';

const contentScrollableVariants = cva(
  'overflow-auto rounded-lg border border-border bg-background p-4 text-sm leading-relaxed text-foreground scroll-smooth'
);

interface ContentScrollableProps extends React.HTMLAttributes<HTMLDivElement> {
  height?: string;
  width?: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/**
 * Scrollable content container with theme-aware default surface styling.
 */
const ContentScrollable = forwardRef<HTMLDivElement, ContentScrollableProps>(
  ({ height, width, children, className, style, ...rest }, ref) => {
    const containerStyles: CSSProperties = {
      height,
      width,
      ...style,
    };

    return (
      <div
        ref={ref}
        className={cn(contentScrollableVariants(), className)}
        style={containerStyles}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

ContentScrollable.displayName = 'ContentScrollable';

export { ContentScrollable, contentScrollableVariants };
export type { ContentScrollableProps };
