import React, { forwardRef, CSSProperties } from 'react';
import Table from '.';
import Code from '../Code';
import { cn } from '@/utils';

interface TableListProps {
  columns: string[];
  rows: Array<Array<React.ReactNode>>;
  code?: boolean;
  CodeColumn?: number | number[];
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
  codeUnderline?: boolean;
  codeSize?: 'sm' | 'md' | 'lg';
  codeStyle?: CSSProperties;
  className?: string;
  style?: CSSProperties;
}

/**
 * A customizable table component that can display data in rows and columns with optional code formatting.
 *
 * @component
 *
 * @param {Object} props - The component props
 * @param {string[]} props.columns - Array of column headers
 * @param {Array<Array<React.ReactNode>>} props.rows - 2D array of row data
 * @param {boolean} [props.code=false] - Enable code formatting for specified columns
 * @param {number|number[]} [props.CodeColumn=[]] - Column index(es) to apply code formatting
 * @param {'primary'|'secondary'|'success'|'danger'|'warning'|'info'} [props.codeVariant='primary'] - Visual variant for code formatting
 * @param {'xs'|'sm'|'md'|'lg'} [props.codeSize='sm'] - Size variant for code formatting
 * @param {boolean} [props.codeUnderline=false] - Enable underline for code formatted text
 * @param {React.CSSProperties} [props.codeStyle={}] - Custom styles for code formatted text
 * @param {string} [props.className=''] - Additional CSS class names
 * @param {React.CSSProperties} [props.style] - Custom styles for the table
 *
 * @example
 * ```tsx
 * <TableList
 *   columns={['Name', 'Value']}
 *   rows={[['foo', 'bar'], ['baz', 'qux']]}
 *   code={true}
 *   CodeColumn={1}
 * />
 * ```
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
