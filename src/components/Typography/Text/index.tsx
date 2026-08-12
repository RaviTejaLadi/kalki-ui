import React, { forwardRef, CSSProperties } from 'react';
import { cn } from '@/utils';
import { cva, VariantProps } from 'class-variance-authority';

// #region textVariants
const textVariants = cva('block', {
  variants: {
    variant: {
      default: 'text-black',
      primary: 'text-blue-500',
      secondary: 'text-gray-600',
      success: 'text-green-500',
      info: 'text-cyan-500',
      warning: 'text-yellow-500',
      danger: 'text-red-500',
      help: 'text-purple-600',
    },
    size: {
      xs: 'text-xs leading-4',
      sm: 'text-sm leading-5',
      md: 'text-base leading-6',
      lg: 'text-lg leading-7',
      xl: 'text-xl leading-8',
      '2xl': 'text-2xl leading-9',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});
// #endregion

// #region types
/**
 * Props for the Text typography component.
 */
interface TextProps extends VariantProps<typeof textVariants> {
  /** Text content */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Explicit text color override */
  color?: string;
  /** Explicit font size override */
  fontSize?: string;
  /** Explicit font weight override */
  fontWeight?: string;
  /** Additional inline styles */
  style?: CSSProperties;
  /** Underline text */
  underline?: boolean;
  /** Overline text */
  overline?: boolean;
  /** Line-through (dashed) style */
  dashed?: boolean;
  /** Italic text */
  italic?: boolean;
  /** Bold weight */
  strong?: boolean;
  /** Strikethrough text */
  strikethrough?: boolean;
  /** Highlighted background */
  marked?: boolean;
  /** Smaller relative font size */
  smaller?: boolean;
  /** Deleted (line-through) style */
  deleted?: boolean;
  /** Inserted (underline) style */
  inserted?: boolean;
}
// #endregion

/**
 * Inline/block text with color, size, and decoration variants.
 *
 * @component
 * @example
 * ```tsx
 * <Text variant="primary" size="sm" strong>
 *   Status: Active
 * </Text>
 * ```
 *
 * @param {TextProps} props - The component props
 * @param {'default'|'primary'|'secondary'|'success'|'info'|'warning'|'danger'|'help'} [props.variant='default'] - Color variant
 * @param {'xs'|'sm'|'md'|'lg'|'xl'|'2xl'} [props.size='md'] - Text size
 * @param {string} [props.color] - Explicit color override
 * @param {string} [props.fontSize] - Explicit font size override
 * @param {string} [props.fontWeight] - Explicit font weight override
 * @param {boolean} [props.underline] - Underline text
 * @param {boolean} [props.overline] - Overline text
 * @param {boolean} [props.dashed] - Line-through style
 * @param {boolean} [props.italic] - Italic text
 * @param {boolean} [props.strong] - Bold weight
 * @param {boolean} [props.strikethrough] - Strikethrough text
 * @param {boolean} [props.marked] - Yellow highlight background
 * @param {boolean} [props.smaller] - Smaller relative size
 * @param {boolean} [props.deleted] - Deleted style
 * @param {boolean} [props.inserted] - Inserted style
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.CSSProperties} [props.style] - Additional inline styles
 * @param {React.ReactNode} props.children - Text content
 * @param {React.Ref<HTMLParagraphElement>} ref - Forwarded ref to the `p` element
 *
 * @returns {JSX.Element} A styled text paragraph
 */
// #region Text
const Text = forwardRef<HTMLParagraphElement, TextProps>(
  (
    {
      variant = 'default',
      size = 'md',
      fontSize = '',
      color = '',
      underline,
      overline,
      dashed,
      italic,
      strong,
      strikethrough,
      marked,
      smaller,
      deleted,
      inserted,
      children,
      fontWeight,
      style,
      className,
      ...rest
    },
    ref
  ) => {
    const textDecoration = underline
      ? 'underline'
      : overline
        ? 'overline'
        : dashed || strikethrough || deleted
          ? 'line-through'
          : inserted
            ? 'underline'
            : undefined;

    const dynamicStyle: CSSProperties = {
      fontSize: fontSize || (smaller ? '0.8em' : ''),
      color: color || undefined,
      fontWeight: fontWeight || (strong ? 'bold' : undefined),
      fontStyle: italic ? 'italic' : undefined,
      textDecoration,
      backgroundColor: marked ? 'yellow' : undefined,
      width: 'fit-content',
      ...style,
    };

    return (
      <p
        ref={ref}
        className={cn(textVariants({ variant, size }), className)}
        style={dynamicStyle}
        {...rest}
      >
        {children}
      </p>
    );
  }
);

Text.displayName = 'Text';
// #endregion

// #region export
export { Text, textVariants };
export type { TextProps };
