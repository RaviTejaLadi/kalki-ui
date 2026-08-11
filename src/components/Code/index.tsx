import { cn } from '@/utils';
import React, { forwardRef, ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

// #region codeVariants
const codeVariants = cva(
  'font-mono rounded-md whitespace-nowrap inline-block font-normal',
  {
    variants: {
      variant: {
        primary: 'text-blue-500 bg-blue-100',
        secondary: 'text-gray-500 bg-gray-200',
        success: 'text-green-500 bg-green-100',
        danger: 'text-red-500 bg-red-100',
        warning: 'text-yellow-500 bg-yellow-100',
        info: 'text-teal-500 bg-teal-100',
        help: 'text-purple-500 bg-purple-100',
        light: 'text-foreground bg-background',
        dark: 'text-gray-800 bg-gray-300',
      },
      size: {
        sm: 'text-xs py-1 px-2',
        md: 'text-sm py-2 px-3',
        lg: 'text-base py-3 px-4',
      },
      underline: {
        true: 'underline',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'sm',
    },
  }
);

// #endregion

// #region types
interface CodeProps extends VariantProps<typeof codeVariants> {
  /** Inline code content to display */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
  /** Whether to underline the code text @default false */
  underline?: boolean;
  /** Custom padding applied via inline style */
  padding?: string;
  /** Custom margin applied via inline style */
  margin?: string;
}

// #endregion

// #region Code
/**
 * An inline code snippet with variant styling for emphasis and status colors.
 *
 * @component
 * @example
 * ```tsx
 * <Code variant="primary" size="sm">npm install @kalki-ui/core</Code>
 * ```
 *
 * @param {CodeProps} props - The component props
 * @param {React.ReactNode} props.children - Inline code content to display
 * @param {'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'help' | 'light' | 'dark'} [props.variant='primary'] - Visual style variant
 * @param {'sm' | 'md' | 'lg'} [props.size='sm'] - Text and padding size
 * @param {boolean} [props.underline=false] - Whether to underline the code text
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.CSSProperties} [props.style] - Additional inline styles
 * @param {string} [props.padding] - Custom padding applied via inline style
 * @param {string} [props.margin] - Custom margin applied via inline style
 * @param {React.Ref<HTMLElement>} ref - Forwarded ref to the code element
 *
 * @returns {JSX.Element} A styled inline `<code>` element
 */
const Code = forwardRef<HTMLElement, CodeProps>(
  (
    {
      children,
      variant,
      size,
      underline = false,
      className,
      style,
      padding,
      margin,
      ...rest
    },
    ref
  ) => {
    const combinedStyles = {
      margin,
      padding,
      ...style,
    };

    return (
      <code
        style={combinedStyles}
        ref={ref}
        className={cn(codeVariants({ variant, size, underline }), className)}
        {...rest}
      >
        {children}
      </code>
    );
  }
);

Code.displayName = 'Code';
// #endregion

// #region exports
export default Code;
export { codeVariants };
// #endregion
