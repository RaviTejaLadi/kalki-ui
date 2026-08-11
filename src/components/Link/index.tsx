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
const linkVariants = cva('no-underline transition-colors duration-300', {
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
/**
 * Props for the Link component.
 *
 * @interface LinkProps
 * @extends {Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'target'>}
 *
 * @property {string} to - Destination URL or path
 * @property {ReactNode} children - Link label/content
 * @property {string} [className] - Additional CSS classes
 * @property {'_blank' | '_self' | '_parent' | '_top'} [target] - Browsing context for navigation
 * @property {string} [rel] - Link relationship; defaults to `noopener noreferrer` for external URLs
 * @property {MouseEventHandler<HTMLAnchorElement>} [onClick] - Click handler invoked before navigation
 * @property {boolean | string} [download] - Download attribute for file links
 * @property {string} [hrefLang] - Language of the linked resource
 * @property {string} [ping] - Space-separated URLs to notify when the link is followed
 * @property {HTMLAttributeReferrerPolicy} [referrerPolicy] - Referrer policy for the request
 * @property {string} [type] - Hint for the MIME type of the linked resource
 */
interface LinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'target'> {
  /** Destination URL or path */
  to: string;
  /** Link label/content */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Browsing context for navigation */
  target?: '_blank' | '_self' | '_parent' | '_top';
  /** Link relationship; defaults to `noopener noreferrer` for external URLs */
  rel?: string;
  /** Click handler invoked before navigation */
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  /** Download attribute for file links */
  download?: boolean | string;
  /** Language of the linked resource */
  hrefLang?: string;
  /** Space-separated URLs to notify when the link is followed */
  ping?: string;
  /** Referrer policy for the request */
  referrerPolicy?: HTMLAttributeReferrerPolicy;
  /** Hint for the MIME type of the linked resource */
  type?: string;
}
// #endregion

// #region Link
/**
 * Anchor that supports external URLs and client-side navigation for internal paths.
 *
 * @component
 * @example
 * ```tsx
 * <Link to="/docs">Documentation</Link>
 * <Link to="https://example.com" target="_blank">External</Link>
 * ```
 *
 * @param {LinkProps} props - The component props
 * @param {string} props.to - Destination URL or path
 * @param {React.ReactNode} props.children - Link content
 * @param {'_blank' | '_self' | '_parent' | '_top'} [props.target] - Link target
 * @param {string} [props.rel] - Rel attribute
 * @param {string} [props.className] - Additional CSS classes
 * @param {MouseEventHandler<HTMLAnchorElement>} [props.onClick] - Click handler
 * @param {boolean | string} [props.download] - Download attribute
 * @param {string} [props.hrefLang] - Language of the linked resource
 * @param {string} [props.ping] - Ping URLs
 * @param {HTMLAttributeReferrerPolicy} [props.referrerPolicy] - Referrer policy
 * @param {string} [props.type] - MIME type hint
 * @param {React.Ref<HTMLAnchorElement>} ref - Forwarded ref to the anchor element
 *
 * @returns {JSX.Element} A styled anchor element
 */
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
export { linkVariants };
export type { LinkProps };
// #endregion
