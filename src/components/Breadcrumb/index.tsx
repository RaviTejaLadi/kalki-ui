import React, { forwardRef } from 'react';
import { ChevronRight, ArrowRight, Dot, Slash, Circle } from 'lucide-react';
import { cn } from '@/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { CSSProperties, ReactNode } from 'react';
import Box, { BoxProps } from '../Box';
import Link from '../Link/Index';

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
  extends VariantProps<typeof breadcrumbVariants>,
    BoxProps {
  children: ReactNode;
  separator?: ReactNode | SeparatorType;
  className?: string;
  style?: CSSProperties;
}

interface BreadcrumbItemProps {
  to?: string;
  active?: boolean;
  children: ReactNode;
  className?: string;
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
          {React.Children.map(children, (child, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && getSeparator()}
              {React.cloneElement(child as React.ReactElement, {
                className: cn(
                  'text-sm font-medium',
                  size === 'sm' && 'text-xs',
                  size === 'lg' && 'text-base',
                  (child as React.ReactElement).props.className || ''
                ),
              })}
            </li>
          ))}
        </ol>
      </Box>
    );
  }
);

Breadcrumb.displayName = 'Breadcrumb';

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
export default Object.assign(
  Breadcrumb as React.ForwardRefExoticComponent<
    BreadcrumbProps & React.RefAttributes<HTMLDivElement>
  >,
  { Item: BreadcrumbItem }
);

export { BreadcrumbItem, breadcrumbVariants };
export type { BreadcrumbProps, BreadcrumbItemProps, SeparatorType };
// #endregion
