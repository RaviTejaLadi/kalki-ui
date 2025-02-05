import {
  forwardRef,
  AnchorHTMLAttributes,
  HTMLAttributeReferrerPolicy,
  MouseEventHandler,
  ReactNode,
} from 'react';
import { cn } from '@/utils';
import { cva } from 'class-variance-authority';

// #region linkVariants
export const linkVariants = cva('no-underline transition-colors duration-300', {
  variants: {
    variant: {
      default: 'text-blue-500 hover:text-blue-700',
      subtle: 'text-gray-500 hover:text-gray-700',
    },
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});
// #endregion

// #region types
interface LinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'target'> {
  to: string;
  children: ReactNode;
  className?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  rel?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  download?: boolean | string;
  hrefLang?: string;
  ping?: string;
  referrerPolicy?: HTMLAttributeReferrerPolicy;
  type?: string;
}
// #endregion

// #region Link
const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      to,
      children,
      target,
      rel,
      className,
      onClick,
      download,
      hrefLang,
      ping,
      referrerPolicy,
      type,
      ...rest
    },
    ref
  ) => {
    const isExternal = /^(https?:\/\/|mailto:|tel:)/.test(to);

    const handleClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
      if (onClick) {
        onClick(event);
      }

      if (!event.defaultPrevented && !isExternal) {
        event.preventDefault();
        window.history.pushState({}, '', to);
        window.dispatchEvent(new Event('popstate'));
      }
    };

    return (
      <a
        href={to}
        ref={ref}
        target={target}
        rel={rel || (isExternal ? 'noopener noreferrer' : undefined)}
        className={cn(linkVariants(), className)}
        onClick={handleClick}
        download={download}
        hrefLang={hrefLang}
        ping={ping}
        referrerPolicy={referrerPolicy}
        type={type}
        {...rest}
      >
        {children}
      </a>
    );
  }
);

Link.displayName = 'Link';
// #endregion

// #region exports
export default Link;
// #endregion
