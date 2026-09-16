import * as React from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/utils';
import { useMergedRef } from '@/hooks/useMergedRef';

interface DropdownContextValue {
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  placeholder: string;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  registerTrigger: (node: HTMLButtonElement | null) => void;
}

const DropdownContext = React.createContext<DropdownContextValue | null>(null);

const useDropdownContext = () => {
  const context = React.useContext(DropdownContext);
  if (!context) {
    throw new Error('Dropdown compound components must be used within Dropdown.');
  }
  return context;
};

/**
 * Props for the Dropdown root container.
 */
interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Controlled selected value. */
  value?: string;
  /** Default selected value for uncontrolled usage. */
  defaultValue?: string;
  /** Called when a new item is selected. */
  onValueChange?: (value: string) => void;
  /** Placeholder when no value is selected. @default "Select an option" */
  placeholder?: string;
  /** Disables trigger and item interaction when true. */
  disabled?: boolean;
}

/**
 * Props for the Dropdown trigger button.
 */
interface DropdownTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

/**
 * Props for the Dropdown value display.
 */
interface DropdownValueProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Optional override for placeholder text. */
  placeholder?: string;
}

/**
 * Props for the Dropdown content popup.
 */
interface DropdownContentProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Props for a dropdown label row.
 */
interface DropdownLabelProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Props for an actionable dropdown item.
 */
interface DropdownItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Value emitted when the item is selected. */
  value: string;
}

/**
 * Props for a visual separator between dropdown sections.
 */
interface DropdownSeparatorProps
  extends React.HTMLAttributes<HTMLHRElement> {}

/**
 * A headless-style dropdown select with keyboard support and theme-aware styles.
 *
 * @component
 * @example
 * ```tsx
 * <Dropdown placeholder="Choose framework">
 *   <Dropdown.Trigger>
 *     <Dropdown.Value />
 *   </Dropdown.Trigger>
 *   <Dropdown.Content>
 *     <Dropdown.Item value="react">React</Dropdown.Item>
 *     <Dropdown.Item value="vue">Vue</Dropdown.Item>
 *   </Dropdown.Content>
 * </Dropdown>
 * ```
 */
const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
  (
    {
      children,
      value,
      defaultValue,
      onValueChange,
      placeholder = 'Select an option',
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const rootRef = React.useRef<HTMLDivElement>(null);
    const triggerRef = React.useRef<HTMLButtonElement | null>(null);
    const mergedRef = useMergedRef(rootRef, ref);
    const selectedValue = value ?? internalValue;

    const registerTrigger = React.useCallback((node: HTMLButtonElement | null) => {
      triggerRef.current = node;
    }, []);

    React.useEffect(() => {
      const handlePointerDown = (event: MouseEvent) => {
        if (!rootRef.current) return;
        if (!rootRef.current.contains(event.target as Node)) {
          setOpen(false);
        }
      };

      document.addEventListener('mousedown', handlePointerDown);
      return () => document.removeEventListener('mousedown', handlePointerDown);
    }, []);

    React.useEffect(() => {
      if (!open) return;
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          setOpen(false);
          triggerRef.current?.focus();
        }
      };

      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }, [open]);

    return (
      <DropdownContext.Provider
        value={{
          value: selectedValue,
          onValueChange: (nextValue) => {
            setInternalValue(nextValue);
            onValueChange?.(nextValue);
            setOpen(false);
            triggerRef.current?.focus();
          },
          disabled,
          open,
          setOpen,
          placeholder,
          triggerRef,
          registerTrigger,
        }}
      >
        <div ref={mergedRef} className={cn('relative', className)} {...props}>
          {children}
        </div>
      </DropdownContext.Provider>
    );
  }
);

const DropdownTrigger = React.forwardRef<HTMLButtonElement, DropdownTriggerProps>(
  ({ className, children, ...props }, ref) => {
    const { disabled, open, setOpen, registerTrigger } = useDropdownContext();
    const localRef = React.useRef<HTMLButtonElement>(null);
    const mergedRef = useMergedRef(localRef, ref);

    React.useEffect(() => {
      registerTrigger(localRef.current);
      return () => registerTrigger(null);
    }, [registerTrigger]);

    return (
      <button
        ref={mergedRef}
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        disabled={disabled}
        className={cn(
          'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm transition-colors duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={(event) => {
          if (
            event.key === 'ArrowDown' ||
            event.key === 'Enter' ||
            event.key === ' '
          ) {
            event.preventDefault();
            setOpen(true);
          }
        }}
        {...props}
      >
        {children}
        <ChevronDown
          className={cn(
            'h-4 w-4 shrink-0 opacity-60 transition-transform duration-200',
            open && 'rotate-180'
          )}
          aria-hidden="true"
        />
      </button>
    );
  }
);

const DropdownValue = React.forwardRef<HTMLSpanElement, DropdownValueProps>(
  ({ placeholder, className, ...props }, ref) => {
    const { value, placeholder: contextPlaceholder } = useDropdownContext();
    const fallback = placeholder ?? contextPlaceholder;
    return (
      <span
        ref={ref}
        className={cn('block truncate', value ? '' : 'text-muted-foreground', className)}
        {...props}
      >
        {value ?? fallback}
      </span>
    );
  }
);

