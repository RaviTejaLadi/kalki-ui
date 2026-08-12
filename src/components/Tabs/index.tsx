import React, {
  useState,
  ReactNode,
  CSSProperties,
  useCallback,
  useRef,
} from 'react';
import { cva } from 'class-variance-authority';
import { Box, type BoxProps } from '../Box';
import { cn } from '@/utils';

// #region tabButtonStyles
const tabButtonStyles = cva(
  'relative flex items-center justify-center rounded-md transition-all duration-300 ease-in-out mr-2 font-medium hover:shadow-sm group',
  {
    variants: {
      variant: {
        primary:
          'bg-blue-50 text-blue-800 hover:bg-blue-100 border border-blue-200 dark:bg-blue-900 dark:text-blue-100 dark:border-blue-800 dark:hover:bg-blue-800',
        secondary:
          'bg-gray-50 text-gray-800 hover:bg-gray-100 border border-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 dark:hover:bg-gray-700',
        success:
          'bg-green-50 text-green-800 hover:bg-green-100 border border-green-200 dark:bg-green-900 dark:text-green-100 dark:border-green-800 dark:hover:bg-green-800',
        danger:
          'bg-red-50 text-red-800 hover:bg-red-100 border border-red-200 dark:bg-red-900 dark:text-red-100 dark:border-red-800 dark:hover:bg-red-800',
        warning:
          'bg-yellow-50 text-yellow-800 hover:bg-yellow-100 border border-yellow-200 dark:bg-yellow-900 dark:text-yellow-100 dark:border-yellow-800 dark:hover:bg-yellow-800',
        help: 'bg-purple-50 text-purple-800 hover:bg-purple-100 border border-purple-200 dark:bg-purple-900 dark:text-purple-100 dark:border-purple-800 dark:hover:bg-purple-800',
        info: 'bg-cyan-50 text-cyan-800 hover:bg-cyan-100 border border-cyan-200 dark:bg-cyan-900 dark:text-cyan-100 dark:border-cyan-800 dark:hover:bg-cyan-800',
        dark: 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-900 dark:bg-black dark:border-gray-700 dark:hover:bg-gray-900',
        light:
          'bg-gray-50 text-gray-800 hover:bg-gray-100 border border-gray-300 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 dark:hover:bg-gray-800',
      },
      size: {
        sm: 'text-xs px-3 py-1.5 space-x-2',
        md: 'text-sm px-3.5 py-2 space-x-3',
        lg: 'text-base px-4 py-2.5 space-x-4',
      },
      active: {
        true: 'font-semibold rounded-md ring-[0.5px] ring-opacity-50',
        false: 'font-normal',
      },
      disabled: {
        true: 'opacity-40 cursor-not-allowed pointer-events-none',
        false: '',
      },
    },
    compoundVariants: [
      {
        variant: 'primary',
        active: true,
        class: 'ring-blue-300 bg-blue-100 dark:ring-blue-600 dark:bg-blue-800',
      },
      {
        variant: 'secondary',
        active: true,
        class: 'ring-gray-300 bg-gray-100 dark:ring-gray-600 dark:bg-gray-700',
      },
      {
        variant: 'success',
        active: true,
        class:
          'ring-green-300 bg-green-100 dark:ring-green-600 dark:bg-green-800',
      },
      {
        variant: 'danger',
        active: true,
        class: 'ring-red-300 bg-red-100 dark:ring-red-600 dark:bg-red-800',
      },
      {
        variant: 'warning',
        active: true,
        class:
          'ring-yellow-300 bg-yellow-100 dark:ring-yellow-600 dark:bg-yellow-800',
      },
      {
        variant: 'help',
        active: true,
        class:
          'ring-purple-300 bg-purple-100 dark:ring-purple-600 dark:bg-purple-800',
      },
      {
        variant: 'info',
        active: true,
        class: 'ring-cyan-300 bg-cyan-100 dark:ring-cyan-600 dark:bg-cyan-800',
      },
      {
        variant: 'dark',
        active: true,
        class: 'ring-gray-600 bg-gray-700 dark:ring-gray-500 dark:bg-gray-800',
      },
      {
        variant: 'light',
        active: true,
        class: 'ring-gray-300 bg-gray-200 dark:ring-gray-600 dark:bg-gray-700',
      },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'sm',
    },
  }
);
// #endregion

