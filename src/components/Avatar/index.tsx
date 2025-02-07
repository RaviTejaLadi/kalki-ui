import React, { createContext, useContext, useState } from 'react';
import { cn } from '@/utils';
import { cva, type VariantProps } from 'class-variance-authority';

// #region avatarVariants
const avatarVariants = cva('inline-flex items-center justify-center', {
  variants: {
    size: {
      sm: 'h-8 w-8',
      md: 'h-10 w-10',
      lg: 'h-12 w-12',
      xl: 'h-16 w-16',
    },
    shape: {
      circle: 'rounded-full',
      square: 'rounded-md',
    },
  },
  defaultVariants: {
    size: 'md',
    shape: 'circle',
  },
});

// #endregion

// #region types
interface AvatarContextType extends VariantProps<typeof avatarVariants> {
  hasError?: boolean;
  onError?: () => void;
}

interface AvatarProps extends VariantProps<typeof avatarVariants> {
  className?: string;
  children: React.ReactNode;
}

interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
}

interface AvatarFallbackProps {
  className?: string;
  children: React.ReactNode;
}

// #endregion

// #region AvatarContext
const AvatarContext = createContext<AvatarContextType>({});

// #endregion

// #region Avatar

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ children, className, size, shape, ...props }, ref) => {
    const [hasError, setHasError] = useState(false);

    return (
      <AvatarContext.Provider
        value={{
          size,
          shape,
          hasError,
          onError: () => setHasError(true),
        }}
      >
        <div
          ref={ref}
          className={cn('relative inline-flex', className)}
          {...props}
        >
          {children}
        </div>
      </AvatarContext.Provider>
    );
  }
);

Avatar.displayName = 'Avatar';

const AvatarFallback = React.forwardRef<HTMLDivElement, AvatarFallbackProps>(
  ({ children, className, ...props }, ref) => {
    const { size, shape, hasError } = useContext(AvatarContext);

    if (!hasError) return null;

    return (
      <div
        ref={ref}
        className={cn(
          avatarVariants({ size, shape }),
          'bg-background dark:bg-background/40 border dark:border-gray-200/10 text-foreground font-medium',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

AvatarFallback.displayName = 'AvatarFallback';

const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className, src, alt = 'avatar', ...props }, ref) => {
    const { size, shape, hasError, onError } = useContext(AvatarContext);

    if (hasError) return null;

    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        className={cn(
          avatarVariants({ size, shape }),
          'object-cover',
          className
        )}
        onError={onError}
        {...props}
      />
    );
  }
);

AvatarImage.displayName = 'Avatar.Image';

// #endregion

// #region exports
export default Object.assign(Avatar as React.FC<AvatarProps>, {
  Image: AvatarImage,
  Fallback: AvatarFallback,
});

export { AvatarFallback, AvatarImage, avatarVariants };
export type {
  AvatarContextType,
  AvatarProps,
  AvatarImageProps,
  AvatarFallbackProps,
};

// #endregion
