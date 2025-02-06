import React, {
  useState,
  forwardRef,
  ReactNode,
  useEffect,
  useContext,
  createContext,
} from 'react';
import { cn } from '@/utils';
import { cva } from 'class-variance-authority';
import Box, { BoxProps } from '../Box';

// #region carouselVariants
export const carouselVariants = cva('flex flex-col mx-auto', {
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
  size?: 'sm' | 'md' | 'lg' | 'xl';
  width?: string;
  height?: string;
  borderRadius?: string;
  padding?: string;
  className?: string;
  style?: React.CSSProperties;
  children: ReactNode;
}

interface CarouselContextType {
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  slides: ReactNode[];
  setSlides: (slides: ReactNode[]) => void;
  goToPrevious: () => void;
  goToNext: () => void;
}

interface CarouselSlidesProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

interface CarouselContentProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

interface CarouselControlsProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

interface CarouselDotsProps {
  className?: string;
  style?: React.CSSProperties;
}

// #endregion

// #region CarouselContext
export const CarouselContext = createContext<CarouselContextType | undefined>(
  undefined
);

// #endregion

// #region Carousel
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

    const goToPrevious = () => {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
      );
    };

    const goToNext = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

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
          padding={padding}
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
      {React.Children.map(children, (child) => {
        const isPrevious =
          React.isValidElement(child) && child.props?.onClick === goToPrevious;
        return React.cloneElement(child as React.ReactElement, {
          onClick: isPrevious ? goToPrevious : goToNext,
          'aria-label': isPrevious ? 'Previous slide' : 'Next slide',
          role: 'button',
          tabIndex: 0,
        });
      })}
    </div>
  );
};

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
      {...rest}
    >
      {slides.map((_, index) => (
        <span
          key={index}
          className={`w-2.5 h-2.5 rounded-full bg-gray-400 mx-1 hover:bg-gray-600 cursor-pointer ${
            index === currentIndex ? 'bg-blue-500' : ''
          }`}
          onClick={() => setCurrentIndex(index)}
        />
      ))}
    </div>
  );
};

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
export { CarouselSlides, CarouselContent, CarouselControls, CarouselDots };

export type {
  CarouselProps,
  CarouselSlidesProps,
  CarouselContentProps,
  CarouselControlsProps,
  CarouselDotsProps,
};
// #endregion
