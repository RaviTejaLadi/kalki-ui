import React, { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/utils';

const divVariants = cva(
  'rounded-lg bg-background text-foreground transition-colors duration-200',
  {
    variants: {
      borderStyle: {
        solid: 'border border-solid border-border',
        dashed: 'border border-dashed border-border',
        dotted: 'border border-dotted border-border',
        none: 'border-0',
      },
    },
    defaultVariants: {
      borderStyle: 'none',
    },
  }
);

interface DivProps extends React.HTMLProps<HTMLDivElement> {
  borderStyle?: 'solid' | 'dashed' | 'dotted' | 'none';
}

/**
 * Lightweight wrapper div with optional border style presets.
 */
const Div = forwardRef<HTMLDivElement, DivProps>(
  ({ children, className, style, borderStyle, ...rest }, ref) => (
    <div
      ref={ref}
      className={cn(
        divVariants({
          borderStyle,
        }),
        className
      )}
      style={style}
      {...rest}
    >
      {children}
    </div>
  )
);

Div.displayName = 'Div';

export { Div, divVariants, type DivProps };