// #region types
/**
 * Props for an individual Tab panel declaration.
 */
interface TabProps {
  /** Label shown on the tab button */
  label: string;
  /** Unique value identifying the tab */
  value: string;
  /** Panel content when the tab is active */
  children: ReactNode;
  /** Optional icon before the label */
  leftIcon?: ReactNode;
  /** Optional icon after the label */
  rightIcon?: ReactNode;
  /** Disables selection of this tab */
  disabled?: boolean;
  /** Additional CSS classes for the panel */
  className?: string;
}

/**
 * Props for the Tabs container.
 */
interface TabsProps extends BoxProps {
  /** Tab children declaring panels */
  children: React.ReactNode;
  /** Controlled active tab value */
  active?: string;
  /** Called when the active tab changes */
  onTabChange?: (value: string) => void;
  /** Visual style of tab buttons @default 'primary' */
  variant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'help'
    | 'info'
    | 'dark'
    | 'light';
  /** Tab button size @default 'sm' */
  size?: 'sm' | 'md' | 'lg';
  /** Inline styles for the tablist header */
  headerStyles?: CSSProperties;
  /** Inline styles for the panel body */
  bodyStyles?: CSSProperties;
  /** Additional CSS classes */
  className?: string;
  /** Inline styles for the root Box */
  style?: CSSProperties;
  /** Optional title attribute */
  title?: string;
}

// #endregion

/**
 * A horizontal tabbed interface with keyboard arrow navigation.
 *
 * @component
 * @example
 * ```tsx
 * <Tabs active="one" onTabChange={setActive} variant="primary">
 *   <Tab label="Overview" value="one">Overview content</Tab>
 *   <Tab label="Details" value="two">Details content</Tab>
 * </Tabs>
 * ```
 *
 * @param {TabsProps} props - The component props
 * @param {React.ReactNode} props.children - `Tab` children
 * @param {string} [props.active] - Controlled active tab value
 * @param {(value: string) => void} [props.onTabChange] - Active tab change handler
 * @param {string} [props.variant='primary'] - Tab button color variant
 * @param {'sm'|'md'|'lg'} [props.size='sm'] - Tab button size
 * @param {React.CSSProperties} [props.headerStyles] - Styles for the tablist
 * @param {React.CSSProperties} [props.bodyStyles] - Styles for the panel area
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.CSSProperties} [props.style] - Additional inline styles
 *
 * @returns {JSX.Element} A tablist and corresponding tab panels
 */
