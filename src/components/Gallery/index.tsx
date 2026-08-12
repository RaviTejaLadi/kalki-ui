import React, { forwardRef, ReactNode } from 'react';
import { cn } from '@/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { Image, type ImageProps } from '../Image';

// #region galleryVariants
const galleryVariants = cva('gap-4', {
  variants: {
    pattern: {
      grid: 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ',
      masonry: 'columns-2 md:columns-3 lg:columns-4 space-y-4',
      carousel:
        'flex overflow-x-auto space-x-4 snap-x snap-mandatory scroll-smooth',
      asymmetric: 'grid grid-cols-4 grid-rows-4',
      compact: 'grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1',
    },
  },
  defaultVariants: {
    pattern: 'grid',
  },
});

// #endregion

// #region types
/**
 * Props for the Gallery component.
 *
 * @interface GalleryProps
 * @extends {VariantProps<typeof galleryVariants>}
 *
 * @property {ReactNode} children - Gallery items to render
 * @property {string} [className] - Additional CSS classes for the gallery container
 * @property {'grid' | 'masonry' | 'carousel' | 'asymmetric' | 'compact'} [pattern='grid'] - Layout pattern for arranging items
 */
interface GalleryProps extends VariantProps<typeof galleryVariants> {
  /** Gallery items to render */
  children: ReactNode;
  /** Additional CSS classes for the gallery container */
  className?: string;
}
// #endregion

// #region Gallery component
/**
 * Responsive image/content gallery with multiple layout patterns.
 *
 * @component
 * @example
 * ```tsx
 * <Gallery pattern="grid">
 *   <Gallery.Image src="/a.jpg" alt="A" />
 *   <Gallery.Image src="/b.jpg" alt="B" />
 * </Gallery>
 * ```
 *
 * @param {GalleryProps} props - The component props
 * @param {React.ReactNode} props.children - Child elements rendered in the gallery
 * @param {'grid' | 'masonry' | 'carousel' | 'asymmetric' | 'compact'} [props.pattern='grid'] - Layout pattern
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.Ref<HTMLDivElement>} ref - Forwarded ref to the gallery container
 *
 * @returns {JSX.Element} A patterned gallery container
 */
const Gallery = forwardRef<HTMLDivElement, GalleryProps>(
  ({ children, pattern, className }, ref) => {
    const renderContent = () => {
      if (pattern === 'asymmetric') {
        return React.Children.map(children, (child, index) => (
          <div
            className={cn(
              'overflow-hidden rounded-lg',
              index % 5 === 0 && 'col-span-2 row-span-2',
              index % 5 === 3 && 'col-span-2',
              index % 5 === 4 && 'row-span-2'
            )}
          >
            {child}
          </div>
        ));
      }

      if (pattern === 'carousel') {
        return React.Children.map(children, (child) => (
          <div className="snap-center flex-shrink-0 w-64">{child}</div>
        ));
      }

      return children;
    };

    return (
      <div ref={ref} className={cn(galleryVariants({ pattern }), className)}>
        {renderContent()}
      </div>
    );
  }
);

Gallery.displayName = 'Gallery';

/**
 * Image item optimized for use inside a Gallery.
 *
 * @component
 * @example
 * ```tsx
 * <Gallery.Image src="/photo.jpg" alt="Gallery photo" variant="rounded" />
 * ```
 *
 * @param {ImageProps} props - The component props (inherits from Image)
 * @param {string} props.src - Source URL of the image
 * @param {string} [props.alt='Gallery image'] - Alternative text for the image
 * @param {string} [props.className] - Additional CSS classes for the image
 * @param {'default' | 'rounded' | 'circle'} [props.variant='rounded'] - Image shape variant
 * @param {React.Ref<HTMLDivElement>} ref - Forwarded ref to the wrapping div
 *
 * @returns {JSX.Element} A gallery image wrapped in a container
 */
const GalleryImage = forwardRef<HTMLDivElement, ImageProps>(
  (
    { src, alt = 'Gallery image', className, variant = 'rounded', ...props },
    ref
  ) => {
    return (
      <div ref={ref}>
        <Image
          imgClassName={cn('w-full h-full object-cover rounded-lg', className)}
          src={src}
          alt={alt}
          variant={variant}
          {...props}
        />
      </div>
    );
  }
);

GalleryImage.displayName = 'GalleryImage';
// #endregion
// #region export

export { Gallery, GalleryImage, galleryVariants };
export type { GalleryProps };
// #endregion
