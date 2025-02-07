import React, { forwardRef } from 'react';
import { Loader } from 'lucide-react';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';

// #region buttonVariants
const buttonVariants = cva(
  'inline-flex justify-center items-center font-normal text-center whitespace-nowrap align-middle select-none transition-colors duration-150 ease-in-out focus:outline-none disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-primary hover:bg-primary/90 border-primary text-primary-foreground dark:bg-primary dark:hover:bg-primary/90 dark:text-primary-foreground focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-800',
        secondary:
          'bg-secondary hover:bg-secondary/90 text-white dark:bg-secondary/80 dark:hover:bg-secondary focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700',
        success:
          'bg-success hover:bg-green-600 text-white dark:bg-green-700 dark:hover:bg-green-800 focus:ring-2 focus:ring-green-300 dark:focus:ring-green-800',
        danger:
          'bg-danger hover:bg-red-600 text-white dark:bg-red-700 dark:hover:bg-red-800 focus:ring-2 focus:ring-red-300 dark:focus:ring-red-800',
        warning:
          'bg-warning hover:bg-yellow-600 text-white dark:bg-yellow-700 dark:hover:bg-yellow-800 focus:ring-2 focus:ring-yellow-300 dark:focus:ring-yellow-800',
        info: 'bg-info hover:bg-cyan-600 text-white dark:bg-cyan-700 dark:hover:bg-cyan-800 focus:ring-2 focus:ring-cyan-300 dark:focus:ring-cyan-800',
        help: 'bg-help hover:bg-purple-600 text-white dark:bg-purple-700 dark:hover:bg-purple-800 focus:ring-2 focus:ring-purple-300 dark:focus:ring-purple-800',
        light:
          'bg-light hover:bg-gray-200 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100 focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700',
        dark: 'bg-dark hover:bg-gray-900 text-dark-foreground dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-gray-600 dark:focus:ring-gray-700',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-gray-700 dark:text-gray-100',
        link: 'text-primary hover:underline dark:text-blue-400 underline-offset-4',
      },
      size: {
        xs: 'text-xs h-7 py-[0.5px] px-2',
        sm: 'text-sm h-8 py-1 px-2',
        md: 'text-base h-9 py-2 px-4',
        lg: 'text-lg h-10 py-2 px-4',
        xl: 'text-xl h-11 py-3 px-6',
        '2xl': 'text-2xl h-12 py-3 px-6',
        '3xl': 'text-3xl h-13 py-4 px-7',
      },
      raised: {
        true: 'shadow-md dark:shadow-gray-900',
        false: '',
      },
      rounded: {
        true: 'rounded-full',
        false: 'rounded',
      },
      block: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'sm',
      raised: false,
      rounded: false,
      block: false,
    },
  }
);
// #endregion

// #region types
interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  disabled?: boolean;
  onClick?: () => void;
  children?: ReactNode;
  loader?: ReactNode;
  isPending?: boolean;
  isPendingText?: string;
}

interface ButtonIconProps {
  children: ReactNode;
  className?: string;
}

interface ButtonTextProps {
  children: ReactNode;
  className?: string;
}

// #endregion

// #region Button
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      disabled = false,
      onClick = () => {},
      variant,
      size,
      raised,
      rounded,
      block,
      className = '',
      style = {},
      children,
      loader,
      isPending = false,
      isPendingText = 'Loading...',
      ...rest
    },
    ref
  ) => {
    const buttonClasses = buttonVariants({
      variant,
      size,
      raised,
      rounded,
      block,
      className,
    });

    return (
      <button
        className={buttonClasses}
        style={style}
        onClick={onClick}
        disabled={disabled || isPending}
        ref={ref}
        {...rest}
      >
        {isPending ? (
          <span className="flex gap-2 items-center justify-center">
            {loader || <Loader className="size-4 animate-spin" />}
            <span>{isPendingText}</span>
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

const ButtonText = forwardRef<HTMLSpanElement, ButtonTextProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <span
        ref={ref}
        className={cn('inline-flex items-center', className)}
        {...rest}
      >
        {children}
      </span>
    );
  }
);

ButtonText.displayName = 'ButtonText';

const ButtonIcon = forwardRef<HTMLSpanElement, ButtonIconProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <span
        ref={ref}
        className={cn('inline-flex items-center mx-1', className)}
        {...rest}
      >
        {children}
      </span>
    );
  }
);

ButtonIcon.displayName = 'ButtonIcon';

// #endregion

// #region exports
export default Object.assign(
  Button as React.ForwardRefExoticComponent<
    ButtonProps & React.RefAttributes<HTMLButtonElement>
  >,
  {
    Icon: ButtonIcon,
    Text: ButtonText,
  }
);

export { ButtonIcon, ButtonText, buttonVariants };
export type { ButtonProps, ButtonIconProps, ButtonTextProps };
// #endregion