const DropdownContent = React.forwardRef<HTMLDivElement, DropdownContentProps>(
  ({ className, children, ...props }, ref) => {
    const { open, triggerRef, value } = useDropdownContext();
    const contentRef = React.useRef<HTMLDivElement>(null);

    React.useImperativeHandle(ref, () => contentRef.current as HTMLDivElement);

    React.useEffect(() => {
      if (!open || !contentRef.current || !triggerRef.current) return;
      contentRef.current.style.width = `${triggerRef.current.offsetWidth}px`;
    }, [open, triggerRef]);

    React.useEffect(() => {
      if (!open || !contentRef.current) return;

      const selected = contentRef.current.querySelector<HTMLElement>(
        `[role="option"][data-value="${value ?? ''}"]`
      );
      const first = contentRef.current.querySelector<HTMLElement>(
        '[role="option"]:not([disabled])'
      );
      (selected ?? first)?.focus();
    }, [open, value]);

    if (!open) return null;

    return (
      <div
        ref={contentRef}
        role="listbox"
        className={cn(
          'absolute left-0 top-[calc(100%+0.35rem)] z-50 max-h-72 w-full overflow-y-auto rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md',
          'animate-fade-in',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

const DropdownLabel = React.forwardRef<HTMLDivElement, DropdownLabelProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('px-2 py-1.5 text-xs font-semibold text-muted-foreground', className)}
      {...props}
    />
  )
);

const DropdownItem = React.forwardRef<HTMLButtonElement, DropdownItemProps>(
  ({ className, children, value, disabled = false, ...props }, ref) => {
    const { value: selectedValue, onValueChange } = useDropdownContext();
    const itemRef = React.useRef<HTMLButtonElement>(null);
    const mergedRef = useMergedRef(itemRef, ref);
    const isSelected = selectedValue === value;

    const focusSibling = (direction: 1 | -1) => {
      const listbox = itemRef.current?.closest('[role="listbox"]');
      if (!listbox) return;
      const options = Array.from(
        listbox.querySelectorAll<HTMLElement>('[role="option"]:not([disabled])')
      );
      const currentIndex = options.indexOf(itemRef.current as HTMLElement);
      if (currentIndex < 0) return;
      const nextIndex = (currentIndex + direction + options.length) % options.length;
      options[nextIndex]?.focus();
    };

    return (
      <button
        ref={mergedRef}
        role="option"
        data-value={value}
        aria-selected={isSelected}
        disabled={disabled}
        tabIndex={-1}
        className={cn(
          'flex w-full cursor-default items-center justify-between rounded-sm px-2 py-1.5 text-sm text-foreground outline-none transition-colors',
          'hover:bg-muted focus:bg-muted',
          'disabled:pointer-events-none disabled:opacity-50',
          isSelected && 'bg-muted/80',
          className
        )}
        onClick={() => onValueChange?.(value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onValueChange?.(value);
          } else if (event.key === 'ArrowDown') {
            event.preventDefault();
            focusSibling(1);
          } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            focusSibling(-1);
          } else if (event.key === 'Home') {
            event.preventDefault();
            const listbox = itemRef.current?.closest('[role="listbox"]');
            listbox
              ?.querySelector<HTMLElement>('[role="option"]:not([disabled])')
              ?.focus();
          } else if (event.key === 'End') {
            event.preventDefault();
            const listbox = itemRef.current?.closest('[role="listbox"]');
            const options = listbox?.querySelectorAll<HTMLElement>(
              '[role="option"]:not([disabled])'
            );
            options?.[options.length - 1]?.focus();
          }
        }}
        {...props}
      >
        <span className="truncate">{children}</span>
        <span className="ml-2 flex h-4 w-4 items-center justify-center">
          {isSelected ? <Check className="h-3.5 w-3.5" /> : null}
        </span>
      </button>
    );
  }
);

const DropdownSeparator = React.forwardRef<HTMLHRElement, DropdownSeparatorProps>(
  ({ className, ...props }, ref) => (
    <hr ref={ref} className={cn('-mx-1 my-1 border-border', className)} {...props} />
  )
);

Dropdown.displayName = 'Dropdown';
DropdownTrigger.displayName = 'DropdownTrigger';
DropdownValue.displayName = 'DropdownValue';
DropdownContent.displayName = 'DropdownContent';
DropdownLabel.displayName = 'DropdownLabel';
DropdownItem.displayName = 'DropdownItem';
DropdownSeparator.displayName = 'DropdownSeparator';

const DropdownComponent = Object.assign(Dropdown, {
  Trigger: DropdownTrigger,
  Value: DropdownValue,
  Content: DropdownContent,
  Label: DropdownLabel,
  Item: DropdownItem,
  Separator: DropdownSeparator,
});

export { DropdownComponent as Dropdown };
export {
  DropdownTrigger,
  DropdownValue,
  DropdownContent,
  DropdownLabel,
  DropdownItem,
  DropdownSeparator,
};
export type {
  DropdownProps,
  DropdownTriggerProps,
  DropdownValueProps,
  DropdownContentProps,
  DropdownLabelProps,
  DropdownItemProps,
  DropdownSeparatorProps,
};
