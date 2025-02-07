import React, { forwardRef } from 'react';
import { cn } from '@/utils';
import { CSSProperties, ReactNode } from 'react';
import { cva } from 'class-variance-authority';
import CloseButton from '../CloseButton';

// #region drawerVariants
const drawerVariants = cva(
  'fixed z-50 p-4 bg-white shadow-lg  border bg-background  dark:bg-[#1b202e] text-foreground dark:border-gray-200/10 overflow-y-auto flex flex-col transition-all duration-300 ease-in-out transform',
  {
    variants: {
      position: {
        top: 'top-0 left-0 transform -translate-y-full w-full',
        right: 'top-0  right-0 transform translate-x-full h-full',
        bottom: 'bottom-0 left-0 transform translate-y-full w-full',
        left: 'top-0 left-0 transform -translate-x-full h-full',
      },
      open: {
        true: 'transform-none',
        false: 'transform transition-all duration-300 ease-in-out ',
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
  position?: 'top' | 'right' | 'bottom' | 'left';
  children: ReactNode;
  isOpen: boolean;
  onClose?: () => void;
  width?: string;
  height?: string;
  overLayColor?: string;
  className?: string;
  style?: CSSProperties;
}

interface DrawerHeaderProps {
  children: ReactNode;
  closeButton?: boolean;
  onClose?: () => void;
  className?: string;
  style?: CSSProperties;
  closeBtnSize?: 'sm' | 'md' | 'lg';
}

interface DrawerTitleProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

interface DrawerBodyProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

// #endregion

// #region Drawer
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
        >
          {children}
        </div>
      </div>
    );
  }
);

Drawer.displayName = 'Drawer';

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

// #region exports
export default Object.assign(
  Drawer as React.ForwardRefExoticComponent<
    DrawerProps & React.RefAttributes<HTMLDialogElement>
  >,
  {
    Title: DrawerTitle,
    Header: DrawerHeader,
    Body: DrawerBody,
  }
);
export { DrawerTitle, DrawerHeader, DrawerBody, drawerVariants };

export type {
  DrawerProps,
  DrawerHeaderProps,
  DrawerTitleProps,
  DrawerBodyProps,
};

// #endregion
