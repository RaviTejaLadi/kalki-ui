import React, { createContext, useContext } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';

const toggleVariants = cva(
  [
    'inline-flex items-center justify-center text-muted-foreground rounded-md text-sm font-medium transition-colors',
    'data-[state=on]:bg-gray-200 data-[state=on]:text-gray-900 focus-visible:outline-none',
    'focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50 dark:hover:bg-gray-800 dark:hover:text-muted-foreground',
    'dark:data-[state=on]:bg-gray-700 dark:data-[state=on]:text-muted-foreground',
    'dark:focus-visible:ring-gray-800 dark:focus-visible:ring-offset-gray-900',
  ],
  {
    variants: {
      variant: {
        default:
          'bg-transparent hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-muted-foreground',
        outline:
          'border border-gray-200 bg-transparent hover:bg-gray-100 hover:text-gray-900 dark:border-gray-700 dark:hover:bg-gray-800 dark:hover:text-muted-foreground',
      },
      size: {
        sm: 'w-auto h-8 px-2',
        md: 'w-auto h-9 px-3',
        lg: 'w-auto h-10 px-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

/**
 * Props for a pressable Toggle button.
 */
export interface ToggleProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof toggleVariants> {
  /** Controlled pressed state */
  pressed?: boolean;
  /** Called when pressed state changes */
  onPressedChange?: (pressed: boolean) => void;
}

/**
 * A pressable toggle button that can be controlled or uncontrolled.
 *
 * @component
 * @example
 * ```tsx
 * <Toggle pressed={isBold} onPressedChange={setIsBold} variant="outline">
 *   Bold
 * </Toggle>
 * ```
 *
 * @param {ToggleProps} props - The component props
 * @param {boolean} [props.pressed] - Controlled pressed state
 * @param {(pressed: boolean) => void} [props.onPressedChange] - Pressed change handler
 * @param {'default'|'outline'} [props.variant='default'] - Visual style
 * @param {'sm'|'md'|'lg'} [props.size='md'] - Button size
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.Ref<HTMLButtonElement>} ref - Forwarded ref to the button
 *
 * @returns {JSX.Element} A toggle button with `aria-pressed`
 */
export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  ({ className, variant, size, pressed, onPressedChange, ...props }, ref) => {
    const [internalPressed, setInternalPressed] = React.useState(false);

    const isPressed = pressed !== undefined ? pressed : internalPressed;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      const newPressed = !isPressed;
      setInternalPressed(newPressed);
      onPressedChange?.(newPressed);
      props.onClick?.(event);
    };

    return (
      <button
        ref={ref}
        type="button"
        aria-pressed={isPressed}
        data-state={isPressed ? 'on' : 'off'}
        className={cn(toggleVariants({ variant, size, className }))}
        onClick={handleClick}
        {...props}
      />
    );
  }
);

Toggle.displayName = 'Toggle';

// Toggle Group Component
// ---------------------

type ToggleGroupContextValue = {
  value: string[];
  onChange: (value: string[]) => void;
  type: 'single' | 'multiple';
  disabled?: boolean;
};

const ToggleGroupContext = createContext<ToggleGroupContextValue | undefined>(
  undefined
);

/**
 * Props for a group of related ToggleGroupItem buttons.
 */
export interface ToggleGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Selection mode @default 'multiple' */
  type?: 'single' | 'multiple';
  /** Controlled selected values */
  value?: string[];
  /** Uncontrolled initial values @default [] */
  defaultValue?: string[];
  /** Called when selection changes */
  onValueChange?: (value: string[]) => void;
  /** Disables all items when true */
  disabled?: boolean;
  /** Default variant applied to items */
  variant?: VariantProps<typeof toggleVariants>['variant'];
  /** Default size applied to items */
  size?: VariantProps<typeof toggleVariants>['size'];
}

/**
 * Groups ToggleGroupItem children with shared single/multiple selection state.
 *
 * @component
 * @example
 * ```tsx
 * <ToggleGroup type="single" defaultValue={['left']} onValueChange={setAlign}>
 *   <ToggleGroupItem value="left">Left</ToggleGroupItem>
 *   <ToggleGroupItem value="center">Center</ToggleGroupItem>
 * </ToggleGroup>
 * ```
 *
 * @param {ToggleGroupProps} props - The component props
 * @param {'single'|'multiple'} [props.type='multiple'] - Selection mode
 * @param {string[]} [props.value] - Controlled selected values
 * @param {string[]} [props.defaultValue=[]] - Uncontrolled initial values
 * @param {(value: string[]) => void} [props.onValueChange] - Selection change handler
 * @param {boolean} [props.disabled] - Disables the group when true
 * @param {'default'|'outline'} [props.variant='default'] - Default item variant
 * @param {'sm'|'md'|'lg'} [props.size='md'] - Default item size
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.ReactNode} props.children - ToggleGroupItem children
 * @param {React.Ref<HTMLDivElement>} ref - Forwarded ref to the group
 *
 * @returns {JSX.Element} A toggle button group
 */
export const ToggleGroup = React.forwardRef<HTMLDivElement, ToggleGroupProps>(
  (
    {
      type = 'multiple',
      value,
      defaultValue = [],
      onValueChange,
      disabled,
      className,
      variant = 'default',
      size = 'md',
      children,
      ...props
    },
    ref
  ) => {
    // Initialize with defaultValue for uncontrolled component
    const [internalValue, setInternalValue] =
      React.useState<string[]>(defaultValue);

    // For controlled component, use the provided value
    const currentValue = value !== undefined ? value : internalValue;

    const handleValueChange = React.useCallback(
      (newValue: string[]) => {
        // Only update internal state for uncontrolled component
        if (value === undefined) {
          setInternalValue(newValue);
        }
        onValueChange?.(newValue);
      },
      [onValueChange, value]
    );

    const contextValue = React.useMemo(
      () => ({
        value: currentValue,
        onChange: handleValueChange,
        type,
        disabled,
      }),
      [currentValue, handleValueChange, type, disabled]
    );

    return (
      <ToggleGroupContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(
            'inline-flex items-center justify-center gap-1 rounded-md',
            className
          )}
          role="group"
          {...props}
        >
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, {
                variant: child.props.variant || variant,
                size: child.props.size || size,
                disabled: child.props.disabled || disabled,
              } as any);
            }
            return child;
          })}
        </div>
      </ToggleGroupContext.Provider>
    );
  }
);

