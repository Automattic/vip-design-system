/**
 * External dependencies
 */
import React from 'react';
import { BiDotsHorizontal, BiCheck, BiChevronRight, BiCog, BiUser, BiFile } from 'react-icons/bi';

/**
 * Internal dependencies
 */
import * as Dropdown from '.';
import { Button } from '../Button';
import * as NewDialog from '../NewDialog';
import { Text } from '../Text';

export default {
	title: 'Dropdown',
	component: Dropdown.Root,
	parameters: {
		docs: {
			description: {
				component:
					'A redesigned dropdown component based on Radix UI with enhanced styling, states, and features from the VIP Design System.',
			},
		},
	},
};

/**
 * Demonstrates dropdown alignment options
 */
export const Alignment = () => (
	<>
		<div style={{ display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'space-around', padding: '50px 20px' }}>
			<div>
				<Text sx={{ mb: 2, textAlign: 'center' }}>Align Start</Text>
				<Dropdown.Root 
					trigger={<Button>Align Start</Button>} 
					contentProps={{ align: 'start' }}
				>
					<Dropdown.Group>
						<Dropdown.Item label="Option 1" />
						<Dropdown.Item label="Option 2" />
						<Dropdown.Item label="Option 3" />
					</Dropdown.Group>
				</Dropdown.Root>
			</div>

			<div>
				<Text sx={{ mb: 2, textAlign: 'center' }}>Align Center (Default)</Text>
				<Dropdown.Root 
					trigger={<Button>Align Center</Button>} 
					contentProps={{ align: 'center' }}
				>
					<Dropdown.Group>
						<Dropdown.Item label="Option 1" />
						<Dropdown.Item label="Option 2" />
						<Dropdown.Item label="Option 3" />
					</Dropdown.Group>
				</Dropdown.Root>
			</div>

			<div>
				<Text sx={{ mb: 2, textAlign: 'center' }}>Align End</Text>
				<Dropdown.Root 
					trigger={<Button>Align End</Button>} 
					contentProps={{ align: 'end' }}
				>
					<Dropdown.Group>
						<Dropdown.Item label="Option 1" />
						<Dropdown.Item label="Option 2" />
						<Dropdown.Item label="Option 3" />
					</Dropdown.Group>
				</Dropdown.Root>
			</div>
		</div>

		<Text sx={{ mt: 3 }}>
			This demonstrates the dropdown alignment options: 'start', 'center', and 'end'. 
			The dropdown content should align differently relative to the trigger button.
		</Text>
	</>
);

/**
 * Basic dropdown with the new label prop API
 */
export const Default = () => (
	<>
		<Dropdown.Root trigger={ <Button>Open Menu</Button> }>
			<Dropdown.Group>
				<Dropdown.Item label="All Items" />
				<Dropdown.Item label="Completed" />
				<Dropdown.Item label="Running" />
				<Dropdown.Item label="Cancelled" />
			</Dropdown.Group>
			<Dropdown.Group separator>
				<Dropdown.Item label="Errored" />
			</Dropdown.Group>
		</Dropdown.Root>

		<Text sx={ { mt: 3 } }>
			This component is based on the Radix Dropdown with enhanced styling and features from the VIP
			Design System.
		</Text>
	</>
);

/**
 * Showcase all the new states available for dropdown items
 */
export const ItemStates = () => (
	<>
		<Dropdown.Root trigger={ <Button>Item States</Button> }>
			<Dropdown.Group label="Item States">
				<Dropdown.Item label="Default State" />
				<Dropdown.Item label="Selected Item" isSelected />
				<Dropdown.Item label="Disabled Item" state="disabled" />
			</Dropdown.Group>
			<Dropdown.Group separator>
				<Dropdown.Item state="loading" />
				<Dropdown.Item state="empty" />
			</Dropdown.Group>
		</Dropdown.Root>

		<Text sx={ { mt: 3 } }>
			Demonstrates the various states: default, selected (with check mark), disabled, loading, and
			empty states.
		</Text>
	</>
);

/**
 * Showcase badge integration with different variants
 */
