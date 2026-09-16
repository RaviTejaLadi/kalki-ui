import {
  AnchorHTMLAttributes,
  HTMLAttributes,
  MouseEvent,
  ReactNode,
  RefObject,
  createContext,
  forwardRef,
  useContext,
  useRef,
} from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';
import { Button } from '../Button';
import { Link } from '../Link';

const linkVariants = cva(
  'inline-flex h-8 items-center gap-1.5 whitespace-nowrap rounded-md px-2.5 text-sm font-medium transition-colors duration-200',
  {
    variants: {
      active: {
        true: 'bg-muted text-foreground',
        false: 'text-muted-foreground hover:bg-muted hover:text-foreground',
      },
    },
    defaultVariants: {
      active: false,
    },
  }
);

const linkBarVariants = cva(
  'flex items-center gap-1 overflow-hidden border border-border bg-background transition-colors duration-200',
  {
    variants: {
      size: {
        sm: 'min-h-10',
        md: 'min-h-12',
        lg: 'min-h-14',
      },
      rounded: {
        xs: 'rounded-sm',
        sm: 'rounded',
        md: 'rounded-md',
        lg: 'rounded-lg',
        none: 'rounded-none',
      },
    },
    defaultVariants: {
      size: 'sm',
      rounded: 'none',
    },
  }
);

const controlRoundedClassMap: Record<
  NonNullable<ControlsProps['rounded']>,
  string
> = {
  xs: 'rounded-sm',
  sm: 'rounded',
  md: 'rounded-md',
  lg: 'rounded-lg',
  none: 'rounded-none',
};

interface LinkBarContextValue {
  activeUrl?: string;
  onUrlChange?: (url: string) => void;
  scrollRef?: RefObject<HTMLDivElement | null>;
}

interface LinkBarProps
  extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof linkBarVariants> {
  activeUrl?: string;
  onUrlChange?: (url: string) => void;
}

interface LinkProps extends Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'ref'
> {
  to: string;
  icon?: ReactNode;
  iconPosition?: 'start' | 'end';
  target?: '_blank' | '_self' | '_parent' | '_top';
}

interface ControlsProps {
  position: 'left' | 'right';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  rounded?: 'xs' | 'sm' | 'md' | 'lg' | 'none';
}

interface LinkBarContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

const LinkBarContext = createContext<LinkBarContextValue>({});

/**
 * Horizontal link container with optional overflow controls.
 */
const LinkBar = forwardRef<HTMLDivElement, LinkBarProps>(
  (
    { children, className, size, rounded, activeUrl, onUrlChange, ...props },
    ref
  ) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    return (
      <LinkBarContext.Provider value={{ activeUrl, onUrlChange, scrollRef }}>
        <div
          ref={ref}
          className={cn(linkBarVariants({ size, rounded }), className)}
          {...props}
        >
          {children}
        </div>
      </LinkBarContext.Provider>
    );
  }
);

/**
 * Scrollable content region that holds LinkBarLink children.
 */
const LinkBarContent = ({
  children,
  className,
  ...props
}: LinkBarContentProps) => {
  const { scrollRef } = useContext(LinkBarContext);
  return (
    <div
      ref={scrollRef as RefObject<HTMLDivElement>}
      className={cn(
        'flex grow items-center gap-1 overflow-x-auto px-1 py-1 scrollbar-none',
        className
      )}
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * Control button used to scroll LinkBarContent left or right.
 */
const LinkBarControl = forwardRef<HTMLDivElement, ControlsProps>(
  ({ position, size = 'sm', rounded = 'sm' }, ref) => {
    const { scrollRef } = useContext(LinkBarContext);
    const roundedClass = controlRoundedClassMap[rounded];

    const scroll = (direction: 'left' | 'right') => {
      if (!scrollRef?.current) return;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -200 : 200,
        behavior: 'smooth',
      });
    };

    return (
      <div ref={ref} className="shrink-0 p-1">
        <Button
          size={size}
          variant="ghost"
          className={roundedClass}
          onClick={() => scroll(position)}
          aria-label={`Scroll ${position}`}
        >
          {position === 'left' ? (
            <ChevronLeft className="size-3.5" />
          ) : (
            <ChevronRight className="size-3.5" />
          )}
        </Button>
      </div>
    );
  }
);

/**
 * Interactive link item with optional icon and active-state styling.
 */
const LinkBarLink = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      to,
      children,
      icon,
      iconPosition = 'start',
      className,
      onClick,
      target,
      ...props
    },
    ref
  ) => {
    const { activeUrl, onUrlChange } = useContext(LinkBarContext);
    const isActive = activeUrl === to;

    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
      onClick?.(event);
      if (!event.defaultPrevented) {
        onUrlChange?.(to);
      }
    };

    return (
      <Link
        ref={ref}
        to={to}
        target={target}
        className={cn(linkVariants({ active: isActive }), className)}
        onClick={handleClick}
        {...props}
      >
        {icon && iconPosition === 'start' ? (
          <span className="flex items-center">{icon}</span>
        ) : null}
        <span>{children}</span>
        {icon && iconPosition === 'end' ? (
          <span className="flex items-center">{icon}</span>
        ) : null}
      </Link>
    );
  }
);

LinkBar.displayName = 'LinkBar';
LinkBarControl.displayName = 'LinkBarControl';
LinkBarLink.displayName = 'LinkBarLink';

export {
  LinkBar,
  LinkBarContent,
  LinkBarLink,
  LinkBarControl,
  linkBarVariants,
  linkVariants,
};
export type { LinkBarProps, LinkProps, ControlsProps };
