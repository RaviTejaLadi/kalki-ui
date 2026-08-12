import React, {
  useState,
  useLayoutEffect,
  forwardRef,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import { cn } from '@/utils';

/**
 * Props for the Ripple material-style click effect.
 */
interface RippleProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Animation duration in milliseconds @default 850 */
  duration?: number;
  /** Ripple fill color @default 'rgba(255, 255, 255, 0.7)' */
  color?: string;
}

const useDebouncedRippleCleanUp = (
  rippleCount: number,
  duration: number,
  cleanUpFunction: () => void
) => {
  useLayoutEffect(() => {
    let bounce: ReturnType<typeof setTimeout> | null = null;
    if (rippleCount > 0) {
      bounce = setTimeout(() => {
        cleanUpFunction();
      }, duration * 4);
    }
    return () => {
      if (bounce) {
        clearTimeout(bounce);
      }
    };
  }, [rippleCount, duration, cleanUpFunction]);
};

/**
 * A material-style ripple overlay that reacts to clicks on its parent element.
 *
 * Place inside a relatively positioned parent; ripples originate from click points.
 *
 * @component
 * @example
 * ```tsx
 * <button className="relative overflow-hidden">
 *   Click me
 *   <Ripple color="rgba(255,255,255,0.5)" duration={600} />
 * </button>
 * ```
 *
 * @param {RippleProps} props - The component props
 * @param {number} [props.duration=850] - Ripple animation duration in ms
 * @param {string} [props.color='rgba(255, 255, 255, 0.7)'] - Ripple fill color
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.CSSProperties} [props.style] - Additional inline styles
 * @param {React.Ref<HTMLDivElement>} ref - Forwarded ref to the ripple container
 *
 * @returns {JSX.Element} An absolute overlay that renders animated ripple spans
 */
const Ripple = forwardRef<HTMLDivElement, RippleProps>(
  (
    {
      duration = 850,
      color = 'rgba(255, 255, 255, 0.7)',
      className,
      style,
      ...rest
    },
    ref
  ) => {
    const [rippleArray, setRippleArray] = useState<
      { x: number; y: number; size: number }[]
    >([]);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const combinedRef = (node: HTMLDivElement) => {
      containerRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    const clearRipples = useCallback(() => {
      setRippleArray([]);
    }, []);

    useDebouncedRippleCleanUp(rippleArray.length, duration, clearRipples);

    // Find the parent element to attach the click listener
    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const parent = container.parentElement;
      if (!parent) return;

      const handleParentClick = (event: globalThis.MouseEvent) => {
        const rect = parent.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        setRippleArray((prev) => [...prev, { x, y, size }]);
      };

      // Use plain DOM event listener since we're attaching to parent
      parent.addEventListener('mousedown', handleParentClick);

      return () => {
        parent.removeEventListener('mousedown', handleParentClick);
      };
    }, []);

    return (
      <div
        ref={combinedRef}
        className={cn(
          'absolute inset-0 overflow-hidden pointer-events-none',
          className
        )}
        style={{
          ...style,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        {...rest}
      >
        {rippleArray.map((ripple, index) => (
          <span
            key={`ripple_${index}`}
            className="absolute pointer-events-none"
            style={{
              top: ripple.y,
              left: ripple.x,
              width: ripple.size,
              height: ripple.size,
              backgroundColor: color,
              borderRadius: '50%',
              animation: `ripple ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
              position: 'absolute',
              transform: 'scale(0)',
              opacity: '0.3',
              animationFillMode: 'forwards',
            }}
          />
        ))}
      </div>
    );
  }
);

Ripple.displayName = 'Ripple';

export { Ripple };
export type { RippleProps };
