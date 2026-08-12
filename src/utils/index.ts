import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Scope class — all Kalki styles are limited to elements with this class. */
export const KALKI_SCOPE_CLASS = 'kalki-ui';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(KALKI_SCOPE_CLASS, clsx(inputs));
};
