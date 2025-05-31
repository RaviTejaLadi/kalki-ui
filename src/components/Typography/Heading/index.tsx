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
interface HeadingProps extends VariantProps<typeof headingVariants> {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}
// #endregion

// #region Heading
const Heading = forwardRef<HTMLParagraphElement, HeadingProps>(
  ({ children, as, className, onClick, ...props }, ref) => {
    const element = as || 'h1';
    return createElement(
      element,
      {
        ref,
        className: cn(headingVariants({ as, ...props }), className),
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
export default Heading;
export { headingVariants };
export type { HeadingProps };
