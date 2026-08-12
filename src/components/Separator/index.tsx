import { forwardRef, ReactNode, CSSProperties } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';

// #region separatorVariants
const separatorVariants = cva('relative', {
  variants: {
    orientation: {
      horizontal:
        'w-full border-t border-t-gray-200 dark:border-t-gray-200/10 flex items-center',
      vertical: 'h-full flex-col border-l inline-flex',
    },
    position: {
      center: 'justify-center',
      start: 'justify-start',
      end: 'justify-end',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
    position: 'center',
  },
});

// #endregion

// #region types
/**
 * Props for the Separator divider.
 */
interface SeparatorProps extends VariantProps<typeof separatorVariants> {
  /** Optional label rendered over the separator line */
  children?: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Border color @default 'border' */
  color?: string;
  /** CSS margin around the separator */
  margin?: string;
  /** Border thickness @default '1px' */
  thickness?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}

// #endregion

/**
 * A horizontal or vertical divider that can optionally display centered label text.
 *
 * @component
 * @example
 * ```tsx
 * <Separator orientation="horizontal" position="center">
 *   Or continue with
 * </Separator>
 * ```
 *
 * @param {SeparatorProps} props - The component props
 * @param {'horizontal'|'vertical'} [props.orientation='horizontal'] - Divider axis
 * @param {'center'|'start'|'end'} [props.position='center'] - Label alignment
 * @param {string} [props.thickness='1px'] - Border thickness
 * @param {string} [props.color='border'] - Border color
 * @param {string} [props.margin] - Outer margin
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.CSSProperties} [props.style] - Additional inline styles
 * @param {React.ReactNode} [props.children] - Optional label content
 * @param {React.Ref<HTMLDivElement>} ref - Forwarded ref to the separator
 *
 * @returns {JSX.Element} A styled divider line
 */
// #region Separator
const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
  (
    {
      orientation = 'horizontal',
      position = 'center',
      thickness = '1px',
      color = 'border',
      className,
      children,
      margin,
      style,
      ...rest
    },
    ref
  ) => {
    const separatorStyle: CSSProperties = {
      ...(orientation === 'vertical'
        ? {
            borderLeftWidth: thickness,
            borderLeftColor: color,
            minHeight: '100%',
          }
        : {
            borderTopWidth: thickness,
            borderTopColor: color,
            width: '100%',
          }),
      margin,
      ...style,
    };

    const contentPositionClasses = cn({
      'absolute bg-white px-2': orientation === 'horizontal',
      'left-0': position === 'start',
      'left-1/2 transform -translate-x-1/2': position === 'center',
      'right-0': position === 'end',
    });

    return (
      <div
        ref={ref}
        className={cn(separatorVariants({ orientation, position }), className)}
        style={separatorStyle}
        {...rest}
      >
        {children && <span className={contentPositionClasses}>{children}</span>}
      </div>
    );
  }
);

Separator.displayName = 'Separator';
// #endregion

// #region exports
export { Separator, separatorVariants };
export type { SeparatorProps };
