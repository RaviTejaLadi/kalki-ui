import { useState, useEffect, forwardRef } from 'react';
import { Expand, Shrink } from 'lucide-react';
import { Button, ButtonIcon, ButtonText, type ButtonProps } from '../Button';

/**
 * Button that toggles the browser's fullscreen mode and swaps expand/shrink icons.
 *
 * @component
 * @example
 * ```tsx
 * <FullScreenToggle variant="light" size="xs">
 *   Fullscreen
 * </FullScreenToggle>
 * ```
 *
 * @param {ButtonProps} props - The component props (inherits from Button)
 * @param {ButtonProps['variant']} [props.variant='light'] - Visual style of the button
 * @param {ButtonProps['size']} [props.size='xs'] - Size of the button
 * @param {React.ReactNode} [props.children] - Optional label rendered beside the icon
 * @param {React.Ref<HTMLButtonElement>} ref - Forwarded ref to the underlying button
 *
 * @returns {JSX.Element} A button that enters or exits document fullscreen
 */
const FullScreenToggle = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'light', size = 'xs', children, ...rest }, ref) => {
    const [isFullScreen, setFullScreen] = useState<boolean>(false);

    const toggleFullScreen = () => {
      const doc = document.documentElement as HTMLElement & {
        mozRequestFullScreen?: () => void;
        webkitRequestFullscreen?: () => void;
      };
      const docAny = document as Document & {
        mozCancelFullScreen?: () => void;
        webkitExitFullscreen?: () => void;
      };

      if (!document.fullscreenElement) {
        if (doc.requestFullscreen) {
          void doc.requestFullscreen();
        } else if (doc.mozRequestFullScreen) {
          doc.mozRequestFullScreen();
        } else if (doc.webkitRequestFullscreen) {
          doc.webkitRequestFullscreen();
        }
        setFullScreen(true);
      } else {
        if (document.exitFullscreen) {
          void document.exitFullscreen();
        } else if (docAny.mozCancelFullScreen) {
          docAny.mozCancelFullScreen();
        } else if (docAny.webkitExitFullscreen) {
          docAny.webkitExitFullscreen();
        }
        setFullScreen(false);
      }
    };

    useEffect(() => {
      const onFullScreenChange = () => {
        setFullScreen(!!document.fullscreenElement);
      };

      document.addEventListener('fullscreenchange', onFullScreenChange);
      return () => {
        document.removeEventListener('fullscreenchange', onFullScreenChange);
      };
    }, []);

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        onClick={toggleFullScreen}
        {...rest}
      >
        <ButtonIcon>
          {isFullScreen ? (
            <Shrink className="size-3" />
          ) : (
            <Expand className="size-3" />
          )}
        </ButtonIcon>
        {children && <ButtonText>{children}</ButtonText>}
      </Button>
    );
  }
);

FullScreenToggle.displayName = 'FullScreenToggle';

export { FullScreenToggle };
