import { forwardRef, useState, useCallback, useMemo } from 'react';
import { AccordionContext } from './context/AccordionContext';
import { accordionVariants } from './accordionVariants';
import { AccordionHeader } from './components/AccordionHeader';
import { AccordionBody } from './components/AccordionBody';
import { AccordionItem } from './components/AccordionItem';
import { cn } from '@/utils';
import type {
  AccordionVariant,
  AccordionSize,
  AccordionProps,
  AccordionItemProps,
  AccordionHeaderProps,
  AccordionBodyProps,
} from './types';

/**
 * A flexible accordion component that manages expandable/collapsible sections.
 *
 * @component
 * @param {Object} props - The component props
 * @param {ReactNode} props.children - The content to be rendered within the accordion
 * @param {'primary'} [props.variant='primary'] - The visual variant of the accordion
 * @param {'sm'} [props.size='sm'] - The size variant of the accordion
 * @param {string} [props.className] - Additional CSS class names
 * @param {CSSProperties} [props.style] - Inline styles to apply to the accordion
 * @param {React.Ref<HTMLDivElement>} ref - Forwarded ref to the root div element
 *
 * @example
 * ```tsx
 * <Accordion size="sm" variant="primary">
 *   <AccordionItem>Content</AccordionItem>
 * </Accordion>
 * ```
 *
 * @returns {JSX.Element} The rendered Accordion component
 */
const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  (
    { children, variant = 'primary', size = 'sm', className, style, ...rest },
    ref
  ) => {
    const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set());

    const toggleItem = useCallback((eventKey: string) => {
      setActiveKeys((prevKeys) => {
        const newKeys = new Set(prevKeys);
        if (newKeys.has(eventKey)) {
          newKeys.delete(eventKey);
        } else {
          newKeys.add(eventKey);
        }
        return newKeys;
      });
    }, []);

    const openItem = useCallback((eventKey: string) => {
      setActiveKeys((prevKeys) => new Set(prevKeys).add(eventKey));
    }, []);

    const contextValue = useMemo(
      () => ({
        activeKeys,
        toggleItem,
        openItem,
        variant,
        size,
      }),
      [activeKeys, toggleItem, openItem, variant, size]
    );

    return (
      <AccordionContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(accordionVariants({ size }), className)}
          style={style}
          {...rest}
        >
          {children}
        </div>
      </AccordionContext.Provider>
    );
  }
);

Accordion.displayName = 'Accordion';

export default Object.assign(
  Accordion as React.ForwardRefExoticComponent<
    AccordionProps & React.RefAttributes<HTMLDivElement>
  >,
  {
    Header: AccordionHeader,
    Body: AccordionBody,
    Item: AccordionItem,
  }
);

export {
  AccordionHeader,
  AccordionBody,
  AccordionItem,
  AccordionVariant,
  AccordionSize,
  AccordionProps,
  AccordionItemProps,
  AccordionHeaderProps,
  AccordionBodyProps,
};
