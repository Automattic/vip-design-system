/**
 * External dependencies
 */
import React from 'react';
import { DotFilledIcon, CheckIcon, ChevronRightIcon } from '@radix-ui/react-icons';

/**
/**
* Internal dependencies
*/

import * as Dropdown from '.';
import { Button } from '../Button';
import * as NewDialog from '../NewDialog';

export default {
	title: 'Dropdown',
	component: Dropdown.Root,
};

// Your app...

export const Default = () => (
	<>
		<Dropdown.Root trigger={ <Button>Open</Button> }>
			<Dropdown.Item>All</Dropdown.Item>
			<Dropdown.Item>Completed</Dropdown.Item>
			<Dropdown.Item>Running</Dropdown.Item>
			<Dropdown.Item>Cancelled</Dropdown.Item>
			<Dropdown.Separator />
			<Dropdown.Item>Errored</Dropdown.Item>
		</Dropdown.Root>

		<p>
			This component is based on the Radix Dropdown. You can find all available options, props and
			features in the{ ' ' }
			<a
				href="https://www.radix-ui.com/docs/primitives/components/dropdown-menu"
				target="_blank"
				rel="noopener noreferrer"
			>
				Dropdown Documentation page.
			</a>
		</p>
	</>
);

export const ComplexOptions = () => {
	const [ bookmarksChecked, setBookmarksChecked ] = React.useState( true );
	const [ urlsChecked, setUrlsChecked ] = React.useState( false );
	const [ person, setPerson ] = React.useState( 'pedro' );

	return (
		<>
			<Dropdown.Root trigger={ <Button>See options</Button> }>
				<Dropdown.Item>New Tab</Dropdown.Item>
				<Dropdown.Item>New Window</Dropdown.Item>
				<Dropdown.Item disabled>New Private Window</Dropdown.Item>
				<Dropdown.Sub>
					<Dropdown.SubTrigger>
						More Tools
						<ChevronRightIcon />
					</Dropdown.SubTrigger>
					<Dropdown.SubContent sideOffset={ 2 } alignOffset={ -5 }>
						<Dropdown.Item>Save Page As…</Dropdown.Item>
						<Dropdown.Item>Create Shortcut…</Dropdown.Item>
						<Dropdown.Item>Name Window…</Dropdown.Item>
						<Dropdown.Separator />
						<Dropdown.Item>Developer Tools</Dropdown.Item>
					</Dropdown.SubContent>
				</Dropdown.Sub>
				<Dropdown.Separator />
				<Dropdown.CheckboxItem checked={ bookmarksChecked } onCheckedChange={ setBookmarksChecked }>
					<Dropdown.ItemIndicator>
						<CheckIcon />
					</Dropdown.ItemIndicator>
					Show Bookmarks
				</Dropdown.CheckboxItem>
				<Dropdown.CheckboxItem checked={ urlsChecked } onCheckedChange={ setUrlsChecked }>
					<Dropdown.ItemIndicator>
						<CheckIcon />
					</Dropdown.ItemIndicator>
					Show Full URLs
				</Dropdown.CheckboxItem>
				<Dropdown.Separator />
				<Dropdown.Label>People</Dropdown.Label>
				<Dropdown.RadioGroup value={ person } onValueChange={ setPerson }>
					<Dropdown.RadioItem value="pedro">
						<Dropdown.ItemIndicator>
							<DotFilledIcon />
						</Dropdown.ItemIndicator>
						Pedro Duarte
					</Dropdown.RadioItem>
					<Dropdown.RadioItem value="colm">
						<Dropdown.ItemIndicator>
							<DotFilledIcon />
						</Dropdown.ItemIndicator>
						Colm Tuite
					</Dropdown.RadioItem>
				</Dropdown.RadioGroup>
			</Dropdown.Root>

			<p>
				This component is based on the Radix Dropdown. You can find all available options, props and
				features in the{ ' ' }
				<a
					href="https://www.radix-ui.com/docs/primitives/components/dropdown-menu"
					target="_blank"
					rel="noopener noreferrer"
				>
					Dropdown Documentation page.
				</a>
			</p>
		</>
	);
};

export const WithDialog = () => {
	const [ alertOpen, setAlertOpen ] = React.useState( false );
	const [ menuOpen, setMenuOpen ] = React.useState( false );

	const AreYouSureDialog = ( { onConfirm, ...props } ) => (
		<NewDialog.Root
			{ ...props }
			contentProps={ {
				onCloseAutoFocus: () => {
					onConfirm();
				},
			} }
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
				trigger={ <button>open</button> }
			>
				<Dropdown.Item>New Window</Dropdown.Item>

				<AreYouSureDialog
					title="Django"
					description="Django man"
					open={ alertOpen }
					onOpenChange={ setAlertOpen }
					onConfirm={ () => {
						setAlertOpen( false );
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
