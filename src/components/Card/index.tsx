import { cn } from '@/utils';
import * as React from 'react';

// #region type
/** Props for the Card root container */
type CardProps = React.PropsWithChildren<React.ComponentProps<'div'>>;

// #endregion

// #region Card
/**
 * A bordered content container for grouping related information.
 *
 * @component
 * @example
 * ```tsx
 * <Card>
 *   <Card.Header>
 *     <Card.Title>Project overview</Card.Title>
 *     <Card.Description>Summary of recent activity</Card.Description>
 *   </Card.Header>
 *   <Card.Content>Details go here.</Card.Content>
 *   <Card.Footer>Updated today</Card.Footer>
 * </Card>
 * ```
 *
 * @param {CardProps} props - The component props
 * @param {React.ReactNode} [props.children] - Card sections and content
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.Ref<HTMLDivElement>} ref - Forwarded ref to the root element
 *
 * @returns {JSX.Element} A styled card container
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg border bg-card dark:bg-card/10 dark:border-gray-200/10 text-card-foreground shadow-sm',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = 'Card';

/**
 * The top section of a Card, typically holding title and description.
 *
 * @component
 * @example
 * ```tsx
 * <Card.Header>
 *   <Card.Title>Settings</Card.Title>
 * </Card.Header>
 * ```
 *
 * @param {React.HTMLAttributes<HTMLDivElement>} props - The component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.Ref<HTMLDivElement>} ref - Forwarded ref to the header element
 *
 * @returns {JSX.Element} A card header section
 */
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-4', className)}
    {...props}
  />
));

CardHeader.displayName = 'CardHeader';

/**
 * The primary title within a Card header.
 *
 * @component
 * @example
 * ```tsx
 * <Card.Title>Account details</Card.Title>
 * ```
 *
 * @param {React.HTMLAttributes<HTMLDivElement>} props - The component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.Ref<HTMLDivElement>} ref - Forwarded ref to the title element
 *
 * @returns {JSX.Element} A card title
 */
const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'text-2xl font-semibold leading-none tracking-tight',
      className
    )}
    {...props}
  />
));

CardTitle.displayName = 'CardTitle';

/**
 * The main body content area of a Card.
 *
 * @component
 * @example
 * ```tsx
 * <Card.Content>Your profile information appears here.</Card.Content>
 * ```
 *
 * @param {React.HTMLAttributes<HTMLDivElement>} props - The component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.Ref<HTMLDivElement>} ref - Forwarded ref to the content element
 *
 * @returns {JSX.Element} A card content section
 */
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-4 pt-0 text-sm', className)} {...props} />
));

CardContent.displayName = 'CardContent';

/**
 * Secondary descriptive text within a Card header.
 *
 * @component
 * @example
 * ```tsx
 * <Card.Description>Manage your notification preferences.</Card.Description>
 * ```
 *
 * @param {React.HTMLAttributes<HTMLDivElement>} props - The component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.Ref<HTMLDivElement>} ref - Forwarded ref to the description element
 *
 * @returns {JSX.Element} A muted card description
 */
const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));

CardDescription.displayName = 'CardDescription';

/**
 * The bottom section of a Card for actions or meta information.
 *
 * @component
 * @example
 * ```tsx
 * <Card.Footer>
 *   <button>Save</button>
 * </Card.Footer>
 * ```
 *
 * @param {React.HTMLAttributes<HTMLDivElement>} props - The component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.Ref<HTMLDivElement>} ref - Forwarded ref to the footer element
 *
 * @returns {JSX.Element} A card footer section
 */
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex text-sm text-muted-foreground items-center p-4 pt-0',
      className
    )}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';
// #endregion

// #region exports
export default Object.assign(
  Card as React.ForwardRefExoticComponent<
    CardProps & React.RefAttributes<HTMLDivElement>
  >,
  {
    Header: CardHeader,
    Footer: CardFooter,
    Title: CardTitle,
    Description: CardDescription,
    Content: CardContent,
  }
);
export { CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
export type { CardProps };
// #endregion
