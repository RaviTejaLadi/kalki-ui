import { cn } from '@/utils';
import React, { CSSProperties, forwardRef, ReactNode } from 'react';

// #region types
interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

interface TableSectionProps extends React.HTMLAttributes<HTMLElement> {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  isHeader?: boolean;
}
// #endregion

// #region Table
const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ children, className, style, ...rest }, ref) => {
    return (
      <div className="overflow-x-auto rounded-md border dark:border-gray-200/10">
        <table
          ref={ref}
          className={cn(
            'w-full border-collapse border border-gray-200 rounded-md text-sm bg-background dark:border-gray-200/10 shadow-sm overflow-hidden',
            className
          )}
          style={style}
          {...rest}
        >
          {children}
        </table>
      </div>
    );
  }
);

Table.displayName = 'Table';

const TableHead: React.FC<TableSectionProps> = ({
  children,
  className,
  style,
  ...rest
}) => {
  return (
    <thead
      className={cn(
        'bg-background dark:border-gray-200/10 text-foreground text-left uppercase text-xs font-semibold border-b border-gray-200',
        className
      )}
      style={style}
      {...rest}
    >
      {children}
    </thead>
  );
};

const TableBody: React.FC<TableSectionProps> = ({
  children,
  className,
  style,
  ...rest
}) => {
  return (
    <tbody
      className={cn(
        'divide-y divide-gray-200 dark:divide-gray-200/10',
        className
      )}
      style={style}
      {...rest}
    >
      {children}
    </tbody>
  );
};

const TableCell: React.FC<TableCellProps> = ({
  children,
  className,
  style,
  isHeader = false,
  ...rest
}) => {
  const CellTag = isHeader ? 'th' : 'td';
  return (
    <CellTag
      className={cn(
        'px-4 py-2',
        isHeader
          ? 'font-medium text-xs tracking-wide text-foreground'
          : 'text-muted-foreground',
        className
      )}
      style={style}
      {...rest}
    >
      {children}
    </CellTag>
  );
};

const TableFooter: React.FC<TableSectionProps> = ({
  children,
  className,
  style,
  ...rest
}) => {
  return (
    <tfoot
      className={cn(
        'bg-gray-50 text-muted-foreground font-medium text-sm border-t border-gray-200',
        className
      )}
      style={style}
      {...rest}
    >
      {children}
    </tfoot>
  );
};

const TableRow: React.FC<TableRowProps> = ({
  children,
  className,
  style,
  ...rest
}) => {
  return (
    <tr
      className={cn(
        'hover:bg-gray-50 dark:hover:bg-gray-100/10 focus-within:bg-gray-100 transition-colors',
        className
      )}
      style={style}
      {...rest}
    >
      {children}
    </tr>
  );
};
// #endregion

// #region Exports
export default Object.assign(
  Table as React.ForwardRefExoticComponent<
    TableProps & React.RefAttributes<HTMLTableElement>
  >,
  {
    Head: TableHead,
    Body: TableBody,
    Cell: TableCell,
    Footer: TableFooter,
    Row: TableRow,
  }
);

export { TableHead, TableBody, TableCell, TableFooter, TableRow };

export type { TableProps, TableSectionProps, TableRowProps, TableCellProps };
