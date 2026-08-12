import React, { forwardRef } from 'react';
import { cn } from '@/utils';
import { cva } from 'class-variance-authority';

// #region divVariants
const divVariants = cva(
  'rounded-lg transition-all duration-300 dark:border-gray-200/10',
  {
    variants: {
      borderStyle: {
        solid: 'border border-solid ',
        dashed: 'border border-dashed',
        dotted: ' border border-dotted',
        none: 'border-none',
      },
      backgroundColor: {
        gray: 'bg-gray-50',
        blue: 'bg-blue-50',
        green: 'bg-green-50',
        yellow: 'bg-yellow-50',
        purple: 'bg-purple-50',
        none: 'bg-none',
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
    ],
    defaultVariants: {
      borderStyle: 'none',
      backgroundColor: 'none',
    },
  }
);
// #endregion

// #region types
interface DivProps extends React.HTMLProps<HTMLDivElement> {
  /** Border style @default 'none' */
  borderStyle?: 'solid' | 'dashed' | 'dotted' | 'none';
  /** Background color @default 'none' */
  backgroundColor?: 'gray' | 'blue' | 'green' | 'yellow' | 'purple' | 'none';
}

// #endregion

// #region Div
/**
 * A styled div wrapper with optional border and background variants.
 *
 * @component
 * @example
 * ```tsx
 * <Div borderStyle="dashed" backgroundColor="blue" className="p-4">
 *   Content
 * </Div>
 * ```
 *
 * @param {DivProps} props - The component props
 * @param {React.ReactNode} [props.children] - The content to render inside the div
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.CSSProperties} [props.style] - Additional inline styles
 * @param {'solid' | 'dashed' | 'dotted' | 'none'} [props.borderStyle='none'] - The border style to apply
 * @param {'gray' | 'blue' | 'green' | 'yellow' | 'purple' | 'none'} [props.backgroundColor='none'] - The background color to apply
 * @param {React.Ref<HTMLDivElement>} ref - Forwarded ref to the div element
 *
 * @returns {JSX.Element} A styled div element
 */
const Div = forwardRef<HTMLDivElement, DivProps>(
  (
    { children, className, style, borderStyle, backgroundColor, ...rest },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          divVariants({
            borderStyle,
            backgroundColor,
          }),
          className
        )}
        style={style}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

Div.displayName = 'Div';

// #endregion

// #region exports
export { Div, divVariants, type DivProps };
// #endregion
