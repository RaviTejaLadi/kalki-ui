import React, { createContext, forwardRef, useContext, useMemo } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/utils';

// #region textHighlighterVariants
const textHighlighterVariants = cva(
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

// #region colors

export const defaultColors = [
  // Soft pastels
  '#D0E0E3',
  '#F3E5F5',
  '#E1F5FE',
  '#F0F4C3',
  '#E8F5E9',
  '#FFE0B2',
  '#F8BBD0',
  '#DCEDC8',
  '#CFD8DC',
  '#E0F7FA',

  // Medium tones
  '#90CAF9',
  '#A5D6A7',
  '#FFE082',
  '#FFAB91',
  '#B39DDB',
  '#81C784',
  '#9FA8DA',
  '#80CBC4',
  '#F48FB1',
  '#CE93D8',

  // Muted colors
  '#78909C',
  '#7986CB',
  '#64B5F6',
  '#4DB6AC',
  '#81C784',
  '#DCE775',
  '#FFB74D',
  '#FF8A65',
  '#BA68C8',
  '#4FC3F7',

  // Soft neutrals
  '#B0BEC5',
  '#90A4AE',
  '#78909C',
  '#607D8B',
  '#A1887F',
  '#8D6E63',
  '#BDBDBD',
  '#9E9E9E',
  '#757575',
  '#6D4C41',

  // Original favorites (keeping some from the original list)
  '#a99dfb',
  '#00C9A7',
  '#a8dadc',
  '#a9def9',
  '#84a59d',
  '#76c893',
  '#2ec4b6',
  '#00a5cf',
  '#adc178',
  '#845EC2',
];
// endregion

// #region type
type Variant =
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

type Emphasis = 'normal' | 'medium' | 'semibold' | 'bold';

type Sizing = 'inherit' | 'compact' | 'comfortable' | 'relaxed';

interface HighlightContextType {
  colorsList: string[];
  defaultVariant: Variant;
  defaultEmphasis: Emphasis;
  defaultSizing: Sizing;
}

/**
 * Props for the TextHighlighter context provider.
 */
interface TextHighlighterProps {
  /** Content containing TextHighlighter.Text spans */
  children: React.ReactNode;
  /** Palette used when child colors are not specified @default defaultColors */
  colorsList?: string[];
  /** Default highlight style @default 'solid' */
  defaultVariant?: Variant;
  /** Default font weight @default 'medium' */
  defaultEmphasis?: Emphasis;
  /** Default spacing density @default 'inherit' */
  defaultSizing?: Sizing;
}

/**
 * Props for an individually highlighted text span.
 */
interface TextHighlighterTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Text to highlight */
  children: React.ReactNode;
  /** Highlight visual style (falls back to context default) */
  variant?: Variant;
  /** Font weight (falls back to context default) */
  emphasis?: Emphasis;
  /** Spacing density (falls back to context default) */
  sizing?: Sizing;
  /** Explicit highlight color */
  color?: string;
}

// #region context
export const HighlightContext = createContext<HighlightContextType>({
  colorsList: defaultColors,
  defaultVariant: 'solid',
  defaultEmphasis: 'medium',
  defaultSizing: 'inherit',
});

// #endregion

/**
 * Provides default highlight styling context for nested TextHighlighter.Text spans.
 *
 * @component
 * @example
 * ```tsx
 * <TextHighlighter defaultVariant="pill" defaultEmphasis="semibold">
 *   Hello <TextHighlighter.Text color="#90CAF9">world</TextHighlighter.Text>
 * </TextHighlighter>
 * ```
 *
 * @param {TextHighlighterProps} props - The component props
 * @param {React.ReactNode} props.children - Content with highlight spans
 * @param {string[]} [props.colorsList] - Color palette for highlights
 * @param {Variant} [props.defaultVariant='solid'] - Default span variant
 * @param {Emphasis} [props.defaultEmphasis='medium'] - Default font weight
 * @param {Sizing} [props.defaultSizing='inherit'] - Default spacing
 *
 * @returns {JSX.Element} A context provider wrapping muted text content
 */
// #region TextHighlighter
const TextHighlighter: React.FC<TextHighlighterProps> = ({
  children,
  colorsList = defaultColors,
  defaultVariant = 'solid',
  defaultEmphasis = 'medium',
  defaultSizing = 'inherit',
}) => {
  const contextValue = useMemo(
    () => ({
      colorsList,
      defaultVariant,
      defaultEmphasis,
      defaultSizing,
    }),
    [colorsList, defaultVariant, defaultEmphasis, defaultSizing]
  );

  return (
    <HighlightContext.Provider value={contextValue}>
      <div className="text-muted-foreground">{children}</div>
    </HighlightContext.Provider>
  );
};

/**
 * A highlighted inline span that inherits defaults from TextHighlighter context.
 *
 * @component
 * @example
 * ```tsx
 * <TextHighlighter.Text variant="outlined" color="#4DB6AC">
 *   important
 * </TextHighlighter.Text>
 * ```
 *
 * @param {TextHighlighterTextProps} props - The component props
 * @param {React.ReactNode} props.children - Text to highlight
 * @param {Variant} [props.variant] - Highlight style override
 * @param {Emphasis} [props.emphasis] - Font weight override
 * @param {Sizing} [props.sizing] - Spacing override
 * @param {string} [props.color] - Explicit highlight color
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.Ref<HTMLSpanElement>} ref - Forwarded ref to the span
 *
 * @returns {JSX.Element} A styled highlight span
 */
const TextHighlighterText = forwardRef<
  HTMLSpanElement,
  TextHighlighterTextProps
>(
  (
    { children, variant, emphasis, sizing, color, className, style, ...props },
    ref
  ) => {
    const context = useContext(HighlightContext);
    const finalVariant = variant || context.defaultVariant;
    const finalEmphasis = emphasis || context.defaultEmphasis;
    const finalSizing = sizing || context.defaultSizing;

    const highlightStyle = useMemo(() => {
      if (!color) return style;

      const baseStyle = { ...style };
      switch (finalVariant) {
        case 'outlined':
        case 'underline':
        case 'minimal':
          baseStyle.borderColor = color;
          baseStyle.color = color;
          break;
        case 'gradient':
          baseStyle.backgroundImage = `linear-gradient(to right, ${color}, ${color}cc)`;
          break;
        case 'glass':
          baseStyle.backgroundColor = `${color}33`;
          baseStyle.color = color;
          baseStyle.borderColor = `${color}33`;
          break;
        default:
          baseStyle.backgroundColor = color;
      }
      return baseStyle;
    }, [color, finalVariant, style]);

    return (
      <span
        ref={ref}
        className={cn(
          textHighlighterVariants({
            variant: finalVariant,
            emphasis: finalEmphasis,
            sizing: finalSizing,
          }),
          className
        )}
        style={highlightStyle}
        {...props}
      >
        {children}
      </span>
    );
  }
);

TextHighlighterText.displayName = 'TextHighlighterText';

// #region exports
const TextHighlighterRoot = Object.assign(
  TextHighlighter as React.ForwardRefExoticComponent<
    TextHighlighterProps & React.RefAttributes<HTMLDivElement>
  >,
  {
    Text: TextHighlighterText,
  }
);

export {
  TextHighlighterRoot as TextHighlighter,
  TextHighlighterText,
  textHighlighterVariants,
};
export type {
  Variant,
  Emphasis,
  Sizing,
  HighlightContextType,
  TextHighlighterProps,
  TextHighlighterTextProps,
};
