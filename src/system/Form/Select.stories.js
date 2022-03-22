/**
 * External dependencies
 */
import { useState } from 'react';

/**
 * Internal dependencies
 */
import { Box, Dialog, DialogMenu, DialogMenuItem, DialogDivider, Select, Button } from '..';

export default {
	title: 'Select',
	component: Dialog,
};

const options = [
	{ value: 'chocolate', label: 'Chocolate' },
	{ value: 'strawberry', label: 'Strawberry' },
	{ value: 'vanilla', label: 'Vanilla' },
];

const DropdownContent = (
	<div>
		<DialogMenu>
			<DialogMenuItem>Profile</DialogMenuItem>
			<DialogMenuItem>Account</DialogMenuItem>
			<DialogMenuItem>Dark Mode</DialogMenuItem>
		</DialogMenu>
		<DialogDivider />
		<DialogMenu>
			<DialogMenuItem>Logout</DialogMenuItem>
		</DialogMenu>
	</div>
);

const DropdownTrigger = <Button variant="secondary">Trigger Dropdown</Button>;

export const Multi = () => {
	const [ value, setValue ] = useState( [] );

	return (
		<Box sx={{ mr: 2, width: 400 }}>
			<Select
				label="Type"
				value={value}
				isMulti
				placeholder="Select domains..."
				options={options}
				onChange={newValue => setValue( newValue )}
			/>
		</Box>
	);
};

export const usePortal = () => {
	const [ value, setValue ] = useState( [] );

	return (
		<Box sx={{ mr: 2, width: 400 }}>
			<Select
				label="Type"
				value={value}
				isMulti
				placeholder="Select domains..."
				usePortal
				options={options}
				onChange={newValue => setValue( newValue )}
			/>
		</Box>
	);
};

export const Single = () => {
	const [ value, setValue ] = useState( [] );

	return (
		<Box sx={{ mr: 2, width: 200 }}>
			<Select
				label="User"
				value={value}
				placeholder="Select a domain..."
				options={options}
				onChange={newValue => setValue( newValue )}
			/>
		</Box>
	);
};

export const Inline = () => {
	const [ value, setValue ] = useState( [] );

	return (
		<Box sx={{ mr: 2, width: 200 }}>
			<Select
				label="User"
				value={value}
				isInline
				isMulti
				noneLabel="Everyone"
				placeholder="Filter by user..."
				options={options}
				onChange={newValue => setValue( newValue )}
			/>
		</Box>
	);
};

export const Async = () => {
	let filteredOptions;
	const [ value, setValue ] = useState();

	// We need to return a formatted object for our async wrapper
	const asyncOptions = search => {
		if ( !! search ) {
			filteredOptions = options.filter( ( { label: optionLabel } ) => {
				const matching = optionLabel.toLowerCase().includes( search );

				return matching;
			} );
		}

		const selections = {
			options: filteredOptions ? filteredOptions : options,
			hasMore: true,
		};

		return selections;
	};

	return (
		<Box sx={ { mr: 2, width: 200 } }>
			<Select
				isAsync
				label="Search..."
				value={ value }
				placeholder="Search..."
				loadOptions={ asyncOptions }
				onChange={ newValue => setValue( newValue ) }
			/>
		</Box>
	);
};

export const DropdownMenu = () => {
	return (
		<Box sx={{ mr: 2, width: 200 }}>
			<Dialog trigger={DropdownTrigger} content={DropdownContent} sx={{ width: 200 }} />
		</Box>
	);
};
