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
interface ParagraphProps extends VariantProps<typeof paragraphVariants> {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}
// #endregion

// #region Paragraph
const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>(
  ({ children, size, className, onClick, ...props }, ref) => {
    const element = 'p';
    return createElement(
      element,
      {
        ref,
        className: cn(paragraphVariants({ size, ...props }), className),
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
