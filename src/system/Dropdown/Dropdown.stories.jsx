/**
 * External dependencies
 */

import React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import * as AlertDialog from '../NewDialog';

/**
 /**
* Internal dependencies
*/

import * as Dropdown from '.';

export default {
	title: 'Dropdown',
	component: Dropdown.Root,
};

// Exportsconst DropdownMenuContent = Content;
const DropdownMenuItem = DropdownMenuPrimitive.Item;

// Your app...
export const Default = () => {
	const [ alertOpen, setAlertOpen ] = React.useState( false );
	const [ menuOpen, setMenuOpen ] = React.useState( false );
	const triggerRef = React.useRef();
	const [ container, setContainer ] = React.useState( null );

	const AreYouSureDialog = ( { children, onConfirm, onCancel, trigger, ...props } ) => (
		<AlertDialog.Root
			{ ...props }
			contentProps={ {
				onCloseAutoFocus: () => {
					console.log( 'ok' );
					triggerRef?.current?.setAttribute( 'tabindex', '-1' );
					triggerRef?.current?.focus();
					onConfirm();
				},
			} }
			trigger={ trigger }
			content={
				<>
					<button type="button" onClick={ () => onConfirm() }>
						Close
					</button>

					<p>Teste abc.</p>
				</>
			}
		/>
	);

	return (
		<div>
			<Dropdown.Root
				open={ menuOpen }
				onOpenChange={ setMenuOpen }
				contentProps={ { sideOffset: 5 } }
				trigger={ <button ref={ triggerRef }>open</button> }
			>
				<Dropdown.Item>New Window</Dropdown.Item>

				<AreYouSureDialog
					title="Django"
					description="Django man"
					open={ alertOpen }
					onOpenChange={ setAlertOpen }
					onConfirm={ () => {
						setAlertOpen( false );
						console.log( triggerRef?.current );
						setMenuOpen( false );
					} }
					trigger={
						<Dropdown.Item onSelect={ event => event.preventDefault() }>Delete</Dropdown.Item>
					}
				/>
			</Dropdown.Root>
		</div>
	);
};
