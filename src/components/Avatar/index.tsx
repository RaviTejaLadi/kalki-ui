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
type AvatarImageStatus = 'idle' | 'loading' | 'loaded' | 'error';

interface AvatarContextType extends VariantProps<typeof avatarVariants> {
  status: AvatarImageStatus;
  setStatus: (status: AvatarImageStatus) => void;
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
const AvatarContext = createContext<AvatarContextType>({
  status: 'idle',
  setStatus: () => undefined,
});

// #endregion

// #region Avatar

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ children, className, size, shape, ...props }, ref) => {
    const [status, setStatus] = useState<AvatarImageStatus>('idle');

    return (
      <AvatarContext.Provider
        value={{
          size,
          shape,
          status,
          setStatus,
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
    const { size, shape, status } = useContext(AvatarContext);

    // Show fallback when there is no image child, or after an image error.
    // Keep hidden while an image is loading/loaded to preserve previous layout.
    if (status === 'loading' || status === 'loaded') return null;

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
  ({ className, src, alt = 'avatar', onLoad, onError, ...props }, ref) => {
    const { size, shape, status, setStatus } = useContext(AvatarContext);

    React.useLayoutEffect(() => {
      setStatus('loading');
      return () => setStatus('idle');
    }, [setStatus, src]);

    if (status === 'error') return null;

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
        {...props}
        onLoad={(event) => {
          setStatus('loaded');
          onLoad?.(event);
        }}
        onError={(event) => {
          setStatus('error');
          onError?.(event);
        }}
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
