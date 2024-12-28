import { cn } from '@/utils';
import { AccordionItemProps } from '../types';

/**
 * A component that represents an individual item within an accordion.
 * Renders content within a bordered container.
 *
 * @component
 * @param {object} props - The component props
 * @param {React.ReactNode} props.children - The content to be rendered inside the accordion item
 * @param {string} [props.className] - Additional CSS class names to be applied
 * @param {React.CSSProperties} [props.style] - Custom CSS styles to be applied
 * @returns {JSX.Element} An accordion item container
 */
export const AccordionItem: React.FC<AccordionItemProps> = ({
  children,
  className,
  style,
  ...rest
}) => (
  <div
    className={cn('border-b border-gray-200 last:border-b-0', className)}
    style={style}
    {...rest}
  >
    {children}
  </div>
);
