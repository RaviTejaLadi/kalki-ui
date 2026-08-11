import { forwardRef, ReactNode, CSSProperties } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';

// #region separatorVariants
const separatorVariants = cva('relative', {
  variants: {
    orientation: {
      horizontal:
        'w-full border-t border-t-gray-200 dark:border-t-gray-200/10 flex items-center',
      vertical: 'h-full flex-col border-l inline-flex',
    },
    position: {
      center: 'justify-center',
      start: 'justify-start',
      end: 'justify-end',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
    position: 'center',
  },
});

// #endregion

// #region types
interface SeparatorProps extends VariantProps<typeof separatorVariants> {
  children?: ReactNode;
  className?: string;
  color?: string;
  margin?: string;
  thickness?: string;
  style?: CSSProperties;
}

// #endregion

// #region Separator
const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
  (
    {
      orientation = 'horizontal',
      position = 'center',
      thickness = '1px',
      color = 'border',
      className,
      children,
      margin,
      style,
      ...rest
    },
    ref
  ) => {
    const separatorStyle: CSSProperties = {
      ...(orientation === 'vertical'
        ? {
            borderLeftWidth: thickness,
            borderLeftColor: color,
            minHeight: '100%',
          }
        : {
            borderTopWidth: thickness,
            borderTopColor: color,
            width: '100%',
          }),
      margin,
      ...style,
    };

    const contentPositionClasses = cn({
      'absolute bg-white px-2': orientation === 'horizontal',
      'left-0': position === 'start',
      'left-1/2 transform -translate-x-1/2': position === 'center',
      'right-0': position === 'end',
    });

    return (
      <div
        ref={ref}
        className={cn(separatorVariants({ orientation, position }), className)}
        style={separatorStyle}
        {...rest}
      >
        {children && <span className={contentPositionClasses}>{children}</span>}
      </div>
    );
  }
);

Separator.displayName = 'Separator';
// #endregion

// #region exports
export default Separator;
export type { SeparatorProps };
export { separatorVariants };
