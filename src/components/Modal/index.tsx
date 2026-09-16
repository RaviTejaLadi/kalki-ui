import {
  ReactNode,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';
import { CloseButton } from '../CloseButton';

const modalVariants = cva(
  'relative w-full overflow-hidden border border-border bg-background text-foreground shadow-lg',
  {
    variants: {
      size: {
        sm: 'max-w-sm rounded-lg',
        md: 'max-w-lg rounded-lg',
        lg: 'max-w-3xl rounded-lg',
        xl: 'max-w-5xl rounded-lg',
        '2xl': 'max-w-6xl rounded-lg',
        fullscreen: 'h-[100dvh] w-[100vw] max-h-[100dvh] max-w-[100vw] rounded-none',
      },
      position: {
        top: '',
        right: '',
        left: '',
        bottom: '',
        center: '',
      },
    },
    defaultVariants: {
      size: 'md',
      position: 'center',
    },
  }
);

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

const positionClassMap: Record<NonNullable<ModalProps['position']>, string> = {
  top: 'items-start justify-center pt-8',
  right: 'items-center justify-end pr-6',
  left: 'items-center justify-start pl-6',
  bottom: 'items-end justify-center pb-8',
  center: 'items-center justify-center',
};

const hiddenStateClassMap: Record<
  NonNullable<ModalProps['position']>,
  string
> = {
  top: '-translate-y-4 opacity-0',
  right: 'translate-x-6 opacity-0',
  left: '-translate-x-6 opacity-0',
  bottom: 'translate-y-6 opacity-0',
  center: 'translate-y-3 scale-[0.98] opacity-0',
};

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      children,
      open,
      position = 'center',
      size = 'md',
      className,
      onClose,
      overLayColor = 'rgba(0, 0, 0, 0.65)',
      overlayZIndex = 40,
      modalZIndex = 50,
      ...rest
    },
    ref
  ) => {
    const dialogRef = useRef<HTMLDivElement>(null);
    const [isMounted, setIsMounted] = useState(open);
    const [isVisible, setIsVisible] = useState(open);

    useEffect(() => {
      if (open) {
        setIsMounted(true);
        const frame = requestAnimationFrame(() => setIsVisible(true));
        return () => cancelAnimationFrame(frame);
      }

      if (!isMounted) return;
      setIsVisible(false);
      const timer = window.setTimeout(() => setIsMounted(false), 260);
      return () => window.clearTimeout(timer);
    }, [isMounted, open]);

    useEffect(() => {
      if (!isMounted) return;

      const previousOverflow = document.body.style.overflow;
      const previousPaddingRight = document.body.style.paddingRight;
      const scrollBarCompensation =
        window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = 'hidden';
      if (scrollBarCompensation > 0) {
        document.body.style.paddingRight = `${scrollBarCompensation}px`;
      }

      return () => {
        document.body.style.overflow = previousOverflow;
        document.body.style.paddingRight = previousPaddingRight;
      };
    }, [isMounted]);

    useEffect(() => {
      if (!isMounted || !onClose) return;

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isMounted, onClose]);

    useEffect(() => {
      if (!isVisible) return;
      dialogRef.current?.focus();
    }, [isVisible]);

    if (!isMounted) return null;

    const requestedPosition = position ?? 'center';
    const resolvedSize = size ?? 'md';
    const isFullscreen = resolvedSize === 'fullscreen';
    const resolvedPosition = isFullscreen ? 'center' : requestedPosition;
    const layoutClass = positionClassMap[resolvedPosition];
    const hiddenClass = isFullscreen
      ? 'opacity-0 scale-[0.995]'
      : hiddenStateClassMap[resolvedPosition];

    return (
      <div
        ref={ref}
        className="fixed inset-0"
        style={{ zIndex: overlayZIndex }}
        {...rest}
      >
        <div
          className="absolute inset-0 transition-opacity duration-200 ease-out"
          style={{ backgroundColor: overLayColor, opacity: isVisible ? 1 : 0 }}
          onClick={() => onClose?.()}
          aria-hidden
        />
        <div className={cn('relative z-1 flex h-full w-full', layoutClass)}>
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
          className={cn(
            modalVariants({ size: resolvedSize, position: resolvedPosition }),
            !isFullscreen && 'm-4 max-h-[calc(100vh-2rem)]',
            'flex flex-col transition-[transform,opacity] duration-300 ease-out',
            isVisible ? 'translate-x-0 translate-y-0 scale-100 opacity-100' : hiddenClass,
            className
          )}
          style={{ zIndex: modalZIndex }}
          onClick={(event) => event.stopPropagation()}
        >
          {children}
        </div>
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
}: ModalHeaderProps) => (
  <div
    className={cn(
      'flex w-full items-center justify-between border-b border-border px-4 py-3',
      className
    )}
    style={{ height }}
    {...rest}
  >
    <div className="min-w-0">{children}</div>
    {closeButton ? (
      <div className="shrink-0">
        <CloseButton onClick={onClose} />
      </div>
    ) : null}
  </div>
);

const ModalTitle = ({ children, className, ...rest }: ModalTitleProps) => (
  <div
    className={cn('text-lg font-semibold text-foreground', className)}
    {...rest}
  >
    {children}
  </div>
);

const ModalBody = ({
  children,
  height,
  className,
  ...rest
}: ModalBodyProps) => (
  <div
    className={cn(
      'grow overflow-y-auto px-4 py-3 text-muted-foreground',
      className
    )}
    style={{ height }}
    {...rest}
  >
    {children}
  </div>
);

const ModalFooter = ({
  children,
  height,
  className,
  ...rest
}: ModalFooterProps) => (
  <div
    className={cn(
      'mt-auto flex w-full items-center justify-end gap-2 border-t border-border px-4 py-3',
      className
    )}
    style={{ height }}
    {...rest}
  >
    {children}
  </div>
);

Modal.displayName = 'Modal';

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
