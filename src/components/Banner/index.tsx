import React, { CSSProperties, ReactNode, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';

const bannerVariants = cva(
  'flex w-full items-start justify-between gap-4 overflow-hidden rounded-lg border border-border bg-background text-foreground transition-colors duration-200',
  {
    variants: {
      size: {
        sm: 'min-h-20 p-4',
        md: 'min-h-24 p-5',
        lg: 'min-h-28 p-6',
        xl: 'min-h-32 p-7',
        '2xl': 'min-h-36 p-8',
        '3xl': 'min-h-44 p-10',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

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

/**
 * Shared text props for BannerTitle and BannerSubTitle.
 */
interface BannerChildProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  size?: BannerSize;
}

/**
 * Banner surface for prominent contextual messages.
 */
const Banner = forwardRef<HTMLDivElement, BannerProps>(
  (
    { children, size = 'md', controls, className, style, background, ...rest },
    ref
  ) => {
    const resolvedSize = size ?? 'md';
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
        className={cn(bannerVariants({ size: resolvedSize }), className)}
        style={bannerStyle}
        ref={ref}
        {...rest}
      >
        <div className="min-w-0 grow">
          {React.Children.map(children, (child) =>
            React.isValidElement<{ size?: BannerSize }>(child) &&
            (child.type === BannerTitle || child.type === BannerSubTitle)
              ? React.cloneElement(child, { size: resolvedSize })
              : child
          )}
        </div>
        {controls ? (
          <div className="mt-1 flex shrink-0 items-center gap-2">
            {controls}
          </div>
        ) : null}
      </div>
    );
  }
);

/**
 * Primary heading inside a Banner.
 */
const BannerTitle = forwardRef<HTMLHeadingElement, BannerChildProps>(
  ({ children, className, style, size = 'md' }, ref) => (
    <h2
      ref={ref}
      className={cn('font-semibold leading-tight', titleSizes[size], className)}
      style={style}
    >
      {children}
    </h2>
  )
);

/**
 * Secondary text inside a Banner.
 */
const BannerSubTitle = forwardRef<HTMLParagraphElement, BannerChildProps>(
  ({ children, className, style, size = 'md' }, ref) => (
    <p
      ref={ref}
      className={cn(
        'mt-1 leading-relaxed text-muted-foreground',
        subtitleSizes[size],
        className
      )}
      style={style}
    >
      {children}
    </p>
  )
);

Banner.displayName = 'Banner';
BannerTitle.displayName = 'BannerTitle';
BannerSubTitle.displayName = 'BannerSubTitle';

export { Banner, BannerTitle, BannerSubTitle, bannerVariants };
export type { BannerSize, BannerProps, BannerChildProps };
