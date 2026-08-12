import React, { forwardRef } from 'react';
import { ChevronRight, ArrowRight, Dot, Slash, Circle } from 'lucide-react';
import { cn } from '@/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { CSSProperties, ReactNode } from 'react';
import { Box, type BoxProps } from '../Box';
import { Link } from '../Link';

// #region breadcrumbVariants
const breadcrumbVariants = cva(
  'inline-flex items-center font-semibold  transition-colors duration-200',
  {
    variants: {
      size: {
        xs: 'text-xs',
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl',
        '2xl': 'text-2xl',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

// #endregion

// #region types
type SeparatorType = 'chevron' | 'arrow' | 'dot' | 'slash' | 'circle';

interface BreadcrumbProps
  extends VariantProps<typeof breadcrumbVariants>, BoxProps {
  /** Breadcrumb item children */
  children: ReactNode;
  /** Separator icon type or custom node between items */
  separator?: ReactNode | SeparatorType;
  /** Additional CSS classes */
  className?: string;
  /** Inline styles */
  style?: CSSProperties;
}

interface BreadcrumbItemProps {
  /** Destination path when the item is a link */
  to?: string;
  /** Whether this item represents the current page */
  active?: boolean;
  /** Item label content */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Inline styles */
  style?: CSSProperties;
}

// #endregion

// #region constants
const SEPARATOR_ICONS = {
  chevron: <ChevronRight className="size-4 mx-2 text-muted-foreground" />,
  arrow: <ArrowRight className="size-4 mx-2 text-muted-foreground" />,
  dot: <Dot className="size-4 mx-2 text-muted-foreground" />,
  slash: <Slash className="size-4 mx-2 text-muted-foreground" />,
  circle: <Circle className="size-2 mx-2 text-muted-foreground" />,
};
// #endregion

// #region Breadcrumb
/**
 * A navigation trail showing the user's location within a hierarchy.
 *
 * @component
 * @example
 * ```tsx
 * <Breadcrumb separator="chevron" size="md">
 *   <Breadcrumb.Item to="/">Home</Breadcrumb.Item>
 *   <Breadcrumb.Item to="/docs">Docs</Breadcrumb.Item>
 *   <Breadcrumb.Item active>API</Breadcrumb.Item>
 * </Breadcrumb>
 * ```
 *
 * @param {BreadcrumbProps} props - The component props
 * @param {React.ReactNode} props.children - Breadcrumb item children
 * @param {React.ReactNode | SeparatorType} [props.separator='chevron'] - Separator between items
 * @param {'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'} [props.size='md'] - Text size
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.CSSProperties} [props.style] - Inline styles
 * @param {React.Ref<HTMLDivElement>} ref - Forwarded ref to the root element
 *
 * @returns {JSX.Element} A breadcrumb navigation list
 */
const Breadcrumb = forwardRef<HTMLDivElement, BreadcrumbProps>(
  (
    { children, separator = 'chevron', size, className, style, ...rest },
    ref
  ) => {
    const getSeparator = () => {
      if (typeof separator === 'string' && separator in SEPARATOR_ICONS) {
        return SEPARATOR_ICONS[separator as SeparatorType];
      }
      return separator;
    };

    return (
      <Box
        aria-label="breadcrumb"
        className={cn('flex items-center', className)}
        style={style}
        ref={ref}
        {...rest}
      >
        <ol className="flex items-center">
          {React.Children.map(children, (child, index) => {
            if (!React.isValidElement<{ className?: string }>(child))
              return child;

            return (
              <li key={index} className="flex items-center">
                {index > 0 && getSeparator()}
                {React.cloneElement(child, {
                  className: cn(
                    'text-sm font-medium',
                    size === 'sm' && 'text-xs',
                    size === 'lg' && 'text-base',
                    child.props.className || ''
                  ),
                })}
              </li>
            );
          })}
        </ol>
      </Box>
    );
  }
);

Breadcrumb.displayName = 'Breadcrumb';

/**
 * A single crumb in a Breadcrumb trail, rendered as a link or current page.
 *
 * @component
 * @example
 * ```tsx
 * <Breadcrumb.Item to="/settings">Settings</Breadcrumb.Item>
 * <Breadcrumb.Item active>Profile</Breadcrumb.Item>
 * ```
 *
 * @param {BreadcrumbItemProps} props - The component props
 * @param {string} [props.to] - Destination path when the item is a link
 * @param {boolean} [props.active] - Whether this item is the current page
 * @param {React.ReactNode} props.children - Item label content
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.CSSProperties} [props.style] - Inline styles
 * @param {React.Ref<HTMLSpanElement | HTMLAnchorElement>} ref - Forwarded ref to the item element
 *
 * @returns {JSX.Element} A breadcrumb link or current-page span
 */
const BreadcrumbItem = forwardRef<
  HTMLSpanElement | HTMLAnchorElement,
  BreadcrumbItemProps
>(({ to, active, children, className, style, ...rest }, ref) => {
  const itemClasses = active
    ? 'font-bold text-foreground'
    : 'text-muted-foreground font-semibold hover:text-gray-700';

  if (active) {
    return (
      <span
        ref={ref as React.Ref<HTMLSpanElement>}
        className={cn(itemClasses, className)}
        style={style}
        aria-current="page"
        {...rest}
      >
        {children}
      </span>
    );
  }

  return (
    <Link
      ref={ref as React.Ref<HTMLAnchorElement>}
      to={to || '#'}
      className={cn(itemClasses, className)}
      style={style}
      {...rest}
    >
      {children}
    </Link>
  );
});

BreadcrumbItem.displayName = 'BreadcrumbItem';

// #endregion

// #region exports
const BreadcrumbRoot = Object.assign(
  Breadcrumb as React.ForwardRefExoticComponent<
    BreadcrumbProps & React.RefAttributes<HTMLDivElement>
  >,
  { Item: BreadcrumbItem }
);

export { BreadcrumbRoot as Breadcrumb, BreadcrumbItem, breadcrumbVariants };
export type { BreadcrumbProps, BreadcrumbItemProps, SeparatorType };
// #endregion
