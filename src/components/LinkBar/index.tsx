import React, {
  useRef,
  forwardRef,
  createContext,
  AnchorHTMLAttributes,
  HTMLAttributes,
  ReactNode,
  RefObject,
  useContext,
  MouseEvent,
} from 'react';
import { cn } from '@/utils';
import { cva, VariantProps } from 'class-variance-authority';
import Button from '../Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from '../Link';

// #region linkVariants
const linkVariants = cva(
  'inline-flex items-center px-2 mx-1 text-sm font-medium rounded-md transition-all duration-200',
  {
    variants: {
      variant: {
        default:
          'text-foreground dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-100/10',
        active: 'text-foreground dark:bg-blue-200/10',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);
// #endregion

// #region linkBarVariants
const linkBarVariants = cva('flex items-center justify-center transition-all', {
  variants: {
    variant: {
      primary: 'border-2 border-blue-200 dark:border-blue-200/20',
      secondary: 'border border-gray-300 dark:border-gray-300/10',
      success: 'border border-green-200 dark:border-green-200/10',
      danger: 'border border-red-200 dark:border-red-200/10',
      warning: 'border border-yellow-200 dark:border-yellow-200/10',
      info: 'border border-cyan-200 dark:border-cyan-200/10',
      help: 'border border-purple-200 dark:border-purple-200/10',
      light: 'border border-gray-100',
      dark: 'border border-gray-400 dark:border-gray-400/10',
      default:
        'bg-background dark:bg-inherit border-b border-gray-200 dark:border-gray-200/10',
      outline: 'border border-gray-200/10 bg-white dark:bg-inherit shadow-sm',
    },
    size: {
      sm: 'h-10',
      md: 'h-12',
      lg: 'h-14',
    },
    rounded: {
      xs: 'rounded-xs',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      none: 'rounded-none',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'sm',
    rounded: 'none',
  },
});
// #endregion

// #region types
interface LinkBarContextValue {
  activeUrl?: string;
  onUrlChange?: (url: string) => void;
  scrollRef?: RefObject<HTMLDivElement>;
}

interface LinkBarProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof linkBarVariants> {
  activeUrl?: string;
  onUrlChange?: (url: string) => void;
}

interface LinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'ref'> {
  to: string;
  icon?: ReactNode;
  iconPosition?: 'start' | 'end';
  target?: '_blank' | '_self' | '_parent' | '_top';
}

interface ControlsProps {
  position: 'left' | 'right';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  rounded?: 'xs' | 'sm' | 'md' | 'lg' | 'none';
  variant?:
    | 'ghost'
    | 'outline'
    | 'link'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'help'
    | 'light'
    | 'dark';
}

interface LinkBarContentProps {
  children: ReactNode;
  className?: string;
}
// #endregion

// #region Context
const LinkBarContext = createContext<LinkBarContextValue>({});
//

// #region LinkBar
const LinkBar = forwardRef<HTMLDivElement, LinkBarProps>(
  (
    {
      children,
      className,
      variant,
      size,
      rounded,
      activeUrl,
      onUrlChange,
      ...props
    },
    ref
  ) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    return (
      <LinkBarContext.Provider value={{ activeUrl, onUrlChange, scrollRef }}>
        <div
          ref={ref}
          className={cn(linkBarVariants({ variant, size, rounded }), className)}
          {...props}
        >
          {children}
        </div>
      </LinkBarContext.Provider>
    );
  }
);

LinkBar.displayName = 'LinkBar';

const LinkBarContent = ({
  children,
  className,
  ...props
}: LinkBarContentProps) => {
  const { scrollRef } = useContext(LinkBarContext);

  return (
    <div
      ref={scrollRef}
      className={cn(
        'flex items-center gap-1 flex-grow overflow-x-auto scrollbar-none scroll-smooth',
        className
      )}
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      {...props}
    >
      {children}
    </div>
  );
};

const LinkBarControl = forwardRef<HTMLDivElement, ControlsProps>(
  ({ position, size = 'sm', variant = 'ghost' }, ref) => {
    const { scrollRef } = useContext(LinkBarContext);

    const scroll = (direction: 'left' | 'right') => {
      if (!scrollRef?.current) return;

      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    };

    const isLeft = position === 'left';
    const baseStyles = ' z-10';
    const positionStyles = isLeft ? 'left-1' : 'right-1';
    const gradientStyles = isLeft
      ? 'bg-gradient-to-r from-white via-white to-transparent'
      : 'bg-gradient-to-l from-white via-white to-transparent';

    return (
      <div ref={ref} className={cn(baseStyles, positionStyles, 'p-1')}>
        <div className={cn('inset-0 opacity-80', gradientStyles)} />
        <Button
          size={size}
          variant={variant}
          onClick={() => scroll(isLeft ? 'left' : 'right')}
        >
          {isLeft ? (
            <ChevronLeft className="size-3" />
          ) : (
            <ChevronRight className="size-3" />
          )}
        </Button>
      </div>
    );
  }
);
LinkBarControl.displayName = 'LinkBarControl';

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

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
      onClick?.(e);
      onUrlChange?.(to);
    };

    const isActive = activeUrl === to;

    return (
      <Link
        ref={ref}
        to={to}
        target={target}
        className={cn(
          linkVariants({
            variant: isActive ? 'active' : 'default',
          }),
          'h-7',
          className
        )}
        onClick={handleClick}
        {...props}
      >
        {icon && iconPosition === 'start' && (
          <span className="mr-1.5 flex items-center">{icon}</span>
        )}
        <span className="whitespace-nowrap">{children}</span>
        {icon && iconPosition === 'end' && (
          <span className="ml-1.5 flex items-center">{icon}</span>
        )}
      </Link>
    );
  }
);
LinkBarLink.displayName = 'LinkBar.Link';
// #endregion

// #region exports
export default Object.assign(
  LinkBar as React.ForwardRefExoticComponent<
    LinkBarProps & React.RefAttributes<HTMLDivElement>
  >,
  {
    Content: LinkBarContent,
    Link: LinkBarLink,
    Control: LinkBarControl,
  }
);

export {
  LinkBarContent,
  LinkBarLink,
  LinkBarControl,
  linkVariants,
  linkBarVariants,
};
export type { LinkBarProps, LinkProps, ControlsProps, LinkBarContentProps };

// #endregion
