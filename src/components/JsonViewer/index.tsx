/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { Clipboard, ClipboardCheck } from 'lucide-react';
import Button from '../Button';
import { cn } from '@/utils';
import Div from '../Div';

// #region types
type JsonReplacer =
  | ((key: string, value: any) => any)
  | (number | string)[]
  | null;

interface JsonViewerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  indentation?: number;
  replacer?: JsonReplacer;
  data: object | any[];
  className?: string;
}

// #endregion

// #region components
const JsonViewer = forwardRef<HTMLDivElement, JsonViewerProps>(
  (
    { indentation = 4, replacer = null, data, className, style, ...rest },
    ref
  ) => {
    const [jsonData, setJsonData] = useState<string>('');
    const [copyButtonText, setCopyButtonText] = useState(
      <Clipboard className="size-3" />
    );
    const containerRef = useRef<HTMLPreElement>(null);

    useEffect(() => {
      let formattedJsonData: string;

      try {
        if (Array.isArray(replacer)) {
          formattedJsonData = JSON.stringify(
            data,
            replacer as (string | number)[],
            indentation
          );
        } else if (typeof replacer === 'function') {
          formattedJsonData = JSON.stringify(
            data,
            replacer as (key: string, value: any) => any,
            indentation
          );
        } else {
          formattedJsonData = JSON.stringify(data, null, indentation);
        }
      } catch (error) {
        console.error('Error stringify JSON:', error);
        formattedJsonData = 'Error formatting JSON data';
      }
      const formattedData = formattedJsonData?.replace(
        /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?)|(\b(true|false|null|undefined)\b)|(\d+(\.\d+)?)|(\{|\}|\[|\])|(\/(\/|[^/])+\/)|(\[object (Object|Array|String|Number|Boolean|Symbol|Function)\])/g,
        (match) => {
          let classString = '';
          if (/^"/.test(match)) {
            classString = match.endsWith(':')
              ? 'text-muted-foreground font-semibold'
              : 'text-pink-500';
          } else if (/true|false|null|undefined/.test(match)) {
            classString = 'text-blue-400';
          } else if (/\d+(\.\d+)?/.test(match)) {
            classString = 'text-blue-500';
          } else if (/\{|\}/.test(match)) {
            classString = 'text-muted-foreground';
          } else if (/\[|\]/.test(match)) {
            classString = 'text-muted-foreground';
          } else if (/\/(\/|[^/])+\//.test(match)) {
            classString = 'text-red-500';
          } else if (/\[object (Object|Array)\]/.test(match)) {
            classString = 'text-green-500';
          } else if (/\[object String\]/.test(match)) {
            classString = 'text-pink-500';
          } else if (/\[object Number\]/.test(match)) {
            classString = 'text-blue-500';
          } else if (/\[object Boolean\]/.test(match)) {
            classString = 'text-blue-400';
          } else if (/\[object Symbol\]/.test(match)) {
            classString = 'text-purple-500';
          } else if (/\[object Function\]/.test(match)) {
            classString = 'text-blue-800';
          }
          return `<span class="${classString}">${match}</span>`;
        }
      );
      setJsonData(formattedData || '');
    }, [data, replacer, indentation]);

    const handleCopyToClipboard = () => {
      const container = containerRef.current;
      if (container) {
        const textContent = container.textContent || '';
        navigator.clipboard
          .writeText(textContent)
          .then(() => {
            setCopyButtonText(
              <ClipboardCheck className="size-3 text-[var(--icon-color)]" />
            );
            setTimeout(() => {
              setCopyButtonText(
                <Clipboard className="size-3 text-[var(--icon-color)]" />
              );
            }, 2000);
          })
          .catch((err) => {
            console.error('Failed to copy JSON data: ', err);
          });
      }
    };

    return (
      <Div
        ref={ref}
        className={cn(
          'border group dark:border-gray-200/10 relative rounded-lg overflow-auto',
          className
        )}
        style={{ ...style }}
        {...rest}
      >
        <Button
          variant="light"
          size="xs"
          className="invisible group-hover:visible right-2 top-2 absolute"
          onClick={handleCopyToClipboard}
        >
          {copyButtonText}
        </Button>
        <pre
          ref={containerRef}
          className={cn(
            'whitespace-pre-wrap p-2 bg-gray-50 dark:bg-gray-100/10 rounded max-h-[100vh] overflow-auto text-sm'
          )}
          dangerouslySetInnerHTML={{ __html: jsonData }}
        />
      </Div>
    );
  }
);

JsonViewer.displayName = 'JsonViewer';
// #endregion

// #region export
export default JsonViewer;

export type { JsonViewerProps, JsonReplacer };
// #endregion