// #region Tabs
export const Tabs: React.FC<TabsProps> = ({
  children,
  active,
  onTabChange,
  variant = 'primary',
  size = 'sm',
  headerStyles,
  bodyStyles,
  className,
  style,
  ...props
}) => {
  const isTabElement = (
    child: React.ReactNode
  ): child is React.ReactElement<TabProps> => {
    return React.isValidElement<TabProps>(child) && 'value' in child.props;
  };

  const getInitialActiveTab = () => {
    const firstEnabledTab = React.Children.toArray(children).find(
      (child) => isTabElement(child) && !child.props.disabled
    );
    return (
      active ||
      (isTabElement(firstEnabledTab) ? firstEnabledTab.props.value : undefined)
    );
  };

  const [uncontrolledActiveTab, setUncontrolledActiveTab] =
    useState(getInitialActiveTab);
  const activeTab = active !== undefined ? active : uncontrolledActiveTab;
  const tabsRef = useRef<HTMLDivElement>(null);

  const handleTabClick = useCallback(
    (value: string) => {
      setUncontrolledActiveTab(value);
      if (onTabChange) {
        onTabChange(value);
      }
    },
    [onTabChange]
  );

  const getEnabledTabs = useCallback(() => {
    return React.Children.toArray(children).filter(
      (child): child is React.ReactElement<TabProps> =>
        isTabElement(child) && !child.props.disabled
    );
  }, [children]);

  const handleKeyNavigation = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const enabledTabs = getEnabledTabs();
      const currentIndex = enabledTabs.findIndex(
        (child: React.ReactElement<TabProps>) => child.props.value === activeTab
      );

      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        let newIndex;

        if (e.key === 'ArrowRight') {
          newIndex =
            currentIndex + 1 >= enabledTabs.length ? 0 : currentIndex + 1;
        } else {
          newIndex =
            currentIndex - 1 < 0 ? enabledTabs.length - 1 : currentIndex - 1;
        }

        const newTab = enabledTabs[newIndex] as React.ReactElement<TabProps>;
        handleTabClick(newTab.props.value);

        // Focus the newly selected tab button
        const tabButtons =
          tabsRef.current?.querySelectorAll('button[role="tab"]');
        (tabButtons?.item(newIndex) as HTMLElement)?.focus();
      }
    },
    [activeTab, getEnabledTabs, handleTabClick]
  );

  return (
    <Box padding="5" rounded className={cn(className)} style={style} {...props}>
      <div
        ref={tabsRef}
        role="tablist"
        aria-orientation="horizontal"
        className="flex mb-2 p-1 items-center border rounded-md overflow-x-auto dark:bg-gray-800 dark:border-gray-700"
        style={headerStyles}
        onKeyDown={handleKeyNavigation}
      >
        {React.Children.map(children, (child: React.ReactNode) => {
          if (!isTabElement(child)) return null;
          const isActive = child.props.value === activeTab;
          return (
            <button
              key={child.props.value}
              id={`tab-${child.props.value}`}
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${child.props.value}`}
              tabIndex={isActive ? 0 : -1}
              className={cn(
                tabButtonStyles({
                  variant,
                  size,
                  active: child.props.value === activeTab,
                  disabled: child.props.disabled,
                }),
                'group'
              )}
              onClick={() =>
                !child.props.disabled && handleTabClick(child.props.value)
              }
              disabled={child.props.disabled}
              title={child.props.label}
            >
              {child.props.leftIcon && (
                <span className="opacity-70 group-hover:opacity-100 transition-opacity">
                  {child.props.leftIcon}
                </span>
              )}
              <span className="flex-1 text-center">{child.props.label}</span>
              {child.props.rightIcon && (
                <span className="opacity-70 group-hover:opacity-100 transition-opacity">
                  {child.props.rightIcon}
                </span>
              )}
            </button>
          );
        })}
      </div>
      <div
        className="bg-background border flex items-center rounded-md overflow-y-auto dark:border-gray-200/10"
        style={bodyStyles}
      >
        {React.Children.toArray(children).map((child) => {
          if (!isTabElement(child)) return null;
          return (
            <div
              key={child.props.value}
              role="tabpanel"
              id={`tabpanel-${child.props.value}`}
              aria-labelledby={`tab-${child.props.value}`}
              hidden={child.props.value !== activeTab}
              className={cn(
                'p-2 animate-fade-in w-full',
                child.props.className
              )}
            >
              {child.props.children}
            </div>
          );
        })}
      </div>
    </Box>
  );
};

/**
 * Declares a single tab panel; rendered by the parent `Tabs` component.
 *
 * @component
 * @example
 * ```tsx
 * <Tab label="Settings" value="settings" leftIcon={<GearIcon />}>
 *   Settings content
 * </Tab>
 * ```
 *
 * @param {TabProps} props - The component props
 * @param {string} props.label - Label on the tab button
 * @param {string} props.value - Unique tab identifier
 * @param {React.ReactNode} props.children - Panel content
 * @param {React.ReactNode} [props.leftIcon] - Leading icon
 * @param {React.ReactNode} [props.rightIcon] - Trailing icon
 * @param {boolean} [props.disabled] - Disables the tab when true
 * @param {string} [props.className] - Additional CSS classes for the panel
 *
 * @returns {JSX.Element} A panel wrapper (structure consumed by Tabs)
 */
export const Tab: React.FC<TabProps> = ({ children, className, ...props }) => (
  <div className={cn('p-2 animate-fade-in w-full', className)} {...props}>
    {children}
  </div>
);

export type { TabProps, TabsProps };
