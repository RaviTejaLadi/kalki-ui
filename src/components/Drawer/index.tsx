import {
  CSSProperties,
  ReactNode,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/utils';
import { CloseButton } from '../CloseButton';

const drawerVariants = cva(
  'fixed z-[51] flex max-h-[calc(100vh-2rem)] flex-col overflow-hidden border border-border bg-background text-foreground shadow-2xl transition-[transform,opacity] duration-300 ease-out will-change-transform',
  {
    variants: {
      position: {
        top: 'left-4 right-4 top-4 rounded-xl',
        right: 'bottom-4 right-4 top-4 rounded-xl',
        bottom: 'bottom-4 left-4 right-4 rounded-xl',
        left: 'bottom-4 left-4 top-4 rounded-xl',
      },
      open: {
        true: 'translate-x-0 translate-y-0 opacity-100',
        false: '',
      },
    },
    compoundVariants: [
      {
        position: 'top',
        open: false,
        className: '-translate-y-[calc(100%+1rem)] opacity-0',
      },
      {
        position: 'right',
        open: false,
        className: 'translate-x-[calc(100%+1rem)] opacity-0',
      },
      {
        position: 'bottom',
        open: false,
        className: 'translate-y-[calc(100%+1rem)] opacity-0',
      },
      {
        position: 'left',
        open: false,
        className: '-translate-x-[calc(100%+1rem)] opacity-0',
      },
    ],
    defaultVariants: {
      position: 'right',
      open: false,
    },
  }
);

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

const Drawer = forwardRef<HTMLDivElement, DrawerProps>(
  (
    {
      position = 'right',
      children,
      isOpen,
      onClose,
      width = '320px',
      height = '300px',
      overLayColor = 'rgba(0, 0, 0, 0.55)',
      className,
      style,
      ...rest
    },
    ref
  ) => {
    const panelRef = useRef<HTMLDivElement>(null);
    const [isMounted, setIsMounted] = useState(isOpen);
    const [isVisible, setIsVisible] = useState(isOpen);

    useEffect(() => {
      if (isOpen) {
        setIsMounted(true);
        const frame = requestAnimationFrame(() => setIsVisible(true));
        return () => cancelAnimationFrame(frame);
      }

      if (!isMounted) return;
      setIsVisible(false);
      const timer = window.setTimeout(() => setIsMounted(false), 320);
      return () => window.clearTimeout(timer);
    }, [isMounted, isOpen]);

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
      if (!isOpen || !onClose) return;
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose();
        }
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    useEffect(() => {
      if (!isVisible) return;
      panelRef.current?.focus();
    }, [isVisible]);

    if (!isMounted) return null;

    return (
      <div ref={ref} className="fixed inset-0 z-50" {...rest}>
        <div
          className="absolute inset-0 transition-opacity duration-200 ease-out"
          style={{ backgroundColor: overLayColor, opacity: isVisible ? 1 : 0 }}
          onClick={() => onClose?.()}
          aria-hidden
        />
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
          className={cn(drawerVariants({ position, open: isVisible }), className)}
          style={{
            width: position === 'left' || position === 'right' ? width : undefined,
            height:
              position === 'top' || position === 'bottom' ? height : undefined,
            ...style,
          }}
          onClick={(event) => event.stopPropagation()}
        >
          {children}
        </div>
      </div>
    );
  }
);

const DrawerTitle = forwardRef<HTMLDivElement, DrawerTitleProps>(
  ({ children, className, style, ...rest }, ref) => (
    <div
      ref={ref}
      className={cn(
        'text-lg font-semibold leading-none tracking-tight',
        className
      )}
      style={style}
      {...rest}
    >
      {children}
    </div>
  )
);

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
  ) => (
    <div
      ref={ref}
      className={cn(
        'flex items-center justify-between border-b border-border px-4 py-3',
        className
      )}
      style={style}
      {...rest}
    >
      <div className="min-w-0">{children}</div>
      {closeButton ? (
        <CloseButton size={closeBtnSize} onClick={onClose} />
      ) : null}
    </div>
  )
);

const DrawerBody = forwardRef<HTMLDivElement, DrawerBodyProps>(
  ({ children, className, style, ...rest }, ref) => (
    <div
      ref={ref}
      className={cn('grow overflow-y-auto px-4 py-3', className)}
      style={style}
      {...rest}
    >
      {children}
    </div>
  )
);

Drawer.displayName = 'Drawer';
DrawerTitle.displayName = 'DrawerTitle';
DrawerHeader.displayName = 'DrawerHeader';
DrawerBody.displayName = 'DrawerBody';

export { Drawer, DrawerTitle, DrawerHeader, DrawerBody, drawerVariants };
export type {
  DrawerProps,
  DrawerHeaderProps,
  DrawerTitleProps,
  DrawerBodyProps,
};
