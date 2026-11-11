/**
 * Internal dependencies
 */
import { Accordion } from './Accordion';
import { Avatar } from './Avatar';
import { Badge } from './Badge';
import { Box } from './Box';
import { Breadcrumbs } from './Breadcrumbs/Breadcrumbs';
import { Button, ButtonSubmit, ButtonVariant } from './Button';
import { Card } from './Card';
import { Code } from './Code';
import { ConfirmationDialog } from './ConfirmationDialog';
import { DescriptionList } from './DescriptionList';
import {
	Dialog,
	DialogButton,
	DialogDivider,
	DialogMenu,
	DialogMenuItem,
	DialogTrigger,
	DialogContent,
} from './Dialog';
import * as Drawer from './Drawer/Drawer';
import * as Dropdown from './Dropdown';
import { FilterDropdown } from './FilterDropdown/FilterDropdown';
import { Flex } from './Flex';
import { Grid } from './Grid';
import { Heading } from './Heading';
import { Hr } from './Hr/Hr';
import { Link } from './Link';
import LinkExternal from './LinkExternal/LinkExternal';
import { MobileMenuWrapper, MobileMenuTrigger, MobileMenu } from './MobileMenu/MobileMenu';
import { Nav } from './Nav/Nav';
import { NavItem } from './Nav/NavItem';
import { NewConfirmationDialog } from './NewConfirmationDialog';
import * as NewDialog from './NewDialog';
import * as Form from './NewForm';
import { NewTooltip } from './NewTooltip';
import { Notice } from './Notice';
import { OptionRow } from './OptionRow';
import { SimplePagination, Pagination } from './Pagination';
import { Progress } from './Progress';
import { ResultsSummary } from './ResultsSummary';
import { ScreenReaderText } from './ScreenReaderText';
import { ServiceHeader } from './ServiceHeader';
import { Skeleton } from './Skeleton';
import { Snackbar } from './Snackbar';
import { Spinner } from './Spinner';
import { Table, TableRow, TableCell } from './Table';
import { Tabs, TabsList, TabsContent, TabsTrigger } from './Tabs';
import { Text } from './Text';
import { ToggleGroup } from './ToggleGroup';
import { Toolbar } from './Toolbar';
import { Tooltip } from './Tooltip';
import { Wizard, WizardStep } from './Wizard';
import theme from './theme';

export {
	Accordion,
	Avatar,
	Badge,
	Box,
	Breadcrumbs,
	Button,
	ButtonSubmit,
	ButtonVariant,
	Card,
	Code,
	Dialog,
	NewDialog,
	Form,
	Drawer,
	Dropdown,
	DialogButton,
	DialogMenu,
	DialogMenuItem,
	DialogDivider,
	DialogContent,
	DialogTrigger,
	DescriptionList,
	ConfirmationDialog,
	MobileMenu,
	MobileMenuTrigger,
	MobileMenuWrapper,
	NewConfirmationDialog,
	NewTooltip,
	Grid,
	FilterDropdown,
	Flex,
	Notice,
	OptionRow,
	SimplePagination,
	Pagination,
	Heading,
	Hr,
	ScreenReaderText,
	Spinner,
	Table,
	TableRow,
	TableCell,
	Tooltip,
	Link,
	LinkExternal,
	Progress,
	ResultsSummary,
	Text,
	Tabs,
	Nav,
	NavItem,
	Skeleton,
	TabsTrigger,
	TabsContent,
	TabsList,
	ToggleGroup,
	Toolbar,
	Snackbar,
	ServiceHeader,
	Wizard,
	WizardStep,
	theme,
};

export type { ResultsSummaryProps } from './ResultsSummary';
export type { ToggleGroupProps, ToggleGroupOption, ToggleGroupVariant } from './ToggleGroup';
export type { HeadingProps } from './Heading/Heading';
export type { ServiceStatus } from './ServiceHeader/ServiceHeader';
export {
	baseControlBorderStyle,
	baseControlFocusStyle,
	baseControlStyle,
} from './Form/Input.styles';

// Flat form exports kept for 2.x; they go away in v3 in favour of the `Form` namespace.
/** @deprecated Import `Form.Checkbox` from the `Form` namespace instead. */
export const Checkbox = Form.Checkbox;
/** @deprecated Import `Form.Input` from the `Form` namespace instead. */
export const Input = Form.Input;
/** @deprecated Import `Form.Label` from the `Form` namespace instead. */
export const Label = Form.Label;
/** @deprecated Import `Form.Radio` from the `Form` namespace instead. */
export const Radio = Form.Radio;
/** @deprecated Import `Form.RadioBoxGroup` from the `Form` namespace instead. */
export const RadioBoxGroup = Form.RadioBoxGroup;
/** @deprecated Import `Form.RadioGroupChip` from the `Form` namespace instead. */
export const RadioGroupChip = Form.RadioGroupChip;
/** @deprecated Import `Form.Textarea` from the `Form` namespace instead. */
export const Textarea = Form.Textarea;
/** @deprecated Import `Form.Toggle` from the `Form` namespace instead. */
export const Toggle = Form.Toggle;
/** @deprecated Import `Form.ToggleRow` from the `Form` namespace instead. */
export const ToggleRow = Form.ToggleRow;
/** @deprecated Import `Form.Validation` from the `Form` namespace instead. */
export const Validation = Form.Validation;
