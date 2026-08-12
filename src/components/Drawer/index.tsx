import React, { CSSProperties, forwardRef, ReactNode, useEffect } from 'react';
import { cn } from '@/utils';
import { cva } from 'class-variance-authority';
import { CloseButton } from '../CloseButton';

// #region drawerVariants
const drawerVariants = cva(
  'fixed z-50 p-4 bg-white shadow-lg  border bg-background  dark:bg-[#1b202e] text-foreground dark:border-gray-200/10 overflow-y-auto flex flex-col transition-all duration-300 ease-in-out transform',
  {
    variants: {
      position: {
        top: 'top-0 left-0 transform  -translate-y-full w-full',
        right: 'top-0  right-0 transform border  translate-x-full h-full',
        bottom: 'bottom-0 left-0 transform  translate-y-full w-full',
        left: 'top-0 left-0 transform  -translate-x-full h-full',
      },
      open: {
        true: 'transform-none',
        false:
          'transform transition-all duration-300 ease-in-out pointer-events-none',
      },
    },
    defaultVariants: {
      position: 'right',
    },
  }
);
// #endregion

// #region types
interface DrawerProps {
  /** Edge from which the drawer slides in @default 'right' */
  position?: 'top' | 'right' | 'bottom' | 'left';
  /** Drawer compound children (Header, Title, Body) */
  children: ReactNode;
  /** Whether the drawer is visible */
  isOpen: boolean;
  /** Called when the overlay is clicked or Escape is pressed */
  onClose?: () => void;
  /** Width used for left/right drawers @default '300px' */
  width?: string;
  /** Height used for top/bottom drawers @default '300px' */
  height?: string;
  /** Custom overlay background color */
  overLayColor?: string;
  /** Additional CSS classes for the panel */
  className?: string;
  /** Additional inline styles for the panel */
  style?: CSSProperties;
}

interface DrawerHeaderProps {
  /** Header content (typically a title) */
  children: ReactNode;
  /** Whether to show a close button */
  closeButton?: boolean;
  /** Click handler for the close button */
  onClose?: () => void;
  /** Additional CSS classes */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
  /** Size of the optional close button @default 'sm' */
  closeBtnSize?: 'sm' | 'md' | 'lg';
}

interface DrawerTitleProps {
  /** Title content */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}

interface DrawerBodyProps {
  /** Main drawer content */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}

// #endregion

// #region Drawer Component
/**
 * A slide-in panel with overlay, Escape-to-close, and compound Header/Title/Body parts.
 *
 * @component
 * @example
 * ```tsx
 * <Drawer isOpen={open} onClose={() => setOpen(false)} position="right" width="360px">
 *   <Drawer.Header closeButton onClose={() => setOpen(false)}>
 *     <Drawer.Title>Settings</Drawer.Title>
 *   </Drawer.Header>
 *   <Drawer.Body>Drawer content</Drawer.Body>
 * </Drawer>
 * ```
 *
 * @param {DrawerProps} props - The component props
 * @param {'top' | 'right' | 'bottom' | 'left'} [props.position='right'] - Edge from which the drawer slides in
 * @param {React.ReactNode} props.children - Drawer compound children
 * @param {boolean} props.isOpen - Whether the drawer is visible
 * @param {() => void} [props.onClose] - Called when the overlay is clicked or Escape is pressed
 * @param {string} [props.width='300px'] - Width used for left/right drawers
 * @param {string} [props.height='300px'] - Height used for top/bottom drawers
 * @param {string} [props.overLayColor=''] - Custom overlay background color
 * @param {string} [props.className] - Additional CSS classes for the panel
 * @param {React.CSSProperties} [props.style] - Additional inline styles for the panel
 * @param {React.Ref<HTMLDivElement>} ref - Forwarded ref to the outer wrapper
 *
 * @returns {JSX.Element} An overlay and sliding drawer panel
 */
