import { forwardRef } from 'react';
import { cn } from '@/utils';
import { cva, type VariantProps } from 'class-variance-authority';

// #region boxVariants
export const boxVariants = cva('block', {
  variants: {
    display: {
      block: 'block',
      flex: 'flex',
      inline: 'inline',
    },
    shadow: {
      none: 'shadow-none',
      sm: 'shadow-sm',
      normal: 'shadow',
      md: 'shadow-md',
      lg: 'shadow-lg',
      xl: 'shadow-xl',
      '2xl': 'shadow-2xl',
      inner: 'shadow-inner',
    },
    rounded: {
      true: 'rounded-lg',
      false: '',
    },
    outlined: {
      true: 'border border-gray-300',
      false: '',
    },
    flexDirection: {
      row: 'flex-row',
      column: 'flex-col',
    },
    flexWrap: {
      wrap: 'flex-wrap',
      nowrap: 'flex-nowrap',
    },
    justifyContent: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
    },
    alignItems: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
    },
    alignContent: {
      start: 'content-start',
      center: 'content-center',
      end: 'content-end',
    },

    gap: {
      0: 'gap-0',
      1: 'gap-1',
      2: 'gap-2',
      4: 'gap-4',
      8: 'gap-8',
      12: 'gap-12',
    },
  },
  defaultVariants: {
    display: 'block',
    shadow: 'none',
    rounded: false,
    outlined: false,
    gap: 0,
  },
});
// #endregion

// #region types
interface BoxProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof boxVariants> {
  width?: string;
  height?: string;
  color?: string;
  backgroundColor?: string;
  margin?: string;
  padding?: string;
}
// #endregion

// #region Box
const Box = forwardRef<HTMLDivElement, BoxProps>(
  (
    {
      width = 'auto',
      height = 'auto',
      shadow,
      rounded = false,
      children,
      outlined = false,
      className,
      margin = '0',
      padding = '0',
      color,
      backgroundColor,
      display = 'block',
      flexDirection,
      flexWrap,
      justifyContent,
      alignItems,
      alignContent,
      gap,
      style,
      ...rest
    },
    ref
  ) => {
    const classNames = boxVariants({
      display,
      shadow,
      rounded,
      outlined,
      flexDirection,
      flexWrap,
      justifyContent,
      alignItems,
      alignContent,
      gap,
    });

    const inlineStyles = {
      width,
      height,
      margin,
      padding,
      color,
      backgroundColor,
      ...style,
    };

    return (
      <div
        style={inlineStyles}
        ref={ref}
        className={cn(classNames, className)}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

Box.displayName = 'Box';
// #endregion

// #region exports
export default Box;
export type { BoxProps };
// #endregion
