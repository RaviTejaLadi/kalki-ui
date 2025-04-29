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

// #region types
/**
 * Props for the Gallery component.
 *
 * @extends VariantProps<typeof galleryVariants>
 *
 * @property {ReactNode} children - The content to be displayed within the gallery.
 * @property {string} [className] - Optional additional class name(s) to apply to the gallery component.
 */
interface GalleryProps extends VariantProps<typeof galleryVariants> {
  children: ReactNode;
  className?: string;
}
// #endregion

// #region Gallery component
/**
 * `Gallery` is a React component that renders its children in different patterns.
 * It supports two patterns: 'asymmetric' and 'carousel'.
 *
 * @param {GalleryProps} props - The properties for the Gallery component.
 * @param {React.ReactNode} props.children - The child elements to be rendered inside the gallery.
 * @param {string} props.pattern - The pattern to use for rendering the gallery. Can be 'asymmetric' or 'carousel'.
 * @param {string} [props.className] - Additional class names to apply to the gallery container.
 * @param {React.Ref<HTMLDivElement>} ref - The ref to be forwarded to the gallery container.
 *
 * @returns {JSX.Element} The rendered gallery component.
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
 * `GalleryImage` is a React component that renders an image within a div container.
 * It uses the `forwardRef` to pass down the ref to the div element.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.src - The source URL of the image.
 * @param {string} [props.alt='Gallery image'] - The alt text for the image.
 * @param {string} [props.className] - Additional class names for the image.
 * @param {string} [props.variant='rounded'] - The variant style of the image.
 * @param {React.Ref<HTMLImageElement>} ref - The ref to be forwarded to the div element.
 *
 * @returns {JSX.Element} The rendered `GalleryImage` component.
 */
const GalleryImage = forwardRef<HTMLImageElement, ImageProps>(
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
