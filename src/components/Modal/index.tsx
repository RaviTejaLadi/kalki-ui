import React, { forwardRef, ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import CloseButton from '../CloseButton';
import { cn } from '@/utils';

// #region modalVariants
const modalVariants = cva(
  'bg-white dark:bg-[#1b202e] dark:border-gray-200/10 border rounded-md relative flex flex-col justify-start items-stretch shadow-md',
  {
    variants: {
      size: {
        sm: 'w-[350px] max-w-[350px] h-[300px]',
        md: 'w-[500px] max-w-[500px] h-[500px]',
        lg: 'w-[800px] max-w-[800px] h-[500px]',
        xl: 'w-[1040px] max-w-[1040px] h-[500px]',
        '2xl': 'w-[1140px] max-w-[1140px] h-[500px]',
        fullscreen: 'w-full h-full max-w-full max-h-full inset-0',
      },
      position: {
        top: 'top-14 self-start',
        right: 'right-14 ml-auto',
        left: 'left-14 mr-auto',
        bottom: 'bottom-14 self-end',
        center: '',
      },
    },
    defaultVariants: {
      size: 'md',
      position: 'center',
    },
  }
);
// #endregion

// #region types
interface ModalProps extends VariantProps<typeof modalVariants> {
  children?: ReactNode;
  open: boolean;
  className?: string;
  onClose?: () => void;
  overLayColor?: string;
  overlayZIndex?: number;
  modalZIndex?: number;
}

interface ModalHeaderProps {
  children?: ReactNode;
  closeButton?: boolean;
  onClose?: () => void;
  height?: string;
  className?: string;
}

interface ModalTitleProps {
  children?: ReactNode;
  className?: string;
}

interface ModalBodyProps {
  children?: ReactNode;
  height?: string;
  className?: string;
}

interface ModalFooterProps {
  children?: ReactNode;
  height?: string;
  className?: string;
}
// #endregion

// #region Modal
const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      children,
      open,
      position,
      size,
      className,
      onClose,
      overLayColor = '',
      overlayZIndex = 40,
      modalZIndex = 50,
      ...rest
    },
    ref
  ) => {
    if (!open) return null;

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget && onClose) {
        onClose();
      }
    };

    return (
      <div
        ref={ref}
        className="fixed inset-0 flex justify-center items-center transition-opacity"
        style={{
          backgroundColor: overLayColor || 'rgba(0, 0, 0, 0.75)',
          zIndex: overlayZIndex,
        }}
        onClick={handleOverlayClick}
        {...rest}
      >
        <div
          role="dialog"
          aria-modal="true"
          className={cn(modalVariants({ size, position }), className)}
          style={{ zIndex: modalZIndex }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col h-full">{children}</div>
        </div>
      </div>
    );
  }
);

const ModalHeader = ({
  children,
  closeButton,
  onClose,
  height,
  className,
  ...rest
}: ModalHeaderProps) => {
  return (
    <div
      className={cn(
        'flex justify-between flex-nowrap items-center p-2.5 w-full',
        className
      )}
      style={{ height }}
      {...rest}
    >
      <div>{children}</div>
      {closeButton && (
        <div>
          <CloseButton onClick={onClose} />
        </div>
      )}
    </div>
  );
};

const ModalTitle = ({ children, className, ...rest }: ModalTitleProps) => {
  return (
    <div
      className={cn('font-medium text-lg text-foreground', className)}
      {...rest}
    >
      {children}
    </div>
  );
};

const ModalBody = ({
  children,
  height,
  className,
  ...rest
}: ModalBodyProps) => {
  return (
    <div
      className={cn(
        'p-2.5 w-full flex-grow overflow-auto text-muted-foreground',
        className
      )}
      style={{ height }}
      {...rest}
    >
      {children}
    </div>
  );
};

const ModalFooter = ({
  children,
  height,
  className,
  ...rest
}: ModalFooterProps) => {
  return (
    <div
      className={cn(
        'flex justify-end items-center p-2.5 w-full mt-auto',
        className
      )}
      style={{ height }}
      {...rest}
    >
      {children}
    </div>
  );
};

Modal.displayName = 'Modal';
// #endregion

// #region export
export default Object.assign(
  Modal as React.ForwardRefExoticComponent<
    ModalProps & React.RefAttributes<HTMLDivElement>
  >,
  {
    Header: ModalHeader,
    Title: ModalTitle,
    Body: ModalBody,
    Footer: ModalFooter,
  }
);

export { ModalHeader, ModalTitle, ModalBody, ModalFooter, modalVariants };
export type {
  ModalProps,
  ModalHeaderProps,
  ModalTitleProps,
  ModalBodyProps,
  ModalFooterProps,
};
// #endregion
