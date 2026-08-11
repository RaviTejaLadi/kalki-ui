import { cn } from '@/utils';
import React, { CSSProperties, forwardRef, ReactNode } from 'react';

// #region types
/**
 * Props for the Table root element.
 */
interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  /** Table sections and rows */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Inline styles */
  style?: CSSProperties;
}

/**
 * Props for Table.Head, Table.Body, and Table.Footer sections.
 */
interface TableSectionProps extends React.HTMLAttributes<HTMLElement> {
  /** Section content (rows) */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Inline styles */
  style?: CSSProperties;
}

/**
 * Props for a table row.
 */
interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  /** Cells within the row */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Inline styles */
  style?: CSSProperties;
}

/**
 * Props for a table cell (`td` or `th`).
 */
interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  /** Cell content */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Inline styles */
  style?: CSSProperties;
  /** Render as `th` when true @default false */
  isHeader?: boolean;
}
// #endregion

/**
 * A bordered, horizontally scrollable HTML table with compound Head/Body/Row/Cell parts.
 *
 * @component
 * @example
 * ```tsx
 * <Table>
 *   <Table.Head>
 *     <Table.Row>
 *       <Table.Cell isHeader>Name</Table.Cell>
 *     </Table.Row>
 *   </Table.Head>
 *   <Table.Body>
 *     <Table.Row>
 *       <Table.Cell>Ada</Table.Cell>
 *     </Table.Row>
 *   </Table.Body>
 * </Table>
 * ```
 *
 * @param {TableProps} props - The component props
 * @param {React.ReactNode} props.children - Table compound children
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.CSSProperties} [props.style] - Additional inline styles
 * @param {React.Ref<HTMLTableElement>} ref - Forwarded ref to the `table` element
 *
 * @returns {JSX.Element} A scrollable table wrapper
 */
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

/**
 * Header section (`thead`) for a Table.
 *
 * @component
 * @example
 * ```tsx
 * <Table.Head>
 *   <Table.Row><Table.Cell isHeader>Col</Table.Cell></Table.Row>
 * </Table.Head>
 * ```
 *
 * @param {TableSectionProps} props - The component props
 * @param {React.ReactNode} props.children - Header rows
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.CSSProperties} [props.style] - Additional inline styles
 *
 * @returns {JSX.Element} A styled `thead` element
 */
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

/**
 * Body section (`tbody`) for a Table.
 *
 * @component
 * @example
 * ```tsx
 * <Table.Body>
 *   <Table.Row><Table.Cell>Value</Table.Cell></Table.Row>
 * </Table.Body>
 * ```
 *
 * @param {TableSectionProps} props - The component props
 * @param {React.ReactNode} props.children - Body rows
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.CSSProperties} [props.style] - Additional inline styles
 *
 * @returns {JSX.Element} A styled `tbody` element
 */
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

/**
 * A table cell that renders as `th` or `td` based on `isHeader`.
 *
 * @component
 * @example
 * ```tsx
 * <Table.Cell isHeader>Name</Table.Cell>
 * <Table.Cell>Ada Lovelace</Table.Cell>
 * ```
 *
 * @param {TableCellProps} props - The component props
 * @param {React.ReactNode} props.children - Cell content
 * @param {boolean} [props.isHeader=false] - Render as header cell when true
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.CSSProperties} [props.style] - Additional inline styles
 *
 * @returns {JSX.Element} A `th` or `td` element
 */
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

/**
 * Footer section (`tfoot`) for a Table.
 *
 * @component
 * @example
 * ```tsx
 * <Table.Footer>
 *   <Table.Row><Table.Cell>Total</Table.Cell></Table.Row>
 * </Table.Footer>
 * ```
 *
 * @param {TableSectionProps} props - The component props
 * @param {React.ReactNode} props.children - Footer rows
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.CSSProperties} [props.style] - Additional inline styles
 *
 * @returns {JSX.Element} A styled `tfoot` element
 */
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

/**
 * A hoverable table row (`tr`).
 *
 * @component
 * @example
 * ```tsx
 * <Table.Row>
 *   <Table.Cell>Cell A</Table.Cell>
 *   <Table.Cell>Cell B</Table.Cell>
 * </Table.Row>
 * ```
 *
 * @param {TableRowProps} props - The component props
 * @param {React.ReactNode} props.children - Cells within the row
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.CSSProperties} [props.style] - Additional inline styles
 *
 * @returns {JSX.Element} A styled `tr` element
 */
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
