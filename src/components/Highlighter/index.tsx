import { cn } from '@/utils';
import React, { forwardRef, useMemo } from 'react';
import { cva, VariantProps } from 'class-variance-authority';

// #region Highlighter Variants
export const highlightedTextVariants = cva(
  [
    'inline-flex items-center justify-center',
    'transition-all duration-200 ease-in-out',
    'hover:opacity-90 cursor-pointer',
    'whitespace-normal align-baseline',
  ],
  {
    variants: {
      variant: {
        solid: ['border-transparent text-white', 'rounded px-2 py-0'],
        outlined: ['bg-transparent border-2', 'rounded px-2 py-0.5'],
        underline: [
          'border-b-2 border-t-0 border-x-0',
          'rounded-none px-2 py-0.5',
        ],
        pill: ['rounded-full px-3 py-0.5', 'border-transparent text-white'],
        gradient: [
          'border-transparent text-white',
          'rounded px-2 py-0.5',
          'bg-gradient-to-r from-current to-current/80',
        ],
        glass: [
          'backdrop-blur-sm bg-opacity-20',
          'rounded px-2 py-0',
          'border border-white/20',
          'shadow-sm',
        ],
        shadow: [
          'border-transparent text-white',
          'rounded px-2 py-0.5',
          'shadow-md hover:shadow-lg',
        ],
        floating: [
          'border-transparent text-white',
          'rounded px-2 py-0.5',
          'shadow-md hover:-translate-y-0.5',
        ],
        minimal: [
          'border-b border-t-0 border-x-0',
          'px-0.5',
          'hover:border-b-2',
        ],
        tag: [
          'border-transparent text-white',
          'rounded px-2 py-0.5',
          "before:content-['#'] before:opacity-50 before:mr-0.5",
        ],
      },
      emphasis: {
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
      },
      sizing: {
        inherit: '',
        compact: 'mx-0.5 leading-none',
        comfortable: 'mx-1 leading-normal',
        relaxed: 'mx-1.5 my-1 leading-relaxed',
      },
    },
    defaultVariants: {
      variant: 'solid',
      emphasis: 'medium',
      sizing: 'inherit',
    },
  }
);
// #endregion

// #region Highlighter Colors
const defaultColors: string[] = [
  '#D65DB1',
  '#a99dfb',
  '#00C9A7',
  '#a8dadc',
  '#a9def9',
  '#ef476f',
  '#FF9671',
  '#FFC75F',
  '#F9F871',
  '#84a59d',
  '#76c893',
  '#2ec4b6',
  '#e27396',
  '#00a5cf',
  '#ffff3f',
  '#C34A36',
  '#ffb703',
  '#ee6c4d',
  '#adc178',
  '#a6e22d',
  '#845EC2',
];
// #endregion

// #region type
interface HighlighterProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof highlightedTextVariants> {
  children: string;
  highlightText?: string[];
  colorsList?: string[];
  className?: string;
  textClassName?: string;
  variant?:
    | 'solid'
    | 'outlined'
    | 'underline'
    | 'pill'
    | 'gradient'
    | 'glass'
    | 'shadow'
    | 'floating'
    | 'minimal'
    | 'tag';
  emphasis?: 'normal' | 'medium' | 'semibold' | 'bold';
  sizing?: 'inherit' | 'compact' | 'comfortable' | 'relaxed';
}
// #endregion

// #region Highlighter
const Highlighter = forwardRef<HTMLSpanElement, HighlighterProps>(
  (
    {
      children,
      highlightText = [],
      colorsList = [],
      className = '',
      textClassName = '',
      variant = 'solid',
      emphasis = 'medium',
      sizing = 'inherit',
      style,
      ...rest
    },
    ref
  ) => {
    const highlightedText = useMemo(() => {
      if (!highlightText.length) {
        return children;
      }

      const colors = [...colorsList, ...defaultColors];
      const colorMap = Object.fromEntries(
        highlightText.map((text, index) => [
          text,
          colors[index % colors.length],
        ])
      );

      const escapeRegExp = (str: string): string =>
        str?.toString()?.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') || '';
      const highlightRegex = new RegExp(
        `\\b(${highlightText.map(escapeRegExp).join('|')})\\b`,
        'gi'
      );

      return children.split(highlightRegex).map((part, index) => {
        const baseColor = colorMap[part];

        if (baseColor) {
          let style: React.CSSProperties = {};

          switch (variant) {
            case 'outlined':
            case 'underline':
            case 'minimal':
              style = { borderColor: baseColor, color: baseColor };
              break;
            case 'gradient':
              style = {
                backgroundImage: `linear-gradient(to right, ${baseColor}, ${baseColor}cc)`,
              };
              break;
            case 'glass':
              style = {
                backgroundColor: `${baseColor}33`,
                color: baseColor,
                borderColor: `${baseColor}33`,
              };
              break;
            default:
              style = { backgroundColor: baseColor };
          }

          return (
            <span
              key={index}
              className={cn(
                highlightedTextVariants({ variant, emphasis, sizing }),
                'transform-gpu px-1.5 py-0'
              )}
              style={style}
            >
              {part}
            </span>
          );
        }

        return (
          <span key={index} className={cn('align-baseline', textClassName)}>
            {part}
          </span>
        );
      });
    }, [
      children,
      highlightText,
      colorsList,
      variant,
      emphasis,
      sizing,
      textClassName,
    ]);

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex flex-wrap items-center leading-relaxed',
          className
        )}
        style={style}
        {...rest}
      >
        {highlightedText}
      </span>
    );
  }
);

Highlighter.displayName = 'Highlighter';
// #endregion

// #region export
export default Highlighter;
// #endregion
