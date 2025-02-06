import React, { CSSProperties, forwardRef, ReactNode } from 'react';
import { cn } from '@/utils';
import Image, { ImageProps } from '../Image';

// #region Types
interface FigureProps extends React.HTMLAttributes<HTMLElement> {
  children: ReactNode;
  width?: string;
  height?: string;
  margin?: string;
  className?: string;
  style?: CSSProperties;
}

interface FigureImageProps extends ImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
}

interface FigureCaptionProps extends React.HTMLAttributes<HTMLElement> {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}
// #endregion

// #region Figure
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

const FigureImage = forwardRef<HTMLImageElement, FigureImageProps>(
  ({ src, alt, className, style, ...rest }, ref) => {
    return (
      <div ref={ref}>
        <Image
          src={src}
          alt={alt}
          className={cn('w-full h-full object-cover rounded-md', className)}
          style={style}
          {...rest}
        />
      </div>
    );
  }
);

FigureImage.displayName = 'FigureImage';

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
// #endregion

// #region Exports
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
// #endregion
