import React, { CSSProperties, forwardRef, ReactNode } from 'react';
import { cn } from '@/utils';

// #region types
/**
 * Props for the UnOrderedList root.
 */
interface UnOrderedListProps {
  /** List items (`UnOrderedList.Item`) */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Inline styles */
  style?: CSSProperties;
  /** Bullet marker style @default 'disc' */
  type?: 'disc' | 'circle' | 'square' | 'none';
}

/**
 * Props for an unordered list item.
 */
interface UnOrderedListItemProps {
  /** Content of the list item */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Inline styles */
  style?: CSSProperties;
}
// #endregion

/**
 * An unordered list with configurable bullet styles.
 *
 * @component
 * @example
 * ```tsx
 * <UnOrderedList type="circle">
 *   <UnOrderedList.Item>Feature A</UnOrderedList.Item>
 *   <UnOrderedList.Item>Feature B</UnOrderedList.Item>
 * </UnOrderedList>
 * ```
 *
 * @param {UnOrderedListProps} props - The component props
 * @param {'disc'|'circle'|'square'|'none'} [props.type='disc'] - Bullet marker style
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.CSSProperties} [props.style] - Additional inline styles
 * @param {React.ReactNode} props.children - UnOrderedList.Item children
 * @param {React.Ref<HTMLUListElement>} ref - Forwarded ref to the `ul` element
 *
 * @returns {JSX.Element} A styled unordered list
 */
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

/**
 * A single item within an UnOrderedList.
 *
 * @component
 * @example
 * ```tsx
 * <UnOrderedList.Item>Accessible by default</UnOrderedList.Item>
 * ```
 *
 * @param {UnOrderedListItemProps} props - The component props
 * @param {React.ReactNode} props.children - Item content
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.CSSProperties} [props.style] - Additional inline styles
 *
 * @returns {JSX.Element} A styled list item
 */
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

export { UnOrderedList, UnOrderedListItem };
export type { UnOrderedListProps, UnOrderedListItemProps };
