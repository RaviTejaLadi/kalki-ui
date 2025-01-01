import './index.css';

// #region Accordion
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

// #endregion

// #region Alert
export {
  default as Alert,
  AlertHeader,
  AlertFooter,
  alertVariants,
} from './components/Alert';

export type { AlertProps, SectionProps } from './components/Alert';

// #endregion
