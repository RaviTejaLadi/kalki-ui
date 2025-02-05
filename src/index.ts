import './index.css';

// #region Accordion Export
export {
  default as Accordion,
  AccordionHeader,
  AccordionBody,
  AccordionItem,
} from './components/Accordion';

export type {
  AccordionVariant,
  AccordionSize,
  AccordionProps,
  AccordionItemProps,
  AccordionHeaderProps,
  AccordionBodyProps,
} from './components/Accordion';
// #endregion Accordion Export

// #region Box Export
export { default as Box } from './components/Box';
export type { BoxProps } from './components/Box';
// #endregion Box Export

// #region Alert
export {
  default as Alert,
  AlertHeader,
  AlertFooter,
  alertVariants,
} from './components/Alert';

export type { AlertProps, SectionProps } from './components/Alert';
// #endregion
