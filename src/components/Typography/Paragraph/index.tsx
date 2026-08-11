import { createElement, forwardRef, ReactNode } from 'react';
import { cn } from '@/utils';
import { cva, VariantProps } from 'class-variance-authority';

// #region paragraphVariants
const paragraphVariants = cva('leading-7 text-muted-foreground', {
  variants: {
    size: {
      default: 'text-base',
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
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
    size: 'default',
  },
});

// #endregion

// #region type
/**
 * Props for the Paragraph typography component.
 */
interface ParagraphProps extends VariantProps<typeof paragraphVariants> {
  /** Paragraph content */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Click handler */
  onClick?: () => void;
}
// #endregion

/**
 * A styled paragraph with size and text-decoration variants.
 *
 * @component
 * @example
 * ```tsx
 * <Paragraph size="lg" italic>
 *   Supporting copy for the section.
 * </Paragraph>
 * ```
 *
 * @param {ParagraphProps} props - The component props
 * @param {'default'|'xs'|'sm'|'md'|'lg'|'xl'|'2xl'|'3xl'} [props.size='default'] - Text size
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
 * @param {React.ReactNode} props.children - Paragraph content
 * @param {React.Ref<HTMLParagraphElement>} ref - Forwarded ref to the `p` element
 *
 * @returns {JSX.Element} A styled paragraph
 */
// #region Paragraph
const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>(
  (
    {
      children,
      size,
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
    const element = 'p';
    return createElement(
      element,
      {
        ref,
        className: cn(
          paragraphVariants({
            size,
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

Paragraph.displayName = 'Paragraph';
// #endregion

// #region export
export default Paragraph;
export { paragraphVariants };
export type { ParagraphProps };
// #endregion
