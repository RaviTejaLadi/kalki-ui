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
 * @property {ReactNode} children - The content to be displayed within the figure.
 * @property {string} [width] - The width of the figure.
 * @property {string} [height] - The height of the figure.
 * @property {string} [margin] - The margin around the figure.
 * @property {string} [className] - Additional CSS class names to apply to the figure.
 * @property {CSSProperties} [style] - Inline styles to apply to the figure.
 */
interface FigureProps extends React.HTMLAttributes<HTMLElement> {
  children: ReactNode;
  width?: string;
  height?: string;
  margin?: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * Props for the FigureImage component.
 *
 * @extends React.ImgHTMLAttributes<HTMLImageElement>
 *
 * @property {string} src - The source URL of the image.
 * @property {string} alt - The alternative text for the image.
 * @property {string} [className] - Optional CSS class name for the image.
 * @property {CSSProperties} [style] - Optional inline styles for the image.
 */
interface FigureImageProps extends ImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * Props for the FigureCaption component.
 *
 * @interface FigureCaptionProps
 * @extends {React.HTMLAttributes<HTMLElement>}
 *
 * @property {ReactNode} children - The content of the caption.
 * @property {string} [className] - Optional CSS class name to apply to the caption.
 * @property {CSSProperties} [style] - Optional inline styles to apply to the caption.
 */
interface FigureCaptionProps extends React.HTMLAttributes<HTMLElement> {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}
// #endregion types

// #region components
/**
 * A React functional component that renders a `<figure>` element with customizable styles and properties.
 *
 * @component
 * @param {React.ReactNode} children - The content to be displayed inside the `<figure>` element.
 * @param {string | number} width - The width of the `<figure>` element.
 * @param {string | number} height - The height of the `<figure>` element.
 * @param {string} [margin='5px'] - The margin around the `<figure>` element. Defaults to '5px'.
 * @param {string} [className] - Additional class names to apply to the `<figure>` element.
 * @param {React.CSSProperties} [style] - Additional inline styles to apply to the `<figure>` element.
 * @param {React.Ref<HTMLElement>} ref - A ref to be forwarded to the `<figure>` element.
 * @param {object} rest - Any other props to be passed to the `<figure>` element.
 *
 * @returns {JSX.Element} The rendered `<figure>` element.
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
 * A functional component that renders an image with customizable properties.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.src - The source URL of the image.
 * @param {string} props.alt - The alt text for the image.
 * @param {string} [props.className] - Additional CSS classes to apply to the image.
 * @param {React.CSSProperties} [props.style] - Inline styles to apply to the image.
 * @param {React.Ref<HTMLImageElement>} ref - The ref to be attached to the image element.
 * @param {Object} rest - Any additional properties to be passed to the image element.
 *
 * @returns {JSX.Element} The rendered image element.
 */
const FigureImage = forwardRef<HTMLImageElement, FigureImageProps>(
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
 * A React forwardRef component that renders a `<figcaption>` element with
 * additional styling and class names.
 *
 * @component
 * @param {React.ReactNode} children - The content to be displayed inside the `<figcaption>`.
 * @param {string} [className] - Additional class names to apply to the `<figcaption>`.
 * @param {React.CSSProperties} [style] - Inline styles to apply to the `<figcaption>`.
 * @param {React.Ref<HTMLElement>} ref - A ref to be forwarded to the `<figcaption>` element.
 * @param {object} rest - Any other props to be passed to the `<figcaption>` element.
 * @returns {JSX.Element} The rendered `<figcaption>` element.
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
