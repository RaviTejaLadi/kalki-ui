import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const entriesDir = join(root, 'src', 'entries');

/** @type {Record<string, string>} */
const entries = {
  accordion: `export {
  Accordion,
  AccordionHeader,
  AccordionBody,
  AccordionItem,
} from '../components/Accordion';
export type {
  AccordionVariant,
  AccordionSize,
  AccordionProps,
  AccordionItemProps,
  AccordionHeaderProps,
  AccordionBodyProps,
} from '../components/Accordion';
`,
  alert: `export {
  Alert,
  AlertHeader,
  AlertBody,
  AlertFooter,
  alertVariants,
} from '../components/Alert';
export type { AlertProps, SectionProps } from '../components/Alert';
`,
  avatar: `export {
  Avatar,
  AvatarFallback,
  AvatarImage,
  avatarVariants,
} from '../components/Avatar';
export type { AvatarProps, AvatarImageProps } from '../components/Avatar';
`,
  badge: `export { Badge, BadgeIcon, badgeVariants } from '../components/Badge';
export type { BadgeProps, BadgeIconProps } from '../components/Badge';
`,
  banner: `export {
  Banner,
  BannerTitle,
  BannerSubTitle,
  bannerVariants,
} from '../components/Banner';
export type {
  BannerSize,
  BannerProps,
  BannerChildProps,
} from '../components/Banner';
`,
  box: `export { Box } from '../components/Box';
export type { BoxProps } from '../components/Box';
`,
  breadcrumb: `export {
  Breadcrumb,
  BreadcrumbItem,
  breadcrumbVariants,
} from '../components/Breadcrumb';
export type {
  BreadcrumbProps,
  BreadcrumbItemProps,
  SeparatorType,
} from '../components/Breadcrumb';
`,
  button: `export {
  Button,
  ButtonIcon,
  ButtonText,
  buttonVariants,
} from '../components/Button';
export type {
  ButtonProps,
  ButtonIconProps,
  ButtonTextProps,
} from '../components/Button';
`,
  card: `export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from '../components/Card';
export type { CardProps } from '../components/Card';
`,
  carousel: `export {
  Carousel,
  CarouselSlides,
  CarouselContent,
  CarouselControls,
  CarouselDots,
  carouselVariants,
} from '../components/Carousel';
export type {
  CarouselProps,
  CarouselSlidesProps,
  CarouselContentProps,
  CarouselControlsProps,
  CarouselDotsProps,
} from '../components/Carousel';
`,
  'close-button': `export { CloseButton } from '../components/CloseButton';
`,
  code: `export { Code, codeVariants } from '../components/Code';
`,
  'content-scrollable': `export {
  ContentScrollable,
  contentScrollableVariants,
} from '../components/ContentScrollable';
export type { ContentScrollableProps } from '../components/ContentScrollable';
`,
  div: `export { Div, divVariants } from '../components/Div';
export type { DivProps } from '../components/Div';
`,
  drawer: `export {
  Drawer,
  DrawerHeader,
  DrawerTitle,
  DrawerBody,
  drawerVariants,
} from '../components/Drawer';
export type {
  DrawerProps,
  DrawerHeaderProps,
  DrawerTitleProps,
  DrawerBodyProps,
} from '../components/Drawer';
`,
  empty: `export {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
} from '../components/Empty';
`,
  'error-page': `export { ErrorPage } from '../components/ErrorPage';
export type { ErrorPageProps } from '../components/ErrorPage';
`,
  figure: `export {
  Figure,
  FigureImage,
  FigureCaption,
} from '../components/Figure';
export type {
  FigureProps,
  FigureImageProps,
  FigureCaptionProps,
} from '../components/Figure';
`,
  'full-screen-toggle': `export { FullScreenToggle } from '../components/FullScreenToggle';
`,
  gallery: `export { Gallery as GalleryImage, galleryVariants } from '../components/Gallery';
export type { GalleryProps } from '../components/Gallery';
`,
  highlighter: `export {
  Highlighter,
  highlightedTextVariants,
  defaultColors,
} from '../components/Highlighter';
export type { HighlighterProps } from '../components/Highlighter';
`,
  image: `export { Image, imageVariants } from '../components/Image';
export type {
  ImageProps,
  LoadingStrategy,
  ObjectFit,
} from '../components/Image';
`,
  'json-viewer': `export { JsonViewer } from '../components/JsonViewer';
export type { JsonViewerProps, JsonReplacer } from '../components/JsonViewer';
`,
  link: `export { Link, linkVariants } from '../components/Link';
export type { LinkProps } from '../components/Link';
`,
  'link-bar': `export {
  LinkBar,
  LinkBarContent,
  LinkBarLink,
  LinkBarControl,
  linkBarVariants,
  linkVariants as linkBarLinkVariants,
} from '../components/LinkBar';
export type {
  LinkBarProps,
  LinkProps as LinkBarLinkProps,
  ControlsProps,
} from '../components/LinkBar';
`,
  'link-button': `export {
  LinkButton,
  LinkIcon,
  LinkText,
} from '../components/LinkButton';
export type {
  LinkButtonProps,
  LinkIconProps,
  LinkTextProps,
} from '../components/LinkButton';
`,
  'list-groups': `export {
  ListGroups,
  ListGroupItem,
  listGroupVariants,
  itemVariants,
  textVariants,
} from '../components/Lists/ListGroups';
export type {
  ListGroupProps,
  ListGroupItemProps,
  VariantType,
} from '../components/Lists/ListGroups';
`,
  'ordered-list': `export {
  OrderedList,
  OrderedListItem,
} from '../components/Lists/OrderedList';
export type {
  OrderedListProps,
  OrderedListItemProps,
  ListStyleType,
} from '../components/Lists/OrderedList';
`,
  'unordered-list': `export {
  UnOrderedList,
  UnOrderedListItem,
} from '../components/Lists/UnOrderedList';
export type {
  UnOrderedListProps,
  UnOrderedListItemProps,
} from '../components/Lists/UnOrderedList';
`,
  modal: `export {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
  modalVariants,
} from '../components/Modal';
export type {
  ModalProps,
  ModalHeaderProps,
  ModalTitleProps,
  ModalBodyProps,
  ModalFooterProps,
} from '../components/Modal';
`,
  ripple: `export { Ripple } from '../components/Ripple';
export type { RippleProps } from '../components/Ripple';
`,
  'scroll-to-top': `export {
  ScrollToTop,
  scrollButtonVariants,
} from '../components/ScrollToTop';
`,
  'section-header': `export { SectionHeader } from '../components/SectionHeader';
export type {
  SectionHeaderProps,
  SectionHeaderTitleProps,
  SectionHeaderSubTitleProps,
} from '../components/SectionHeader';
`,
  skeleton: `export { Skeleton } from '../components/Skeleton';
`,
  spinner: `export { Spinner, spinnerVariants } from '../components/Spinner';
export type { SpinnerProps } from '../components/Spinner';
`,
  splitter: `export { Splitter, SplitterPane } from '../components/Splitter';
export type { SplitterProps, SplitterPaneProps } from '../components/Splitter';
`,
  stack: `export { Stack, StackItem } from '../components/Stack';
export type {
  StackProps,
  StackItemProps,
  JustifyContent,
  AlignItems,
  AlignContent,
  FlexWrap,
  Direction,
} from '../components/Stack';
`,
  table: `export {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
  TableRow,
} from '../components/Table';
export type {
  TableProps,
  TableSectionProps,
  TableRowProps,
  TableCellProps,
} from '../components/Table';
`,
  'table-list': `export { TableList } from '../components/Table/TableList';
export type { TableListProps } from '../components/Table/TableList';
`,
  tabs: `export { Tabs, Tab } from '../components/Tabs';
export type { TabsProps, TabProps } from '../components/Tabs';
`,
  tag: `export {
  Tag,
  TagIcon,
  TagClose,
  TagText,
  tagVariants,
} from '../components/Tag';
export type {
  TagProps,
  TagIconProps,
  TagTextProps,
  TagCloseButtonProps,
} from '../components/Tag';
`,
  'text-carousel': `export { TextCarousel } from '../components/TextCarousel';
export type { TextCarouselProps } from '../components/TextCarousel';
`,
  'text-highlighter': `export {
  TextHighlighter,
  TextHighlighterText,
  textHighlighterVariants,
} from '../components/TextHighlighter';
export type {
  Variant,
  Emphasis,
  Sizing,
  HighlightContextType,
  TextHighlighterProps,
  TextHighlighterTextProps,
} from '../components/TextHighlighter';
`,
  toggle: `export { Toggle, ToggleGroup, ToggleGroupItem } from '../components/Toggle';
export type {
  ToggleProps,
  ToggleGroupProps,
  ToggleGroupItemProps,
} from '../components/Toggle';
`,
  typography: `export { Heading, Paragraph, Text } from '../components/Typography';
`,
  heading: `export { Heading, headingVariants } from '../components/Typography/Heading';
export type { HeadingProps } from '../components/Typography/Heading';
`,
  paragraph: `export { Paragraph, paragraphVariants } from '../components/Typography/Paragraph';
export type { ParagraphProps } from '../components/Typography/Paragraph';
`,
  text: `export { Text, textVariants } from '../components/Typography/Text';
export type { TextProps } from '../components/Typography/Text';
`,
  'dot-separator': `export { DotSeparator } from '../components/DotSeparator';
`,
};

