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
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

interface SectionProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

// #endRegion

// #region components
const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ variant, children, className, style, ...rest }, ref) => {
    return (
      <div
        className={alertVariants({ variant, className })}
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
export default Object.assign(
  Alert as React.ForwardRefExoticComponent<
    AlertProps & React.RefAttributes<HTMLButtonElement>
  >,
  {
    Header: AlertHeader,
    Body: AlertBody,
    Footer: AlertFooter,
  }
);

export { AlertBody, AlertHeader, AlertFooter, alertVariants };
export type { AlertProps, SectionProps };
// #endRegion
