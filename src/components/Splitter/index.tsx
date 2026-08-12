import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  forwardRef,
  KeyboardEvent,
} from 'react';
import { Box } from '../Box';
import { useMergedRef } from '@/hooks/useMergedRef';
import { cn } from '@/utils';
import { GripHorizontal, GripVertical } from 'lucide-react';

/**
 * Props for the resizable Splitter container.
 */
interface SplitterProps {
  /** Split axis @default 'horizontal' */
  orientation?: 'horizontal' | 'vertical';
  /** CSS height of the splitter @default '100%' */
  height?: string;
  /** Pane children (`Splitter.Pane`) */
  children: React.ReactNode;
  /** Show grip icons on resize handles @default true */
  withHandle?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Props for an individual Splitter pane.
 */
interface SplitterPaneProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Pane content */
  children: React.ReactNode;
  /** Starting size as `%` or `px` */
  initialSize?: string;
  /** Minimum size as `%` or `px` */
  minSize?: string;
  /** Maximum size as `%` or `px` */
  maxSize?: string;
  /** Additional CSS classes */
  className?: string;
}

const parseSizeToPixels = (
  size: string | number,
  containerSize: number
): number | null => {
  if (typeof size === 'number') return size;
  if (typeof size === 'string') {
    if (size.endsWith('%')) {
      return (parseFloat(size) / 100) * containerSize;
    }
    if (size.endsWith('px')) {
      return parseFloat(size);
    }
  }
  return null;
};

const useResizeHandle = (
  initialSizes: string[],
  minSizes: string[],
  maxSizes: string[],
  orientation: 'horizontal' | 'vertical' = 'horizontal'
) => {
  const [sizes, setSizes] = useState(initialSizes);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleResize = useCallback(
    (index: number, e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (!containerRef.current) return;

      const startPos = orientation === 'horizontal' ? e.clientX : e.clientY;
      const containerSize =
        orientation === 'horizontal'
          ? containerRef.current.offsetWidth
          : containerRef.current.offsetHeight;
      if (!containerSize) return;

      const startSizes = [...sizes];

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const currentPos =
          orientation === 'horizontal' ? moveEvent.clientX : moveEvent.clientY;
        const diff = currentPos - startPos;

        const newSizes = startSizes.map((size, i) => {
          if (i === index || i === index + 1) {
            const currentSize = parseSizeToPixels(size, containerSize) ?? 0;
            const minSize = parseSizeToPixels(minSizes[i], containerSize) || 0;
            const maxSize =
              parseSizeToPixels(maxSizes[i], containerSize) || containerSize;

            let newSize = i === index ? currentSize + diff : currentSize - diff;
            newSize = Math.max(minSize, Math.min(maxSize, newSize));
            return `${(newSize / containerSize) * 100}%`;
          }
          return size;
        });

        setSizes(newSizes);
      };

      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [sizes, minSizes, maxSizes, orientation]
  );

  const resizeByKeyboard = useCallback(
    (index: number, deltaPercent: number) => {
      setSizes((prev) => {
        const next = [...prev];
        const left = parseFloat(prev[index]) || 0;
        const right = parseFloat(prev[index + 1]) || 0;
        const newLeft = Math.max(5, Math.min(95, left + deltaPercent));
        const appliedDelta = newLeft - left;
        next[index] = `${newLeft}%`;
        next[index + 1] = `${Math.max(5, right - appliedDelta)}%`;
        return next;
      });
    },
    []
  );

  return [
    sizes,
    handleResize,
    containerRef,
    setSizes,
    resizeByKeyboard,
  ] as const;
};

const ResizeHandle = React.memo(
  ({
    onMouseDown,
    onKeyDown,
    orientation = 'horizontal',
    withHandle,
    valueNow,
  }: {
    onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
    onKeyDown: (e: KeyboardEvent<HTMLDivElement>) => void;
    orientation: 'horizontal' | 'vertical';
    withHandle?: boolean;
    valueNow?: number;
  }) => (
    <div
      role="separator"
      aria-orientation={orientation}
      aria-valuenow={valueNow}
      aria-valuemin={5}
      aria-valuemax={95}
      tabIndex={0}
      className={cn(
        'flex items-center justify-center border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        orientation === 'horizontal'
          ? 'w-[.5px] cursor-ew-resize'
          : 'h-[.5px] cursor-ns-resize'
      )}
      onMouseDown={onMouseDown}
      onKeyDown={onKeyDown}
    >
      {withHandle && orientation === 'horizontal' ? (
        <Box
          width="12px"
          height="13px"
          className="flex items-center justify-center rounded bg-background"
          padding="1px"
          outlined
        >
          <GripVertical
            className="text-[var(--icon-color)] size-3"
            aria-hidden="true"
          />
        </Box>
      ) : (
        <Box
          width="15px"
          height="10px"
          className="flex items-center justify-center rounded bg-background"
          padding="1px"
          outlined
        >
          <GripHorizontal
            className="text-[var(--icon-color)] size-3"
            aria-hidden="true"
          />
        </Box>
      )}
    </div>
  )
);

