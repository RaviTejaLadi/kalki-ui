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
import { Link } from '../Link';
import { Button } from '../Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
// #endregion linkVariants

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
      default: 'bg-background border-b border-gray-200 dark:border-gray-200/10',
      outline: 'border border-gray-200/10 bg-white shadow-sm',
    },
    size: {
      sm: 'h-10',
      md: 'h-12',
      lg: 'h-14',
    },
    rounded: {
      xs: 'rounded-sm',
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

// #endregion linkBarVariants

// #region types
interface LinkBarContextValue {
  activeUrl?: string;
  onUrlChange?: (url: string) => void;
  scrollRef?: RefObject<HTMLDivElement | null>;
}

/**
 * Props for the LinkBar root component.
 *
 * @interface LinkBarProps
 * @extends {HTMLAttributes<HTMLDivElement>}
 * @extends {VariantProps<typeof linkBarVariants>}
 *
 * @property {string} [activeUrl] - Currently active link URL used for active styling
 * @property {(url: string) => void} [onUrlChange] - Callback fired when a link is selected
 */
interface LinkBarProps
  extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof linkBarVariants> {
  /** Currently active link URL used for active styling */
  activeUrl?: string;
  /** Callback fired when a link is selected */
  onUrlChange?: (url: string) => void;
}

/**
 * Props for the LinkBar.Link item.
 *
 * @interface LinkProps
 * @extends {Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'ref'>}
 *
 * @property {string} to - Destination path or URL
 * @property {ReactNode} [icon] - Optional icon rendered beside the label
 * @property {'start' | 'end'} [iconPosition='start'] - Icon placement relative to the label
 * @property {'_blank' | '_self' | '_parent' | '_top'} [target] - Link target browsing context
 */
interface LinkProps extends Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'ref'
> {
  /** Destination path or URL */
  to: string;
  /** Optional icon rendered beside the label */
  icon?: ReactNode;
  /** Icon placement relative to the label */
  iconPosition?: 'start' | 'end';
  /** Link target browsing context */
  target?: '_blank' | '_self' | '_parent' | '_top';
}

/**
 * Props for the LinkBar.Control scroll buttons.
 *
 * @interface ControlsProps
 *
 * @property {'left' | 'right'} position - Side of the bar where the control is placed
 * @property {'xs' | 'sm' | 'md' | 'lg'} [size='sm'] - Button size
 * @property {'xs' | 'sm' | 'md' | 'lg' | 'none'} [rounded] - Button border radius
 * @property {'ghost' | 'outline' | 'link' | 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'help' | 'light' | 'dark'} [variant='ghost'] - Button visual variant
 */
interface ControlsProps {
  /** Side of the bar where the control is placed */
  position: 'left' | 'right';
  /** Button size */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /** Button border radius */
  rounded?: 'xs' | 'sm' | 'md' | 'lg' | 'none';
  /** Button visual variant */
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

/**
 * Props for the LinkBar.Content scrollable region.
 *
 * @interface LinkBarContentProps
 *
 * @property {ReactNode} children - Link items rendered inside the scrollable area
 * @property {string} [className] - Additional CSS classes for the content container
 */
interface LinkBarContentProps {
  /** Link items rendered inside the scrollable area */
  children: ReactNode;
  /** Additional CSS classes for the content container */
  className?: string;
}
// #endregion types

// #region context
const LinkBarContext = createContext<LinkBarContextValue>({});
// #endregion context

// #region components
/**
 * Horizontal navigation bar for links with optional scroll controls and active state.
 *
 * @component
 * @example
 * ```tsx
 * <LinkBar activeUrl="/home" onUrlChange={setUrl} variant="default" size="sm">
 *   <LinkBar.Control position="left" />
 *   <LinkBar.Content>
 *     <LinkBar.Link to="/home">Home</LinkBar.Link>
 *     <LinkBar.Link to="/docs">Docs</LinkBar.Link>
 *   </LinkBar.Content>
 *   <LinkBar.Control position="right" />
 * </LinkBar>
 * ```
 *
 * @param {LinkBarProps} props - The component props
 * @param {React.ReactNode} props.children - Compound LinkBar parts (Content, Link, Control)
 * @param {string} [props.className] - Additional CSS classes
 * @param {LinkBarProps['variant']} [props.variant='default'] - Visual style of the bar
 * @param {LinkBarProps['size']} [props.size='sm'] - Height size of the bar
 * @param {LinkBarProps['rounded']} [props.rounded='none'] - Border radius of the bar
 * @param {string} [props.activeUrl] - Active link URL
 * @param {(url: string) => void} [props.onUrlChange] - Active URL change handler
 * @param {React.Ref<HTMLDivElement>} ref - Forwarded ref to the root container
 *
 * @returns {JSX.Element} A styled link bar root with context provider
 */
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

/**
 * Scrollable content region that hosts LinkBar links.
 *
 * @component
 * @example
 * ```tsx
 * <LinkBar.Content>
 *   <LinkBar.Link to="/a">A</LinkBar.Link>
 *   <LinkBar.Link to="/b">B</LinkBar.Link>
 * </LinkBar.Content>
 * ```
 *
 * @param {LinkBarContentProps} props - The component props
 * @param {React.ReactNode} props.children - Links rendered in the scroll area
 * @param {string} [props.className] - Additional CSS classes
 *
 * @returns {JSX.Element} A horizontally scrollable content container
 */
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

/**
 * Scroll control button for shifting the LinkBar content left or right.
 *
 * @component
 * @example
 * ```tsx
 * <LinkBar.Control position="left" size="sm" variant="ghost" />
 * ```
 *
 * @param {ControlsProps} props - The component props
 * @param {'left' | 'right'} props.position - Control side and scroll direction
 * @param {'xs' | 'sm' | 'md' | 'lg'} [props.size='sm'] - Button size
 * @param {'ghost' | 'outline' | 'link' | 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'help' | 'light' | 'dark'} [props.variant='ghost'] - Button variant
 * @param {React.Ref<HTMLDivElement>} ref - Forwarded ref to the control wrapper
 *
 * @returns {JSX.Element} A chevron button that scrolls the link content
 */
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

/**
 * Navigational link item for use inside a LinkBar.
 *
 * @component
 * @example
 * ```tsx
 * <LinkBar.Link to="/settings" icon={<SettingsIcon />}>
 *   Settings
 * </LinkBar.Link>
 * ```
 *
 * @param {LinkProps} props - The component props
 * @param {string} props.to - Destination path or URL
 * @param {React.ReactNode} [props.children] - Link label
 * @param {React.ReactNode} [props.icon] - Optional leading/trailing icon
 * @param {'start' | 'end'} [props.iconPosition='start'] - Icon placement
 * @param {string} [props.className] - Additional CSS classes
 * @param {MouseEventHandler<HTMLAnchorElement>} [props.onClick] - Click handler
 * @param {'_blank' | '_self' | '_parent' | '_top'} [props.target] - Link target
 * @param {React.Ref<HTMLAnchorElement>} ref - Forwarded ref to the anchor
 *
 * @returns {JSX.Element} An active-aware LinkBar navigation item
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
// #endregion components

// #region exports
const LinkBarRoot = Object.assign(
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
  LinkBarRoot as LinkBar,
  LinkBarContent,
  LinkBarLink,
  LinkBarControl,
  linkBarVariants,
  linkVariants,
};
export type { LinkBarProps, LinkProps, ControlsProps };
// #endregion exports
