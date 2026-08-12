import { cn } from '@/utils';
import React, { CSSProperties, forwardRef, ReactNode } from 'react';

// #region types
/** Marker style for ordered list numbering */
type ListStyleType = '1' | 'A' | 'a' | 'I' | 'i';

/**
 * Props for an ordered list item.
 */
interface OrderedListItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  /** Content of the list item */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Inline styles */
  style?: CSSProperties;
}

/**
 * Props for the OrderedList root.
 */
interface OrderedListProps extends Omit<
  React.OlHTMLAttributes<HTMLOListElement>,
  'type'
> {
  /** List items (`OrderedList.Item`) */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Inline styles */
  style?: CSSProperties;
  /** Numbering style: decimal, alpha, or roman @default '1' */
  type?: ListStyleType;
}
// #endregion

/**
 * An ordered list with configurable numbering styles (decimal, alpha, roman).
 *
 * @component
 * @example
 * ```tsx
 * <OrderedList type="A">
 *   <OrderedList.Item>First step</OrderedList.Item>
 *   <OrderedList.Item>Second step</OrderedList.Item>
 * </OrderedList>
 * ```
 *
 * @param {OrderedListProps} props - The component props
 * @param {ListStyleType} [props.type='1'] - Marker style for list numbering
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.CSSProperties} [props.style] - Additional inline styles
 * @param {React.ReactNode} props.children - OrderedList.Item children
 * @param {React.Ref<HTMLOListElement>} ref - Forwarded ref to the `ol` element
 *
 * @returns {JSX.Element} A styled ordered list
 */
// #region OrderedList
const OrderedList = forwardRef<HTMLOListElement, OrderedListProps>(
  ({ children, type = '1', className = '', style, ...rest }, ref) => {
    const combinedStyle = {
      ...style,
      listStyleType:
        type === '1'
          ? 'decimal'
          : type === 'A'
            ? 'upper-alpha'
            : type === 'a'
              ? 'lower-alpha'
              : type === 'I'
                ? 'upper-roman'
                : type === 'i'
                  ? 'lower-roman'
                  : 'decimal',
    };

    return (
      <ol
        ref={ref}
        className={cn('pl-5', className)}
        style={combinedStyle}
        {...rest}
      >
        {children}
      </ol>
    );
  }
);

OrderedList.displayName = 'OrderedList';

/**
 * A single item within an OrderedList.
 *
 * @component
 * @example
 * ```tsx
 * <OrderedList.Item>Install dependencies</OrderedList.Item>
 * ```
 *
 * @param {OrderedListItemProps} props - The component props
 * @param {React.ReactNode} props.children - Item content
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.CSSProperties} [props.style] - Additional inline styles
 *
 * @returns {JSX.Element} A styled list item
 */
const OrderedListItem: React.FC<OrderedListItemProps> = ({
  children,
  className = '',
  style,
  ...rest
}) => {
  return (
    <li
      className={cn('mb-1 text-muted-foreground', className)}
      style={style}
      {...rest}
    >
      {children}
    </li>
  );
};
// #endregion

// #region exports

export { OrderedList, OrderedListItem };
export type { OrderedListProps, OrderedListItemProps, ListStyleType };
