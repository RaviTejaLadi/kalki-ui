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
/**
 * Props for the Div component.
 *
 * @extends {React.HTMLProps<HTMLDivElement>}
 *
 * @property {'solid' | 'dashed' | 'dotted' | 'none'} [borderStyle] - The style of the border.
 * @property {'gray' | 'blue' | 'green' | 'yellow' | 'purple' | 'none'} [backgroundColor] - The background color of the div.
 */
interface DivProps extends React.HTMLProps<HTMLDivElement> {
  borderStyle?: 'solid' | 'dashed' | 'dotted' | 'none';
  backgroundColor?: 'gray' | 'blue' | 'green' | 'yellow' | 'purple' | 'none';
}

// #endregion

// #region Div
/**
 * A functional component that renders a `div` element with customizable styles and class names.
 *
 * @component
 * @param {object} props - The properties object.
 * @param {React.ReactNode} props.children - The content to be rendered inside the `div`.
 * @param {string} [props.className] - Additional class names to apply to the `div`.
 * @param {React.CSSProperties} [props.style] - Inline styles to apply to the `div`.
 * @param {string} [props.borderStyle] - The border style to apply to the `div`.
 * @param {string} [props.backgroundColor] - The background color to apply to the `div`.
 * @param {React.Ref<HTMLDivElement>} ref - The ref to be forwarded to the `div` element.
 * @param {object} rest - Any additional props to be spread onto the `div` element.
 *
 * @returns {JSX.Element} The rendered `div` element.
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
export default Div;
export { divVariants, type DivProps };
// #endregion
