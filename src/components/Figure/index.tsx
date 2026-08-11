import React, { CSSProperties, forwardRef, ReactNode } from 'react';
import { cn } from '@/utils';
import Image, { ImageProps } from '../Image';

// #region types
/**
 * Props for the Figure component.
 *
 * @interface FigureProps
 * @extends {React.HTMLAttributes<HTMLElement>}
 *
 * @property {ReactNode} children - Content rendered inside the figure (image, caption, etc.)
 * @property {string} [width] - Width of the figure
 * @property {string} [height] - Height of the figure
 * @property {string} [margin='5px'] - Margin around the figure
 * @property {string} [className] - Additional CSS class names
 * @property {CSSProperties} [style] - Inline styles applied to the figure
 */
interface FigureProps extends React.HTMLAttributes<HTMLElement> {
  /** Content rendered inside the figure */
  children: ReactNode;
  /** Width of the figure */
  width?: string;
  /** Height of the figure */
  height?: string;
  /** Margin around the figure */
  margin?: string;
  /** Additional CSS class names */
  className?: string;
  /** Inline styles applied to the figure */
  style?: CSSProperties;
}

/**
 * Props for the FigureImage component.
 *
 * @interface FigureImageProps
 * @extends {ImageProps}
 *
 * @property {string} src - Source URL of the image
 * @property {string} alt - Alternative text for the image
 * @property {string} [className] - Optional CSS class name for the image
 * @property {CSSProperties} [style] - Optional inline styles for the image
 */
interface FigureImageProps extends ImageProps {
  /** Source URL of the image */
  src: string;
  /** Alternative text for the image */
  alt: string;
  /** Optional CSS class name for the image */
  className?: string;
  /** Optional inline styles for the image */
  style?: CSSProperties;
}

/**
 * Props for the FigureCaption component.
 *
 * @interface FigureCaptionProps
 * @extends {React.HTMLAttributes<HTMLElement>}
 *
 * @property {ReactNode} children - Caption content
 * @property {string} [className] - Optional CSS class name for the caption
 * @property {CSSProperties} [style] - Optional inline styles for the caption
 */
interface FigureCaptionProps extends React.HTMLAttributes<HTMLElement> {
  /** Caption content */
  children: ReactNode;
  /** Optional CSS class name for the caption */
  className?: string;
  /** Optional inline styles for the caption */
  style?: CSSProperties;
}
// #endregion types

// #region components
/**
 * Semantic figure container for media and an optional caption.
 *
 * @component
 * @example
 * ```tsx
 * <Figure width="320px">
 *   <Figure.Image src="/photo.jpg" alt="Mountain lake" />
 *   <Figure.Caption>Sunrise over the lake</Figure.Caption>
 * </Figure>
 * ```
 *
 * @param {FigureProps} props - The component props
 * @param {React.ReactNode} props.children - Content inside the figure
 * @param {string} [props.width] - Width of the figure
 * @param {string} [props.height] - Height of the figure
 * @param {string} [props.margin='5px'] - Margin around the figure
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.CSSProperties} [props.style] - Additional inline styles
 * @param {React.Ref<HTMLElement>} ref - Forwarded ref to the `<figure>` element
 *
 * @returns {JSX.Element} A styled `<figure>` element
 */
const Figure = forwardRef<HTMLElement, FigureProps>(
  (
    { children, width, height, margin = '5px', className, style, ...rest },
    ref
  ) => {
    return (
      <figure
        ref={ref}
        className={cn('flex flex-col items-center m-1', className)}
        style={{ width, height, margin, ...style }}
        {...rest}
      >
        {children}
      </figure>
    );
  }
);

Figure.displayName = 'Figure';

/**
 * Image subcomponent for use inside a Figure.
 *
 * @component
 * @example
 * ```tsx
 * <Figure.Image src="/hero.jpg" alt="Product hero" />
 * ```
 *
 * @param {FigureImageProps} props - The component props
 * @param {string} props.src - Source URL of the image
 * @param {string} props.alt - Alternative text for the image
 * @param {string} [props.className] - Additional CSS classes for the image
 * @param {React.CSSProperties} [props.style] - Inline styles for the image
 * @param {React.Ref<HTMLDivElement>} ref - Forwarded ref to the wrapping div
 *
 * @returns {JSX.Element} An image wrapped for figure layouts
 */
const FigureImage = forwardRef<HTMLDivElement, FigureImageProps>(
  ({ src, alt, className, style, ...rest }, ref) => {
    return (
      <div ref={ref}>
        <Image
          src={src}
          alt={alt}
          imgClassName={cn('w-full h-full object-cover rounded-md', className)}
          style={style}
          {...rest}
        />
      </div>
    );
  }
);

FigureImage.displayName = 'FigureImage';

/**
 * Caption subcomponent that renders a `<figcaption>` for a Figure.
 *
 * @component
 * @example
 * ```tsx
 * <Figure.Caption>Photo by Alex Rivera</Figure.Caption>
 * ```
 *
 * @param {FigureCaptionProps} props - The component props
 * @param {React.ReactNode} props.children - Caption content
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.CSSProperties} [props.style] - Inline styles
 * @param {React.Ref<HTMLElement>} ref - Forwarded ref to the `<figcaption>` element
 *
 * @returns {JSX.Element} A styled `<figcaption>` element
 */
const FigureCaption = forwardRef<HTMLElement, FigureCaptionProps>(
  ({ children, className, style, ...rest }, ref) => {
    return (
      <figcaption
        ref={ref}
        className={cn(
          'w-full italic text-sm text-muted-foreground mt-2 ml-4',
          className
        )}
        style={style}
        {...rest}
      >
        {children}
      </figcaption>
    );
  }
);

FigureCaption.displayName = 'FigureCaption';
// #endregion components

// #region export
export default Object.assign(
  Figure as React.ForwardRefExoticComponent<
    FigureProps & React.RefAttributes<HTMLElement>
  >,
  {
    Image: FigureImage,
    Caption: FigureCaption,
  }
);

export { FigureImage, FigureCaption };
export type { FigureProps, FigureImageProps, FigureCaptionProps };
// #endregion export
