import React, { forwardRef, CSSProperties } from 'react';
import { cn } from '@/utils';
import { cva, VariantProps } from 'class-variance-authority';

// #region textVariants
const textVariants = cva('block', {
  variants: {
    variant: {
      default: 'text-black',
      primary: 'text-blue-500',
      secondary: 'text-gray-600',
      success: 'text-green-500',
      info: 'text-cyan-500',
      warning: 'text-yellow-500',
      danger: 'text-red-500',
      help: 'text-purple-600',
    },
    size: {
      xs: 'text-xs leading-4',
      sm: 'text-sm leading-5',
      md: 'text-base leading-6',
      lg: 'text-lg leading-7',
      xl: 'text-xl leading-8',
      '2xl': 'text-2xl leading-9',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});
// #endregion

// #region types
interface TextProps extends VariantProps<typeof textVariants> {
  children: React.ReactNode;
  className?: string;
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  style?: CSSProperties;
  underline?: boolean;
  overline?: boolean;
  dashed?: boolean;
  italic?: boolean;
  strong?: boolean;
  strikethrough?: boolean;
  marked?: boolean;
  smaller?: boolean;
  deleted?: boolean;
  inserted?: boolean;
}
// #endregion

// #region Text
const Text = forwardRef<HTMLParagraphElement, TextProps>(
  (
    {
      variant = 'default',
      size = 'md',
      fontSize = '',
      color = '',
      underline,
      overline,
      dashed,
      italic,
      strong,
      strikethrough,
      marked,
      smaller,
      deleted,
      inserted,
      children,
      fontWeight,
      style,
      className,
      ...rest
    },
    ref
  ) => {
    const textDecoration = underline
      ? 'underline'
      : overline
        ? 'overline'
        : dashed || strikethrough || deleted
          ? 'line-through'
          : inserted
            ? 'underline'
            : undefined;

    const dynamicStyle: CSSProperties = {
      fontSize: fontSize || (smaller ? '0.8em' : ''),
      color: color || undefined,
      fontWeight: fontWeight || (strong ? 'bold' : undefined),
      fontStyle: italic ? 'italic' : undefined,
      textDecoration,
      backgroundColor: marked ? 'yellow' : undefined,
      width: 'fit-content',
      ...style,
    };

    return (
      <p
        ref={ref}
        className={cn(textVariants({ variant, size }), className)}
        style={dynamicStyle}
        {...rest}
      >
        {children}
      </p>
    );
  }
);

Text.displayName = 'Text';
// #endregion

// #region export
export default Text;
export { textVariants };
export type { TextProps };