const Drawer = forwardRef<HTMLDivElement, DrawerProps>(
  (
    {
      position = 'right',
      children,
      isOpen,
      onClose,
      width = '300px',
      height = '300px',
      overLayColor = '',
      className,
      style,
      ...rest
    },
    ref
  ) => {
    useEffect(() => {
      if (!isOpen || !onClose) return;

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    return (
      <div ref={ref} {...rest}>
        <div
          className={`fixed  z-50 inset-0 bg-black/80 bg-opacity-10 transition-opacity ${
            isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          style={{ backgroundColor: overLayColor }}
          onClick={onClose}
        />
        <div
          className={cn(drawerVariants({ position, open: isOpen }), className)}
          style={{
            width: position === 'left' || position === 'right' ? width : '100%',
            height:
              position === 'top' || position === 'bottom' ? height : '100%',
            ...style,
          }}
          aria-hidden={!isOpen}
        >
          {children}
        </div>
      </div>
    );
  }
);

Drawer.displayName = 'Drawer';

/**
 * Semibold title text for use inside a Drawer header.
 *
 * @component
 * @example
 * ```tsx
 * <Drawer.Title>Account details</Drawer.Title>
 * ```
 *
 * @param {DrawerTitleProps} props - The component props
 * @param {React.ReactNode} props.children - Title content
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.CSSProperties} [props.style] - Additional inline styles
 * @param {React.Ref<HTMLDivElement>} ref - Forwarded ref to the title element
 *
 * @returns {JSX.Element} A styled title container
 */
const DrawerTitle = forwardRef<HTMLDivElement, DrawerTitleProps>(
  ({ children, className, style, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('text-xl font-semibold', className)}
        style={style}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

DrawerTitle.displayName = 'DrawerTitle';

/**
 * Header row for a Drawer, optionally including a close button.
 *
 * @component
 * @example
 * ```tsx
 * <Drawer.Header closeButton onClose={handleClose} closeBtnSize="sm">
 *   <Drawer.Title>Filters</Drawer.Title>
 * </Drawer.Header>
 * ```
 *
 * @param {DrawerHeaderProps} props - The component props
 * @param {React.ReactNode} props.children - Header content
 * @param {boolean} [props.closeButton] - Whether to show a close button
 * @param {() => void} [props.onClose] - Click handler for the close button
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.CSSProperties} [props.style] - Additional inline styles
 * @param {'sm' | 'md' | 'lg'} [props.closeBtnSize='sm'] - Size of the optional close button
 * @param {React.Ref<HTMLDivElement>} ref - Forwarded ref to the header element
 *
 * @returns {JSX.Element} A header row with optional close control
 */
const DrawerHeader = forwardRef<HTMLDivElement, DrawerHeaderProps>(
  (
    {
      children,
      closeButton,
      onClose,
      className,
      closeBtnSize = 'sm',
      style,
      ...rest
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn('flex justify-between items-center px-4 py-2', className)}
        style={style}
        {...rest}
      >
        <div>{children}</div>
        {closeButton && <CloseButton size={closeBtnSize} onClick={onClose} />}
      </div>
    );
  }
);

DrawerHeader.displayName = 'DrawerHeader';

/**
 * Main content area of a Drawer panel.
 *
 * @component
 * @example
 * ```tsx
 * <Drawer.Body>
 *   <p>Configure your preferences here.</p>
 * </Drawer.Body>
 * ```
 *
 * @param {DrawerBodyProps} props - The component props
 * @param {React.ReactNode} props.children - Main drawer content
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.CSSProperties} [props.style] - Additional inline styles
 * @param {React.Ref<HTMLDivElement>} ref - Forwarded ref to the body element
 *
 * @returns {JSX.Element} A padded body container for drawer content
 */
const DrawerBody = forwardRef<HTMLDivElement, DrawerBodyProps>(
  ({ children, className, style, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('px-4 py-2', className)}
        style={style}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

DrawerBody.displayName = 'DrawerBody';
// #endregion

// #region Export
const DrawerRoot = Object.assign(
  Drawer as React.ForwardRefExoticComponent<
    DrawerProps & React.RefAttributes<HTMLDivElement>
  >,
  {
    Title: DrawerTitle,
    Header: DrawerHeader,
    Body: DrawerBody,
  }
);

export {
  DrawerRoot as Drawer,
  DrawerTitle,
  DrawerHeader,
  DrawerBody,
  drawerVariants,
};
export type {
  DrawerProps,
  DrawerHeaderProps,
  DrawerTitleProps,
  DrawerBodyProps,
};
// #endregion
