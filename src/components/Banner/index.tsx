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
  children: ReactNode;
  controls?: ReactNode;
  className?: string;
  style?: CSSProperties;
  background?: string;
}

interface BannerChildProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  size?: BannerSize;
}

// #endregion

// #region Banner
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
        className={cn(bannerClasses, className, variant)}
        style={bannerStyle}
        ref={ref}
        {...rest}
      >
        <div className="flex-grow">
          {React.Children.map(children, (child) =>
            React.isValidElement(child) &&
            (child.type === BannerTitle || child.type === BannerSubTitle)
              ? React.cloneElement(child, {
                  ...child.props,
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
export default Object.assign(
  Banner as React.ForwardRefExoticComponent<
    BannerProps & React.RefAttributes<HTMLDivElement>
  >,
  {
    Title: BannerTitle,
    SubTitle: BannerSubTitle,
  }
);

export { BannerTitle, BannerSubTitle, bannerVariants };
export type { BannerSize, BannerProps, BannerChildProps };

// #endregion
