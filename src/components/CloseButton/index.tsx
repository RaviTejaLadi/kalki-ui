import { X } from 'lucide-react';
import React, { forwardRef } from 'react';
import { cn } from '@/utils';
import { cva } from 'class-variance-authority';

// #region buttonVariants
const buttonVariants = cva(
  'flex items-center justify-center rounded transition ease-in-out duration-150',
  {
    variants: {
      variant: {
        light: [
          'bg-white dark:bg-gray-800',
          'border-gray-100 dark:border-gray-700',
          'hover:bg-gray-100 dark:hover:bg-gray-700',
          'text-gray-900 dark:text-gray-100',
        ],
        dark: [
          'bg-gray-900 dark:bg-gray-950',
          'border-gray-700 dark:border-gray-800',
          'hover:bg-gray-800 dark:hover:bg-gray-900',
          'text-white',
        ],
      },
      size: {
        sm: 'w-6 h-6 p-1 rounded-md',
        md: 'w-8 h-8 p-2 rounded-md',
        lg: 'w-10 h-10 p-2 rounded-lg',
      },
    },
    defaultVariants: {
      variant: 'light',
      size: 'sm',
    },
  }
);

// #endregion

// #region types
interface CloseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style of the close button @default 'light' */
  variant?: 'light' | 'dark';
  /** Size of the button and icon @default 'sm' */
  size?: 'sm' | 'md' | 'lg';
  /** Click handler invoked when the button is pressed */
  onClick?: () => void;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
}

// #endregion

// #region CloseButton
/**
 * A compact button that renders an X icon for dismissing UI surfaces.
 *
 * @component
 * @example
 * ```tsx
 * <CloseButton variant="light" size="md" onClick={handleClose} />
 * ```
 *
 * @param {CloseButtonProps} props - The component props
 * @param {'light' | 'dark'} [props.variant='light'] - Visual style of the close button
 * @param {'sm' | 'md' | 'lg'} [props.size='sm'] - Size of the button and icon
 * @param {() => void} [props.onClick] - Click handler invoked when the button is pressed
 * @param {boolean} [props.disabled] - Whether the button is disabled
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.CSSProperties} [props.style] - Additional inline styles
 * @param {string} [props.aria-label='Close'] - Accessible label for the button
 * @param {React.Ref<HTMLButtonElement>} ref - Forwarded ref to the button element
 *
 * @returns {JSX.Element} A button containing a close (X) icon
 */
const CloseButton = forwardRef<HTMLButtonElement, CloseButtonProps>(
  (
    {
      variant = 'light',
      size = 'sm',
      onClick,
      disabled,
      className,
      style,
      'aria-label': ariaLabel = 'Close',
      ...rest
    },
    ref
  ) => {
    const iconSize = size === 'sm' ? 15 : size === 'md' ? 20 : 25;

    return (
      <button
        ref={ref}
        type="button"
        onClick={onClick}
        disabled={disabled}
        aria-label={ariaLabel}
        className={cn(buttonVariants({ variant, size }), className)}
        style={style}
        {...rest}
      >
        <X
          className="-m-0.5 text-foreground"
          width={iconSize}
          height={iconSize}
        />
      </button>
    );
  }
);

CloseButton.displayName = 'CloseButton';
// #endregion

// #region exports
export { CloseButton };
// #endregion
