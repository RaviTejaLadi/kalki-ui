import React, { forwardRef, ReactNode } from 'react';
import { cn } from '@/utils';
import { cva, VariantProps } from 'class-variance-authority';
import Image, { ImageProps } from '../Image';

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

// #region type
interface GalleryProps extends VariantProps<typeof galleryVariants> {
  children: ReactNode;
  className?: string;
}
// #endregion

// #region Gallery
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

const GalleryImage = forwardRef<HTMLImageElement, ImageProps>(
  (
    { src, alt = 'Gallery image', className, variant = 'rounded', ...props },
    ref
  ) => {
    return (
      <div ref={ref}>
        <Image
          className={cn('w-full h-full object-cover rounded-lg', className)}
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
export default Object.assign(
  Gallery as React.ForwardRefExoticComponent<
    GalleryProps & React.RefAttributes<HTMLDivElement>
  >,
  {
    Image: GalleryImage,
  }
);

export { GalleryImage, galleryVariants };
export type { GalleryProps };
// #endregion
