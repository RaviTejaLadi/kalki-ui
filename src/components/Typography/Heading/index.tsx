import { cn } from '@/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { createElement, forwardRef, ReactNode } from 'react';

// #region headingVariants
const headingVariants = cva('font-heading text-foreground scroll-m-20', {
  variants: {
    as: {
      h1: 'text-4xl font-bold',
      h2: 'text-3xl font-semibold',
      h3: 'text-2xl font-semibold',
      h4: 'text-xl font-semibold',
      h5: 'text-lg font-semibold',
      h6: 'text-base font-semibold',
    },
    underline: { true: 'underline' },
    overline: { true: 'overline' },
    dashed: { true: 'line-through' },
    italic: { true: 'italic' },
    strong: { true: 'font-bold' },
    strikethrough: { true: 'line-through' },
    marked: { true: 'bg-yellow-200' },
    smaller: { true: 'text-sm' },
    deleted: { true: 'line-through' },
    inserted: { true: 'underline' },
  },
  defaultVariants: {
    as: 'h1',
  },
});
// #endregion

// #region type
/**
 * Props for the Heading typography component.
 */
interface HeadingProps extends VariantProps<typeof headingVariants> {
  /** Heading content */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Click handler */
  onClick?: () => void;
}
// #endregion

/**
 * A semantic heading element (`h1`–`h6`) with optional text decoration variants.
 *
 * @component
 * @example
 * ```tsx
 * <Heading as="h2" underline>
 *   Section title
 * </Heading>
 * ```
 *
 * @param {HeadingProps} props - The component props
 * @param {'h1'|'h2'|'h3'|'h4'|'h5'|'h6'} [props.as='h1'] - Heading level / element
 * @param {boolean} [props.underline] - Underline text
 * @param {boolean} [props.overline] - Overline text
 * @param {boolean} [props.dashed] - Line-through style
 * @param {boolean} [props.italic] - Italic text
 * @param {boolean} [props.strong] - Bold weight
 * @param {boolean} [props.strikethrough] - Strikethrough text
 * @param {boolean} [props.marked] - Highlighted background
 * @param {boolean} [props.smaller] - Smaller text size
 * @param {boolean} [props.deleted] - Deleted (line-through) style
 * @param {boolean} [props.inserted] - Inserted (underline) style
 * @param {string} [props.className] - Additional CSS classes
 * @param {() => void} [props.onClick] - Click handler
 * @param {React.ReactNode} props.children - Heading content
 * @param {React.Ref<HTMLParagraphElement>} ref - Forwarded ref to the heading element
 *
 * @returns {JSX.Element} A styled heading element
 */
// #region Heading
const Heading = forwardRef<HTMLParagraphElement, HeadingProps>(
  (
    {
      children,
      as,
      className,
      onClick,
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
      ...props
    },
    ref
  ) => {
    const element = as || 'h1';
    return createElement(
      element,
      {
        ref,
        className: cn(
          headingVariants({
            as,
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
          }),
          className
        ),
        onClick,
        ...props,
      },
      children
    );
  }
);

Heading.displayName = 'Heading';
// #endregion

// #region export
export { Heading, headingVariants };
export type { HeadingProps };
