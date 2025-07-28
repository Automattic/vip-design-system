/** @jsxImportSource theme-ui */

import {
	Dropdown,
	DropdownTrigger,
	DropdownRadioGroup,
	DropdownItemIndicator,
	DropdownSub,
} from './Dropdown';
import { DropdownCheckboxItem } from './DropdownCheckboxItem';
import { DropdownSubContent, DropdownContent } from './DropdownContent';
import { DropdownGroup } from './DropdownGroup';
import { DropdownItem, DropdownSubTrigger } from './DropdownItem';
import { DropdownLabel } from './DropdownLabel';
import { DropdownRadioItem } from './DropdownRadioItem';
import { DropdownSeparator } from './DropdownSeparator';

const Root = Dropdown;
const Content = DropdownContent;
const Trigger = DropdownTrigger;
const Group = DropdownGroup;
const Item = DropdownItem;
const CheckboxItem = DropdownCheckboxItem;
const RadioGroup = DropdownRadioGroup;
const RadioItem = DropdownRadioItem;
const ItemIndicator = DropdownItemIndicator;
const Label = DropdownLabel;
const Separator = DropdownSeparator;
const Sub = DropdownSub;
const SubTrigger = DropdownSubTrigger;
const SubContent = DropdownSubContent;

export {
	Root,
	Trigger,
	Content,
	Group,
	Item,
	CheckboxItem,
	RadioGroup,
	RadioItem,
	ItemIndicator,
	Label,
	Separator,
	Sub,
	SubTrigger,
	SubContent,
};

export {
	DropdownItem,
	DropdownSubTrigger,
	type BaseDropdownItemProps,
	type DropdownItemProps,
	type DropdownSubTriggerItemProps,
	useDropdownItemContent,
	useDropdownItemProps,
	useDropdownItemEventHandling,
	useDropdownItemState,
	DropdownItemLabelContent,
	DropdownItemBadge,
	DropdownItemIcon,
} from './DropdownItem';

export { DropdownCheckboxItem, type DropdownCheckboxItemProps } from './DropdownCheckboxItem';

export { DropdownRadioItem, type DropdownRadioItemProps } from './DropdownRadioItem';

export {
	LoadingIcon,
	EmptyIcon,
	CheckIcon,
	CheckboxEmptyIcon,
	CheckboxFilledIcon,
	RadioEmptyIcon,
	RadioFilledIndicator,
} from './icons';

export default Dropdown;
