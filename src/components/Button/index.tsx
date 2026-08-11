import React, { forwardRef } from 'react';
import { Loader } from 'lucide-react';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';

// #region buttonVariants
const buttonVariants = cva(
  'inline-flex justify-center items-center font-normal text-center whitespace-nowrap align-middle select-none transition-colors duration-150 ease-in-out focus:outline-none disabled:pointer-events-none disabled:opacity-50 transition-all duration-200 hover:scale-105',
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
        '3xl': 'text-3xl h-[3.25rem] py-4 px-7',
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
  extends
    ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Button label or compound Icon/Text children */
  children?: ReactNode;
  /** Custom loader shown while pending */
  loader?: ReactNode;
  /** Whether the button is in a loading/pending state */
  isPending?: boolean;
  /** Text shown beside the loader while pending */
  isPendingText?: string;
}

interface ButtonIconProps {
  /** Icon content */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
}

interface ButtonTextProps {
  /** Text content */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
}

// #endregion

// #region Button
/**
 * A clickable button with variants, sizes, and an optional pending state.
 *
 * @component
 * @example
 * ```tsx
 * <Button variant="primary" size="md" onClick={handleSave}>
 *   <Button.Icon>💾</Button.Icon>
 *   <Button.Text>Save</Button.Text>
 * </Button>
 * ```
 *
 * @param {ButtonProps} props - The component props
 * @param {boolean} [props.disabled=false] - Whether the button is disabled
 * @param {React.ReactNode} [props.children] - Button label or compound children
 * @param {'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'help' | 'light' | 'dark' | 'outline' | 'ghost' | 'link'} [props.variant='primary'] - Visual style variant
 * @param {'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'} [props.size='sm'] - Button size
 * @param {boolean} [props.raised=false] - Whether to apply a raised shadow
 * @param {boolean} [props.rounded=false] - Whether to use fully rounded corners
 * @param {boolean} [props.block=false] - Whether the button spans full width
 * @param {React.ReactNode} [props.loader] - Custom loader shown while pending
 * @param {boolean} [props.isPending=false] - Whether the button is in a loading state
 * @param {string} [props.isPendingText='Loading...'] - Text shown while pending
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {React.CSSProperties} [props.style] - Inline styles
 * @param {React.Ref<HTMLButtonElement>} ref - Forwarded ref to the button element
 *
 * @returns {JSX.Element} A styled button element
 */
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
    const buttonClasses = cn(
      buttonVariants({
        variant,
        size,
        raised,
        rounded,
        block,
      }),
      className
    );

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

/**
 * Text content wrapper for use inside a Button.
 *
 * @component
 * @example
 * ```tsx
 * <Button.Text>Continue</Button.Text>
 * ```
 *
 * @param {ButtonTextProps} props - The component props
 * @param {React.ReactNode} props.children - Text content
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.Ref<HTMLSpanElement>} ref - Forwarded ref to the text element
 *
 * @returns {JSX.Element} An inline text wrapper
 */
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

/**
 * Icon wrapper for use inside a Button.
 *
 * @component
 * @example
 * ```tsx
 * <Button.Icon><Plus /></Button.Icon>
 * ```
 *
 * @param {ButtonIconProps} props - The component props
 * @param {React.ReactNode} props.children - Icon content
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.Ref<HTMLSpanElement>} ref - Forwarded ref to the icon element
 *
 * @returns {JSX.Element} An inline icon wrapper
 */
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