export const WithBadges = () => (
	<>
		<Dropdown.Root trigger={ <Button>Badge Examples</Button> }>
			<Dropdown.Group label="Features">
				<Dropdown.Item label="Beta Feature" showBadge badgeVariant="blue" badgeText="Beta" />
				<Dropdown.Item label="New Dashboard" showBadge badgeVariant="green" badgeText="New" />
				<Dropdown.Item label="Premium Option" showBadge badgeVariant="gold" badgeText="Pro" />
				<Dropdown.Item label="Legacy Tool" showBadge badgeVariant="orange" badgeText="Deprecated" />
			</Dropdown.Group>
			<Dropdown.Group label="Status" separator>
				<Dropdown.Item label="Critical Alert" showBadge badgeVariant="red" badgeText="Critical" />
				<Dropdown.Item label="Default Primary" showBadge />{ ' ' }
				{ /* Uses default yellow "Primary" badge */ }
			</Dropdown.Group>
		</Dropdown.Root>

		<Text sx={ { mt: 3 } }>
			Shows badge integration with all available Badge variants. Badges use the same design system
			tokens as the standalone Badge component.
		</Text>
	</>
);

/**
 * Showcase icon integration
 */
export const WithIcons = () => (
	<>
		<Dropdown.Root trigger={ <Button>Icon Examples</Button> }>
			<Dropdown.Group label="Account">
				<Dropdown.Item label="Profile Settings" icon={ <BiUser /> } showIcon />
				<Dropdown.Item label="Preferences" icon={ <BiCog /> } showIcon />
			</Dropdown.Group>
			<Dropdown.Group label="Actions" separator>
				<Dropdown.Item label="Export Data" icon={ <BiFile /> } showIcon />
				<Dropdown.Item label="Selected Option" icon={ <BiCheck /> } showIcon isSelected />
			</Dropdown.Group>
		</Dropdown.Root>

		<Text sx={ { mt: 3 } }>
			Demonstrates icon usage with the showIcon prop. Icons are automatically sized to 20px for
			consistency.
		</Text>
	</>
);

/**
 * Showcase secondary labels
 */
export const WithSecondaryLabels = () => (
	<>
		<Dropdown.Root trigger={ <Button>Secondary Labels</Button> }>
			<Dropdown.Group label="Team Members">
				<Dropdown.Item label="John Doe" secondaryLabel="Administrator" />
				<Dropdown.Item label="Jane Smith" secondaryLabel="Editor" isSelected />
				<Dropdown.Item label="Bob Johnson" secondaryLabel="Viewer" />
			</Dropdown.Group>
			<Dropdown.Group label="Server Status" separator>
				<Dropdown.Item
					label="Production"
					secondaryLabel="Online"
					showBadge
					badgeVariant="green"
					badgeText="Live"
				/>
				<Dropdown.Item
					label="Staging"
					secondaryLabel="Maintenance"
					showBadge
					badgeVariant="yellow"
					badgeText="Warning"
				/>
			</Dropdown.Group>
		</Dropdown.Root>

		<Text sx={ { mt: 3 } }>
			Shows secondary labels for additional context. Secondary labels use smaller text (12px) and
			the same color as the main text.
		</Text>
	</>
);

/**
 * Complex example combining all features with proper group structure
 */
