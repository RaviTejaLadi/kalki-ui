import React, {
  useState,
  useEffect,
  forwardRef,
  ReactNode,
  CSSProperties,
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
}
// #endregion

/**
 * A simple text/content carousel with previous and next controls.
 *
 * @component
 * @example
 * ```tsx
 * <TextCarousel interval={5000} size="sm">
 *   <p>Slide one</p>
 *   <p>Slide two</p>
 * </TextCarousel>
 * ```
 *
 * @param {TextCarouselProps} props - The component props
 * @param {React.ReactNode} props.children - Slide elements
 * @param {number} [props.interval=0] - Auto-advance interval in ms (`0` = off)
 * @param {'xs'|'sm'|'md'|'lg'|'xl'|'2xl'|'3xl'} [props.size='xs'] - Control button size
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
      ...rest
    },
    ref
  ) => {
    const [index, setIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const items = React.Children.toArray(children);
    const itemCount = items.length;

    const goToPrev = () => {
      if (itemCount < 2) return;
      setIsTransitioning(true);
      setIndex((prevIndex) =>
        prevIndex === 0 ? itemCount - 1 : prevIndex - 1
      );
    };

    const goToNext = React.useCallback(() => {
      if (itemCount < 2) return;
      setIsTransitioning(true);
      setIndex((prevIndex) =>
        prevIndex === itemCount - 1 ? 0 : prevIndex + 1
      );
    }, [itemCount]);

    useEffect(() => {
      if (interval > 0 && itemCount > 1) {
        const timer = setInterval(goToNext, interval);
        return () => clearInterval(timer);
      }
    }, [interval, itemCount, goToNext]);

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
        <Box
          padding="6px"
          className="relative overflow-hidden rounded-md border border-border bg-muted/30"
        >
          <div
            className={cn(
              'min-h-10 w-full transform transition-all duration-300 ease-out',
              isTransitioning
                ? 'translate-y-1 opacity-65'
                : 'translate-y-0 opacity-100'
            )}
          >
            {itemCount > 0 ? (
              <div key={index} className="animate-fade-in">
                {items[index]}
              </div>
            ) : null}
          </div>
        </Box>
        <Box className="mt-3 flex items-center gap-2">
          <Button
            onClick={goToPrev}
            variant="ghost"
            size={size}
            disabled={itemCount < 2}
            className="transition-transform duration-200 hover:-translate-y-0.5"
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            onClick={goToNext}
            variant="ghost"
            size={size}
            disabled={itemCount < 2}
            className="transition-transform duration-200 hover:-translate-y-0.5"
          >
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
