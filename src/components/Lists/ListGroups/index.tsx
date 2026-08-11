import React, { createContext, forwardRef, useContext } from 'react';
import { cn } from '@/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { ChevronRight } from 'lucide-react';

// #region listGroupVariants
const listGroupVariants = cva(
  'flex flex-col rounded-md shadow-sm overflow-hidden bg-white border',
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
  /** Visual style variant shared with list items */
  variant: VariantType;
  /** Whether items show a trailing chevron */
  showArrows?: boolean;
  /** Whether items render bottom dividers */
  showDividers?: boolean;
}

/**
 * Props for the ListGroups root container.
 */
interface ListGroupProps extends VariantProps<typeof listGroupVariants> {
  /** Explicit width applied to the list element */
  width?: string;
  /** Additional CSS classes */
  className?: string;
  /** Inline styles merged with width */
  style?: React.CSSProperties;
  /** Whether items show bottom borders @default true */
  showDividers?: boolean;
  /** Whether items show a trailing chevron @default false */
  showArrows?: boolean;
  /** List group items (`ListGroup.Item`) */
  children?: React.ReactNode;
}

/**
 * Props for an individual ListGroup item.
 */
interface ListGroupItemProps {
  /** Optional leading icon */
  icon?: React.ReactNode;
  /** Primary label text */
  label: string;
  /** Secondary description under the label */
  description?: string;
  /** Disables interaction and dims the item */
  disabled?: boolean;
  /** Click handler for the item */
  onClick?: () => void;
  /** Additional CSS classes */
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

/**
 * A bordered list container for interactive group items with shared variant styling.
 *
 * @component
 * @example
 * ```tsx
 * <ListGroups variant="primary" showArrows>
 *   <ListGroups.Item label="Profile" description="View settings" onClick={() => {}} />
 *   <ListGroups.Item label="Billing" disabled />
 * </ListGroups>
 * ```
 *
 * @param {ListGroupProps} props - The component props
 * @param {'sm'|'md'|'lg'|'xl'|'xxl'} [props.size='sm'] - Text size of the list
 * @param {VariantType} [props.variant='primary'] - Border and item color theme
 * @param {string} [props.width] - Explicit width of the list
 * @param {boolean} [props.showDividers=true] - Show dividers between items
 * @param {boolean} [props.showArrows=false] - Show trailing chevrons on items
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.CSSProperties} [props.style] - Additional inline styles
 * @param {React.ReactNode} [props.children] - ListGroup.Item children
 * @param {React.Ref<HTMLUListElement>} ref - Forwarded ref to the `ul` element
 *
 * @returns {JSX.Element} A styled unordered list with context for items
 */
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

/**
 * An interactive item within a ListGroups container.
 *
 * @component
 * @example
 * ```tsx
 * <ListGroups.Item
 *   icon={<UserIcon />}
 *   label="Account"
 *   description="Manage profile"
 *   onClick={() => {}}
 * />
 * ```
 *
 * @param {ListGroupItemProps} props - The component props
 * @param {React.ReactNode} [props.icon] - Optional leading icon
 * @param {string} props.label - Primary label text
 * @param {string} [props.description] - Secondary description text
 * @param {boolean} [props.disabled] - Disables the item when true
 * @param {() => void} [props.onClick] - Click / keyboard activation handler
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.Ref<HTMLLIElement>} ref - Forwarded ref to the `li` element
 *
 * @returns {JSX.Element} A keyboard-accessible list item button
 */
const ListGroupItem = forwardRef<HTMLLIElement, ListGroupItemProps>(
  (
    { icon, label, description, disabled, onClick, className, ...props },
    ref
  ) => {
    const { variant, showArrows, showDividers } = useListGroup();

    const handleKeyDown = (event: React.KeyboardEvent<HTMLLIElement>) => {
      if (disabled || !onClick) return;
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onClick();
      }
    };

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
        onKeyDown={handleKeyDown}
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
    ListGroupProps & React.RefAttributes<HTMLUListElement>
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
