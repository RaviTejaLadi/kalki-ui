import React, {
  CSSProperties,
  ReactNode,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/utils';
import { Box, type BoxProps } from '../Box';

const tabButtonStyles = cva(
  'inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md border font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  {
    variants: {
      size: {
        sm: 'px-2.5 py-1.5 text-xs',
        md: 'px-3.5 py-2 text-sm',
        lg: 'px-4 py-2.5 text-base',
      },
      active: {
        true: 'border-border bg-background text-foreground shadow-sm',
        false:
          'border-transparent text-muted-foreground hover:bg-muted hover:text-foreground',
      },
      disabled: {
        true: 'pointer-events-none opacity-40',
        false: '',
      },
    },
    defaultVariants: {
      size: 'sm',
      active: false,
      disabled: false,
    },
  }
);

interface TabProps {
  label: string;
  value: string;
  children: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  disabled?: boolean;
  className?: string;
}

/**
 * Props for the Tabs root container.
 */
interface TabsProps extends BoxProps {
  children: React.ReactNode;
  active?: string;
  onTabChange?: (value: string) => void;
  size?: 'sm' | 'md' | 'lg';
  headerStyles?: CSSProperties;
  bodyStyles?: CSSProperties;
  className?: string;
  style?: CSSProperties;
  title?: string;
}

/**
 * Tabs container with keyboard navigation and controlled/uncontrolled active state.
 */
export const Tabs: React.FC<TabsProps> = ({
  children,
  active,
  onTabChange,
  size = 'sm',
  headerStyles,
  bodyStyles,
  className,
  style,
  ...props
}) => {
  const isTabElement = (
    child: React.ReactNode
  ): child is React.ReactElement<TabProps> =>
    React.isValidElement<TabProps>(child) && 'value' in child.props;

  const enabledTabs = useMemo(
    () =>
      React.Children.toArray(children).filter(
        (child): child is React.ReactElement<TabProps> =>
          isTabElement(child) && !child.props.disabled
      ),
    [children]
  );

  const [uncontrolledActiveTab, setUncontrolledActiveTab] = useState<
    string | undefined
  >(() => {
    const firstEnabled = enabledTabs[0];
    return active ?? firstEnabled?.props.value;
  });

  const activeTab = active !== undefined ? active : uncontrolledActiveTab;
  const tabsRef = useRef<HTMLDivElement>(null);

  const handleTabClick = useCallback(
    (value: string) => {
      setUncontrolledActiveTab(value);
      onTabChange?.(value);
    },
    [onTabChange]
  );

  const handleKeyNavigation = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (!enabledTabs.length) return;
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;

      event.preventDefault();
      const currentIndex = enabledTabs.findIndex(
        (tab) => tab.props.value === activeTab
      );
      const fallbackIndex = currentIndex < 0 ? 0 : currentIndex;
      const nextIndex =
        event.key === 'ArrowRight'
          ? (fallbackIndex + 1) % enabledTabs.length
          : (fallbackIndex - 1 + enabledTabs.length) % enabledTabs.length;

      const nextTab = enabledTabs[nextIndex];
      handleTabClick(nextTab.props.value);

      const tabButtons =
        tabsRef.current?.querySelectorAll<HTMLButtonElement>(
          'button[role="tab"]'
        );
      tabButtons?.item(nextIndex)?.focus();
    },
    [activeTab, enabledTabs, handleTabClick]
  );

  return (
    <Box rounded className={cn(className)} style={style} {...props}>
      <div
        ref={tabsRef}
        role="tablist"
        aria-orientation="horizontal"
        className="mb-3 flex items-center gap-1 overflow-x-auto rounded-md border border-border bg-muted/50 p-1"
        style={headerStyles}
        onKeyDown={handleKeyNavigation}
      >
        {React.Children.map(children, (child) => {
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
              className={tabButtonStyles({
                size,
                active: isActive,
                disabled: child.props.disabled,
              })}
              onClick={() =>
                !child.props.disabled && handleTabClick(child.props.value)
              }
              disabled={child.props.disabled}
              title={child.props.label}
              type="button"
            >
              {child.props.leftIcon && (
                <span className="opacity-80">{child.props.leftIcon}</span>
              )}
              <span>{child.props.label}</span>
              {child.props.rightIcon && (
                <span className="opacity-80">{child.props.rightIcon}</span>
              )}
            </button>
          );
        })}
      </div>
      <div
        className="rounded-md border border-border bg-background text-foreground"
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
              className={cn('w-full p-3', child.props.className)}
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
 * Tab panel content descriptor rendered by the Tabs container.
 */
export const Tab: React.FC<TabProps> = ({ children, className, ...props }) => (
  <div className={cn('w-full p-3', className)} {...props}>
    {children}
  </div>
);

export type { TabProps, TabsProps };
