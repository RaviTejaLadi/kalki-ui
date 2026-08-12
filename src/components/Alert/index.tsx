import React, { forwardRef, CSSProperties, ReactNode } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';

// #region alertVariants
const alertVariants = cva('rounded-md p-4 w-full mb-4 border', {
  variants: {
    variant: {
      primary: 'bg-blue-100 text-blue-700 border-blue-200',
      secondary: 'bg-gray-100 text-gray-700 border-gray-200',
      success: 'bg-green-100 text-green-700 border-green-200',
      info: 'bg-teal-100 text-teal-700 border-teal-200',
      warning: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      danger: 'bg-red-100 text-red-700 border-red-200',
      help: 'bg-purple-100 text-purple-700 border-purple-200',
      light: 'bg-gray-50 text-gray-800 border-gray-100',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

// #endRegion

// #region types
interface AlertProps extends VariantProps<typeof alertVariants> {
  /** Alert content, typically Header/Body/Footer sections */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Inline styles */
  style?: CSSProperties;
}

interface SectionProps {
  /** Section content */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Inline styles */
  style?: CSSProperties;
}

// #endRegion

// #region components
/**
 * A contextual alert banner for displaying status or feedback messages.
 *
 * @component
 * @example
 * ```tsx
 * <Alert variant="success">
 *   <Alert.Header>Success</Alert.Header>
 *   <Alert.Body>Your changes have been saved.</Alert.Body>
 * </Alert>
 * ```
 *
 * @param {AlertProps} props - The component props
 * @param {React.ReactNode} props.children - Alert content
 * @param {'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'help' | 'light'} [props.variant='primary'] - Visual style variant
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.CSSProperties} [props.style] - Inline styles
 * @param {React.Ref<HTMLDivElement>} ref - Forwarded ref to the root element
 *
 * @returns {JSX.Element} A styled alert container
 */
const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ variant, children, className, style, ...rest }, ref) => {
    return (
      <div
        className={cn(alertVariants({ variant }), className)}
        ref={ref}
        style={style}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

Alert.displayName = 'Alert';

/**
 * The title section of an Alert.
 *
 * @component
 * @example
 * ```tsx
 * <Alert.Header>Warning</Alert.Header>
 * ```
 *
 * @param {SectionProps} props - The component props
 * @param {React.ReactNode} props.children - Header content
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.CSSProperties} [props.style] - Inline styles
 *
 * @returns {JSX.Element} A semibold alert header
 */
const AlertHeader: React.FC<SectionProps> = ({
  children,
  className,
  style,
  ...rest
}) => {
  return (
    <div
      className={cn('font-semibold text-sm', className)}
      style={style}
      {...rest}
    >
      {children}
    </div>
  );
};

/**
 * The main message body of an Alert.
 *
 * @component
 * @example
 * ```tsx
 * <Alert.Body>Please verify your email address.</Alert.Body>
 * ```
 *
 * @param {SectionProps} props - The component props
 * @param {React.ReactNode} props.children - Body content
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.CSSProperties} [props.style] - Inline styles
 *
 * @returns {JSX.Element} An alert body section
 */
const AlertBody: React.FC<SectionProps> = ({
  children,
  className,
  style,
  ...rest
}) => {
  return (
    <div className={cn('text-xs my-2', className)} style={style} {...rest}>
      {children}
    </div>
  );
};

/**
 * The footer section of an Alert for actions or secondary text.
 *
 * @component
 * @example
 * ```tsx
 * <Alert.Footer>Last updated 2 minutes ago</Alert.Footer>
 * ```
 *
 * @param {SectionProps} props - The component props
 * @param {React.ReactNode} props.children - Footer content
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.CSSProperties} [props.style] - Inline styles
 *
 * @returns {JSX.Element} An alert footer section
 */
const AlertFooter: React.FC<SectionProps> = ({
  children,
  className,
  style,
  ...rest
}) => {
  return (
    <div className={cn('text-xs', className)} style={style} {...rest}>
      {children}
    </div>
  );
};

// #endRegion

// #region exports

export { Alert, AlertBody, AlertHeader, AlertFooter, alertVariants };
export type { AlertProps, SectionProps };
// #endRegion
