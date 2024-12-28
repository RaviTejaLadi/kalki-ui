import { CSSProperties, ReactNode } from 'react';
import { VariantProps } from 'class-variance-authority';
import { accordionVariants } from './accordionVariants';

/**
 * Defines the appearance and theme variant for an Accordion component.
 *
 * @typedef {('primary'|'secondary'|'success'|'danger'|'warning'|'help'|'info'|'dark'|'light')} AccordionVariant
 */
type AccordionVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'help'
  | 'info'
  | 'dark'
  | 'light';

/**
 * Represents the available size options for an Accordion component.
 * @typedef {('sm' | 'md' | 'lg' | 'xl' | 'xxl')} AccordionSize
 * - 'sm': Small size
 * - 'md': Medium size
 * - 'lg': Large size
 * - 'xl': Extra large size
 * - 'xxl': Extra extra large size
 */
type AccordionSize = 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

/**
 * Props interface for the Accordion component.
 * @interface AccordionProps
 * @extends {VariantProps<typeof accordionVariants>}
 * @property {ReactNode} children - The content to be displayed within the accordion.
 * @property {string} [className] - Optional CSS class name for additional styling.
 * @property {CSSProperties} [style] - Optional inline styles to be applied to the accordion.
 * @property {AccordionVariant} [variant] - Optional variant style of the accordion.
 * @property {AccordionSize} [size] - Optional size variant of the accordion.
 */

interface AccordionProps extends VariantProps<typeof accordionVariants> {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  variant?: AccordionVariant;
  size?: AccordionSize;
}

/**
 * Props for the AccordionItem component
 * @interface AccordionItemProps
 * @property {ReactNode} children - The content to be rendered inside the accordion item
 * @property {string} [className] - Optional CSS class name to be applied to the accordion item
 * @property {CSSProperties} [style] - Optional inline styles to be applied to the accordion item
 */
interface AccordionItemProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/**
 * Props for the AccordionHeader component.
 * @interface
 *
 * @property {ReactNode} children - The content to be rendered inside the accordion header
 * @property {string} eventKey - Unique identifier for the accordion header
 * @property {boolean} [open] - Optional flag indicating whether the accordion section is expanded
 * @property {ReactNode} [icon] - Optional icon element to be displayed in the header
 * @property {string} [className] - Optional CSS class name for additional styling
 * @property {CSSProperties} [style] - Optional inline styles to be applied to the header
 */
interface AccordionHeaderProps {
  children: ReactNode;
  eventKey: string;
  open?: boolean;
  icon?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/**
 * Props for the AccordionBody component.
 * @interface
 * @property {ReactNode} children - The content to be displayed within the accordion body.
 * @property {string} eventKey - A unique identifier for the accordion item.
 * @property {string} [className] - Optional CSS class name to be applied to the accordion body.
 * @property {CSSProperties} [style] - Optional inline CSS styles to be applied to the accordion body.
 */
interface AccordionBodyProps {
  children: ReactNode;
  eventKey: string;
  className?: string;
  style?: CSSProperties;
}

export type {
  AccordionVariant,
  AccordionSize,
  AccordionProps,
  AccordionItemProps,
  AccordionHeaderProps,
  AccordionBodyProps,
};
