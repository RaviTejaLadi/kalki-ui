import { useState, useEffect, forwardRef } from 'react';
import { Expand, Shrink } from 'lucide-react';
import Button, { ButtonIcon, ButtonProps, ButtonText } from '../Button';

const FullScreenToggle = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'light', size = 'xs', children, ...rest }, ref) => {
    const [isFullScreen, setFullScreen] = useState<boolean>(false);

    const toggleFullScreen = () => {
      const doc = document.documentElement;

      if (!document.fullscreenElement) {
        doc.requestFullscreen?.() ||
          (doc as any).mozRequestFullScreen?.() ||
          (doc as any).webkitRequestFullscreen?.();
        setFullScreen(true);
      } else {
        document.exitFullscreen?.() ||
          (document as any).mozCancelFullScreen?.() ||
          (document as any).webkitExitFullscreen?.();
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
        if (document.fullscreenElement) {
          document.exitFullscreen?.();
        }
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

export default FullScreenToggle;
