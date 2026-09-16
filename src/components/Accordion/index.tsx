import {
  CSSProperties,
  ReactNode,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { ChevronDown } from 'lucide-react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';

const accordionVariants = cva(
  'w-full overflow-hidden rounded-lg border border-border bg-background text-foreground',
  {
    variants: {
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl',
        '2xl': 'text-2xl',
      },
    },
    defaultVariants: {
      size: 'sm',
    },
  }
);

type AccordionSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/**
 * Root accordion container that manages open/close state for nested items.
 */
interface AccordionProps extends VariantProps<typeof accordionVariants> {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  size?: AccordionSize;
}

interface AccordionItemProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/**
 * The clickable header that toggles an accordion item open or closed.
 *
 * @component
 * @example
 * ```tsx
 * <AccordionHeader eventKey="1">Section title</AccordionHeader>
 * ```
 */
interface AccordionHeaderProps {
  children: ReactNode;
  eventKey: string;
  open?: boolean;
  icon?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

interface AccordionBodyProps {
  children: ReactNode;
  eventKey: string;
  className?: string;
  style?: CSSProperties;
}

interface AccordionContextType {
  activeKeys: Set<string>;
  toggleItem: (eventKey: string) => void;
  openItem: (eventKey: string) => void;
  closeItem: (eventKey: string) => void;
  size: AccordionSize;
}

const headerSizeMap: Record<AccordionSize, string> = {
  sm: 'min-h-10 px-3 py-2',
  md: 'min-h-11 px-3.5 py-2.5',
  lg: 'min-h-12 px-4 py-3',
  xl: 'min-h-[3.25rem] px-4 py-3',
  '2xl': 'min-h-14 px-5 py-3',
};

const bodySizeMap: Record<AccordionSize, string> = {
  sm: 'px-3 pb-3 pt-2',
  md: 'px-3.5 pb-3.5 pt-2.5',
  lg: 'px-4 pb-4 pt-3',
  xl: 'px-4 pb-4 pt-3',
  '2xl': 'px-5 pb-4 pt-3',
};

const AccordionContext = createContext<AccordionContextType | null>(null);

/**
 * Container component for grouping accordion items with shared behavior.
 */
const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  ({ children, size = 'sm', className, style, ...rest }, ref) => {
    const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set());

    const toggleItem = useCallback((eventKey: string) => {
      setActiveKeys((prevKeys) => {
        const next = new Set(prevKeys);
        if (next.has(eventKey)) {
          next.delete(eventKey);
        } else {
          next.add(eventKey);
        }
        return next;
      });
    }, []);

    const openItem = useCallback((eventKey: string) => {
      setActiveKeys((prevKeys) => new Set(prevKeys).add(eventKey));
    }, []);

    const closeItem = useCallback((eventKey: string) => {
      setActiveKeys((prevKeys) => {
        const next = new Set(prevKeys);
        next.delete(eventKey);
        return next;
      });
    }, []);

    const contextValue = useMemo(
      () => ({ activeKeys, toggleItem, openItem, closeItem, size }),
      [activeKeys, closeItem, openItem, size, toggleItem]
    );

    return (
      <AccordionContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(accordionVariants({ size }), className)}
          style={style}
          {...rest}
        >
          {children}
        </div>
      </AccordionContext.Provider>
    );
  }
);

const AccordionBody = ({
  children,
  eventKey,
  className,
  style,
  ...rest
}: AccordionBodyProps) => {
  const context = useContext(AccordionContext);
  const contentRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState('0px');

  if (!context) {
    throw new Error('AccordionBody must be used within an Accordion');
  }

  const isActive = context.activeKeys.has(eventKey);

  useEffect(() => {
    if (!contentRef.current) return;
    setMaxHeight(isActive ? `${contentRef.current.scrollHeight}px` : '0px');
  }, [isActive, children]);

  return (
    <div
      className={cn(
        'overflow-hidden transition-[max-height] duration-300 ease-out',
        className
      )}
      style={{ ...style, maxHeight }}
      {...rest}
    >
      <div
        ref={contentRef}
        id={`accordion-body-${eventKey}`}
        className={cn(bodySizeMap[context.size], 'text-muted-foreground')}
      >
        {children}
      </div>
    </div>
  );
};

/**
 * The clickable header that toggles an accordion item open or closed.
 *
 * @component
 * @example
 * ```tsx
 * <AccordionHeader eventKey="1">Section title</AccordionHeader>
 * ```
 *
 * @param {AccordionHeaderProps} props - The component props
 * @param {ReactNode} props.children - Header label content
 * @param {string} props.eventKey - Unique key used to open/close this item
 * @param {boolean} [props.open] - Controlled open state
 * @param {ReactNode} [props.icon] - Custom expand/collapse icon
 * @param {string} [props.className] - Additional CSS classes
 * @param {CSSProperties} [props.style] - Inline styles
 *
 * @returns {JSX.Element} A keyboard-accessible accordion header button
 */
const AccordionHeader = ({
  children,
  eventKey,
  icon,
  open,
  className,
  style,
  ...rest
}: AccordionHeaderProps) => {
  const context = useContext(AccordionContext);

  if (!context) {
    throw new Error('AccordionHeader must be used within an Accordion');
  }

  const { activeKeys, toggleItem, openItem, closeItem, size } = context;
  const isActive = activeKeys.has(eventKey);

  useEffect(() => {
    if (open === true && !isActive) {
      openItem(eventKey);
    } else if (open === false && isActive) {
      closeItem(eventKey);
    }
  }, [closeItem, eventKey, isActive, open, openItem]);

  return (
    <button
      type="button"
      aria-expanded={isActive}
      aria-controls={`accordion-body-${eventKey}`}
      onClick={() => toggleItem(eventKey)}
      className={cn(
        'flex w-full items-center justify-between text-left font-medium transition-colors duration-200',
        headerSizeMap[size],
        isActive
          ? 'bg-muted text-foreground'
          : 'text-foreground hover:bg-muted',
        className
      )}
      style={style}
      {...rest}
    >
      <span className="truncate">{children}</span>
      {icon || (
        <ChevronDown
          className={cn(
            'size-4 shrink-0 transition-transform',
            isActive && 'rotate-180'
          )}
        />
      )}
    </button>
  );
};

/**
 * Wrapper for a single accordion section (header + body).
 */
const AccordionItem = ({
  children,
  className,
  style,
  ...rest
}: AccordionItemProps) => (
  <div
    className={cn('border-b border-border last:border-b-0', className)}
    style={style}
    {...rest}
  >
    {children}
  </div>
);

Accordion.displayName = 'Accordion';
AccordionBody.displayName = 'AccordionBody';
AccordionHeader.displayName = 'AccordionHeader';
AccordionItem.displayName = 'AccordionItem';

export {
  Accordion,
  AccordionHeader,
  AccordionBody,
  AccordionItem,
  accordionVariants,
};
export type {
  AccordionSize,
  AccordionProps,
  AccordionItemProps,
  AccordionHeaderProps,
  AccordionBodyProps,
};
