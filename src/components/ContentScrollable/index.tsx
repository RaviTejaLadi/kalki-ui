import { forwardRef, CSSProperties, ReactNode } from 'react';
import type React from 'react';
import { cn } from '@/utils';
import { cva } from 'class-variance-authority';

// #region contentScrollableVariants
const contentScrollableVariants = cva(
  'overflow-auto scroll-smooth p-4 m-2 rounded',
  {
    variants: {
      variant: {
        primary: 'bg-blue-100 text-gray-800 border border-blue-200',
        secondary: 'bg-gray-100 text-gray-800 border border-gray-200',
        success: 'bg-green-100 text-green-800 border border-green-200',
        danger: 'bg-red-100 text-red-800 border border-red-200',
        warning: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
        help: 'bg-purple-100 text-purple-800 border border-purple-200',
        info: 'bg-blue-100 text-blue-800 border border-blue-200',
        dark: 'bg-gray-800 text-white border border-gray-800',
        light: 'bg-white text-foreground border border-gray-100',
      },
    },
    defaultVariants: {
      variant: 'light',
    },
  }
);

// #endregion

// #region types
interface ContentScrollableProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Explicit height of the scrollable container */
  height?: string;
  /** Explicit width of the scrollable container */
  width?: string;
  /** Content rendered inside the scrollable area */
  children: ReactNode;
  /** Visual style variant @default 'light' */
  variant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'help'
    | 'info'
    | 'dark'
    | 'light';
  /** Additional CSS classes */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}

// #endregion

// #region ContentScrollable
/**
 * A styled container that scrolls overflowing content smoothly.
 *
 * @component
 * @example
 * ```tsx
 * <ContentScrollable height="240px" variant="light">
 *   <p>Long content that scrolls within a fixed height.</p>
 * </ContentScrollable>
 * ```
 *
 * @param {ContentScrollableProps} props - The component props
 * @param {string} [props.height] - Explicit height of the scrollable container
 * @param {string} [props.width] - Explicit width of the scrollable container
 * @param {React.ReactNode} props.children - Content rendered inside the scrollable area
 * @param {'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'help' | 'info' | 'dark' | 'light'} [props.variant='light'] - Visual style variant
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.CSSProperties} [props.style] - Additional inline styles
 * @param {React.Ref<HTMLDivElement>} ref - Forwarded ref to the scrollable container
 *
 * @returns {JSX.Element} A scrollable div with optional dimensions and variant styling
 */
const ContentScrollable = forwardRef<HTMLDivElement, ContentScrollableProps>(
  ({ height, width, children, variant, className, style, ...rest }, ref) => {
    const containerStyles: CSSProperties = {
      height: height,
      width: width,
      ...style,
    };

    const contentScrollableClasses = cn(
      contentScrollableVariants({ variant }),
      className
    );

    return (
      <div
        ref={ref}
        className={contentScrollableClasses}
        style={containerStyles}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

ContentScrollable.displayName = 'ContentScrollable';

// #endregion

// #region exports
export { ContentScrollable, contentScrollableVariants };
export type { ContentScrollableProps };
// #endregion
