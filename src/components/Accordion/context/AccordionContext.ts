import { createContext } from 'react';
import { AccordionSize, AccordionVariant } from '../types';

/**
 * Interface defining the context for the Accordion component.
 * @interface
 *
 * @property {Set<string>} activeKeys - Set of keys representing currently active/expanded accordion items
 * @property {(eventKey: string) => void} toggleItem - Function to toggle an accordion item's expanded state
 * @property {(eventKey: string) => void} openItem - Function to expand a specific accordion item
 * @property {AccordionVariant} variant - Visual variant of the accordion component
 * @property {AccordionSize} size - Size variant of the accordion component
 */
export interface AccordionContextType {
  activeKeys: Set<string>;
  toggleItem: (eventKey: string) => void;
  openItem: (eventKey: string) => void;
  variant: AccordionVariant;
  size: AccordionSize;
}

export const AccordionContext = createContext<AccordionContextType | null>(
  null
);
