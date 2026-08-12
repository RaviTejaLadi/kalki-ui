// SectionHeader.tsx
import React, { createContext, useContext } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';

// #region sectionHeaderVariants
const sectionHeaderVariants = cva('w-full flex', {
  variants: {
    variant: {
      default: 'bg-background border-b dark:bg-gray-800 dark:border-gray-700',
      transparent: 'bg-transparent dark:bg-transparent',
      outline:
        'bg-background border rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700',
    },
    size: {
      sm: 'p-4 gap-3',
      md: 'p-6 py-4 gap-4',
      lg: 'px-8 py-4 gap-4',
    },
    align: {
      left: 'flex-col items-start',
      center: 'flex-col items-center text-center',
      right: 'flex-col items-end text-right',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
    align: 'left',
  },
});
// #endregion sectionHeaderVariants

// #region types
type Size = 'sm' | 'md' | 'lg';

// Context for sharing size prop
type SectionHeaderContextType = {
  size: Size;
};

const titleVariants: Record<Size, string> = {
  sm: 'text-lg font-semibold tracking-tight dark:text-white',
  md: 'text-xl font-semibold tracking-tight dark:text-white',
  lg: 'text-2xl font-semibold tracking-tight dark:text-white',
};

const subtitleVariants: Record<Size, string> = {
  sm: 'text-xs text-muted-foreground dark:text-gray-400',
  md: 'text-sm text-muted-foreground dark:text-gray-400',
  lg: 'text-base text-muted-foreground dark:text-gray-400',
};

interface SectionHeaderRootProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'size'
> {
  /** Visual style of the header container */
  variant?: VariantProps<typeof sectionHeaderVariants>['variant'];
  /** Size that cascades to title and subtitle @default 'md' */
  size?: Size;
  /** Horizontal alignment of content */
  align?: VariantProps<typeof sectionHeaderVariants>['align'];
  /** Reserved for asChild composition patterns */
  asChild?: boolean;
}

/** Props for the section title heading */
type SectionHeaderTitleProps = Omit<
  React.HTMLAttributes<HTMLHeadingElement>,
  'size'
>;

/** Props for the section subtitle paragraph */
type SectionHeaderSubTitleProps = Omit<
  React.HTMLAttributes<HTMLParagraphElement>,
  'size'
>;
// #endregion types

// #region Create context for SectionHeader
const SectionHeaderContext = createContext<SectionHeaderContextType>({
  size: 'md',
});

const useSectionHeaderContext = () => {
  const context = useContext(SectionHeaderContext);
  if (!context) {
    throw new Error(
      'Section Header compound components cannot be rendered outside the Section Header component'
    );
  }
  return context;
};
// #endregion Create context for SectionHeader

// #region SectionHeader components
/**
 * A page or card section header that provides shared size context to Title and SubTitle.
 *
 * @component
 * @example
 * ```tsx
 * <SectionHeader variant="outline" size="md" align="left">
 *   <SectionHeader.Title>Team members</SectionHeader.Title>
 *   <SectionHeader.SubTitle>Manage access and roles</SectionHeader.SubTitle>
 * </SectionHeader>
 * ```
 *
 * @param {SectionHeaderRootProps} props - The component props
 * @param {'default'|'transparent'|'outline'} [props.variant='default'] - Container style
 * @param {'sm'|'md'|'lg'} [props.size='md'] - Size shared with title/subtitle
 * @param {'left'|'center'|'right'} [props.align='left'] - Content alignment
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.ReactNode} props.children - Title / SubTitle children
 * @param {React.Ref<HTMLDivElement>} ref - Forwarded ref to the container
 *
 * @returns {JSX.Element} A section header container with context provider
 */
const SectionHeader = React.forwardRef<HTMLDivElement, SectionHeaderRootProps>(
  ({ className, variant, size = 'md', align, children, ...props }, ref) => {
    return (
      <SectionHeaderContext.Provider value={{ size }}>
        <div
          ref={ref}
          className={cn(
            sectionHeaderVariants({ variant, size, align, className })
          )}
          {...props}
        >
          {children}
        </div>
      </SectionHeaderContext.Provider>
    );
  }
);
SectionHeader.displayName = 'SectionHeader';

/**
 * Primary heading for a SectionHeader, sized from parent context.
 *
 * @component
 * @example
 * ```tsx
 * <SectionHeader.Title>Overview</SectionHeader.Title>
 * ```
 *
 * @param {SectionHeaderTitleProps} props - Standard heading HTML attributes
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.ReactNode} props.children - Title text
 * @param {React.Ref<HTMLHeadingElement>} ref - Forwarded ref to the `h2`
 *
 * @returns {JSX.Element} An `h2` title element
 */
const SectionHeaderTitle = React.forwardRef<
  HTMLHeadingElement,
  SectionHeaderTitleProps
>(({ className, children, ...props }, ref) => {
  const { size } = useSectionHeaderContext();
  return (
    <h2 ref={ref} className={cn(titleVariants[size], className)} {...props}>
      {children}
    </h2>
  );
});
SectionHeaderTitle.displayName = 'SectionHeaderTitle';

/**
 * Supporting subtitle for a SectionHeader, sized from parent context.
 *
 * @component
 * @example
 * ```tsx
 * <SectionHeader.SubTitle>Last updated today</SectionHeader.SubTitle>
 * ```
 *
 * @param {SectionHeaderSubTitleProps} props - Standard paragraph HTML attributes
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.ReactNode} props.children - Subtitle text
 * @param {React.Ref<HTMLParagraphElement>} ref - Forwarded ref to the `p`
 *
 * @returns {JSX.Element} A subtitle paragraph
 */
const SectionHeaderSubTitle = React.forwardRef<
  HTMLParagraphElement,
  SectionHeaderSubTitleProps
>(({ className, children, ...props }, ref) => {
  const { size } = useSectionHeaderContext();
  return (
    <p ref={ref} className={cn(subtitleVariants[size], className)} {...props}>
      {children}
    </p>
  );
});
SectionHeaderSubTitle.displayName = 'SectionHeaderSubTitle';
// #endregion SectionHeader components

// #region Export components and types

export {
  SectionHeader,
  SectionHeaderTitle,
  SectionHeaderSubTitle,
  type SectionHeaderRootProps as SectionHeaderProps,
  type SectionHeaderTitleProps,
  type SectionHeaderSubTitleProps,
};
// #endregion Export components and types
