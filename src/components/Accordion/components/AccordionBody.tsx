import { useContext, useEffect, useRef, useState } from 'react';
import { bodySizesMap } from '../utils/bodySizesMap';
import { AccordionContext } from '../context/AccordionContext';
import { cn } from '@/utils';
import { AccordionBodyProps } from '../types';

/**
 * A component that renders collapsible content within an Accordion.
 *
 * @component
 * @param {Object} props - The component props
 * @param {React.ReactNode} props.children - The content to be displayed inside the accordion body
 * @param {string | number} props.eventKey - Unique identifier for the accordion section
 * @param {string} [props.className] - Additional CSS classes to apply to the outer container
 * @param {React.CSSProperties} [props.style] - Additional inline styles to apply to the outer container
 * @throws {Error} Throws an error if component is used outside of an Accordion context
 *
 * @example
 * ```tsx
 * <AccordionBody eventKey="1">
 *   Content goes here
 * </AccordionBody>
 * ```
 */
export const AccordionBody: React.FC<AccordionBodyProps> = ({
  children,
  eventKey,
  className,
  style,
  ...rest
}) => {
  const context = useContext(AccordionContext);
  const [maxHeight, setMaxHeight] = useState<string>('0px');
  const contentRef = useRef<HTMLDivElement>(null);

  if (!context)
    throw new Error('AccordionBody must be used within an Accordion');

  const { activeKeys, size } = context;
  const isActive = activeKeys.has(eventKey);
  const dimensions = bodySizesMap[size];

  useEffect(() => {
    if (contentRef.current) {
      setMaxHeight(isActive ? `${contentRef.current.scrollHeight}px` : '0px');
    }
  }, [isActive]);

  return (
    <div
      ref={contentRef}
      className={cn(
        'overflow-hidden transition-[max-height] duration-500 ease-in-out',
        className
      )}
      style={{ ...style, maxHeight }}
      {...rest}
    >
      <div className={cn('overflow-auto text-muted-foreground', dimensions)}>
        {children}
      </div>
    </div>
  );
};