export const ComplexExample = () => {
	const [ bookmarksChecked, setBookmarksChecked ] = React.useState( true );
	const [ urlsChecked, setUrlsChecked ] = React.useState( false );
	const [ person, setPerson ] = React.useState( 'pedro' );

	return (
		<>
			<Dropdown.Root trigger={ <Button>Full Feature Demo</Button> }>
				<Dropdown.Group label="Quick Actions">
					<Dropdown.Item label="New Tab" icon={ <BiFile /> } showIcon />
					<Dropdown.Item label="New Window" icon={ <BiCog /> } showIcon />
					<Dropdown.Item label="Private Window" icon={ <BiUser /> } showIcon state="disabled" />
				</Dropdown.Group>

				<Dropdown.Sub>
					<Dropdown.SubTrigger>
						<span style={ { display: 'flex', alignItems: 'center', gap: '6px' } }>
							More Tools
							<BiChevronRight />
						</span>
					</Dropdown.SubTrigger>
					<Dropdown.SubContent sideOffset={ 2 } alignOffset={ -5 }>
						<Dropdown.Item label="Save Page As…" />
						<Dropdown.Item label="Create Shortcut…" />
						<Dropdown.Item label="Developer Tools" showBadge badgeVariant="blue" badgeText="Dev" />
					</Dropdown.SubContent>
				</Dropdown.Sub>

				<Dropdown.Group label="View Options" separator>
					<Dropdown.CheckboxItem
						label="Show Bookmarks"
						isSelected={ bookmarksChecked }
						onCheckedChange={ setBookmarksChecked }
					/>
					<Dropdown.CheckboxItem
						label="Show Full URLs"
						isSelected={ urlsChecked }
						onCheckedChange={ setUrlsChecked }
					/>
				</Dropdown.Group>

				<Dropdown.Group label="Active User" separator>
					<Dropdown.RadioGroup value={ person } onValueChange={ setPerson }>
						<Dropdown.RadioItem 
							value="pedro" 
							label="Pedro Duarte"
							icon={ <BiUser /> }
							showIcon
						/>
						<Dropdown.RadioItem 
							value="colm" 
							label="Colm Tuite"
							icon={ <BiUser /> }
							showIcon
							showBadge
							badgeVariant="blue"
							badgeText="Admin"
						/>
					</Dropdown.RadioGroup>
				</Dropdown.Group>

				<Dropdown.Group label="System Status" separator>
					<Dropdown.Item
						label="API Health"
						secondaryLabel="All Systems Operational"
						showBadge
						badgeVariant="green"
						badgeText="Online"
						isSelected
					/>
					<Dropdown.Item state="loading" />
				</Dropdown.Group>
			</Dropdown.Root>

			<Text sx={ { mt: 3 } }>
				A comprehensive example showcasing all dropdown features with proper DropdownGroup separator
				usage that matches the Figma structure exactly.
			</Text>
		</>
	);
};

/**
 * Backward compatibility example
 */
export const BackwardCompatibility = () => (
	<>
		<Dropdown.Root trigger={ <Button>Legacy Usage</Button> }>
			<Dropdown.Group>
				<Dropdown.Item>Text as children (legacy)</Dropdown.Item>
				<Dropdown.Item label="New label prop" />
				<Dropdown.Item>
					<span style={ { display: 'flex', alignItems: 'center', gap: '8px' } }>
						<BiCog />
						Custom JSX children
					</span>
				</Dropdown.Item>
			</Dropdown.Group>
			<Dropdown.Group separator>
				<Dropdown.Item
					label="Mixed usage works fine"
					showBadge
					badgeVariant="blue"
					badgeText="New API"
				/>
			</Dropdown.Group>
		</Dropdown.Root>

		<Text sx={ { mt: 3 } }>
			Shows backward compatibility - both old children-based and new prop-based APIs work together.
		</Text>
	</>
);

/**
 * Example with dialog integration (keeping existing functionality)
 */
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
					<p>Dialog integration example.</p>
				</>
			}
		/>
	);

	return (
		<div>
			<Text sx={ { mb: 3 } }>
				Shows dialog integration with the new dropdown API. Important for accessibility when
				combining components.
			</Text>

			<Dropdown.Root
				modal={ ! alertOpen }
				open={ menuOpen }
				onOpenChange={ setMenuOpen }
				contentProps={ { sideOffset: 5 } }
				trigger={ <Button>Open Menu with Dialog</Button> }
			>
				<Dropdown.Item label="Regular Action" />
				<Dropdown.Item label="Another Action" showBadge badgeVariant="blue" badgeText="Safe" />

				<AreYouSureDialog
					title="Are you sure?"
					description="This action cannot be undone."
					open={ alertOpen }
					onOpenChange={ setAlertOpen }
					onConfirm={ () => {
						setAlertOpen( false );
						setMenuOpen( false );
					} }
					trigger={
						<Dropdown.Item
							label="Open Dialog"
							showBadge
							badgeVariant="red"
							badgeText="Danger"
							onSelect={ event => event.preventDefault() }
						/>
					}
				/>
			</Dropdown.Root>
		</div>
	);
};