ToggleGroup.displayName = 'ToggleGroup';

// Toggle Group Item Component
// --------------------------

/**
 * Props for an item inside a ToggleGroup.
 */
export interface ToggleGroupItemProps extends ToggleProps {
  /** Unique value contributed to the group selection */
  value: string;
}

/**
 * A Toggle bound to ToggleGroup selection state via its `value`.
 *
 * @component
 * @example
 * ```tsx
 * <ToggleGroupItem value="bold" aria-label="Bold">B</ToggleGroupItem>
 * ```
 *
 * @param {ToggleGroupItemProps} props - The component props
 * @param {string} props.value - Selection value for this item
 * @param {React.Ref<HTMLButtonElement>} ref - Forwarded ref to the toggle
 *
 * @returns {JSX.Element} A Toggle synchronized with the parent group
 */
export const ToggleGroupItem = React.forwardRef<
  HTMLButtonElement,
  ToggleGroupItemProps
>(({ value, ...props }, ref) => {
  const context = useContext(ToggleGroupContext);

  if (!context) {
    throw new Error('ToggleGroupItem must be used within a ToggleGroup');
  }

  const {
    value: selectedValues,
    onChange,
    type,
    disabled: groupDisabled,
  } = context;

  const isSelected = selectedValues.includes(value);

  const handlePressedChange = (pressed: boolean) => {
    if (pressed) {
      // If pressed and not already in the array, add it
      if (!isSelected) {
        let newValue: string[];
        if (type === 'single') {
          newValue = [value];
        } else {
          newValue = [...selectedValues, value];
        }
        onChange(newValue);
      }
    } else {
      // If unpressed and in the array, remove it (only for multiple type)
      if (isSelected && type === 'multiple') {
        onChange(selectedValues.filter((item) => item !== value));
      }
    }
  };

  return (
    <Toggle
      ref={ref}
      pressed={isSelected}
      onPressedChange={handlePressedChange}
      disabled={groupDisabled || props.disabled}
      {...props}
    />
  );
});

ToggleGroupItem.displayName = 'ToggleGroupItem';
