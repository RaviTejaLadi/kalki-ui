import React, { CSSProperties, forwardRef, ReactNode } from 'react';
import { cn } from '@/utils';

// #region types
interface UnOrderedListProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  type?: 'disc' | 'circle' | 'square' | 'none';
}

interface UnOrderedListItemProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}
// #endregion

// #region UnOrderedList
const UnOrderedList = forwardRef<HTMLUListElement, UnOrderedListProps>(
  ({ children, type = 'disc', className = '', style, ...rest }, ref) => {
    const unOrderStyles = {
      listStyleType: type,
      ...style,
    };

    return (
      <ul
        ref={ref}
        className={cn('pl-5', className)}
        style={unOrderStyles}
        {...rest}
      >
        {children}
      </ul>
    );
  }
);

UnOrderedList.displayName = 'UnorderedList';

const UnOrderedListItem: React.FC<UnOrderedListItemProps> = ({
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
  UnOrderedList as React.ForwardRefExoticComponent<
    UnOrderedListProps & React.RefAttributes<HTMLUListElement>
  >,
  {
    Item: UnOrderedListItem,
  }
);

export { UnOrderedListItem };
export type { UnOrderedListProps, UnOrderedListItemProps };
