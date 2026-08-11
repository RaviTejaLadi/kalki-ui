import React, { forwardRef } from 'react';
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
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof boxVariants> {
  /** Element width (CSS value) */
  width?: string;
  /** Element height (CSS value) */
  height?: string;
  /** Text color */
  color?: string;
  /** Background color */
  backgroundColor?: string;
  /** CSS margin */
  margin?: string;
  /** CSS padding */
  padding?: string;
}
// #endregion

// #region Box
/**
 * A primitive layout container with display, flex, shadow, and spacing utilities.
 *
 * @component
 * @example
 * ```tsx
 * <Box display="flex" gap={4} padding="1rem" rounded shadow="md">
 *   Content
 * </Box>
 * ```
 *
 * @param {BoxProps} props - The component props
 * @param {string} [props.width='auto'] - Element width (CSS value)
 * @param {string} [props.height='auto'] - Element height (CSS value)
 * @param {'none' | 'sm' | 'normal' | 'md' | 'lg' | 'xl' | '2xl' | 'inner'} [props.shadow='none'] - Box shadow intensity
 * @param {boolean} [props.rounded=false] - Whether to apply rounded corners
 * @param {boolean} [props.outlined=false] - Whether to show a border
 * @param {'block' | 'flex' | 'inline'} [props.display='block'] - CSS display mode
 * @param {'row' | 'column'} [props.flexDirection] - Flex direction when display is flex
 * @param {'wrap' | 'nowrap'} [props.flexWrap] - Flex wrap behavior
 * @param {'start' | 'center' | 'end' | 'between'} [props.justifyContent] - Main-axis alignment
 * @param {'start' | 'center' | 'end'} [props.alignItems] - Cross-axis alignment
 * @param {'start' | 'center' | 'end'} [props.alignContent] - Multi-line cross-axis alignment
 * @param {0 | 1 | 2 | 4 | 8 | 12} [props.gap=0] - Gap between flex children
 * @param {string} [props.margin='0'] - CSS margin
 * @param {string} [props.padding='0'] - CSS padding
 * @param {string} [props.color] - Text color
 * @param {string} [props.backgroundColor] - Background color
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.CSSProperties} [props.style] - Inline styles
 * @param {React.ReactNode} [props.children] - Box content
 * @param {React.Ref<HTMLDivElement>} ref - Forwarded ref to the root element
 *
 * @returns {JSX.Element} A styled layout container
 */
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
