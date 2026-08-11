import React, {
  useState,
  forwardRef,
  ReactNode,
  useEffect,
  useContext,
  createContext,
  useCallback,
} from 'react';
import { cn } from '@/utils';
import { cva } from 'class-variance-authority';
import Box, { BoxProps } from '../Box';

// #region carouselVariants
const carouselVariants = cva('flex flex-col mx-auto', {
  variants: {
    padding: {
      sm: 'p-2',
      md: 'p-4',
      lg: 'p-6',
      xl: 'p-8',
    },
  },
});

// #endregion

// #region utils
const sizeMap = {
  sm: { width: '500px', height: '400px' },
  md: { width: '600px', height: '500px' },
  lg: { width: '700px', height: '600px' },
  xl: { width: '1000px', height: '700px' },
};

// #endregion

// #region types
interface CarouselProps extends BoxProps {
  /** Preset dimensions for the carousel @default 'sm' */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Custom width that overrides the size preset */
  width?: string;
  /** Custom height that overrides the size preset */
  height?: string;
  /** Border radius applied to the container @default '5px' */
  borderRadius?: string;
  /** Padding variant key (`sm` | `md` | `lg` | `xl`) @default 'md' */
  padding?: string;
  /** Additional CSS classes */
  className?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
  /** Carousel compound children (Slides, Content, Controls, Dots) */
  children: ReactNode;
}

interface CarouselContextType {
  /** Index of the active slide */
  currentIndex: number;
  /** Sets the active slide index */
  setCurrentIndex: (index: number) => void;
  /** Registered slide nodes */
  slides: ReactNode[];
  /** Updates the registered slides */
  setSlides: (slides: ReactNode[]) => void;
  /** Navigates to the previous slide */
  goToPrevious: () => void;
  /** Navigates to the next slide */
  goToNext: () => void;
}

interface CarouselSlidesProps {
  /** Slide elements to register and display */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
}

interface CarouselContentProps {
  /** Content nodes indexed by the current slide */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
}

interface CarouselControlsProps {
  /** Control elements (typically previous/next buttons) */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
}

interface CarouselDotsProps {
  /** Additional CSS classes */
  className?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
}

// #endregion

// #region CarouselContext
/**
 * React context that shares carousel slide state and navigation helpers with compound parts.
 */
export const CarouselContext = createContext<CarouselContextType | undefined>(
  undefined
);

// #endregion

// #region Carousel
/**
 * A compound carousel container that manages slide state and navigation.
 *
 * @component
 * @example
 * ```tsx
 * <Carousel size="md">
 *   <Carousel.Slides>
 *     <img src="/slide-1.jpg" alt="Slide 1" />
 *     <img src="/slide-2.jpg" alt="Slide 2" />
 *   </Carousel.Slides>
 *   <Carousel.Controls>
 *     <button type="button">Prev</button>
 *     <button type="button">Next</button>
 *   </Carousel.Controls>
 *   <Carousel.Dots />
 * </Carousel>
 * ```
 *
 * @param {CarouselProps} props - The component props
 * @param {'sm' | 'md' | 'lg' | 'xl'} [props.size='sm'] - Preset dimensions for the carousel
 * @param {string} [props.width] - Custom width that overrides the size preset
 * @param {string} [props.height] - Custom height that overrides the size preset
 * @param {string} [props.borderRadius='5px'] - Border radius applied to the container
 * @param {string} [props.padding='md'] - Padding variant key (`sm` | `md` | `lg` | `xl`)
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.CSSProperties} [props.style] - Additional inline styles
 * @param {React.ReactNode} props.children - Carousel compound children
 * @param {React.Ref<HTMLDivElement>} ref - Forwarded ref to the carousel container
 *
 * @returns {JSX.Element} A carousel provider wrapping a sized Box container
 */
const Carousel = forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      size = 'sm',
      width,
      height,
      borderRadius = '5px',
      padding = 'md',
      children,
      className,
      style,
      ...rest
    },
    ref
  ) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [slides, setSlides] = useState<ReactNode[]>([]);

    const goToPrevious = useCallback(() => {
      setCurrentIndex((prevIndex) => {
        if (!slides.length) return prevIndex;
        return (prevIndex - 1 + slides.length) % slides.length;
      });
    }, [slides.length]);

    const goToNext = useCallback(() => {
      setCurrentIndex((prevIndex) => {
        if (!slides.length) return prevIndex;
        return (prevIndex + 1) % slides.length;
      });
    }, [slides.length]);

    const containerStyle: React.CSSProperties = {
      width: width || sizeMap[size].width,
      height: height || sizeMap[size].height,
      borderRadius,
      ...style,
    };

    const contextValue: CarouselContextType = {
      currentIndex,
      setCurrentIndex,
      slides,
      setSlides,
      goToPrevious,
      goToNext,
    };

    return (
      <CarouselContext.Provider value={contextValue}>
        <Box
          ref={ref}
          className={cn(
            carouselVariants({ padding: padding as 'sm' | 'md' | 'lg' | 'xl' }),
            className
          )}
          style={containerStyle}
          {...rest}
        >
          {children}
        </Box>
      </CarouselContext.Provider>
    );
  }
);

Carousel.displayName = 'Carousel';

