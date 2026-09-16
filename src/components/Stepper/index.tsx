import React, { forwardRef, type ReactNode } from 'react';
import { cn } from '@/utils';

type StepStatus = 'upcoming' | 'current' | 'complete';

/**
 * Props for the Stepper root component.
 */
interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Step items rendered with `Stepper.Step`. */
  children: ReactNode;
}

/**
 * Props for an individual Stepper step item.
 */
interface StepperStepProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional step marker text (number, short label, icon text). */
  step?: string;
  /** Step heading text. */
  title: string;
  /** Visual state of the step. @default 'upcoming' */
  status?: StepStatus;
  /** Step body content. */
  children?: ReactNode;
}

interface InternalStepperStepProps extends StepperStepProps {
  isLast?: boolean;
}

/**
 * Props for helper description text inside a step.
 */
interface StepperDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
}

/**
 * Props for Stepper code block helper.
 */
interface StepperCodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  /** Code to render. */
  code: string;
  /** Optional language marker for readability. */
  language?: string;
}

const markerStyleMap: Record<StepStatus, string> = {
  upcoming: 'border-border bg-background text-muted-foreground',
  current: 'border-primary bg-primary/10 text-primary',
  complete: 'border-primary bg-primary text-primary-foreground',
};

const lineStyleMap: Record<StepStatus, string> = {
  upcoming: 'bg-border',
  current: 'bg-primary/35',
  complete: 'bg-primary/55',
};

const StepperStep = ({
  step,
  title,
  status = 'upcoming',
  children,
  className,
  isLast = false,
  ...props
}: InternalStepperStepProps) => (
  <div
    className={cn(
      'group relative grid grid-cols-[auto_1fr] gap-4 pb-7 last:pb-0',
      className
    )}
    {...props}
  >
    <div className="relative flex w-8 justify-center">
      <span
        className={cn(
          'z-1 inline-flex h-8 w-8 items-center justify-center rounded-full border text-sm font-semibold transition-colors duration-200',
          markerStyleMap[status]
        )}
      >
        {step ?? '•'}
      </span>
      {!isLast ? (
        <span
          className={cn(
            'absolute left-1/2 top-9 h-[calc(100%-1rem)] w-px -translate-x-1/2 rounded-full transition-colors duration-200',
            lineStyleMap[status]
          )}
          aria-hidden="true"
        />
      ) : null}
    </div>
    <div className="space-y-2 pt-0.5">
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      {children ? (
        <div className="text-sm leading-relaxed text-muted-foreground">{children}</div>
      ) : null}
    </div>
  </div>
);

const StepperDescription = forwardRef<HTMLParagraphElement, StepperDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
  )
);

const StepperCodeBlock = forwardRef<HTMLPreElement, StepperCodeBlockProps>(
  ({ code, language, className, ...props }, ref) => (
    <pre
      ref={ref}
      className={cn(
        'mt-2 overflow-x-auto rounded-md border border-border bg-muted/30 p-3 text-xs text-foreground',
        className
      )}
      {...props}
    >
      {language ? (
        <span className="mb-2 inline-flex rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
          {language}
        </span>
      ) : null}
      <code className="block font-mono leading-relaxed">{code}</code>
    </pre>
  )
);

type StepperComponentType = React.ForwardRefExoticComponent<
  StepperProps & React.RefAttributes<HTMLDivElement>
> & {
  Step: React.FC<StepperStepProps>;
  Description: React.ForwardRefExoticComponent<
    StepperDescriptionProps & React.RefAttributes<HTMLParagraphElement>
  >;
  CodeBlock: React.ForwardRefExoticComponent<
    StepperCodeBlockProps & React.RefAttributes<HTMLPreElement>
  >;
};

/**
 * A vertical guide-style stepper with status markers, descriptions, and code blocks.
 *
 * @component
 * @example
 * ```tsx
 * <Stepper>
 *   <Stepper.Step step="1" title="Install" status="complete">
 *     <Stepper.Description>Install the package.</Stepper.Description>
 *     <Stepper.CodeBlock code="npm i kalki-ui" language="bash" />
 *   </Stepper.Step>
 * </Stepper>
 * ```
 */
const Stepper = forwardRef<HTMLDivElement, StepperProps>(
  ({ children, className, ...props }, ref) => {
    const steps = React.Children.toArray(children);

    return (
      <div
        ref={ref}
        className={cn('w-full rounded-lg border border-border bg-background p-4', className)}
        {...props}
      >
        {steps.map((child, index) => {
          if (!React.isValidElement<StepperStepProps>(child)) return child;
          const status = child.props.status ?? (index === 0 ? 'current' : 'upcoming');
          return React.cloneElement(
            child as React.ReactElement<InternalStepperStepProps>,
            {
            status,
            isLast: index === steps.length - 1,
            }
          );
        })}
      </div>
    );
  }
) as StepperComponentType;

Stepper.Step = StepperStep as React.FC<StepperStepProps>;
Stepper.Description = StepperDescription;
Stepper.CodeBlock = StepperCodeBlock;

Stepper.displayName = 'Stepper';
StepperDescription.displayName = 'StepperDescription';
StepperCodeBlock.displayName = 'StepperCodeBlock';

export { Stepper, type StepStatus };
export type {
  StepperProps,
  StepperStepProps,
  StepperDescriptionProps,
  StepperCodeBlockProps,
};
