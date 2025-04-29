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
  lg: 'text-md text-muted-foreground dark:text-gray-400',
};

interface SectionHeaderRootProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'size'> {
  variant?: VariantProps<typeof sectionHeaderVariants>['variant'];
  size?: Size;
  align?: VariantProps<typeof sectionHeaderVariants>['align'];
  asChild?: boolean;
}

type SectionHeaderTitleProps = Omit<
  React.HTMLAttributes<HTMLHeadingElement>,
  'size'
>;

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
const SectionHeaderRoot = Object.assign(
  SectionHeader as React.ForwardRefExoticComponent<
    SectionHeaderRootProps & React.RefAttributes<HTMLDivElement>
  >,
  {
    Title: SectionHeaderTitle,
    SubTitle: SectionHeaderSubTitle,
  }
);

export {
  SectionHeaderRoot as SectionHeader,
  type SectionHeaderRootProps as SectionHeaderProps,
  type SectionHeaderTitleProps,
  type SectionHeaderSubTitleProps,
};
// #endregion Export components and types
