/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

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

export const Dropdown = ( {
	trigger,
	children,
	// Radix Specific Properties
	open = undefined,
	defaultOpen = false,
	onOpenChange = undefined,
	modal = true,
	dir = 'ltr',
	contentProps = {},
	portalProps = {},
	className,
} ) => {
	const firstChild = React.useMemo(
		() =>
			React.isValidElement( children ) ? React.Children.only( children )?.type?.displayName : '',
		[ children ]
	);

	return (
		<DropdownMenu
			className={ classNames( 'vip-dropdown-menu', className ) }
			open={ open }
			defaultOpen={ defaultOpen }
			onOpenChange={ onOpenChange }
			modal={ modal }
			dir={ dir }
		>
			<DropdownTrigger className="vip-dropdown-trigger" asChild>
				{ trigger }
			</DropdownTrigger>

			<DropdownMenuPrimitive.Portal { ...portalProps }>
				{ /* User can customize the content */ }
				{ firstChild === 'DropdownContent' ? (
					children
				) : (
					<DropdownContent { ...contentProps }>
						{ children }
						<DropdownMenuPrimitive.Arrow sx={ { fill: 'background', boxShadow: 'high' } } />
					</DropdownContent>
				) }
			</DropdownMenuPrimitive.Portal>
		</DropdownMenu>
	);
};

Dropdown.propTypes = {
	trigger: PropTypes.node.isRequired,
	children: PropTypes.node.isRequired,

	// Props in root: https://www.radix-ui.com/docs/primitives/components/dropdown-menu#root
	open: PropTypes.bool,
	defaultOpen: PropTypes.bool,
	onOpenChange: PropTypes.func,
	modal: PropTypes.bool,
	dir: PropTypes.string,

	// Content props in: https://www.radix-ui.com/docs/primitives/components/dropdown-menu#content
	contentProps: PropTypes.any,
	// Portal props in: https://www.radix-ui.com/docs/primitives/components/dropdown-menu#portal
	portalProps: PropTypes.any,
	className: PropTypes.string,
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
