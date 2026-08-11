import { cn } from '@/utils';

interface DotSeparatorProps {
  /** Additional CSS classes */
  className?: string;
}

/**
 * A compact middle-dot separator for inline text and metadata rows.
 *
 * @component
 * @example
 * ```tsx
 * <span>Docs</span>
 * <DotSeparator />
 * <span>API</span>
 * ```
 *
 * @param {DotSeparatorProps} props - The component props
 * @param {string} [props.className] - Additional CSS classes
 *
 * @returns {JSX.Element} A span containing a styled middle-dot separator
 */
const DotSeparator = ({ className }: DotSeparatorProps) => {
  return (
    <span
      className={cn('mx-2 -mt-3.5 text-[1.5rem] text-slate-500', className)}
    >
      .
    </span>
  );
};

export default DotSeparator;
