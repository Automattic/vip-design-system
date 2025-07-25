/** @jsxImportSource theme-ui */

import {
	Dropdown,
	DropdownTrigger,
	DropdownRadioGroup,
	DropdownItemIndicator,
	DropdownSub,
} from './Dropdown';
import { DropdownSubContent, DropdownContent } from './DropdownContent';
import { DropdownGroup } from './DropdownGroup';
import {
	DropdownItem,
	DropdownCheckboxItem,
	DropdownRadioItem,
	DropdownSubTrigger,
} from './DropdownItem';
import { DropdownLabel } from './DropdownLabel';
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
	DropdownCheckboxItem,
	DropdownRadioItem,
	DropdownSubTrigger,
	type DropdownItemProps,
	type DropdownCheckboxItemProps,
	type DropdownRadioItemProps,
	type DropdownSubTriggerItemProps,
} from './DropdownItem';

export default Dropdown;
