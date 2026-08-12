import * as React from 'react';
import {
  forwardRef,
  useState,
  useCallback,
  useMemo,
  ReactNode,
  CSSProperties,
  createContext,
  useContext,
  useRef,
  useEffect,
  KeyboardEvent,
} from 'react';
import { cn } from '@/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { ChevronDown } from 'lucide-react';

// #region accordionVariants
const accordionVariants = cva(
  'w-full border-[.5px] dark:border-gray-200/10 rounded-md overflow-hidden',
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

// #endRegion

// #region types
type AccordionVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'help'
  | 'info'
  | 'dark'
  | 'light';

type AccordionSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface AccordionProps extends VariantProps<typeof accordionVariants> {
  /** Accordion item children */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Inline styles */
  style?: CSSProperties;
  /** Visual style variant for active headers */
  variant?: AccordionVariant;
  /** Text and header size */
  size?: AccordionSize;
}

interface AccordionItemProps {
  /** Header and body content for this item */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Inline styles */
  style?: CSSProperties;
}

interface AccordionHeaderProps {
  /** Header label content */
  children: ReactNode;
  /** Unique key used to open/close this item */
  eventKey: string;
  /** Controlled open state; syncs with accordion context when set */
  open?: boolean;
  /** Custom expand/collapse icon; defaults to a chevron */
  icon?: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Inline styles */
  style?: CSSProperties;
}

interface AccordionBodyProps {
  /** Collapsible panel content */
  children: ReactNode;
  /** Unique key matching the related header */
  eventKey: string;
  /** Additional CSS classes */
  className?: string;
  /** Inline styles */
  style?: CSSProperties;
}

interface AccordionContextType {
  /** Set of currently open item keys */
  activeKeys: Set<string>;
  /** Toggle an item open or closed */
  toggleItem: (eventKey: string) => void;
  /** Open an item by key */
  openItem: (eventKey: string) => void;
  /** Close an item by key */
  closeItem: (eventKey: string) => void;
  /** Active header color variant */
  variant: AccordionVariant;
  /** Accordion size */
  size: AccordionSize;
}
// #endRegion

// #region utils
export const backgroundColorMap: Record<AccordionVariant, string> = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  success: 'bg-success',
  danger: 'bg-danger',
  warning: 'bg-warning',
  help: 'bg-help',
  info: 'bg-info',
  dark: 'bg-dark',
  light: 'bg-light',
};

export const bodySizesMap: Record<AccordionSize, string> = {
  sm: 'h-auto px-3 py-2',
  md: 'h-auto p-2',
  lg: 'h-auto px-3 py-2',
  xl: 'h-auto px-4 py-2',
  '2xl': 'h-auto px-5 py-2',
};

export const sizesMap: Record<AccordionSize, string> = {
  sm: 'h-10',
  md: 'h-11',
  lg: 'h-12',
  xl: 'h-[3.25rem]',
  '2xl': 'h-14',
};
// #endRegion

// #region context
export const AccordionContext = createContext<AccordionContextType | null>(
  null
);
// #endRegion

// #region components
/**
 * A collapsible accordion container that manages open/closed item state.
 *
 * @component
 * @example
 * ```tsx
 * <Accordion variant="primary" size="md">
 *   <Accordion.Item>
 *     <Accordion.Header eventKey="1">Section 1</Accordion.Header>
 *     <Accordion.Body eventKey="1">Content for section 1</Accordion.Body>
 *   </Accordion.Item>
 * </Accordion>
 * ```
 *
 * @param {AccordionProps} props - The component props
 * @param {React.ReactNode} props.children - Accordion item children
 * @param {AccordionVariant} [props.variant='primary'] - Visual style variant for active headers
 * @param {AccordionSize} [props.size='sm'] - Text and header size
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.CSSProperties} [props.style] - Inline styles
 * @param {React.Ref<HTMLDivElement>} ref - Forwarded ref to the root element
 *
 * @returns {JSX.Element} An accordion container with context for child items
 */
