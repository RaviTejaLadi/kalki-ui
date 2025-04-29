import React, { CSSProperties, forwardRef, ReactNode } from 'react';
import { cn } from '@/utils';
import { cva } from 'class-variance-authority';
import CloseButton from '../CloseButton';

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
/**
 * Props for the Drawer component.
 *
 * @interface DrawerProps
 *
 * @property {('top' | 'right' | 'bottom' | 'left')} [position] - The position of the drawer. Can be 'top', 'right', 'bottom', or 'left'.
 * @property {ReactNode} children - The content to be displayed inside the drawer.
 * @property {boolean} isOpen - Indicates whether the drawer is open or closed.
 * @property {() => void} onClose - Callback function to be called when the drawer is requested to be closed.
 * @property {string} [width] - The width of the drawer. Optional.
 * @property {string} [height] - The height of the drawer. Optional.
 * @property {string} [overLayColor] - The color of the overlay behind the drawer. Optional.
 * @property {string} [className] - Additional CSS class names to apply to the drawer. Optional.
 * @property {CSSProperties} [style] - Inline styles to apply to the drawer. Optional.
 */
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

/**
 * Props for the DrawerHeader component.
 *
 * @interface DrawerHeaderProps
 *
 * @property {ReactNode} children - The content to be displayed inside the drawer header.
 * @property {boolean} [closeButton] - Optional. If true, a close button will be displayed in the header.
 * @property {() => void} [onClose] - Optional. Callback function to be called when the close button is clicked.
 * @property {string} [className] - Optional. Additional CSS class names to apply to the drawer header.
 * @property {CSSProperties} [style] - Optional. Inline styles to apply to the drawer header.
 * @property {'sm' | 'md' | 'lg'} [closeBtnSize] - Optional. Size of the close button. Can be 'sm', 'md', or 'lg'.
 */
interface DrawerHeaderProps {
  children: ReactNode;
  closeButton?: boolean;
  onClose?: () => void;
  className?: string;
  style?: CSSProperties;
  closeBtnSize?: 'sm' | 'md' | 'lg';
}

/**
 * Props for the DrawerTitle component.
 *
 * @interface DrawerTitleProps
 * @property {ReactNode} children - The content to be displayed within the drawer title.
 * @property {string} [className] - Optional additional CSS class names to apply to the drawer title.
 * @property {CSSProperties} [style] - Optional inline styles to apply to the drawer title.
 */
interface DrawerTitleProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/**
 * Props for the DrawerBody component.
 *
 * @interface DrawerBodyProps
 * @property {ReactNode} children - The content to be displayed inside the drawer body.
 * @property {string} [className] - Optional additional CSS class names to apply to the drawer body.
 * @property {CSSProperties} [style] - Optional inline styles to apply to the drawer body.
 */
interface DrawerBodyProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

// #endregion

// #region Drawer Component
/**
 * A Drawer component that slides in from a specified position and can be controlled via props.
 *
 * @param {Object} props - The properties object.
 * @param {'left' | 'right' | 'top' | 'bottom'} [props.position='right'] - The position from which the drawer slides in.
 * @param {React.ReactNode} props.children - The content to be displayed inside the drawer.
 * @param {boolean} props.isOpen - A boolean indicating whether the drawer is open or closed.
 * @param {() => void} props.onClose - A callback function to be called when the overlay is clicked to close the drawer.
 * @param {string | number} props.width - The width of the drawer when positioned on the left or right.
 * @param {string | number} props.height - The height of the drawer when positioned on the top or bottom.
 * @param {string} [props.overLayColor=''] - The color of the overlay background.
 * @param {string} [props.className] - Additional class names to apply to the drawer.
 * @param {React.CSSProperties} [props.style] - Additional styles to apply to the drawer.
 * @param {React.Ref<HTMLDivElement>} ref - A ref to be attached to the drawer's root element.
 * @param {Object} rest - Additional props to be spread onto the drawer's root element.
 *
 * @returns {JSX.Element} The rendered Drawer component.
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

/**
 * `DrawerTitle` is a React functional component that renders a div element
 * with a specified class name and style. It uses `forwardRef` to pass down
 * the ref to the div element.
 *
 * @param {React.PropsWithChildren<DrawerTitleProps>} props - The props for the component.
 * @param {React.ReactNode} props.children - The content to be displayed inside the div.
 * @param {string} [props.className] - Additional class names to apply to the div.
 * @param {React.CSSProperties} [props.style] - Inline styles to apply to the div.
 * @param {React.Ref<HTMLDivElement>} ref - The ref to be forwarded to the div element.
 *
 * @returns {JSX.Element} The rendered div element with the specified props.
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
 * DrawerHeader component is a header section for a drawer component.
 * It displays children elements and an optional close button.
 *
 * @component
 * @param {DrawerHeaderProps} props - The properties for the DrawerHeader component.
 * @param {React.ReactNode} props.children - The content to be displayed inside the header.
 * @param {boolean} props.closeButton - Flag to determine if the close button should be displayed.
 * @param {() => void} props.onClose - Callback function to handle the close button click event.
 * @param {string} [props.className] - Additional class names to apply to the header.
 * @param {string} [props.closeBtnSize='sm'] - Size of the close button, defaults to 'sm'.
 * @param {React.CSSProperties} [props.style] - Inline styles to apply to the header.
 * @param {React.Ref<HTMLDivElement>} ref - Ref to be forwarded to the header div element.
 * @param {object} rest - Additional props to be spread onto the header div element.
 *
 * @returns {JSX.Element} The rendered DrawerHeader component.
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
 * `DrawerBody` is a React functional component that renders a `div` element with
 * customizable class names, styles, and additional properties. It uses `forwardRef`
 * to pass a ref to the `div` element.
 *
 * @param {React.PropsWithChildren<DrawerBodyProps>} props - The properties passed to the component.
 * @param {React.ReactNode} props.children - The content to be rendered inside the `div`.
 * @param {string} [props.className] - Additional class names to apply to the `div`.
 * @param {React.CSSProperties} [props.style] - Inline styles to apply to the `div`.
 * @param {React.Ref<HTMLDivElement>} ref - The ref to be forwarded to the `div` element.
 * @returns {JSX.Element} The rendered `div` element with the provided properties.
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
