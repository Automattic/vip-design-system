/**
 * External dependencies
 */
import { DotFilledIcon, CheckIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import React from 'react';

/**
/**
* Internal dependencies
*/

import * as Dropdown from '.';
import { Button } from '../Button';
import { Link } from '../Link';
import * as NewDialog from '../NewDialog';
import { Text } from '../Text';

export default {
	title: 'Dropdown',
	component: Dropdown.Root,
};

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

		<Text>
			This component is based on the Radix Dropdown. You can find all available options, props and
			features in the{ ' ' }
			<Link
				href="https://www.radix-ui.com/docs/primitives/components/dropdown-menu"
				target="_blank"
				rel="noopener noreferrer"
			>
				Dropdown Documentation page.
			</Link>
		</Text>
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

			<Text>
				This component is based on the Radix Dropdown. You can find all available options, props and
				features in the{ ' ' }
				<Link
					href="https://www.radix-ui.com/docs/primitives/components/dropdown-menu"
					target="_blank"
					rel="noopener noreferrer"
				>
					Dropdown Documentation page.
				</Link>
			</Text>
		</>
	);
};

export const WithDialog = () => {
	const [ alertOpen, setAlertOpen ] = React.useState( false );
	const [ menuOpen, setMenuOpen ] = React.useState( false );

	// eslint-disable-next-line react/prop-types
	const AreYouSureDialog = ( { onConfirm, ...props } ) => (
		<NewDialog.Root
			{ ...props }
			content={
				<>
					<Button variant="secondary" onClick={ () => onConfirm() }>
						Custom Close.
					</Button>
					<p>Teste abc.</p>
				</>
			}
		/>
	);

	return (
		<div>
			<Text>
				This is an important example when combining the Dropdown component with the NewDialog
				component. In order to have the correct accessibility, there are some events you need to
				use. Use this example if you want to copy and paste the code.
			</Text>

			<Dropdown.Root
				modal={ ! alertOpen }
				open={ menuOpen }
				onOpenChange={ setMenuOpen }
				contentProps={ { sideOffset: 5 } }
				trigger={ <Button>Open</Button> }
			>
				<Dropdown.Item>I don&apos;t do anything</Dropdown.Item>

				<AreYouSureDialog
					title="Are you in the jungle?"
					description="sha-n-n-n-n-n-n-n-n knees, knees"
					open={ alertOpen }
					onOpenChange={ setAlertOpen }
					onConfirm={ () => {
						setAlertOpen( false );
						setMenuOpen( false );
					} }
					trigger={
						<Dropdown.Item onSelect={ event => event.preventDefault() }>Open Dialog</Dropdown.Item>
					}
				/>
			</Dropdown.Root>
		</div>
	);
};
