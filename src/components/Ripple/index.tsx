import React, {
  useState,
  useLayoutEffect,
  forwardRef,
  MouseEvent,
} from 'react';
import { cn } from '@/utils';

// #region types
interface RippleProps extends React.HTMLAttributes<HTMLDivElement> {
  duration?: number;
  color?: string;
}
// #endregion

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

// #region Ripple
const Ripple = forwardRef<HTMLDivElement, RippleProps>(
  ({ duration = 850, color = '#fff', className, style, ...rest }, ref) => {
    const [rippleArray, setRippleArray] = useState<
      { x: number; y: number; size: number }[]
    >([]);

    useDebouncedRippleCleanUp(rippleArray.length, duration, () => {
      setRippleArray([]);
    });

    const addRipple = (event: MouseEvent<HTMLDivElement>) => {
      const rippleContainer = event.currentTarget.getBoundingClientRect();
      const size =
        rippleContainer.width > rippleContainer.height
          ? rippleContainer.width
          : rippleContainer.height;
      const x = event.pageX - rippleContainer.x - size / 2;
      const y = event.pageY - rippleContainer.y - size / 2;
      const newRipple = { x, y, size };
      setRippleArray((prev) => [...prev, newRipple]);
    };

    return (
      <div
        ref={ref}
        className={cn('relative overflow-hidden', className)}
        style={style}
        onMouseDown={addRipple}
        {...rest}
      >
        {rippleArray.map((ripple, index) => (
          <span
            key={index}
            style={{
              top: ripple.y,
              left: ripple.x,
              width: ripple.size,
              height: ripple.size,
              backgroundColor: color,
              animationDuration: `${duration}ms`,
            }}
            className="absolute rounded-full opacity-75 scale-0 animate-ripple"
          />
        ))}
      </div>
    );
  }
);

Ripple.displayName = 'Ripple';
// #endregion

// #region export
export default Ripple;
// #endregion
