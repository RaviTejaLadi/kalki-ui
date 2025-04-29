import React, { createContext, forwardRef, useContext } from 'react';
import { cn } from '@/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { ChevronRight } from 'lucide-react';

// #region listGroupVariants
const listGroupVariants = cva(
  'flex flex-col rounded-md shadow-xs overflow-hidden bg-white border',
  {
    variants: {
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl',
        xxl: 'text-2xl',
      },
      variant: {
        primary: 'border-blue-200',
        secondary: 'border-gray-200',
        success: 'border-green-200',
        danger: 'border-red-200',
        warning: 'border-yellow-200',
        info: 'border-cyan-200',
        light: 'border-gray-100',
        dark: 'border-gray-700 bg-gray-800',
      },
    },
    defaultVariants: {
      size: 'sm',
      variant: 'primary',
    },
  }
);

// #endregion

// #region types
type VariantType =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark';

interface ListGroupContextType {
  variant: VariantType;
  showArrows?: boolean;
  showDividers?: boolean;
}

interface ListGroupProps extends VariantProps<typeof listGroupVariants> {
  width?: string;
  className?: string;
  style?: React.CSSProperties;
  showDividers?: boolean;
  showArrows?: boolean;
  children?: React.ReactNode;
}

interface ListGroupItemProps {
  icon?: React.ReactNode;
  label: string;
  description?: string;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

// #endregion

// #region constants
const itemVariants: Record<VariantType, string> = {
  primary: 'hover:bg-blue-50 focus:bg-blue-100 active:bg-blue-200',
  secondary: 'hover:bg-gray-50 focus:bg-gray-100 active:bg-gray-200',
  success: 'hover:bg-green-50 focus:bg-green-100 active:bg-green-200',
  danger: 'hover:bg-red-50 focus:bg-red-100 active:bg-red-200',
  warning: 'hover:bg-yellow-50 focus:bg-yellow-100 active:bg-yellow-200',
  info: 'hover:bg-cyan-50 focus:bg-cyan-100 active:bg-cyan-200',
  light: 'hover:bg-gray-50 focus:bg-gray-100 active:bg-gray-200',
  dark: 'hover:bg-gray-700 focus:bg-gray-600 active:bg-gray-500',
};

const textVariants: Record<VariantType, string> = {
  primary: 'text-blue-800',
  secondary: 'text-gray-800',
  success: 'text-green-800',
  danger: 'text-red-800',
  warning: 'text-yellow-800',
  info: 'text-teal-800',
  light: 'text-gray-800',
  dark: 'text-white',
};
// #endregion

// #region ListGroupContext
const ListGroupContext = createContext<ListGroupContextType | null>(null);
const useListGroup = () => {
  const context = useContext(ListGroupContext);
  if (!context) {
    throw new Error('ListGroup.* components must be used within ListGroup');
  }
  return context;
};

// #endregion

// #region ListGroups
const ListGroups = forwardRef<HTMLUListElement, ListGroupProps>(
  (
    {
      width,
      size,
      variant = 'primary',
      className,
      style,
      showDividers = true,
      showArrows = false,
      children,
      ...rest
    },
    ref
  ) => {
    const currentVariant = (variant || 'primary') as VariantType;
    return (
      <ListGroupContext.Provider
        value={{ variant: currentVariant, showArrows, showDividers }}
      >
        <ul
          ref={ref}
          className={cn(listGroupVariants({ size, variant }), className)}
          style={{ width, ...style }}
          {...rest}
        >
          {children}
        </ul>
      </ListGroupContext.Provider>
    );
  }
);

const ListGroupItem = forwardRef<HTMLLIElement, ListGroupItemProps>(
  (
    { icon, label, description, disabled, onClick, className, ...props },
    ref
  ) => {
    const { variant, showArrows, showDividers } = useListGroup();

    return (
      <li
        ref={ref}
        className={cn(
          'relative flex items-center gap-3 px-3 py-2 transition-all duration-200',
          'outline-none',
          itemVariants[variant],
          textVariants[variant],
          disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
          showDividers && 'border-b',
          variant === 'dark' ? 'border-gray-700' : 'border-gray-200',
          className
        )}
        onClick={!disabled ? onClick : undefined}
        tabIndex={!disabled ? 0 : -1}
        role="button"
        {...props}
      >
        {icon && <span className="flex-shrink-0 mr-2 w-5 h-5">{icon}</span>}
        <div className="flex-grow min-w-0">
          <div className="font-medium truncate">{label}</div>
          {description && (
            <div
              className={cn(
                'text-xs opacity-75 line-clamp-1',
                variant === 'dark' ? 'text-gray-300' : 'text-gray-600'
              )}
            >
              {description}
            </div>
          )}
        </div>
        {showArrows && !disabled && (
          <ChevronRight
            className={cn(
              'w-4 h-4 flex-shrink-0 transition-transform duration-200',
              'group-hover:translate-x-1'
            )}
          />
        )}
      </li>
    );
  }
);

ListGroupItem.displayName = 'ListGroupItem';
// #endregion

// #region exports
export default Object.assign(
  ListGroups as React.ForwardRefExoticComponent<
    ListGroupProps & React.RefAttributes<HTMLOListElement>
  >,
  {
    Item: ListGroupItem,
  }
);

ListGroups.displayName = 'ListGroups';

export { ListGroupItem };
export type { ListGroupProps, ListGroupItemProps, VariantType };
export { listGroupVariants, itemVariants, textVariants };
// #endregion
