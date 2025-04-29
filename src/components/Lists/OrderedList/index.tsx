import { cn } from '@/utils';
import React, { CSSProperties, forwardRef, ReactNode } from 'react';

// #region types
type ListStyleType = '1' | 'A' | 'a' | 'I' | 'i';

interface OrderedListItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

interface OrderedListProps
  extends Omit<React.OlHTMLAttributes<HTMLOListElement>, 'type'> {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  type?: ListStyleType;
}
// #endregion

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
export default Object.assign(
  OrderedList as React.ForwardRefExoticComponent<
    OrderedListProps & React.RefAttributes<HTMLOListElement>
  >,
  {
    Item: OrderedListItem,
  }
);

export { OrderedListItem };
export type { OrderedListProps, OrderedListItemProps, ListStyleType };
