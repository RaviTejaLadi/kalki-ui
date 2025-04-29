import { cn } from '@/utils';
import * as React from 'react';

// #region type
type CardProps = React.PropsWithChildren<React.ComponentProps<'div'>>;

// #endregion

// #region Card
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

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-4 pt-0 text-sm', className)} {...props} />
));

CardContent.displayName = 'CardContent';

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
