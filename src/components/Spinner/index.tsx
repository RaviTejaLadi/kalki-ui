import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';

// #region spinnerVariants
const spinnerVariants = cva('inline-block animate-spin', {
  variants: {
    variant: {
      primary: 'text-blue-600',
      secondary: 'text-gray-600',
      success: 'text-green-600',
      danger: 'text-red-600',
      warning: 'text-yellow-500',
      info: 'text-cyan-600',
      light: 'text-gray-200',
      dark: 'text-gray-800',
    },
    size: {
      sm: 'w-6 h-6',
      md: 'w-9 h-9',
      lg: 'w-12 h-12',
      xl: 'w-16 h-16',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'sm',
  },
});
// #endregion

// #region types
interface SpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {
  className?: string;
}
// #endregion

/**
 * A customizable spinner component for loading states.
 *
 * @component
 * @example
 * ```tsx
 * <Spinner variant="primary" size="md" />
 * ```
 *
 * @param {SpinnerProps} props - The props for the Spinner component
 * @param {SpinnerVariant} [props.variant] - The visual style variant of the spinner
 * @param {SpinnerSize} [props.size] - The size of the spinner
 * @param {string} [props.className] - Additional CSS classes to apply to the spinner
 * @param {React.Ref<HTMLDivElement>} ref - The ref to attach to the spinner element
 *
 * @returns {JSX.Element} A spinning loader component
 */
// #region Spinner
const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ variant, size, className = '', ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(spinnerVariants({ variant, size }), className)}
        {...rest}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
    );
  }
);

Spinner.displayName = 'Spinner';
// #endregion

// #region exports
export default Spinner;
export { spinnerVariants };
export type { SpinnerProps };
// #endregion
