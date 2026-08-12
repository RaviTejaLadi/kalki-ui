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
  /** Current image load status */
  status: AvatarImageStatus;
  /** Updates the image load status */
  setStatus: (status: AvatarImageStatus) => void;
}

interface AvatarProps extends VariantProps<typeof avatarVariants> {
  /** Additional CSS classes */
  className?: string;
  /** Avatar image and/or fallback children */
  children: React.ReactNode;
}

interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Additional CSS classes */
  className?: string;
}

interface AvatarFallbackProps {
  /** Additional CSS classes */
  className?: string;
  /** Fallback content shown when the image is unavailable */
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

/**
 * A user avatar container that coordinates image loading and fallback display.
 *
 * @component
 * @example
 * ```tsx
 * <Avatar size="md" shape="circle">
 *   <Avatar.Image src="/avatar.png" alt="Jane" />
 *   <Avatar.Fallback>JD</Avatar.Fallback>
 * </Avatar>
 * ```
 *
 * @param {AvatarProps} props - The component props
 * @param {React.ReactNode} props.children - Avatar image and/or fallback children
 * @param {'sm' | 'md' | 'lg' | 'xl'} [props.size='md'] - Avatar size
 * @param {'circle' | 'square'} [props.shape='circle'] - Avatar shape
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.Ref<HTMLDivElement>} ref - Forwarded ref to the root element
 *
 * @returns {JSX.Element} An avatar container with shared size/shape context
 */
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

/**
 * Fallback content shown when the avatar image is missing or fails to load.
 *
 * @component
 * @example
 * ```tsx
 * <Avatar.Fallback>JD</Avatar.Fallback>
 * ```
 *
 * @param {AvatarFallbackProps} props - The component props
 * @param {React.ReactNode} props.children - Fallback content
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.Ref<HTMLDivElement>} ref - Forwarded ref to the fallback element
 *
 * @returns {JSX.Element | null} Fallback content, or null while an image is loading/loaded
 */
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
          'bg-background dark:bg-background/40 border border-gray-200/10 text-foreground font-medium',
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

/**
 * The avatar image that reports load status to the parent Avatar.
 *
 * @component
 * @example
 * ```tsx
 * <Avatar.Image src="/avatar.png" alt="Jane Doe" />
 * ```
 *
 * @param {AvatarImageProps} props - The component props
 * @param {string} [props.src] - Image source URL
 * @param {string} [props.alt='avatar'] - Accessible alternative text
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.Ref<HTMLImageElement>} ref - Forwarded ref to the image element
 *
 * @returns {JSX.Element | null} The avatar image, or null after a load error
 */
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
export { Avatar, AvatarFallback, AvatarImage, avatarVariants };
export type {
  AvatarContextType,
  AvatarProps,
  AvatarImageProps,
  AvatarFallbackProps,
};

// #endregion
