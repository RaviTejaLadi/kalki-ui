import { X } from 'lucide-react';
import { forwardRef } from 'react';
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
interface CloseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

// #endregion

// #region CloseButton
const CloseButton = forwardRef<HTMLButtonElement, CloseButtonProps>(
  (
    {
      variant = 'light',
      size = 'sm',
      onClick,
      disabled,
      className,
      style,
      ...rest
    },
    ref
  ) => {
    const iconSize = size === 'sm' ? 15 : size === 'md' ? 20 : 25;

    return (
      <button
        ref={ref}
        onClick={onClick}
        disabled={disabled}
        className={cn(buttonVariants({ variant, size }), className)}
        style={style}
        {...rest}
      >
        <X
          className="m-[-2px] text-foreground"
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
export default CloseButton;
// #endregion
