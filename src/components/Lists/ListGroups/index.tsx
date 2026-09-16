import React, { createContext, forwardRef, useContext } from 'react';
import { ChevronRight } from 'lucide-react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';

const listGroupVariants = cva(
  'flex flex-col overflow-hidden rounded-lg border border-border bg-background text-foreground shadow-sm',
  {
    variants: {
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl',
        xxl: 'text-2xl',
      },
    },
    defaultVariants: {
      size: 'sm',
    },
  }
);

interface ListGroupContextType {
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

const itemVariants = 'hover:bg-muted/60 active:bg-muted';
const textVariants = 'text-foreground';

const ListGroupContext = createContext<ListGroupContextType | null>(null);

const useListGroup = () => {
  const context = useContext(ListGroupContext);
  if (!context) {
    throw new Error('ListGroup.* components must be used within ListGroup');
  }
  return context;
};

/**
 * Styled list container for navigational or settings-style grouped items.
 */
const ListGroups = forwardRef<HTMLUListElement, ListGroupProps>(
  (
    {
      width,
      size,
      className,
      style,
      showDividers = true,
      showArrows = false,
      children,
      ...rest
    },
    ref
  ) => (
    <ListGroupContext.Provider value={{ showArrows, showDividers }}>
      <ul
        ref={ref}
        className={cn(listGroupVariants({ size }), className)}
        style={{ width, ...style }}
        {...rest}
      >
        {children}
      </ul>
    </ListGroupContext.Provider>
  )
);

/**
 * Interactive row item used inside ListGroups.
 */
const ListGroupItem = forwardRef<HTMLLIElement, ListGroupItemProps>(
  (
    { icon, label, description, disabled, onClick, className, ...props },
    ref
  ) => {
    const { showArrows, showDividers } = useListGroup();

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
          'group relative flex items-center gap-3 px-3 py-2 outline-none transition-colors duration-200',
          itemVariants,
          textVariants,
          disabled && 'pointer-events-none cursor-not-allowed opacity-50',
          showDividers && 'border-b border-border last:border-b-0',
          className
        )}
        onClick={!disabled ? onClick : undefined}
        onKeyDown={handleKeyDown}
        tabIndex={!disabled ? 0 : -1}
        role="button"
        aria-disabled={disabled}
        {...props}
      >
        {icon ? <span className="mr-1 h-5 w-5 shrink-0">{icon}</span> : null}
        <div className="min-w-0 grow">
          <div className="truncate font-medium">{label}</div>
          {description ? (
            <div className="line-clamp-1 text-xs text-muted-foreground">
              {description}
            </div>
          ) : null}
        </div>
        {showArrows && !disabled ? (
          <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
        ) : null}
      </li>
    );
  }
);

ListGroups.displayName = 'ListGroups';
ListGroupItem.displayName = 'ListGroupItem';

export {
  ListGroups,
  ListGroupItem,
  listGroupVariants,
  itemVariants,
  textVariants,
};
export type { ListGroupProps, ListGroupItemProps };
