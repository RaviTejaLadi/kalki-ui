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

//#region accordionVariants
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

//#endRegion

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
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  variant?: AccordionVariant;
  size?: AccordionSize;
}

interface AccordionItemProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

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
  variant: AccordionVariant;
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
  xl: 'h-13',
  '2xl': 'h-14',
};
// #endRegion

// #region context
export const AccordionContext = createContext<AccordionContextType | null>(
  null
);
// #endRegion

// #region components
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

    const contextValue = useMemo(
      () => ({
        activeKeys,
        toggleItem,
        openItem,
        variant,
        size,
      }),
      [activeKeys, toggleItem, openItem, variant, size]
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

  const { activeKeys, toggleItem, openItem, variant, size } = context;
  const isActive = activeKeys.has(eventKey);

  useEffect(() => {
    if (open && !isActive) {
      openItem(eventKey);
    }
  }, [open, eventKey, openItem, isActive]);

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

const AccordionItem: React.FC<AccordionItemProps> = ({
  children,
  className,
  style,
  ...rest
}) => {
  return (
    <div
      className={cn('border-b border-gray-200 last:border-b-0', className)}
      style={style}
      {...rest}
    >
      {children}
    </div>
  );
};

// #endRegion

// #region exports
export default Object.assign(
  Accordion as React.ForwardRefExoticComponent<
    AccordionProps & React.RefAttributes<HTMLDivElement>
  >,
  {
    Header: AccordionHeader,
    Body: AccordionBody,
    Item: AccordionItem,
  }
);

export { AccordionHeader, AccordionBody, AccordionItem, accordionVariants };
export type {
  AccordionVariant,
  AccordionSize,
  AccordionProps,
  AccordionItemProps,
  AccordionHeaderProps,
  AccordionBodyProps,
};
// #endRegion
