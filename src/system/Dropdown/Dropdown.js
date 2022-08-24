/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { DropdownContent } from './DropdownContent';

const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownTrigger = DropdownMenuPrimitive.Trigger;
const DropdownRadioGroup = DropdownMenuPrimitive.RadioGroup;
const DropdownItemIndicator = DropdownMenuPrimitive.DropdownMenuItemIndicator;
const DropdownLabel = DropdownMenuPrimitive.DropdownMenuLabel;
const DropdownSeparator = DropdownMenuPrimitive.DropdownMenuSeparator;
const DropdownSub = DropdownMenuPrimitive.DropdownMenuSub;
const DropdownSubTrigger = DropdownMenuPrimitive.DropdownMenuSubTrigger;
const DropdownSubContent = DropdownMenuPrimitive.DropdownMenuSubContent;

export const Dropdown = ( { trigger, children } ) => (
	<DropdownMenu>
		<DropdownTrigger asChild>{ trigger }</DropdownTrigger>

		<DropdownMenuPrimitive.Portal>
			<DropdownContent>
				{ children }
				<DropdownMenuPrimitive.Arrow sx={ { fill: 'white' } } />
			</DropdownContent>
		</DropdownMenuPrimitive.Portal>
	</DropdownMenu>
);

Dropdown.propTypes = {
	trigger: PropTypes.node.isRequired,
	children: PropTypes.node.isRequired,
};

// Exports
export {
	DropdownTrigger,
	DropdownRadioGroup,
	DropdownItemIndicator,
	DropdownLabel,
	DropdownSeparator,
	DropdownSub,
	DropdownSubTrigger,
	DropdownSubContent,
};