/**
 * A resizable multi-pane layout with drag and keyboard-accessible handles.
 *
 * @component
 * @example
 * ```tsx
 * <Splitter orientation="horizontal" height="400px">
 *   <Splitter.Pane initialSize="30%" minSize="20%">Sidebar</Splitter.Pane>
 *   <Splitter.Pane initialSize="70%">Content</Splitter.Pane>
 * </Splitter>
 * ```
 *
 * @param {SplitterProps} props - The component props
 * @param {'horizontal'|'vertical'} [props.orientation='horizontal'] - Split axis
 * @param {string} [props.height='100%'] - Container height
 * @param {boolean} [props.withHandle=true] - Show grip icons on handles
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.ReactNode} props.children - Splitter.Pane children
 * @param {React.Ref<HTMLDivElement>} ref - Forwarded ref to the container
 *
 * @returns {JSX.Element} A resizable pane layout
 */
const Splitter = forwardRef<HTMLDivElement, SplitterProps>(
  (
    {
      orientation = 'horizontal',
      height = '100%',
      children,
      withHandle = true,
      className,
    },
    ref
  ) => {
    const panes = React.Children.toArray(
      children
    ) as React.ReactElement<SplitterPaneProps>[];
    const initialSizes = panes.map(
      (pane) => pane.props.initialSize || `${100 / panes.length}%`
    );
    const minSizes = panes.map((pane) => pane.props.minSize || '0%');
    const maxSizes = panes.map((pane) => pane.props.maxSize || '100%');

    const [sizes, handleResize, containerRef, setSizes, resizeByKeyboard] =
      useResizeHandle(initialSizes, minSizes, maxSizes, orientation);
    const mergedRef = useMergedRef(ref, containerRef);

    useEffect(() => {
      if (!containerRef.current) return;

      const containerSize =
        orientation === 'horizontal'
          ? containerRef.current.offsetWidth
          : containerRef.current.offsetHeight;
      if (!containerSize) return;

      const newSizes = initialSizes.map((size) => {
        const pxSize =
          parseSizeToPixels(size, containerSize) ??
          containerSize / panes.length;
        return `${(pxSize / containerSize) * 100}%`;
      });
      setSizes(newSizes);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <div
        className={cn(
          'flex',
          orientation === 'horizontal' ? 'flex-row' : 'flex-col',
          'w-full h-full border border-border',
          className
        )}
        style={{ height }}
        ref={mergedRef}
      >
        {panes.map((pane, index) => (
          <React.Fragment key={pane.key ?? `pane-${index}`}>
            <div
              className="overflow-auto"
              style={{
                [orientation === 'horizontal' ? 'width' : 'height']:
                  sizes[index],
              }}
            >
              {React.cloneElement(pane, {
                style: { height: '100%', width: '100%' },
              })}
            </div>
            {index < panes.length - 1 && (
              <ResizeHandle
                withHandle={withHandle}
                valueNow={parseFloat(sizes[index]) || undefined}
                onMouseDown={(e) => handleResize(index, e)}
                onKeyDown={(e) => {
                  const step = e.shiftKey ? 5 : 2;
                  if (orientation === 'horizontal') {
                    if (e.key === 'ArrowLeft') {
                      e.preventDefault();
                      resizeByKeyboard(index, -step);
                    } else if (e.key === 'ArrowRight') {
                      e.preventDefault();
                      resizeByKeyboard(index, step);
                    }
                  } else {
                    if (e.key === 'ArrowUp') {
                      e.preventDefault();
                      resizeByKeyboard(index, -step);
                    } else if (e.key === 'ArrowDown') {
                      e.preventDefault();
                      resizeByKeyboard(index, step);
                    }
                  }
                }}
                orientation={orientation}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  }
);

/**
 * A content pane inside a Splitter with optional size constraints.
 *
 * @component
 * @example
 * ```tsx
 * <Splitter.Pane initialSize="40%" minSize="15%" maxSize="80%">
 *   Panel content
 * </Splitter.Pane>
 * ```
 *
 * @param {SplitterPaneProps} props - The component props
 * @param {React.ReactNode} props.children - Pane content
 * @param {string} [props.initialSize] - Starting size (`%` or `px`)
 * @param {string} [props.minSize] - Minimum size (`%` or `px`)
 * @param {string} [props.maxSize] - Maximum size (`%` or `px`)
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.Ref<HTMLDivElement>} ref - Forwarded ref to the pane
 *
 * @returns {JSX.Element} A scrollable pane container
 */
const SplitterPane = forwardRef<HTMLDivElement, SplitterPaneProps>(
  ({ children, className, ...rest }, ref) => (
    <div ref={ref} className={cn('h-full overflow-auto', className)} {...rest}>
      {children}
    </div>
  )
);

SplitterPane.displayName = 'SplitterPane';
Splitter.displayName = 'Splitter';
ResizeHandle.displayName = 'ResizeHandle';

export { Splitter, SplitterPane };
export type { SplitterProps, SplitterPaneProps };
