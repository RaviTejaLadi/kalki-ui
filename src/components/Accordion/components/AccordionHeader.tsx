import { useContext, useEffect, KeyboardEvent } from 'react';
import { AccordionContext } from '../context/AccordionContext';
import { backgroundColorMap } from '../utils/backgroundColorMap';
import { sizesMap } from '../utils/sizesMap';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/utils';
import { AccordionHeaderProps } from '../types';

/**
 * A component that represents the header of an accordion item.
 *
 * @component
 * @param {Object} props - The component props
 * @param {React.ReactNode} props.children - The content to be rendered within the header
 * @param {string} props.eventKey - Unique identifier for the accordion item
 * @param {React.ReactNode} [props.icon] - Custom icon to be displayed instead of the default chevron
 * @param {boolean} [props.open] - Controls whether the accordion item is initially open
 * @param {string} [props.className] - Additional CSS classes to be applied
 * @param {React.CSSProperties} [props.style] - Additional inline styles to be applied
 *
 * @requires AccordionContext - Must be used within an Accordion component
 *
 * @example
 * ```tsx
 * <AccordionHeader eventKey="1">
 *   Header Content
 * </AccordionHeader>
 * ```
 *
 * @throws {Error} Throws an error if used outside of an Accordion component
 */
export const AccordionHeader: React.FC<AccordionHeaderProps> = ({
  children,
  eventKey,
  icon,
  open,
  className,
  style,
  ...rest
}) => {
  const context = useContext(AccordionContext);
  if (!context)
    throw new Error('AccordionHeader must be used within an Accordion');

  const { activeKeys, toggleItem, openItem, variant, size } = context;
  const isActive = activeKeys.has(eventKey);

  useEffect(() => {
    if (open && !isActive) {
      openItem(eventKey);
    }
  }, [open, eventKey, openItem, isActive]);

  const backgroundColor = isActive
    ? backgroundColorMap[variant]
    : 'bg-transparent';
  const dimensions = sizesMap[size];

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleItem(eventKey);
    }
  };
  return (
    <div
      className={cn(
        'flex justify-between font-medium items-center cursor-pointer text-foreground dark:text-foreground p-4 transition-colors duration-300',
        isActive ? 'text-white' : 'text-black',
        backgroundColor,
        dimensions,
        className
      )}
      tabIndex={0}
      role="button"
      onClick={() => toggleItem(eventKey)}
      onKeyDown={handleKeyDown}
      style={style}
      {...rest}
    >
      {children}
      {icon || (
        <ChevronDown
          className={cn(
            'transition-transform size-4',
            isActive ? 'rotate-180' : ''
          )}
        />
      )}
    </div>
  );
};
