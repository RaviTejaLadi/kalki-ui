import React, { forwardRef, ReactNode } from 'react';
import { cn } from '@/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { Image, type ImageProps } from '../Image';

// #region galleryVariants
const galleryVariants = cva('gap-2', {
  variants: {
    pattern: {
      grid: 'grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4',
      masonry:
        'columns-2 [column-gap:0.5rem] md:columns-3 lg:columns-4 [&>*]:mb-2',
      carousel:
        'flex snap-x snap-mandatory gap-2 overflow-x-auto scroll-smooth pb-1',
      asymmetric: 'grid grid-cols-2 auto-rows-[110px] gap-2 md:grid-cols-4',
      compact: 'grid grid-cols-3 gap-1.5 md:grid-cols-4 lg:grid-cols-6',
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
    const childArray = React.Children.toArray(children);

    const renderContent = () => {
      if (pattern === 'asymmetric') {
        return childArray.map((child, index) => (
          <div
            key={index}
            className={cn(
              'overflow-hidden rounded-md border border-border/40 bg-muted/20 transition-transform duration-200 hover:-translate-y-0.5',
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
        return childArray.map((child, index) => (
          <div
            key={index}
            className="w-56 shrink-0 snap-start overflow-hidden rounded-md border border-border/40"
          >
            {child}
          </div>
        ));
      }

      return childArray.map((child, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-md border border-border/30 bg-muted/10"
        >
          {child}
        </div>
      ));
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
      <div ref={ref} className="aspect-square overflow-hidden rounded-md">
        <Image
          imgClassName={cn(
            'h-full w-full object-cover transition-transform duration-300 hover:scale-105',
            className
          )}
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
