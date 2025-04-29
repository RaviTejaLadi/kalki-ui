import React, { ButtonHTMLAttributes, useEffect, useState } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { ChevronUp } from 'lucide-react';

// #region scrollButtonVariants
const scrollButtonVariants = cva(
  'fixed z-100 rounded-md shadow-lg transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2',
  {
    variants: {
      size: {
        xs: 'h-8 w-8 py-[0.5px] px-1',
        sm: 'h-9 w-9 py-1 px-2',
        md: 'h-10 w-10 py-1 px-2',
        lg: 'h-11 w-11 py-2 px-2',
        xl: 'h-12 w-12 py-3 px-3',
      },
      position: {
        right: 'bottom-6 right-6',
        left: 'bottom-6 left-6',
        center: 'bottom-6 left-1/2 transform -translate-x-1/2',
      },
      variant: {
        primary:
          'bg-primary hover:bg-primary/90 border-primary text-primary-foreground dark:bg-primary dark:hover:bg-primary/90 dark:text-primary-foreground focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-800',
        secondary:
          'bg-secondary hover:bg-secondary/90 text-white dark:bg-secondary/80 dark:hover:bg-secondary focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700',
        success:
          'bg-success hover:bg-green-600 text-white dark:bg-green-700 dark:hover:bg-green-800 focus:ring-2 focus:ring-green-300 dark:focus:ring-green-800',
        danger:
          'bg-danger hover:bg-red-600 text-white dark:bg-red-700 dark:hover:bg-red-800 focus:ring-2 focus:ring-red-300 dark:focus:ring-red-800',
        warning:
          'bg-warning hover:bg-yellow-600 text-white dark:bg-yellow-700 dark:hover:bg-yellow-800 focus:ring-2 focus:ring-yellow-300 dark:focus:ring-yellow-800',
        info: 'bg-info hover:bg-cyan-600 text-white dark:bg-cyan-700 dark:hover:bg-cyan-800 focus:ring-2 focus:ring-cyan-300 dark:focus:ring-cyan-800',
        help: 'bg-help hover:bg-purple-600 text-white dark:bg-purple-700 dark:hover:bg-purple-800 focus:ring-2 focus:ring-purple-300 dark:focus:ring-purple-800',
        light:
          'bg-light hover:bg-gray-200 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100 focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700',
        dark: 'bg-dark hover:bg-gray-900 text-dark-foreground dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-gray-600 dark:focus:ring-gray-700',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-gray-700 dark:text-gray-100',
      },
    },
    defaultVariants: {
      size: 'sm',
      position: 'right',
      variant: 'primary',
    },
  }
);

// #endregion

// #region types
interface ScrollToTopProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof scrollButtonVariants> {
  threshold?: number;
  smooth?: boolean;
}
// #endregion

// #region ScrollToTop
const ScrollToTop: React.FC<ScrollToTopProps> = ({
  threshold = 400,
  smooth = true,
  size = 'sm',
  position = 'right',
  variant = 'primary',
  ...rest
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > threshold);
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, [threshold]);

  const scrollToTop = () => {
    if (smooth) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } else {
      window.scrollTo(0, 0);
    }
  };

  return (
    <button
      onClick={scrollToTop}
      className={scrollButtonVariants({ size, position, variant })}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: `scale(${isVisible ? 1 : 0.8}) ${position === 'center' ? 'translateX(-50%)' : ''}`,
        pointerEvents: isVisible ? 'auto' : 'none',
      }}
      aria-label="Scroll to top"
      {...rest}
    >
      <ChevronUp className="w-4 h-4" />
    </button>
  );
};
// #endregion

// #region exports
export default ScrollToTop;
export { scrollButtonVariants };
