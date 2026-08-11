import { cn } from '@/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

/**
 * Empty-state container that centers placeholder content in a dashed bordered layout.
 *
 * @component
 * @example
 * ```tsx
 * <Empty>
 *   <EmptyHeader>
 *     <EmptyTitle>No results</EmptyTitle>
 *     <EmptyDescription>Try adjusting your filters.</EmptyDescription>
 *   </EmptyHeader>
 * </Empty>
 * ```
 *
 * @param {React.ComponentProps<'div'>} props - The component props
 * @param {string} [props.className] - Additional CSS classes for the empty container
 *
 * @returns {JSX.Element} A centered empty-state layout container
 */
function Empty({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="empty"
      className={cn(
        'flex min-w-0 flex-1 flex-col items-center justify-center gap-6 rounded-lg border-dashed p-6 text-center text-balance md:p-12',
        className
      )}
      {...props}
    />
  );
}

/**
 * Header section for an empty state, typically wrapping media, title, and description.
 *
 * @component
 * @example
 * ```tsx
 * <EmptyHeader>
 *   <EmptyTitle>Nothing here yet</EmptyTitle>
 * </EmptyHeader>
 * ```
 *
 * @param {React.ComponentProps<'div'>} props - The component props
 * @param {string} [props.className] - Additional CSS classes for the header
 *
 * @returns {JSX.Element} A centered empty-state header container
 */
function EmptyHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="empty-header"
      className={cn(
        'flex max-w-sm flex-col items-center gap-2 text-center',
        className
      )}
      {...props}
    />
  );
}

const emptyMediaVariants = cva(
  'flex shrink-0 items-center justify-center mb-2 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        icon: "bg-muted text-foreground flex size-10 shrink-0 items-center justify-center rounded-lg [&_svg:not([class*='size-'])]:size-6",
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

/**
 * Media/icon area for an empty state, with optional muted icon styling.
 *
 * @component
 * @example
 * ```tsx
 * <EmptyMedia variant="icon">
 *   <SearchIcon />
 * </EmptyMedia>
 * ```
 *
 * @param {React.ComponentProps<'div'> & VariantProps<typeof emptyMediaVariants>} props - The component props
 * @param {'default' | 'icon'} [props.variant='default'] - Visual style for the media container
 * @param {string} [props.className] - Additional CSS classes for the media container
 *
 * @returns {JSX.Element} A media/icon wrapper for empty states
 */
function EmptyMedia({
  className,
  variant = 'default',
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof emptyMediaVariants>) {
  return (
    <div
      data-slot="empty-icon"
      data-variant={variant}
      className={cn(emptyMediaVariants({ variant, className }))}
      {...props}
    />
  );
}

/**
 * Title text for an empty state.
 *
 * @component
 * @example
 * ```tsx
 * <EmptyTitle>No projects found</EmptyTitle>
 * ```
 *
 * @param {React.ComponentProps<'div'>} props - The component props
 * @param {string} [props.className] - Additional CSS classes for the title
 *
 * @returns {JSX.Element} An empty-state title element
 */
function EmptyTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="empty-title"
      className={cn('text-lg font-medium tracking-tight', className)}
      {...props}
    />
  );
}

/**
 * Supporting description text for an empty state.
 *
 * @component
 * @example
 * ```tsx
 * <EmptyDescription>
 *   Create a new project to get started.
 * </EmptyDescription>
 * ```
 *
 * @param {React.ComponentProps<'p'>} props - The component props
 * @param {string} [props.className] - Additional CSS classes for the description
 *
 * @returns {JSX.Element} An empty-state description element
 */
function EmptyDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <div
      data-slot="empty-description"
      className={cn(
        'text-muted-foreground [&>a:hover]:text-primary text-sm/relaxed [&>a]:underline [&>a]:underline-offset-4',
        className
      )}
      {...props}
    />
  );
}

/**
 * Action/content area below the empty-state header for buttons or extra controls.
 *
 * @component
 * @example
 * ```tsx
 * <EmptyContent>
 *   <Button>Create item</Button>
 * </EmptyContent>
 * ```
 *
 * @param {React.ComponentProps<'div'>} props - The component props
 * @param {string} [props.className] - Additional CSS classes for the content area
 *
 * @returns {JSX.Element} An empty-state content/actions container
 */
function EmptyContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="empty-content"
      className={cn(
        'flex w-full max-w-sm min-w-0 flex-col items-center gap-4 text-sm text-balance',
        className
      )}
      {...props}
    />
  );
}

export {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
};
