import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { cn } from '@/utils';
import { cva, VariantProps } from 'class-variance-authority';

// #region imageVariants
const imageVariants = cva('transition-opacity duration-300 ease-in-out', {
  variants: {
    variant: {
      default: 'rounded-none',
      rounded: 'rounded-lg',
      circle: 'rounded-full',
    },
    objectFit: {
      contain: 'object-contain',
      cover: 'object-cover',
      fill: 'object-fill',
      none: 'object-none',
      'scale-down': 'object-scale-down',
    },
  },
  defaultVariants: {
    variant: 'default',
    objectFit: 'cover',
  },
});
// #endRegion

// #region types
type LoadingStrategy = 'lazy' | 'eager';
type ObjectFit = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';

interface ImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement>,
    VariantProps<typeof imageVariants> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  quality?: number;
  priority?: boolean;
  loading?: LoadingStrategy;
  objectFit?: ObjectFit;
  onLoad?: () => void;
  onError?: () => void;
  className?: string;
  imgClassName?: string;
  variant?: 'default' | 'rounded' | 'circle';
  sizes?: string;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}
// #endregion

// #region Image
const BlurPlaceholder: React.FC<{
  dataURL: string;
  className?: string;
}> = ({ dataURL, className }) => (
  <div
    className={cn(
      'absolute inset-0 filter blur-lg scale-110 transform',
      className
    )}
    style={{
      backgroundImage: `url(${dataURL})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  />
);

const getOptimizedSrc = (src: string, quality: number) => {
  // Only append quality params for absolute HTTP(S) URLs.
  // data:, blob:, and relative paths must remain untouched.
  if (!/^https?:\/\//i.test(src)) {
    return src;
  }

  return src.includes('?') ? `${src}&q=${quality}` : `${src}?q=${quality}`;
};

const Image = forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      src,
      alt,
      width,
      height,
      quality = 75,
      priority = false,
      loading: propLoading,
      objectFit = 'cover',
      onLoad,
      onError,
      className,
      variant = 'default',
      sizes,
      placeholder = 'empty',
      blurDataURL,
      imgClassName,
      style,
      ...rest
    },
    ref
  ) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const imgRef = useRef<HTMLImageElement | null>(null);

    const loading = priority ? 'eager' : propLoading || 'lazy';
    const optimizedSrc = getOptimizedSrc(src, quality);

    const setRefs = (node: HTMLImageElement | null) => {
      imgRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    const handleLoad = () => {
      setIsLoading(false);
      onLoad?.();
    };

    const handleError = () => {
      setIsLoading(false);
      setError(true);
      onError?.();
    };

    useEffect(() => {
      if (loading === 'eager') return;

      const img = imgRef.current;
      if (!img) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLImageElement;
            target.src = optimizedSrc;
            observer.unobserve(target);
          }
        });
      });

      observer.observe(img);

      return () => {
        observer.disconnect();
      };
    }, [optimizedSrc, loading]);

    return (
      <div
        className={cn('relative', className)}
        style={{
          ...(width ? { width } : {}),
          ...(height ? { height } : {}),
        }}
      >
        {placeholder === 'blur' && isLoading && blurDataURL && (
          <BlurPlaceholder dataURL={blurDataURL} />
        )}

        <img
          ref={setRefs}
          src={loading === 'eager' ? optimizedSrc : undefined}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          sizes={sizes}
          style={style}
          className={cn(
            imageVariants({ variant, objectFit }),
            isLoading ? 'opacity-0' : 'opacity-100',
            error && 'hidden',
            imgClassName
          )}
          {...rest}
          onLoad={handleLoad}
          onError={handleError}
        />

        {error && (
          <div className="flex items-center justify-center w-full h-full text-base p-5 rounded border bg-gray-100 text-gray-500">
            Failed to load image
          </div>
        )}
      </div>
    );
  }
);

Image.displayName = 'Image';
// #endRegion

// #region export
export default Image;
export { imageVariants };
export type { ImageProps, ObjectFit, LoadingStrategy };
// #endRegion