const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  (
    { children, variant = 'primary', size = 'sm', className, style, ...rest },
    ref
  ) => {
    const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set());

    const toggleItem = useCallback((eventKey: string) => {
      setActiveKeys((prevKeys) => {
        const newKeys = new Set(prevKeys);
        if (newKeys.has(eventKey)) {
          newKeys.delete(eventKey);
        } else {
          newKeys.add(eventKey);
        }
        return newKeys;
      });
    }, []);

    const openItem = useCallback((eventKey: string) => {
      setActiveKeys((prevKeys) => new Set(prevKeys).add(eventKey));
    }, []);

    const closeItem = useCallback((eventKey: string) => {
      setActiveKeys((prevKeys) => {
        const newKeys = new Set(prevKeys);
        newKeys.delete(eventKey);
        return newKeys;
      });
    }, []);

    const contextValue = useMemo(
      () => ({
        activeKeys,
        toggleItem,
        openItem,
        closeItem,
        variant,
        size,
      }),
      [activeKeys, toggleItem, openItem, closeItem, variant, size]
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

Accordion.displayName = 'Accordion';

/**
 * The collapsible content panel of an accordion item.
 *
 * @component
 * @example
 * ```tsx
 * <Accordion.Body eventKey="1">Panel content</Accordion.Body>
 * ```
 *
 * @param {AccordionBodyProps} props - The component props
 * @param {React.ReactNode} props.children - Collapsible panel content
 * @param {string} props.eventKey - Unique key matching the related header
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.CSSProperties} [props.style] - Inline styles
 *
 * @returns {JSX.Element} An animated collapsible content panel
 */
const AccordionBody: React.FC<AccordionBodyProps> = ({
  children,
  eventKey,
  className,
  style,
  ...rest
}) => {
  const context = useContext(AccordionContext);
  const [maxHeight, setMaxHeight] = useState<string>('0px');
  const contentRef = useRef<HTMLDivElement>(null);

  if (!context)
    throw new Error('AccordionBody must be used within an Accordion');

  const { activeKeys, size } = context;
  const isActive = activeKeys.has(eventKey);
  const dimensions = bodySizesMap[size];

  useEffect(() => {
    if (contentRef.current) {
      setMaxHeight(isActive ? `${contentRef.current.scrollHeight}px` : '0px');
    }
  }, [isActive]);

  return (
    <div
      ref={contentRef}
      className={cn(
        'overflow-hidden transition-[max-height] duration-500 ease-in-out',
        className
      )}
      style={{ ...style, maxHeight }}
      {...rest}
    >
      <div className={cn('overflow-auto text-muted-foreground', dimensions)}>
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
 * <Accordion.Header eventKey="1">Section title</Accordion.Header>
 * ```
 *
 * @param {AccordionHeaderProps} props - The component props
 * @param {React.ReactNode} props.children - Header label content
 * @param {string} props.eventKey - Unique key used to open/close this item
 * @param {boolean} [props.open] - Controlled open state
 * @param {React.ReactNode} [props.icon] - Custom expand/collapse icon
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.CSSProperties} [props.style] - Inline styles
 *
 * @returns {JSX.Element} A keyboard-accessible accordion header button
 */
const AccordionHeader: React.FC<AccordionHeaderProps> = ({
  children,
  eventKey,
  icon,
  open,
  className,
  style,
  ...rest
}) => {
  const context = useContext(AccordionContext);
  if (!context)
    throw new Error('AccordionHeader must be used within an Accordion');

  const { activeKeys, toggleItem, openItem, closeItem, variant, size } =
    context;
  const isActive = activeKeys.has(eventKey);

  useEffect(() => {
    if (open === true && !isActive) {
      openItem(eventKey);
    } else if (open === false && isActive) {
      closeItem(eventKey);
    }
  }, [open, eventKey, openItem, closeItem, isActive]);

  const backgroundColor = isActive
    ? backgroundColorMap[variant]
    : 'bg-transparent';
  const dimensions = sizesMap[size];

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleItem(eventKey);
    }
  };
  return (
    <div
      className={cn(
        'flex justify-between font-medium items-center cursor-pointer text-foreground dark:text-foreground p-4 transition-colors duration-300',
        isActive ? 'text-white' : 'text-black',
        backgroundColor,
        dimensions,
        className
      )}
      tabIndex={0}
      role="button"
      onClick={() => toggleItem(eventKey)}
      onKeyDown={handleKeyDown}
      style={style}
      {...rest}
    >
      {children}
      {icon || (
        <ChevronDown
          className={cn(
            'transition-transform size-4',
            isActive ? 'rotate-180' : ''
          )}
        />
      )}
    </div>
  );
};

/**
 * A single accordion section wrapping a header and body.
 *
 * @component
 * @example
 * ```tsx
 * <Accordion.Item>
 *   <Accordion.Header eventKey="1">Title</Accordion.Header>
 *   <Accordion.Body eventKey="1">Content</Accordion.Body>
 * </Accordion.Item>
 * ```
 *
 * @param {AccordionItemProps} props - The component props
 * @param {React.ReactNode} props.children - Header and body content
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.CSSProperties} [props.style] - Inline styles
 *
 * @returns {JSX.Element} A bordered accordion item container
 */
const AccordionItem: React.FC<AccordionItemProps> = ({
  children,
  className,
  style,
  ...rest
}) => {
  return (
    <div
      className={cn('border-b border-input last:border-b-0', className)}
      style={style}
      {...rest}
    >
      {children}
    </div>
  );
};

// #endRegion

// #region exports
const AccordionRoot = Object.assign(
  Accordion as React.ForwardRefExoticComponent<
    AccordionProps & React.RefAttributes<HTMLDivElement>
  >,
  {
    Header: AccordionHeader,
    Body: AccordionBody,
    Item: AccordionItem,
  }
);

export {
  AccordionRoot as Accordion,
  AccordionHeader,
  AccordionBody,
  AccordionItem,
  accordionVariants,
};
export type {
  AccordionVariant,
  AccordionSize,
  AccordionProps,
  AccordionItemProps,
  AccordionHeaderProps,
  AccordionBodyProps,
};
// #endRegion