/**
 * Demonstrates the enhanced DropdownCheckboxItem with full feature parity
 */
export const CheckboxItems = () => {
	const [ option1, setOption1 ] = React.useState( true );
	const [ option2, setOption2 ] = React.useState( false );
	const [ option3, setOption3 ] = React.useState( true );
	const [ debugMode, setDebugMode ] = React.useState( false );
	const [ disabledOption, setDisabledOption ] = React.useState( true );

	return (
		<>
			<Dropdown.Root trigger={ <Button>Checkbox Items</Button> }>
				<Dropdown.Group label="Settings">
					<Dropdown.CheckboxItem
						label="Show Notifications"
						isSelected={ option1 }
						onCheckedChange={ setOption1 }
					/>
					<Dropdown.CheckboxItem
						label="Auto-save"
						secondaryLabel="Save every 5 minutes"
						isSelected={ option2 }
						onCheckedChange={ setOption2 }
					/>
					<Dropdown.CheckboxItem
						label="Premium Feature"
						showBadge
						badgeVariant="gold"
						badgeText="Pro"
						isSelected={ option3 }
						onCheckedChange={ setOption3 }
					/>
				</Dropdown.Group>

				<Dropdown.Group label="Advanced" separator>
					<Dropdown.CheckboxItem
						label="Debug Mode"
						icon={ <BiCog /> }
						showIcon
						isSelected={ debugMode }
						onCheckedChange={ setDebugMode }
					/>
					<Dropdown.CheckboxItem
						label="Disabled Option"
						state="disabled"
						isSelected={ disabledOption }
						onCheckedChange={ setDisabledOption }
					/>
				</Dropdown.Group>
			</Dropdown.Root>

			<Text sx={ { mt: 3 } }>
				Enhanced CheckboxItem with persistent checkbox icons, proper state management, and full
				feature parity with DropdownItem. All items are interactive, including the disabled one (for
				demo purposes).
			</Text>
		</>
	);
};

/**
 * Demonstrates the enhanced DropdownRadioItem with full feature parity
 */
export const RadioItems = () => {
	const [ theme, setTheme ] = React.useState( 'system' );
	const [ language, setLanguage ] = React.useState( 'english' );

	return (
		<>
			<Dropdown.Root trigger={ <Button>Radio Items</Button> }>
				<Dropdown.Group label="Theme Preference">
					<Dropdown.RadioGroup value={ theme } onValueChange={ setTheme }>
						<Dropdown.RadioItem 
							value="light" 
							label="Light Mode"
							icon={ <BiUser /> }
							showIcon
						/>
						<Dropdown.RadioItem 
							value="dark" 
							label="Dark Mode"
							secondaryLabel="Easier on the eyes"
							icon={ <BiCog /> }
							showIcon
						/>
						<Dropdown.RadioItem 
							value="system" 
							label="System Preference"
							showBadge
							badgeVariant="blue"
							badgeText="Auto"
						/>
						<Dropdown.RadioItem 
							value="disabled" 
							label="Disabled Option"
							state="disabled"
						/>
					</Dropdown.RadioGroup>
				</Dropdown.Group>

				<Dropdown.Group label="Language" separator>
					<Dropdown.RadioGroup value={ language } onValueChange={ setLanguage }>
						<Dropdown.RadioItem 
							value="english" 
							label="English"
							secondaryLabel="Default"
						/>
						<Dropdown.RadioItem 
							value="spanish" 
							label="Español"
							showBadge
							badgeVariant="green"
							badgeText="Beta"
						/>
						<Dropdown.RadioItem 
							value="french" 
							label="Français"
							icon={ <BiFile /> }
							showIcon
							showBadge
							badgeVariant="gold"
							badgeText="Pro"
						/>
					</Dropdown.RadioGroup>
				</Dropdown.Group>
			</Dropdown.Root>

			<Text sx={ { mt: 3 } }>
				Enhanced RadioItem with persistent radio button icons, proper state management, and full
				feature parity with DropdownItem. Uses RadioGroup for proper single-selection behavior.
				Current selections: Theme = "{ theme }", Language = "{ language }".
			</Text>
		</>
	);
};
