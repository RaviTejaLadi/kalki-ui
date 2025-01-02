import { forwardRef } from 'react';
import { cn } from '@/utils';
import { cva, type VariantProps } from 'class-variance-authority';

// #region divVariants
const divVariants = cva('rounded-lg transition-all duration-300', {
  variants: {
    borderStyle: {
      solid: 'border border-solid',
      dashed: 'border border-dashed',
      dotted: 'border border-dotted',
      none: 'border-none',
    },
    backgroundColor: {
      gray: 'bg-gray-50',
      blue: 'bg-blue-50',
      green: 'bg-green-50',
      yellow: 'bg-yellow-50',
      purple: 'bg-purple-50',
      red: 'bg-red-50',
      none: 'bg-none',
    },
    size: {
      sm: 'p-2',
      md: 'p-4',
      lg: 'p-6',
      xl: 'p-8',
    },
    shadow: {
      none: 'shadow-none',
      sm: 'shadow-sm',
      md: 'shadow-md',
      lg: 'shadow-lg',
    },
    hover: {
      none: '',
      scale: 'hover:scale-105',
      lift: 'hover:-translate-y-1',
      glow: 'hover:shadow-lg hover:shadow-current/25',
    },
    rounded: {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      full: 'rounded-full',
    },
    textAlign: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
  },
  compoundVariants: [
    {
      borderStyle: 'solid',
      className: 'border-gray-300',
    },
    {
      borderStyle: 'dashed',
      className: 'border-blue-400',
    },
    {
      borderStyle: 'dotted',
      className: 'border-green-400',
    },
    {
      borderStyle: 'none',
      className: 'border-none',
    },
    {
      hover: 'scale',
      shadow: ['sm', 'md', 'lg'],
      className: 'hover:shadow-lg transition-all',
    },
  ],
  defaultVariants: {
    borderStyle: 'none',
    backgroundColor: 'none',
    size: 'md',
    shadow: 'none',
    hover: 'none',
    rounded: 'lg',
    textAlign: 'left',
  },
});
// #endregion

// #region types
interface DivProps
  extends Omit<React.HTMLProps<HTMLDivElement>, 'size'>,
    VariantProps<typeof divVariants> {
  loading?: boolean;
  animate?: boolean;
  onClick?: () => void;
  onHover?: () => void;
}
// #endregion

// #region Div
const Div = forwardRef<HTMLDivElement, DivProps>(
  (
    {
      children,
      className,
      style,
      borderStyle,
      backgroundColor,
      size,
      shadow,
      hover,
      rounded,
      textAlign,
      loading,
      animate,
      onClick,
      onHover,
      ...rest
    },
    ref
  ) => {
    const baseClassName = cn(
      divVariants({
        borderStyle,
        backgroundColor,
        size,
        shadow,
        hover,
        rounded,
        textAlign,
      }),
      {
        'animate-pulse': loading,
        'animate-fadeIn': animate,
      },
      className
    );

    return (
      <div
        ref={ref}
        className={baseClassName}
        style={style}
        onClick={onClick}
        onMouseEnter={onHover}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

Div.displayName = 'Div';
// #endregion

// #region types exports
export type { DivProps };
// #endregion

// #region exports
export default Div;
export { divVariants };
// #endregion
