import React, { forwardRef, ReactNode, useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { CloseButton } from '../CloseButton';
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
/**
 * Props for the Modal root overlay and dialog.
 */
interface ModalProps extends VariantProps<typeof modalVariants> {
  /** Modal content (Header, Body, Footer, etc.) */
  children?: ReactNode;
  /** Controls whether the modal is visible */
  open: boolean;
  /** Additional CSS classes for the dialog panel */
  className?: string;
  /** Called when overlay is clicked or Escape is pressed */
  onClose?: () => void;
  /** Overlay background color @default 'rgba(0, 0, 0, 0.75)' */
  overLayColor?: string;
  /** z-index of the overlay @default 40 */
  overlayZIndex?: number;
  /** z-index of the dialog panel @default 50 */
  modalZIndex?: number;
}

/**
 * Props for the modal header bar.
 */
interface ModalHeaderProps {
  /** Header content (typically Modal.Title) */
  children?: ReactNode;
  /** Shows a close button when true */
  closeButton?: boolean;
  /** Close button click handler */
  onClose?: () => void;
  /** Explicit header height */
  height?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Props for the modal title text.
 */
interface ModalTitleProps {
  /** Title content */
  children?: ReactNode;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Props for the scrollable modal body.
 */
interface ModalBodyProps {
  /** Body content */
  children?: ReactNode;
  /** Explicit body height */
  height?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Props for the modal footer actions area.
 */
interface ModalFooterProps {
  /** Footer content (actions, buttons) */
  children?: ReactNode;
  /** Explicit footer height */
  height?: string;
  /** Additional CSS classes */
  className?: string;
}
// #endregion

/**
 * A dialog overlay that traps focus visually and closes on Escape or overlay click.
 *
 * @component
 * @example
 * ```tsx
 * <Modal open={isOpen} onClose={() => setIsOpen(false)} size="md">
 *   <Modal.Header closeButton onClose={() => setIsOpen(false)}>
 *     <Modal.Title>Confirm</Modal.Title>
 *   </Modal.Header>
 *   <Modal.Body>Are you sure?</Modal.Body>
 *   <Modal.Footer>
 *     <Button onClick={() => setIsOpen(false)}>Close</Button>
 *   </Modal.Footer>
 * </Modal>
 * ```
 *
 * @param {ModalProps} props - The component props
 * @param {boolean} props.open - Whether the modal is visible
 * @param {'sm'|'md'|'lg'|'xl'|'2xl'|'fullscreen'} [props.size='md'] - Dialog size
 * @param {'top'|'right'|'left'|'bottom'|'center'} [props.position='center'] - Dialog position
 * @param {() => void} [props.onClose] - Close handler for overlay / Escape
 * @param {string} [props.overLayColor] - Overlay background color
 * @param {number} [props.overlayZIndex=40] - Overlay z-index
 * @param {number} [props.modalZIndex=50] - Dialog z-index
 * @param {string} [props.className] - Additional CSS classes for the dialog
 * @param {React.ReactNode} [props.children] - Modal compound children
 * @param {React.Ref<HTMLDivElement>} ref - Forwarded ref to the overlay container
 *
 * @returns {JSX.Element | null} The modal overlay and dialog, or null when closed
 */
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
    useEffect(() => {
      if (!open || !onClose) return;

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [open, onClose]);

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

/**
 * Header bar for a Modal, optionally including a close button.
 *
 * @component
 * @example
 * ```tsx
 * <Modal.Header closeButton onClose={onClose}>
 *   <Modal.Title>Settings</Modal.Title>
 * </Modal.Header>
 * ```
 *
 * @param {ModalHeaderProps} props - The component props
 * @param {React.ReactNode} [props.children] - Header content
 * @param {boolean} [props.closeButton] - Render a close button when true
 * @param {() => void} [props.onClose] - Close button click handler
 * @param {string} [props.height] - Explicit header height
 * @param {string} [props.className] - Additional CSS classes
 *
 * @returns {JSX.Element} The modal header row
 */
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

/**
 * Title text displayed inside a Modal.Header.
 *
 * @component
 * @example
 * ```tsx
 * <Modal.Title>Edit profile</Modal.Title>
 * ```
 *
 * @param {ModalTitleProps} props - The component props
 * @param {React.ReactNode} [props.children] - Title content
 * @param {string} [props.className] - Additional CSS classes
 *
 * @returns {JSX.Element} Styled title text
 */
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

/**
 * Scrollable content area of a Modal.
 *
 * @component
 * @example
 * ```tsx
 * <Modal.Body>Modal details go here.</Modal.Body>
 * ```
 *
 * @param {ModalBodyProps} props - The component props
 * @param {React.ReactNode} [props.children] - Body content
 * @param {string} [props.height] - Explicit body height
 * @param {string} [props.className] - Additional CSS classes
 *
 * @returns {JSX.Element} The modal body region
 */
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

/**
 * Footer action area aligned to the bottom of a Modal.
 *
 * @component
 * @example
 * ```tsx
 * <Modal.Footer>
 *   <Button variant="primary">Save</Button>
 * </Modal.Footer>
 * ```
 *
 * @param {ModalFooterProps} props - The component props
 * @param {React.ReactNode} [props.children] - Footer content
 * @param {string} [props.height] - Explicit footer height
 * @param {string} [props.className] - Additional CSS classes
 *
 * @returns {JSX.Element} The modal footer region
 */
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

export {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
  modalVariants,
};
export type {
  ModalProps,
  ModalHeaderProps,
  ModalTitleProps,
  ModalBodyProps,
  ModalFooterProps,
};
// #endregion
