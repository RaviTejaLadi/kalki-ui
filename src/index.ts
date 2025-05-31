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

// #region ContentScrollable
export {
  default as ContentScrollable,
  contentScrollableVariants,
} from './components/ContentScrollable';
export type { ContentScrollableProps } from './components/ContentScrollable';
// #endregion

// #region Div
export { default as Div, divVariants } from './components/Div';
export type { DivProps } from './components/Div';
// #endregion

// #region Drawer
export {
  default as Drawer,
  DrawerHeader,
  DrawerTitle,
  DrawerBody,
  drawerVariants,
} from './components/Drawer';

export type {
  DrawerProps,
  DrawerHeaderProps,
  DrawerTitleProps,
  DrawerBodyProps,
} from './components/Drawer';
// #endregion

// #region Image
export { default as Image, imageVariants } from './components/Image';
export type {
  ImageProps,
  LoadingStrategy,
  ObjectFit,
} from './components/Image';
// #endregion

// #region Spinner
export { default as Spinner, spinnerVariants } from './components/Spinner';
export type { SpinnerProps } from './components/Spinner';
// #endregion

// #region Skeleton
export { Skeleton } from './components/Skeleton';
// #endregion

// #region SectionHeader
export { SectionHeader } from './components/SectionHeader';
export type {
  SectionHeaderProps,
  SectionHeaderTitleProps,
  SectionHeaderSubTitleProps,
} from './components/SectionHeader';
// #endregion

// #region ScrollToTop
export { default as ScrollToTop } from './components/ScrollToTop';
export type { scrollButtonVariants } from './components/ScrollToTop';
// #endregion

// #region Ripple
export { default as Ripple } from './components/Ripple';
export type { RippleProps } from './components/Ripple';
// #endregion

// #region Modal
export {
  default as Modal,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
  modalVariants,
} from './components/Modal';
export type {
  ModalProps,
  ModalHeaderProps,
  ModalTitleProps,
  ModalBodyProps,
  ModalFooterProps,
} from './components/Modal';
// #endregion

// #region ListGroups
export {
  default as ListGroups,
  ListGroupItem,
  listGroupVariants,
  itemVariants,
  textVariants,
} from './components/Lists/ListGroups';
export type {
  ListGroupProps,
  ListGroupItemProps,
  VariantType,
} from './components/Lists/ListGroups';
// #endregion

// #region OrderedList
export {
  default as OrderedList,
  OrderedListItem,
} from './components/Lists/OrderedList';
export type {
  OrderedListProps,
  OrderedListItemProps,
  ListStyleType,
} from './components/Lists/OrderedList';
// #endregion

// #region UnOrderedList
export {
  default as UnOrderedList,
  UnOrderedListItem,
} from './components/Lists/UnOrderedList';
export type {
  UnOrderedListProps,
  UnOrderedListItemProps,
} from './components/Lists/UnOrderedList';
// #endregion

// #region LinkButton
export {
  default as LinkButton,
  LinkIcon,
  LinkText,
} from './components/LinkButton';
export type {
  LinkButtonProps,
  LinkIconProps,
  LinkTextProps,
} from './components/LinkButton';
// #endregion

// #region LinkBar
export {
  default as LinkBar,
  LinkBarContent,
  LinkBarLink,
  LinkBarControl,
  linkBarVariants,
  linkVariants as linkBarLinkVariants,
} from './components/LinkBar';
export type {
  LinkBarProps,
  LinkProps as LinkBarLinkProps,
  ControlsProps,
} from './components/LinkBar';
// #endregion

// #region JsonViewer
export { default as JsonViewer } from './components/JsonViewer';
export type { JsonViewerProps, JsonReplacer } from './components/JsonViewer';
// #endregion

// #region Gallery
export { default as GalleryImage, galleryVariants } from './components/Gallery';
export type { GalleryProps } from './components/Gallery';
// #endregion

// #region FullScreenToggle
export { default as FullScreenToggle } from './components/FullScreenToggle';
// #endregion

// #region Figure
export {
  default as Figure,
  FigureImage,
  FigureCaption,
} from './components/Figure';
export type {
  FigureProps,
  FigureImageProps,
  FigureCaptionProps,
} from './components/Figure';
// #endregion

// #region DotSeparator
export { default as DotSeparator } from './components/DotSeparator';
// #endregion
