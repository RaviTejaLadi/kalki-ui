import React, { forwardRef } from 'react';
import { cn } from '@/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';

// #region tag variants
const tagVariants = cva(
  'inline-flex items-center font-medium text-center transition relative',
  {
    variants: {
      variant: {
        primary: 'bg-blue-500 text-white hover:bg-blue-600',
        secondary: 'bg-gray-600 text-white hover:bg-gray-700',
        success: 'bg-green-500 text-white hover:bg-green-600',
        warning: 'bg-yellow-500 text-gray-800 hover:bg-yellow-600',
        danger: 'bg-red-500 text-white hover:bg-red-600',
        info: 'bg-teal-500 text-white hover:bg-teal-600',
        light: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
        dark: 'bg-gray-800 text-white hover:bg-gray-900',
      },
      size: {
        xs: 'text-xs min-h-6 py-1 pl-5 pr-3',
        sm: 'text-sm min-h-8 py-1.5 pl-7 pr-4',
        md: 'text-base min-h-10 py-2 pl-8 pr-5',
        lg: 'text-lg min-h-12 py-2.5 pl-10 pr-6',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'sm',
    },
  }
);
// #endregion

// #region type
/**
 * Props for the Tag root chip.
 */
interface TagProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tagVariants> {
  /** Tag content (Icon, Text, Close) */
  children: React.ReactNode;
}

/**
 * Props for the Tag leading icon slot.
 */
interface TagIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Icon element */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Props for the Tag text label.
 */
interface TagTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Label content */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Props for the Tag dismiss button.
 */
interface TagCloseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Called when the close button is clicked */
  onClick: () => void;
  /** Additional CSS classes */
  className?: string;
}
// #endregion

/**
 * A clipped tag/chip with optional icon, text, and close action.
 *
 * @component
 * @example
 * ```tsx
 * <Tag variant="primary" size="sm">
 *   <Tag.Icon><HashIcon /></Tag.Icon>
 *   <Tag.Text>Design</Tag.Text>
 *   <Tag.Close onClick={() => {}} />
 * </Tag>
 * ```
 *
 * @param {TagProps} props - The component props
 * @param {'primary'|'secondary'|'success'|'warning'|'danger'|'info'|'light'|'dark'} [props.variant='primary'] - Color variant
 * @param {'xs'|'sm'|'md'|'lg'} [props.size='sm'] - Tag size
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.ReactNode} props.children - Tag compound children
 * @param {React.Ref<HTMLDivElement>} ref - Forwarded ref to the tag
 *
 * @returns {JSX.Element} A styled tag chip
 */
// #region Tag
const Tag = forwardRef<HTMLDivElement, TagProps>(
  ({ children, variant, size, className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          tagVariants({ variant, size }),
          'clip-path-tag',
          'before:content-[""] before:absolute before:left-3 before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded-full before:bg-gray-300 before:border-[1px] before:border-gray-200/10  before:opacity-70',
          'before:ring-1 before:ring-current before:ring-opacity-30',
          className
        )}
        style={{
          clipPath: 'polygon(0% 0%, 88% 0%, 100% 50%, 88% 100%, 0% 100%)',
        }}
        {...rest}
      >
        <div className="flex items-center z-10 relative">{children}</div>
      </div>
    );
  }
);

Tag.displayName = 'Tag';

/**
 * Leading icon slot for a Tag.
 *
 * @component
 * @example
 * ```tsx
 * <Tag.Icon><StarIcon /></Tag.Icon>
 * ```
 *
 * @param {TagIconProps} props - The component props
 * @param {React.ReactNode} props.children - Icon content
 * @param {string} [props.className] - Additional CSS classes
 *
 * @returns {JSX.Element} An inline icon wrapper
 */
const TagIcon: React.FC<TagIconProps> = ({ children, className, ...rest }) => (
  <span className={cn('inline-flex items-center mr-1', className)} {...rest}>
    {children}
  </span>
);

/**
 * Dismiss button for a Tag.
 *
 * @component
 * @example
 * ```tsx
 * <Tag.Close onClick={() => removeTag(id)} />
 * ```
 *
 * @param {TagCloseButtonProps} props - The component props
 * @param {() => void} props.onClick - Close click handler
 * @param {string} [props.className] - Additional CSS classes
 *
 * @returns {JSX.Element} An accessible remove button
 */
const TagClose: React.FC<TagCloseButtonProps> = ({
  onClick,
  className,
  'aria-label': ariaLabel = 'Remove tag',
  ...props
}) => (
  <button
    type="button"
    aria-label={ariaLabel}
    className={cn(
      'ml-1 p-1 opacity-70 hover:opacity-100 transition z-10',
      className
    )}
    onClick={onClick}
    {...props}
  >
    <X className="size-3 font-bold" aria-hidden="true" />
  </button>
);

/**
 * Text label slot for a Tag.
 *
 * @component
 * @example
 * ```tsx
 * <Tag.Text>Featured</Tag.Text>
 * ```
 *
 * @param {TagTextProps} props - The component props
 * @param {React.ReactNode} props.children - Label content
 * @param {string} [props.className] - Additional CSS classes
 *
 * @returns {JSX.Element} A text span inside the tag
 */
const TagText: React.FC<TagTextProps> = ({ children, className, ...rest }) => (
  <span className={cn('text-center z-10', className)} {...rest}>
    {children}
  </span>
);

// #endregion

// #region exports
export default Object.assign(
  Tag as React.ForwardRefExoticComponent<
    TagProps & React.RefAttributes<HTMLDivElement>
  >,
  {
    Icon: TagIcon,
    Text: TagText,
    Close: TagClose,
  }
);

export { TagIcon, TagClose, TagText, tagVariants };

export type { TagProps, TagIconProps, TagTextProps, TagCloseButtonProps };
