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
interface TagProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tagVariants> {
  children: React.ReactNode;
}

interface TagIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  className?: string;
}

interface TagTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  className?: string;
}

interface TagCloseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  className?: string;
}
// #endregion

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

const TagIcon: React.FC<TagIconProps> = ({ children, className, ...rest }) => (
  <span className={cn('inline-flex items-center mr-1', className)} {...rest}>
    {children}
  </span>
);

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
