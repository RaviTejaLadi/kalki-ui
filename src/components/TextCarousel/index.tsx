import React, {
  useState,
  useEffect,
  cloneElement,
  forwardRef,
  ReactNode,
  CSSProperties,
  ReactElement,
} from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Box } from '../Box';
import { Button } from '../Button';
import { cn } from '@/utils';

// #region type
/**
 * Props for the TextCarousel rotator.
 */
interface TextCarouselProps {
  /** Slide children to rotate through */
  children: ReactNode;
  /** Auto-advance interval in ms; `0` disables @default 0 */
  interval?: number;
  /** Additional CSS classes */
  className?: string;
  /** Inline styles */
  style?: CSSProperties;
  /** Prev/next button size @default 'xs' */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  /** Prev/next button variant */
  variant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'info'
    | 'warning'
    | 'danger'
    | 'light'
    | 'dark'
    | 'outline';
}
// #endregion

/**
 * A simple text/content carousel with previous and next controls.
 *
 * @component
 * @example
 * ```tsx
 * <TextCarousel interval={5000} variant="outline" size="sm">
 *   <p>Slide one</p>
 *   <p>Slide two</p>
 * </TextCarousel>
 * ```
 *
 * @param {TextCarouselProps} props - The component props
 * @param {React.ReactNode} props.children - Slide elements
 * @param {number} [props.interval=0] - Auto-advance interval in ms (`0` = off)
 * @param {'xs'|'sm'|'md'|'lg'|'xl'|'2xl'|'3xl'} [props.size='xs'] - Control button size
 * @param {string} [props.variant] - Control button variant
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.CSSProperties} [props.style] - Additional inline styles
 * @param {React.Ref<HTMLDivElement>} ref - Forwarded ref to the root Box
 *
 * @returns {JSX.Element} A carousel with navigation buttons
 */
// #region TextCarousel
const TextCarousel = forwardRef<HTMLDivElement, TextCarouselProps>(
  (
    {
      children,
      interval = 0,
      className = '',
      style,
      size = 'xs',
      variant,
      ...rest
    },
    ref
  ) => {
    const [index, setIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const items = React.Children.toArray(children) as ReactElement[];
    const itemCount = items.length;

    const goToPrev = () => {
      setIsTransitioning(true);
      setIndex((prevIndex) =>
        prevIndex === 0 ? itemCount - 1 : prevIndex - 1
      );
    };

    const goToNext = React.useCallback(() => {
      setIsTransitioning(true);
      setIndex((prevIndex) =>
        prevIndex === itemCount - 1 ? 0 : prevIndex + 1
      );
    }, [itemCount]);

    useEffect(() => {
      if (interval > 0) {
        const timer = setInterval(goToNext, interval);
        return () => clearInterval(timer);
      }
    }, [interval, goToNext]);

    useEffect(() => {
      if (isTransitioning) {
        const timer = setTimeout(() => setIsTransitioning(false), 300);
        return () => clearTimeout(timer);
      }
    }, [isTransitioning]);

    return (
      <Box
        ref={ref}
        padding="8px"
        className={cn('flex flex-col justify-center ', className)}
        style={style}
        {...rest}
      >
        <Box padding="6px" className="relative overflow-hidden">
          <div className="transition-opacity duration-500">
            {cloneElement(items[index])}
          </div>
        </Box>
        <Box className="flex gap-5 ">
          <Button onClick={goToPrev} variant={variant} size={size}>
            <ChevronLeft className="size-4" />
          </Button>
          <Button onClick={goToNext} variant={variant} size={size}>
            <ChevronRight className="size-4" />
          </Button>
        </Box>
      </Box>
    );
  }
);

TextCarousel.displayName = 'TextCarousel';
// #endregion

// #region export
export { TextCarousel };
export type { TextCarouselProps };
