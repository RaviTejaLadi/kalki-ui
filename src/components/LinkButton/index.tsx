import React, { forwardRef } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { Link } from '../Link';
import { cn } from '@/utils';

// #region linkVariants
export const linkVariants = cva(
  'inline-flex justify-center items-center font-normal text-center whitespace-nowrap align-middle select-none transition-colors duration-150 ease-in-out focus:outline-none',
  {
    variants: {
      variant: {
        primary:
          'bg-primary hover:bg-primary/90 border-primary text-primary-foreground dark:bg-primary dark:hover:bg-primary/90 dark:text-primary-foreground focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-800',
        secondary:
          'bg-secondary hover:bg-secondary/90 text-white dark:bg-secondary/80 dark:hover:bg-secondary focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700',
        success:
          'bg-success hover:bg-green-600 text-white dark:bg-green-700 dark:hover:bg-green-800 focus:ring-2 focus:ring-green-300 dark:focus:ring-green-800',
        danger:
          'bg-danger hover:bg-red-600 text-white dark:bg-red-700 dark:hover:bg-red-800 focus:ring-2 focus:ring-red-300 dark:focus:ring-red-800',
        warning:
          'bg-warning hover:bg-yellow-600 text-white dark:bg-yellow-700 dark:hover:bg-yellow-800 focus:ring-2 focus:ring-yellow-300 dark:focus:ring-yellow-800',
        info: 'bg-info hover:bg-cyan-600 text-white dark:bg-cyan-700 dark:hover:bg-cyan-800 focus:ring-2 focus:ring-cyan-300 dark:focus:ring-cyan-800',
        help: 'bg-help hover:bg-purple-600 text-white dark:bg-purple-700 dark:hover:bg-purple-800 focus:ring-2 focus:ring-purple-300 dark:focus:ring-purple-800',
        light:
          'bg-light hover:bg-gray-200 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100 focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700',
        dark: 'bg-dark hover:bg-gray-900 text-dark-foreground dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-gray-600 dark:focus:ring-gray-700',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-gray-700 dark:text-gray-100',
        link: 'text-primary hover:underline dark:text-blue-400 underline-offset-4',
      },
      size: {
        xs: 'text-xs h-7 py-[0.5px] px-2',
        sm: 'text-sm h-8 py-1 px-2',
        md: 'text-base h-9 py-2 px-4',
        lg: 'text-lg h-10 py-2 px-4',
        xl: 'text-xl h-11 py-3 px-6',
        '2xl': 'text-2xl h-12 py-3 px-6',
        '3xl': 'text-3xl h-[3.25rem] py-4 px-7',
      },
      raised: {
        true: 'shadow-md dark:shadow-gray-900',
        false: '',
      },
      rounded: {
        true: 'rounded-full',
        false: 'rounded',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'sm',
      raised: false,
      rounded: false,
    },
  }
);
// #endregion linkVariants

// #region types
/**
 * Props for the LinkButton component.
 *
 * @interface LinkButtonProps
 * @extends {VariantProps<typeof linkVariants>}
 *
 * @property {string} [to=''] - Destination URL or path
 * @property {React.ReactNode} children - Button content (text, icons, etc.)
 * @property {string} [className] - Additional CSS classes
 * @property {React.CSSProperties} [style] - Inline styles
 * @property {LinkButtonProps['variant']} [variant='primary'] - Visual style variant
 * @property {LinkButtonProps['size']} [size='sm'] - Size of the button
 * @property {boolean} [raised=false] - Whether to apply elevated shadow styling
 * @property {boolean} [rounded=false] - Whether to use fully rounded (pill) corners
 */
interface LinkButtonProps extends VariantProps<typeof linkVariants> {
  /** Destination URL or path */
  to?: string;
  /** Button content (text, icons, etc.) */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
}

/**
 * Props for the LinkButton.Icon subcomponent.
 *
 * @interface LinkIconProps
 *
 * @property {string} [className] - Additional CSS classes for the icon wrapper
 * @property {React.CSSProperties} [style] - Inline styles for the icon wrapper
 * @property {React.ReactNode} [children] - Icon element(s) to render
 */
interface LinkIconProps {
  /** Additional CSS classes for the icon wrapper */
  className?: string;
  /** Inline styles for the icon wrapper */
  style?: React.CSSProperties;
  /** Icon element(s) to render */
  children?: React.ReactNode;
}

/**
 * Props for the LinkButton.Text subcomponent.
 *
 * @interface LinkTextProps
 *
 * @property {string} [className] - Additional CSS classes for the text wrapper
 * @property {React.CSSProperties} [style] - Inline styles for the text wrapper
 * @property {React.ReactNode} [children] - Text content to render
 */
interface LinkTextProps {
  /** Additional CSS classes for the text wrapper */
  className?: string;
  /** Inline styles for the text wrapper */
  style?: React.CSSProperties;
  /** Text content to render */
  children?: React.ReactNode;
}
// #endregion types

// #region LinkButton Component
/**
 * Button-styled link for navigation actions with size and color variants.
 *
 * @component
 * @example
 * ```tsx
 * <LinkButton to="/signup" variant="primary" size="md">
 *   <LinkButton.Icon><PlusIcon /></LinkButton.Icon>
 *   <LinkButton.Text>Sign up</LinkButton.Text>
 * </LinkButton>
 * ```
 *
 * @param {LinkButtonProps} props - The component props
 * @param {LinkButtonProps['variant']} [props.variant='primary'] - Visual style variant
 * @param {LinkButtonProps['size']} [props.size='sm'] - Button size
 * @param {string} [props.to=''] - Destination URL or path
 * @param {React.ReactNode} props.children - Button content
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.raised=false] - Elevated shadow styling
 * @param {boolean} [props.rounded=false] - Fully rounded corners
 * @param {React.Ref<HTMLAnchorElement>} ref - Forwarded ref to the underlying Link/anchor
 *
 * @returns {JSX.Element} A button-styled navigation link
 */
const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  (
    { variant, size, to = '', children, className, raised, rounded, ...rest },
    ref
  ) => {
    return (
      <Link
        ref={ref}
        to={to}
        className={linkVariants({ variant, size, raised, rounded, className })}
        {...rest}
      >
        {children}
      </Link>
    );
  }
);
LinkButton.displayName = 'LinkButton';

