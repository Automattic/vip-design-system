/** @jsxImportSource theme-ui */
/**
 * Internal dependencies
 */
import {
	Dropdown,
	DropdownTrigger,
	DropdownRadioGroup,
	DropdownItemIndicator,
	DropdownSub,
} from './Dropdown';

import {
	DropdownItem,
	DropdownCheckboxItem,
	DropdownRadioItem,
	DropdownSubTrigger,
} from './DropdownItem';

import { DropdownSeparator } from './DropdownSeparator';
import { DropdownSubContent } from './DropdownContent';
import { DropdownLabel } from './DropdownLabel';

const Root = Dropdown;
const Trigger = DropdownTrigger;
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

export default Dropdown;
