import React, { forwardRef, CSSProperties, ReactNode } from 'react';
import { cn } from '@/utils';
import { cva, type VariantProps } from 'class-variance-authority';

// #region bannerVariants
const bannerVariants = cva(
  'flex justify-between items-center w-full rounded-md overflow-hidden transition-all duration-300 m-2',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-white',
        secondary: 'bg-secondary text-white',
        success: 'bg-success text-white',
        danger: 'bg-danger text-white',
        warning: 'bg-warning text-gray-900',
        info: 'bg-info text-white',
        help: 'bg-help text-white',
        light: 'bg-light text-foreground',
        dark: 'bg-dark text-white',
      },
      size: {
        sm: 'p-5 h-20',
        md: 'p-6 h-24',
        lg: 'p-7 h-28',
        xl: 'p-8 h-32',
        '2xl': 'p-9 h-36',
        '3xl': 'p-10 h-52',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

// #endregion

// #region types
type BannerSize = NonNullable<VariantProps<typeof bannerVariants>['size']>;

const titleSizes: Record<BannerSize, string> = {
  sm: 'text-lg',
  md: 'text-xl',
  lg: 'text-2xl',
  xl: 'text-3xl',
  '2xl': 'text-4xl',
  '3xl': 'text-5xl',
};

const subtitleSizes: Record<BannerSize, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
  xl: 'text-lg',
  '2xl': 'text-xl',
  '3xl': 'text-2xl',
};

interface BannerProps extends VariantProps<typeof bannerVariants> {
  /** Banner title, subtitle, or custom children */
  children: ReactNode;
  /** Optional action controls rendered on the right */
  controls?: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Inline styles */
  style?: CSSProperties;
  /** Background color or image URL */
  background?: string;
}

interface BannerChildProps {
  /** Title or subtitle content */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Inline styles */
  style?: CSSProperties;
  /** Size inherited from the parent Banner */
  size?: BannerSize;
}

// #endregion

// #region Banner
/**
 * A full-width promotional or status banner with optional controls.
 *
 * @component
 * @example
 * ```tsx
 * <Banner variant="info" size="md" controls={<button>Dismiss</button>}>
 *   <Banner.Title>Welcome back</Banner.Title>
 *   <Banner.SubTitle>Check out what's new</Banner.SubTitle>
 * </Banner>
 * ```
 *
 * @param {BannerProps} props - The component props
 * @param {React.ReactNode} props.children - Banner title, subtitle, or custom children
 * @param {'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'help' | 'light' | 'dark'} [props.variant='primary'] - Visual style variant
 * @param {BannerSize} [props.size='md'] - Banner padding and height size
 * @param {React.ReactNode} [props.controls] - Optional action controls rendered on the right
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {React.CSSProperties} [props.style] - Inline styles
 * @param {string} [props.background] - Background color or image URL
 * @param {React.Ref<HTMLDivElement>} ref - Forwarded ref to the root element
 *
 * @returns {JSX.Element} A styled banner with optional controls
 */
const Banner = forwardRef<HTMLDivElement, BannerProps>(
  (
    {
      children,
      variant,
      size = 'md',
      controls,
      className = '',
      style,
      background,
      ...rest
    },
    ref
  ) => {
    const bannerClasses = bannerVariants({ variant, size });

    const bannerStyle: CSSProperties = {
      ...style,
      ...(background && {
        background: background.match(/^(http|data:)/)
          ? `url(${background}) center/cover no-repeat`
          : background,
      }),
    };

    return (
      <div
        className={cn(bannerClasses, className)}
        style={bannerStyle}
        ref={ref}
        {...rest}
      >
        <div className="flex-grow">
          {React.Children.map(children, (child) =>
            React.isValidElement<{ size?: BannerSize }>(child) &&
            (child.type === BannerTitle || child.type === BannerSubTitle)
              ? React.cloneElement(child, {
                  size: size || 'md',
                })
              : child
          )}
        </div>
        {controls && (
          <div className="flex items-center gap-2 mt-2 md:mt-0">{controls}</div>
        )}
      </div>
    );
  }
);

Banner.displayName = 'Banner';

/**
 * The primary heading for a Banner.
 *
 * @component
 * @example
 * ```tsx
 * <Banner.Title>System update available</Banner.Title>
 * ```
 *
 * @param {BannerChildProps} props - The component props
 * @param {React.ReactNode} props.children - Title content
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {React.CSSProperties} [props.style] - Inline styles
 * @param {BannerSize} [props.size='md'] - Title text size
 * @param {React.Ref<HTMLHeadingElement>} ref - Forwarded ref to the heading element
 *
 * @returns {JSX.Element} A banner title heading
 */
const BannerTitle = React.forwardRef<HTMLHeadingElement, BannerChildProps>(
  ({ children, className = '', style, size = 'md' }, ref) => (
    <h2
      ref={ref}
      className={cn('font-semibold', titleSizes[size], className)}
      style={style}
    >
      {children}
    </h2>
  )
);

BannerTitle.displayName = 'BannerTitle';

/**
 * Supporting subtitle text for a Banner.
 *
 * @component
 * @example
 * ```tsx
 * <Banner.SubTitle>Install the latest version to continue</Banner.SubTitle>
 * ```
 *
 * @param {BannerChildProps} props - The component props
 * @param {React.ReactNode} props.children - Subtitle content
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {React.CSSProperties} [props.style] - Inline styles
 * @param {BannerSize} [props.size='md'] - Subtitle text size
 * @param {React.Ref<HTMLParagraphElement>} ref - Forwarded ref to the paragraph element
 *
 * @returns {JSX.Element} A banner subtitle paragraph
 */
const BannerSubTitle = forwardRef<HTMLParagraphElement, BannerChildProps>(
  ({ children, className = '', style, size = 'md' }, ref) => (
    <p
      ref={ref}
      className={cn('my-1', subtitleSizes[size], className)}
      style={style}
    >
      {children}
    </p>
  )
);

BannerSubTitle.displayName = 'BannerSubTitle';
// #endregion

// #region exports
const BannerRoot = Object.assign(
  Banner as React.ForwardRefExoticComponent<
    BannerProps & React.RefAttributes<HTMLDivElement>
  >,
  {
    Title: BannerTitle,
    SubTitle: BannerSubTitle,
  }
);

export { BannerRoot as Banner, BannerTitle, BannerSubTitle, bannerVariants };
export type { BannerSize, BannerProps, BannerChildProps };

// #endregion