/**
 * Icon wrapper for use inside a LinkButton.
 *
 * @component
 * @example
 * ```tsx
 * <LinkButton.Icon>
 *   <ArrowRightIcon />
 * </LinkButton.Icon>
 * ```
 *
 * @param {LinkIconProps} props - The component props
 * @param {React.ReactNode} [props.children] - Icon content
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.CSSProperties} [props.style] - Inline styles
 * @param {React.Ref<HTMLDivElement>} ref - Forwarded ref to the icon wrapper
 *
 * @returns {JSX.Element} An icon container for LinkButton layouts
 */
const LinkIcon = forwardRef<HTMLDivElement, LinkIconProps>(
  ({ children, className, style, ...rest }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center mx-1', className)}
      style={style}
      {...rest}
    >
      {children}
    </div>
  )
);
LinkIcon.displayName = 'LinkIcon';

/**
 * Text wrapper for use inside a LinkButton.
 *
 * @component
 * @example
 * ```tsx
 * <LinkButton.Text>Continue</LinkButton.Text>
 * ```
 *
 * @param {LinkTextProps} props - The component props
 * @param {React.ReactNode} [props.children] - Text content
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.CSSProperties} [props.style] - Inline styles
 * @param {React.Ref<HTMLDivElement>} ref - Forwarded ref to the text wrapper
 *
 * @returns {JSX.Element} A text container for LinkButton layouts
 */
const LinkText = forwardRef<HTMLDivElement, LinkTextProps>(
  ({ children, className, style, ...rest }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center', className)}
      style={style}
      {...rest}
    >
      {children}
    </div>
  )
);
LinkText.displayName = 'LinkText';
// #endregion LinkButton Component

// #region Export Components and Types

export { LinkButton, LinkIcon, LinkText };
export type { LinkButtonProps, LinkIconProps, LinkTextProps };
// #endregion Export Components and Types
