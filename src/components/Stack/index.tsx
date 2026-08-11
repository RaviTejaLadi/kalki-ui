import React, { forwardRef, CSSProperties, ReactNode } from 'react';
import { cn } from '@/utils';
import Box from '../Box';

// #region types
type JustifyContent = 'start' | 'center' | 'end' | 'between' | 'around';

type AlignItems = 'start' | 'center' | 'end' | 'stretch';

type AlignContent = 'start' | 'center' | 'end' | 'stretch';

type FlexWrap = 'wrap' | 'nowrap';
type Direction = 'row' | 'column';

/**
 * Props for an item within a Stack.
 */
interface StackItemProps {
  /** Item content */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Inline styles */
  style?: CSSProperties;
}

/**
 * Props for the Stack flex container.
 */
interface StackProps {
  /** Flex direction @default 'row' */
  direction?: Direction;
  /** Main-axis justification @default 'start' */
  justifyContent?: JustifyContent;
  /** Cross-axis alignment @default 'stretch' */
  alignItems?: AlignItems;
  /** Multi-line cross-axis alignment @default 'stretch' */
  alignContent?: AlignContent;
  /** Whether items wrap @default 'nowrap' */
  flexWrap?: FlexWrap;
  /** Gap between items in pixels @default 0 */
  spacing?: number;
  /** CSS padding around the stack */
  padding?: string;
  /** Additional CSS classes */
  className?: string;
  /** Stack children */
  children?: ReactNode;
  /** Additional inline styles */
  style?: CSSProperties;
}
// #endregion

/**
 * A flexible container component that manages the layout and spacing of its children.
 *
 * @component
 * @example
 * ```tsx
 * <Stack direction="column" spacing={16} alignItems="center">
 *   <StackItem>Item 1</StackItem>
 *   <StackItem>Item 2</StackItem>
 * </Stack>
 * ```
 *
 * @param {StackProps} props - The component props
 * @param {'row' | 'column'} [props.direction='row'] - The direction of the stack's items
 * @param {'start' | 'center' | 'end' | 'between' | 'around'} [props.justifyContent='start'] - How items are justified along the main axis
 * @param {'start' | 'center' | 'end' | 'stretch'} [props.alignItems='stretch'] - How items are aligned along the cross axis
 * @param {'start' | 'center' | 'end' | 'stretch'} [props.alignContent='stretch'] - How lines are aligned when there is extra cross-axis space
 * @param {'wrap' | 'nowrap'} [props.flexWrap='nowrap'] - Whether items should wrap to new lines
 * @param {number} [props.spacing=0] - The gap between items in pixels
 * @param {string} [props.padding] - The padding around the stack
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.CSSProperties} [props.style] - Additional inline styles
 * @param {React.ReactNode} [props.children] - The content to be rendered inside the stack
 * @param {React.Ref<HTMLDivElement>} ref - Forwarded ref to the stack container
 *
 * @returns {JSX.Element} A flex container with configured layout
 */
// #region Stack
const Stack = forwardRef<HTMLDivElement, StackProps>(
  (
    {
      direction = 'row',
      justifyContent = 'start',
      alignItems = 'stretch',
      alignContent = 'stretch',
      flexWrap = 'nowrap',
      spacing = 0,
      padding,
      className,
      children,
      style,
      ...rest
    },
    ref
  ) => {
    const classes = cn(
      'flex',
      {
        'flex-row': direction === 'row',
        'flex-col': direction === 'column',
        'justify-start': justifyContent === 'start',
        'justify-center': justifyContent === 'center',
        'justify-end': justifyContent === 'end',
        'justify-between': justifyContent === 'between',
        'justify-around': justifyContent === 'around',
        'items-start': alignItems === 'start',
        'items-center': alignItems === 'center',
        'items-end': alignItems === 'end',
        'items-stretch': alignItems === 'stretch',
        'content-start': alignContent === 'start',
        'content-center': alignContent === 'center',
        'content-end': alignContent === 'end',
        'content-stretch': alignContent === 'stretch',
        'flex-wrap': flexWrap === 'wrap',
        'flex-nowrap': flexWrap === 'nowrap',
      },
      className
    );

    const inlineStyles: CSSProperties = {
      gap: `${spacing}px`,
      padding,
      ...style,
    };

    return (
      <div ref={ref} className={classes} style={inlineStyles} {...rest}>
        {children}
      </div>
    );
  }
);

Stack.displayName = 'Stack';

/**
 * A component that represents an item within a Stack layout.
 *
 * @component
 * @example
 * ```tsx
 * <Stack.Item className="flex-1">Content</Stack.Item>
 * ```
 *
 * @param {StackItemProps} props - The component props
 * @param {React.ReactNode} props.children - The content to be rendered inside the stack item
 * @param {string} [props.className] - Additional CSS class names to apply to the stack item
 * @param {React.CSSProperties} [props.style] - Custom inline styles to apply to the stack item
 *
 * @returns {JSX.Element} A Box component containing the stack item content
 */
const StackItem: React.FC<StackItemProps> = ({
  children,
  className,
  style,
  ...rest
}) => (
  <Box className={className} style={style} {...rest}>
    {children}
  </Box>
);

// #endregion

// #region exports
export default Object.assign(
  Stack as React.ForwardRefExoticComponent<
    StackProps & React.RefAttributes<HTMLDivElement>
  >,
  {
    Item: StackItem,
  }
);

export { StackItem };

export type {
  StackProps,
  StackItemProps,
  JustifyContent,
  AlignItems,
  AlignContent,
  FlexWrap,
  Direction,
};
