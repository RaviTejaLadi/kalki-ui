import { cva } from 'class-variance-authority';

export const accordionVariants = cva(
  'w-full border-[.5px] dark:border-gray-200/10 rounded-md overflow-hidden',
  {
    variants: {
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl',
        xxl: 'text-2xl',
      },
    },
    defaultVariants: {
      size: 'sm',
    },
  }
);