/**
 * Renders the content node that matches the current carousel index.
 *
 * @component
 * @example
 * ```tsx
 * <Carousel.Content>
 *   <p>Caption for slide 1</p>
 *   <p>Caption for slide 2</p>
 * </Carousel.Content>
 * ```
 *
 * @param {CarouselContentProps} props - The component props
 * @param {React.ReactNode} props.children - Content nodes indexed by the current slide
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.CSSProperties} [props.style] - Additional inline styles
 *
 * @returns {JSX.Element} The active content node for the current slide
 */
const CarouselContent: React.FC<CarouselContentProps> = ({
  children,
  className,
  style,
}) => {
  const { currentIndex } = useContext(CarouselContext)!;
  return (
    <div className={cn('text-start truncate', className)} style={style}>
      {React.Children.toArray(children)[currentIndex]}
    </div>
  );
};

/**
 * Wires previous/next navigation onto its children and supports arrow-key control.
 *
 * @component
 * @example
 * ```tsx
 * <Carousel.Controls>
 *   <button type="button">Prev</button>
 *   <button type="button">Next</button>
 * </Carousel.Controls>
 * ```
 *
 * @param {CarouselControlsProps} props - The component props
 * @param {React.ReactNode} props.children - Control elements (first = previous, second = next)
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.CSSProperties} [props.style] - Additional inline styles
 *
 * @returns {JSX.Element} A control bar with navigation handlers applied to children
 */
const CarouselControls: React.FC<CarouselControlsProps> = ({
  children,
  className,
  style,
}) => {
  const { goToPrevious, goToNext } = useContext(CarouselContext)!;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        goToPrevious();
      } else if (event.key === 'ArrowRight') {
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToPrevious, goToNext]);

  return (
    <div className={cn('flex justify-between mt-4', className)} style={style}>
      {React.Children.map(children, (child, index) => {
        if (
          !React.isValidElement<{
            onClick?: () => void;
            'aria-label'?: string;
            role?: string;
            tabIndex?: number;
          }>(child)
        ) {
          return child;
        }
        const isPrevious = index === 0;
        return React.cloneElement(child, {
          onClick: isPrevious ? goToPrevious : goToNext,
          'aria-label': isPrevious ? 'Previous slide' : 'Next slide',
          role: 'button',
          tabIndex: 0,
        });
      })}
    </div>
  );
};

/**
 * Renders pagination dots for jumping directly to a slide.
 *
 * @component
 * @example
 * ```tsx
 * <Carousel.Dots className="mt-2" />
 * ```
 *
 * @param {CarouselDotsProps} props - The component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.CSSProperties} [props.style] - Additional inline styles
 *
 * @returns {JSX.Element} A tablist of dot buttons for carousel pagination
 */
const CarouselDots: React.FC<CarouselDotsProps> = ({
  className,
  style,
  ...rest
}) => {
  const { currentIndex, setCurrentIndex, slides } =
    useContext(CarouselContext)!;

  return (
    <div
      className={cn('flex justify-center mt-4', className)}
      style={style}
      role="tablist"
      aria-label="Carousel pagination"
      {...rest}
    >
      {slides.map((_, index) => (
        <button
          key={index}
          type="button"
          role="tab"
          aria-selected={index === currentIndex}
          aria-label={`Go to slide ${index + 1}`}
          className={`w-2.5 h-2.5 rounded-full bg-gray-400 mx-1 hover:bg-gray-600 cursor-pointer border-0 p-0 ${
            index === currentIndex ? 'bg-blue-500' : ''
          }`}
          onClick={() => setCurrentIndex(index)}
        />
      ))}
    </div>
  );
};

/**
 * Registers and animates the carousel slides as a horizontal track.
 *
 * @component
 * @example
 * ```tsx
 * <Carousel.Slides>
 *   <div>Slide 1</div>
 *   <div>Slide 2</div>
 * </Carousel.Slides>
 * ```
 *
 * @param {CarouselSlidesProps} props - The component props
 * @param {React.ReactNode} props.children - Slide elements to register and display
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.CSSProperties} [props.style] - Additional inline styles
 *
 * @returns {JSX.Element} A sliding track containing each carousel slide
 */
const CarouselSlides: React.FC<CarouselSlidesProps> = ({
  children,
  className,
  style,
}) => {
  const { currentIndex, setSlides } = useContext(CarouselContext)!;

  useEffect(() => {
    setSlides(React.Children.toArray(children));
  }, [children, setSlides]);

  return (
    <div
      className={cn('relative w-full h-full overflow-hidden', className)}
      style={style}
    >
      <div
        className="transition-transform duration-500 ease-in-out w-full h-full"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          display: 'flex',
        }}
      >
        {React.Children.map(children, (child) => (
          <div className="w-full h-full flex-shrink-0">{child}</div>
        ))}
      </div>
    </div>
  );
};

// #endregion

// #region exports
export default Object.assign(
  Carousel as React.ForwardRefExoticComponent<
    CarouselProps & React.RefAttributes<HTMLDivElement>
  >,
  {
    Slides: CarouselSlides,
    Content: CarouselContent,
    Controls: CarouselControls,
    Dots: CarouselDots,
  }
);
export {
  CarouselSlides,
  CarouselContent,
  CarouselControls,
  CarouselDots,
  carouselVariants,
};

export type {
  CarouselProps,
  CarouselSlidesProps,
  CarouselContentProps,
  CarouselControlsProps,
  CarouselDotsProps,
};
// #endregion
