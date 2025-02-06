import './index.css';

// #region Accordion
export {
  default as Accordion,
  AccordionHeader,
  AccordionBody,
  AccordionItem,
} from './components/Accordion';

export type {
  AccordionVariant,
  AccordionSize,
  AccordionProps,
  AccordionItemProps,
  AccordionHeaderProps,
  AccordionBodyProps,
} from './components/Accordion';
// #endregion Accordion

// #region Box
export { default as Box } from './components/Box';

export type { BoxProps } from './components/Box';
// #endregion Box

// #region Alert
export {
  default as Alert,
  AlertHeader,
  AlertFooter,
  alertVariants,
} from './components/Alert';

export type { AlertProps, SectionProps } from './components/Alert';
// #endregion

// #region Avatar
export {
  default as Avatar,
  AvatarFallback,
  AvatarImage,
  avatarVariants,
} from './components/Avatar';

export type { AvatarProps, AvatarImageProps } from './components/Avatar';
// #endregion

// #region Badge
export { default as Badge, BadgeIcon, badgeVariants } from './components/Badge';

export type { BadgeProps, BadgeIconProps } from './components/Badge';
// #endregion

// #region Banner
export {
  default as Banner,
  BannerTitle,
  BannerSubTitle,
  bannerVariants,
} from './components/Banner';

export type {
  BannerSize,
  BannerProps,
  BannerChildProps,
} from './components/Banner';
// #endregion

// #region BreadCrumb
export {
  default as Breadcrumb,
  BreadcrumbItem,
  breadcrumbVariants,
} from './components/Breadcrumb';

export type {
  BreadcrumbProps,
  BreadcrumbItemProps,
  SeparatorType,
} from './components/Breadcrumb';
// #endregion

// #region Link
export { default as Link, linkVariants } from './components/Link';
export type { LinkProps } from './components/Link';
// #endregion

// #region Button
export {
  default as Button,
  ButtonIcon,
  ButtonText,
  buttonVariants,
} from './components/Button';

export type {
  ButtonProps,
  ButtonIconProps,
  ButtonTextProps,
} from './components/Button';
// #endregion

// #region Card
export {
  default as Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from './components/Card';

export type { CardProps } from './components/Card';
// #endregion

// #region Carousel
export {
  default as Carousel,
  CarouselSlides,
  CarouselContent,
  CarouselControls,
  CarouselDots,
  carouselVariants,
} from './components/Carousel';

export type {
  CarouselProps,
  CarouselSlidesProps,
  CarouselContentProps,
  CarouselControlsProps,
  CarouselDotsProps,
} from './components/Carousel';
// #endregion

// #region CloseButton
export { default as CloseButton } from './components/CloseButton';
// #endregion

// #region Code
export { default as Code, codeVariants } from './components/Code';
// #endregion
