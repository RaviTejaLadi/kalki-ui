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

/**
 * Props for the Image component.
 *
 * @interface ImageProps
 * @extends {React.ImgHTMLAttributes<HTMLImageElement>}
 * @extends {VariantProps<typeof imageVariants>}
 *
 * @property {string} src - Image source URL
 * @property {string} alt - Alternative text for accessibility
 * @property {number} [width] - Rendered width of the image container/element
 * @property {number} [height] - Rendered height of the image container/element
 * @property {number} [quality=75] - Quality query param appended to absolute HTTP(S) URLs
 * @property {boolean} [priority=false] - When true, forces eager loading
 * @property {LoadingStrategy} [loading] - Native loading strategy (`lazy` or `eager`)
 * @property {ObjectFit} [objectFit='cover'] - CSS object-fit behavior
 * @property {() => void} [onLoad] - Callback fired when the image loads successfully
 * @property {() => void} [onError] - Callback fired when the image fails to load
 * @property {string} [className] - Classes for the outer wrapper
 * @property {string} [imgClassName] - Classes for the underlying `<img>` element
 * @property {'default' | 'rounded' | 'circle'} [variant='default'] - Shape variant
 * @property {string} [sizes] - Responsive sizes attribute
 * @property {'blur' | 'empty'} [placeholder='empty'] - Placeholder strategy while loading
 * @property {string} [blurDataURL] - Data URL used when `placeholder="blur"`
 */
interface ImageProps
  extends
    React.ImgHTMLAttributes<HTMLImageElement>,
    VariantProps<typeof imageVariants> {
  /** Image source URL */
  src: string;
  /** Alternative text for accessibility */
  alt: string;
  /** Rendered width of the image container/element */
  width?: number;
  /** Rendered height of the image container/element */
  height?: number;
  /** Quality query param appended to absolute HTTP(S) URLs */
  quality?: number;
  /** When true, forces eager loading */
  priority?: boolean;
  /** Native loading strategy */
  loading?: LoadingStrategy;
  /** CSS object-fit behavior */
  objectFit?: ObjectFit;
  /** Callback fired when the image loads successfully */
  onLoad?: () => void;
  /** Callback fired when the image fails to load */
  onError?: () => void;
  /** Classes for the outer wrapper */
  className?: string;
  /** Classes for the underlying `<img>` element */
  imgClassName?: string;
  /** Shape variant */
  variant?: 'default' | 'rounded' | 'circle';
  /** Responsive sizes attribute */
  sizes?: string;
  /** Placeholder strategy while loading */
  placeholder?: 'blur' | 'empty';
  /** Data URL used when `placeholder="blur"` */
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

/**
 * Optimized image with lazy loading, optional blur placeholder, and error fallback.
 *
 * @component
 * @example
 * ```tsx
 * <Image
 *   src="https://cdn.example.com/photo.jpg"
 *   alt="Team photo"
 *   width={640}
 *   height={360}
 *   variant="rounded"
 *   objectFit="cover"
 * />
 * ```
 *
 * @param {ImageProps} props - The component props
 * @param {string} props.src - Image source URL
 * @param {string} props.alt - Alternative text
 * @param {number} [props.width] - Image width
 * @param {number} [props.height] - Image height
 * @param {number} [props.quality=75] - Quality param for absolute URLs
 * @param {boolean} [props.priority=false] - Force eager loading when true
 * @param {LoadingStrategy} [props.loading] - Lazy or eager loading strategy
 * @param {ObjectFit} [props.objectFit='cover'] - Object-fit mode
 * @param {() => void} [props.onLoad] - Load success callback
 * @param {() => void} [props.onError] - Load error callback
 * @param {string} [props.className] - Wrapper class names
 * @param {string} [props.imgClassName] - Image element class names
 * @param {'default' | 'rounded' | 'circle'} [props.variant='default'] - Shape variant
 * @param {string} [props.sizes] - Responsive sizes attribute
 * @param {'blur' | 'empty'} [props.placeholder='empty'] - Placeholder mode
 * @param {string} [props.blurDataURL] - Blur placeholder data URL
 * @param {React.Ref<HTMLImageElement>} ref - Forwarded ref to the `<img>` element
 *
 * @returns {JSX.Element} An image with loading/error handling UI
 */
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
export { Image, imageVariants };
export type { ImageProps, ObjectFit, LoadingStrategy };
// #endRegion
