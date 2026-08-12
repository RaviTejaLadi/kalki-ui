import React, { forwardRef } from 'react';
import { cn } from '@/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { HTMLAttributes } from 'react';

// #region badgeVariants
const badgeVariants = cva(
  'inline-flex gap-2 m-1 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 w-fit items-center font-bold text-center align-middle',
  {
    variants: {
      size: {
        sm: 'text-xs py-1 px-2 rounded-sm',
        md: 'text-sm py-1.5 px-3 rounded-md',
        lg: 'text-base py-2 px-4 rounded-lg',
      },
      variant: {
        primary: 'bg-primary text-white',
        secondary: 'bg-secondary text-white',
        success: 'bg-success text-white',
        danger: 'bg-danger text-white',
        warning: 'bg-warning text-black',
        info: 'bg-info text-white',
        help: 'bg-help text-white',
        light: 'bg-light text-foreground',
        dark: 'bg-dark text-white',
        outline: 'border border-border text-foreground',
      },
      pill: {
        true: 'rounded-full',
        false: '',
      },
    },
    defaultVariants: {
      size: 'sm',
      variant: 'primary',
      pill: false,
    },
  }
);

// #endregion

// #region types

interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
  /** Badge label or content */
  children: React.ReactNode;
}

interface BadgeIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Additional CSS classes */
  className?: string;
}
// #endregion

// #region Badge
/**
 * A compact label used to highlight status, categories, or counts.
 *
 * @component
 * @example
 * ```tsx
 * <Badge variant="success" size="sm" pill>
 *   <Badge.Icon>✓</Badge.Icon>
 *   Active
 * </Badge>
 * ```
 *
 * @param {BadgeProps} props - The component props
 * @param {React.ReactNode} props.children - Badge label or content
 * @param {'sm' | 'md' | 'lg'} [props.size='sm'] - Badge size
 * @param {'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'help' | 'light' | 'dark' | 'outline'} [props.variant='primary'] - Visual style variant
 * @param {boolean} [props.pill=false] - Whether to render with fully rounded corners
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.CSSProperties} [props.style] - Inline styles
 * @param {React.Ref<HTMLDivElement>} ref - Forwarded ref to the root element
 *
 * @returns {JSX.Element} A styled badge element
 */
const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ size, variant, pill, className, style, children, ...rest }, ref) => {
    return (
      <div
        className={cn(badgeVariants({ size, variant, pill }), className)}
        style={style}
        ref={ref}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

Badge.displayName = 'Badge';

/**
 * An optional icon wrapper for use inside a Badge.
 *
 * @component
 * @example
 * ```tsx
 * <Badge.Icon aria-hidden>✓</Badge.Icon>
 * ```
 *
 * @param {BadgeIconProps} props - The component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.Ref<HTMLSpanElement>} ref - Forwarded ref to the icon element
 *
 * @returns {JSX.Element} A span wrapper for badge icons
 */
const BadgeIcon = forwardRef<HTMLSpanElement, BadgeIconProps>(
  ({ className, ...rest }, ref) => (
    <span ref={ref} className={cn(className)} {...rest} />
  )
);

BadgeIcon.displayName = 'BadgeIcon';

// #endregion

// #region exports

export { Badge, BadgeIcon, badgeVariants };
export type { BadgeProps, BadgeIconProps };
// #endregion