mkdirSync(entriesDir, { recursive: true });

for (const [name, content] of Object.entries(entries)) {
  writeFileSync(join(entriesDir, `${name}.ts`), content.trimStart());
}

const packageJsonPath = join(root, 'package.json');
const pkg = JSON.parse(readFileSync(packageJsonPath, 'utf8'));

const componentExports = Object.fromEntries(
  Object.keys(entries).map((name) => [
    `./${name}`,
    {
      types: `./dist/entries/${name}.d.ts`,
      import: `./dist/entries/${name}.js`,
      default: `./dist/entries/${name}.js`,
    },
  ])
);

pkg.exports = {
  '.': {
    types: './dist/index.d.ts',
    import: './dist/index.js',
    default: './dist/index.js',
  },
  './styles.css': './dist/kalki-ui.css',
  './dist/index.css': './dist/kalki-ui.css',
  './package.json': './package.json',
  ...componentExports,
};

pkg.sideEffects = ['**/*.css'];
pkg.style = 'dist/kalki-ui.css';
pkg.typesVersions = {
  '*': Object.fromEntries(
    Object.keys(entries).map((name) => [name, [`dist/entries/${name}.d.ts`]])
  ),
};

writeFileSync(packageJsonPath, `${JSON.stringify(pkg, null, 2)}\n`);

console.log(
  `Generated ${Object.keys(entries).length} component entries and updated package.json exports.`
);
