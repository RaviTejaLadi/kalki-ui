import React, { forwardRef, CSSProperties } from 'react';
import Table from '.';
import Code from '../Code';
import { cn } from '@/utils';

interface TableListProps {
  /** Column header labels */
  columns: string[];
  /** 2D array of row cell values */
  rows: Array<Array<React.ReactNode>>;
  /** Enable Code formatting for selected columns @default false */
  code?: boolean;
  /** Column index(es) that receive Code formatting @default [] */
  CodeColumn?: number | number[];
  /** Visual variant for Code cells @default 'primary' */
  codeVariant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'help'
    | 'light'
    | 'dark';
  /** Underline Code text @default false */
  codeUnderline?: boolean;
  /** Code text size @default 'sm' */
  codeSize?: 'sm' | 'md' | 'lg';
  /** Inline styles for Code cells */
  codeStyle?: CSSProperties;
  /** Additional CSS classes */
  className?: string;
  /** Inline styles for the table */
  style?: CSSProperties;
}

/**
 * A data table built from column/row arrays with optional Code formatting per column.
 *
 * @component
 * @example
 * ```tsx
 * <TableList
 *   columns={['Name', 'Value']}
 *   rows={[['foo', 'bar'], ['baz', 'qux']]}
 *   code
 *   CodeColumn={1}
 * />
 * ```
 *
 * @param {TableListProps} props - The component props
 * @param {string[]} props.columns - Array of column headers
 * @param {Array<Array<React.ReactNode>>} props.rows - 2D array of row data
 * @param {boolean} [props.code=false] - Enable code formatting for specified columns
 * @param {number|number[]} [props.CodeColumn=[]] - Column index(es) to apply code formatting
 * @param {'primary'|'secondary'|'success'|'danger'|'warning'|'info'|'help'|'light'|'dark'} [props.codeVariant='primary'] - Visual variant for code formatting
 * @param {'sm'|'md'|'lg'} [props.codeSize='sm'] - Size variant for code formatting
 * @param {boolean} [props.codeUnderline=false] - Enable underline for code formatted text
 * @param {React.CSSProperties} [props.codeStyle={}] - Custom styles for code formatted text
 * @param {string} [props.className=''] - Additional CSS class names
 * @param {React.CSSProperties} [props.style] - Custom styles for the table
 * @param {React.Ref<HTMLTableElement>} ref - Forwarded ref to the table
 *
 * @returns {JSX.Element} A Table populated from columns and rows
 */
const TableList = forwardRef<HTMLTableElement, TableListProps>(
  (
    {
      columns,
      rows,
      code = false,
      CodeColumn = [],
      codeVariant = 'primary',
      codeSize = 'sm',
      codeUnderline = false,
      codeStyle = {},
      className = '',
      style,
      ...rest
    },
    ref
  ) => {
    const codeColumns = Array.isArray(CodeColumn) ? CodeColumn : [CodeColumn];

    return (
      <Table ref={ref} className={cn(className)} style={style} {...rest}>
        <Table.Head>
          <Table.Row>
            {columns.map((column, index) => (
              <Table.Cell isHeader key={index}>
                {column}
              </Table.Cell>
            ))}
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {rows.map((row, rowIndex) => (
            <Table.Row key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <Table.Cell key={cellIndex} data-th={columns[cellIndex]}>
                  {code && codeColumns.includes(cellIndex) ? (
                    <Code
                      size={codeSize}
                      variant={codeVariant}
                      underline={codeUnderline}
                      style={codeStyle}
                    >
                      {cell}
                    </Code>
                  ) : (
                    cell
                  )}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  }
);

TableList.displayName = 'TableList';
export default TableList;
export type { TableListProps };
