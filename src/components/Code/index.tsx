import { cn } from '@/utils';
import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { ReactNode } from 'react';

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
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  underline?: boolean;
  padding?: string;
  margin?: string;
}

// #endregion

// #region Code
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
