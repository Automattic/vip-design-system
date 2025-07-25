/**
 * External dependencies
 */
import {
	DotFilledIcon,
	CheckIcon,
	ChevronRightIcon,
	GearIcon,
	PersonIcon,
	FileIcon,
} from '@radix-ui/react-icons';
import React from 'react';

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
 * Basic dropdown with the new label prop API
 */
export const Default = () => (
	<>
		<Dropdown.Root trigger={ <Button>Open Menu</Button> }>
			<Dropdown.Item label="All Items" />
			<Dropdown.Item label="Completed" />
			<Dropdown.Item label="Running" />
			<Dropdown.Item label="Cancelled" />
			<Dropdown.Separator />
			<Dropdown.Item label="Errored" />
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
			<Dropdown.Label>Item States</Dropdown.Label>
			<Dropdown.Item label="Default State" />
			<Dropdown.Item label="Selected Item" isSelected />
			<Dropdown.Item label="Disabled Item" state="disabled" />
			<Dropdown.Separator />
			<Dropdown.Item state="loading" />
			<Dropdown.Item state="empty" />
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
			<Dropdown.Label>Features</Dropdown.Label>
			<Dropdown.Item label="Beta Feature" showBadge badgeVariant="blue" badgeText="Beta" />
			<Dropdown.Item label="New Dashboard" showBadge badgeVariant="green" badgeText="New" />
			<Dropdown.Item label="Premium Option" showBadge badgeVariant="gold" badgeText="Pro" />
			<Dropdown.Item label="Legacy Tool" showBadge badgeVariant="orange" badgeText="Deprecated" />
			<Dropdown.Separator />
			<Dropdown.Label>Status</Dropdown.Label>
			<Dropdown.Item label="Critical Alert" showBadge badgeVariant="red" badgeText="Critical" />
			<Dropdown.Item label="Default Primary" showBadge />{ ' ' }
			{ /* Uses default yellow "Primary" badge */ }
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
			<Dropdown.Label>Account</Dropdown.Label>
			<Dropdown.Item label="Profile Settings" icon={ <PersonIcon /> } showIcon />
			<Dropdown.Item label="Preferences" icon={ <GearIcon /> } showIcon />
			<Dropdown.Separator />
			<Dropdown.Label>Actions</Dropdown.Label>
			<Dropdown.Item label="Export Data" icon={ <FileIcon /> } showIcon />
			<Dropdown.Item label="Selected Option" icon={ <CheckIcon /> } showIcon isSelected />
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
			<Dropdown.Label>Team Members</Dropdown.Label>
			<Dropdown.Item label="John Doe" secondaryLabel="Administrator" />
			<Dropdown.Item label="Jane Smith" secondaryLabel="Editor" isSelected />
			<Dropdown.Item label="Bob Johnson" secondaryLabel="Viewer" />
			<Dropdown.Separator />
			<Dropdown.Label>Server Status</Dropdown.Label>
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
		</Dropdown.Root>

		<Text sx={ { mt: 3 } }>
			Shows secondary labels for additional context. Secondary labels use smaller text (12px) and
			the same color as the main text.
		</Text>
	</>
);

/**
 * Complex example combining all features
 */
export const ComplexExample = () => {
	const [ bookmarksChecked, setBookmarksChecked ] = React.useState( true );
	const [ urlsChecked, setUrlsChecked ] = React.useState( false );
	const [ person, setPerson ] = React.useState( 'pedro' );

	return (
		<>
			<Dropdown.Root trigger={ <Button>Full Feature Demo</Button> }>
				<Dropdown.Label>Quick Actions</Dropdown.Label>
				<Dropdown.Item label="New Tab" icon={ <FileIcon /> } showIcon />
				<Dropdown.Item label="New Window" icon={ <GearIcon /> } showIcon />
				<Dropdown.Item label="Private Window" icon={ <PersonIcon /> } showIcon state="disabled" />

				<Dropdown.Sub>
					<Dropdown.SubTrigger>
						<span style={ { display: 'flex', alignItems: 'center', gap: '6px' } }>
							More Tools
							<ChevronRightIcon />
						</span>
					</Dropdown.SubTrigger>
					<Dropdown.SubContent sideOffset={ 2 } alignOffset={ -5 }>
						<Dropdown.Item label="Save Page As…" />
						<Dropdown.Item label="Create Shortcut…" />
						<Dropdown.Item label="Developer Tools" showBadge badgeVariant="blue" badgeText="Dev" />
					</Dropdown.SubContent>
				</Dropdown.Sub>

				<Dropdown.Separator />

				<Dropdown.Label>View Options</Dropdown.Label>
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

				<Dropdown.Label>Active User</Dropdown.Label>
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

				<Dropdown.Separator />

				<Dropdown.Label>System Status</Dropdown.Label>
				<Dropdown.Item
					label="API Health"
					secondaryLabel="All Systems Operational"
					showBadge
					badgeVariant="green"
					badgeText="Online"
					isSelected
				/>
				<Dropdown.Item state="loading" />
			</Dropdown.Root>

			<Text sx={ { mt: 3 } }>
				A comprehensive example showcasing all dropdown features: labels, icons, badges, secondary
				labels, states, sub-menus, and traditional Radix checkbox/radio items.
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
			<Dropdown.Item>Text as children (legacy)</Dropdown.Item>
			<Dropdown.Item label="New label prop" />
			<Dropdown.Item>
				<span style={ { display: 'flex', alignItems: 'center', gap: '8px' } }>
					<GearIcon />
					Custom JSX children
				</span>
			</Dropdown.Item>
			<Dropdown.Separator />
			<Dropdown.Item
				label="Mixed usage works fine"
				showBadge
				badgeVariant="blue"
				badgeText="New API"
			/>
		</Dropdown.Root>

		<Text sx={ { mt: 3 } }>
			Shows backward compatibility - both old children-based and new prop-based APIs work together.
		</Text>
	</>
);

/**
 * Design system showcase
 */
export const DesignSystemShowcase = () => (
	<>
		<Dropdown.Root trigger={ <Button>Design System Demo</Button> }>
			<Dropdown.Label>Design Tokens in Action</Dropdown.Label>
			<Dropdown.Item label="32px height items" />
			<Dropdown.Item label="Proper spacing (28px left, 16px right)" />
			<Dropdown.Item label="Typography using fontSize.2 (14px)" />
			<Dropdown.Separator />
			<Dropdown.Label>Hover me for input.hover background</Dropdown.Label>
			<Dropdown.Item label="text.secondary color (#514e4d)" />
			<Dropdown.Item label="Disabled state" state="disabled" />
			<Dropdown.Separator />
			<Dropdown.Item
				label="Badge using tag.* tokens"
				showBadge
				badgeVariant="yellow"
				badgeText="Tokens!"
			/>
		</Dropdown.Root>

		<Text sx={ { mt: 3 } }>
			Demonstrates proper design token usage throughout the component. All spacing, colors, and
			typography use the design system.
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
