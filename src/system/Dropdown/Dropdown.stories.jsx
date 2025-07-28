/**
 * External dependencies
 */
import React from 'react';
import { BiCheck, BiCog, BiUser, BiFile, BiHeart, BiStar, BiDownload, BiTrash, BiEdit } from 'react-icons/bi';

/**
 * Internal dependencies
 */
import * as Dropdown from '.';
import { Button } from '../Button';
import * as NewDialog from '../NewDialog';
import { Text } from '../Text';
import { Flex } from '../Flex';

export default {
	title: 'Dropdown',
	component: Dropdown.Root,
	parameters: {
		docs: {
			description: {
				component:
					'A redesigned dropdown component based on Radix UI with enhanced styling, states, and features from the VIP Design System. Features 32px item height, improved spacing, comprehensive state management, badge support, icon integration, and secondary labels.',
			},
		},
	},
};

/**
 * Basic dropdown showcasing the new design system tokens and improved styling
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
			This component is based on Radix UI with VIP Design System styling. Notice the improved 32px item height, 
			8px container padding, and enhanced typography using design system tokens.
		</Text>
	</>
);

/**
 * Comprehensive showcase of all item states available in the redesigned component
 */
export const ItemStates = () => (
	<>
		<Dropdown.Root trigger={ <Button>All Item States</Button> }>
			<Dropdown.Group label="Standard States">
				<Dropdown.Item label="Default State" />
				<Dropdown.Item label="Selected Item" isSelected />
				<Dropdown.Item label="Disabled Item" state="disabled" />
			</Dropdown.Group>
			<Dropdown.Group label="Special States" separator>
				<Dropdown.Item state="loading" />
				<Dropdown.Item state="empty" />
			</Dropdown.Group>
			<Dropdown.Group label="Interactive States" separator>
				<Dropdown.Item label="Hover over me" />
				<Dropdown.Item label="Selected with Check" isSelected />
			</Dropdown.Group>
		</Dropdown.Root>

		<Text sx={ { mt: 3 } }>
			Demonstrates all available states: default, hover, selected (with absolute positioned check mark), 
			disabled, loading (with BiLoaderAlt icon), and empty (with BiQuestionMark icon). Each state 
			uses proper design system colors and typography tokens.
		</Text>
	</>
);

/**
 * Comprehensive badge integration with all available Badge variants
 */
export const WithBadges = () => (
	<>
		<Dropdown.Root trigger={ <Button>Badge Showcase</Button> }>
			<Dropdown.Group label="Feature Status">
				<Dropdown.Item label="Beta Feature" showBadge badgeVariant="blue" badgeText="Beta" />
				<Dropdown.Item label="New Dashboard" showBadge badgeVariant="green" badgeText="New" />
				<Dropdown.Item label="Premium Option" showBadge badgeVariant="gold" badgeText="Pro" />
				<Dropdown.Item label="Legacy Tool" showBadge badgeVariant="orange" badgeText="Deprecated" />
			</Dropdown.Group>
			<Dropdown.Group label="Alert Levels" separator>
				<Dropdown.Item label="Critical Alert" showBadge badgeVariant="red" badgeText="Critical" />
				<Dropdown.Item label="Warning Notice" showBadge badgeVariant="yellow" badgeText="Warning" />
				<Dropdown.Item label="Primary Action" showBadge />{ /* Default yellow "Primary" badge */ }
			</Dropdown.Group>
			<Dropdown.Group label="Combined Features" separator>
				<Dropdown.Item 
					label="Selected Beta" 
					isSelected 
					showBadge 
					badgeVariant="blue" 
					badgeText="Beta" 
				/>
				<Dropdown.Item 
					label="Disabled Premium" 
					state="disabled" 
					showBadge 
					badgeVariant="gold" 
					badgeText="Pro" 
				/>
			</Dropdown.Group>
		</Dropdown.Root>

		<Text sx={ { mt: 3 } }>
			Complete badge integration using design system tokens. Badges are positioned on the right with proper 
			spacing and support all Badge component variants: blue, green, gold, orange, red, and yellow (default).
		</Text>
	</>
);

/**
 * Icon integration with proper sizing and spacing
 */
export const WithIcons = () => (
	<>
		<Dropdown.Root trigger={ <Button>Icon Examples</Button> }>
			<Dropdown.Group label="Account Actions">
				<Dropdown.Item label="Profile Settings" icon={ <BiUser /> } showIcon />
				<Dropdown.Item label="Preferences" icon={ <BiCog /> } showIcon />
				<Dropdown.Item label="Security" icon={ <BiCog /> } showIcon isSelected />
			</Dropdown.Group>
			<Dropdown.Group label="File Operations" separator>
				<Dropdown.Item label="Download" icon={ <BiDownload /> } showIcon />
				<Dropdown.Item label="Edit Document" icon={ <BiEdit /> } showIcon />
				<Dropdown.Item label="Delete File" icon={ <BiTrash /> } showIcon state="disabled" />
			</Dropdown.Group>
			<Dropdown.Group label="Mixed Features" separator>
				<Dropdown.Item 
					label="Favorite Action" 
					icon={ <BiHeart /> } 
					showIcon 
					showBadge 
					badgeVariant="red" 
					badgeText="Hot" 
				/>
				<Dropdown.Item 
					label="Premium Feature" 
					icon={ <BiStar /> } 
					showIcon 
					showBadge 
					badgeVariant="gold" 
					badgeText="Pro" 
					isSelected 
				/>
			</Dropdown.Group>
		</Dropdown.Root>

		<Text sx={ { mt: 3 } }>
			Icons are automatically sized to 20px for consistency and positioned with proper 6px gap from text. 
			Works seamlessly with all other features including selection, badges, and states.
		</Text>
	</>
);

/**
 * Secondary labels for additional context and information
 */
export const WithSecondaryLabels = () => (
	<>
		<Dropdown.Root trigger={ <Button>Secondary Labels</Button> }>
			<Dropdown.Group label="Team Members">
				<Dropdown.Item label="John Doe" secondaryLabel="Administrator" />
				<Dropdown.Item label="Jane Smith" secondaryLabel="Editor" isSelected />
				<Dropdown.Item label="Bob Johnson" secondaryLabel="Viewer" state="disabled" />
			</Dropdown.Group>
			<Dropdown.Group label="Server Environment" separator>
				<Dropdown.Item
					label="Production"
					secondaryLabel="us-east-1"
					icon={ <BiCog /> }
					showIcon
					showBadge
					badgeVariant="green"
					badgeText="Live"
				/>
				<Dropdown.Item
					label="Staging"
					secondaryLabel="us-west-2"
					icon={ <BiCog /> }
					showIcon
					showBadge
					badgeVariant="yellow"
					badgeText="Testing"
				/>
				<Dropdown.Item
					label="Development"
					secondaryLabel="localhost"
					icon={ <BiFile /> }
					showIcon
					showBadge
					badgeVariant="blue"
					badgeText="Dev"
				/>
			</Dropdown.Group>
		</Dropdown.Root>

		<Text sx={ { mt: 3 } }>
			Secondary labels provide additional context using 12px text with proper spacing. They work with all 
			other features and automatically handle text overflow with ellipsis.
		</Text>
	</>
);

/**
 * Enhanced CheckboxItem with comprehensive feature parity
 */
export const CheckboxItems = () => {
	const [ notifications, setNotifications ] = React.useState( true );
	const [ autoSave, setAutoSave ] = React.useState( false );
	const [ premiumFeature, setPremiumFeature ] = React.useState( true );
	const [ debugMode, setDebugMode ] = React.useState( false );
	const [ disabledOption, setDisabledOption ] = React.useState( false );

	return (
		<>
			<Dropdown.Root trigger={ <Button>Checkbox Features</Button> }>
				<Dropdown.Group label="Application Settings">
					<Dropdown.CheckboxItem
						label="Show Notifications"
						isSelected={ notifications }
						onCheckedChange={ setNotifications }
					/>
					<Dropdown.CheckboxItem
						label="Auto-save Documents"
						secondaryLabel="Every 5 minutes"
						isSelected={ autoSave }
						onCheckedChange={ setAutoSave }
					/>
					<Dropdown.CheckboxItem
						label="Premium Features"
						showBadge
						badgeVariant="gold"
						badgeText="Pro"
						isSelected={ premiumFeature }
						onCheckedChange={ setPremiumFeature }
					/>
				</Dropdown.Group>

				<Dropdown.Group label="Developer Options" separator>
					<Dropdown.CheckboxItem
						label="Debug Mode"
						secondaryLabel="Show console logs"
						icon={ <BiCog /> }
						showIcon
						isSelected={ debugMode }
						onCheckedChange={ setDebugMode }
					/>
					<Dropdown.CheckboxItem
						label="Disabled Setting"
						secondaryLabel="Requires admin access"
						state="disabled"
						isSelected={ disabledOption }
						onCheckedChange={ setDisabledOption }
					/>
				</Dropdown.Group>
			</Dropdown.Root>

			<Text sx={ { mt: 3 } }>
				Enhanced CheckboxItem with persistent checkbox icons and full feature parity including icons, 
				badges, secondary labels, and disabled states. Current selections: Notifications={ String(notifications) }, 
				Auto-save={ String(autoSave) }, Premium={ String(premiumFeature) }, Debug={ String(debugMode) }.
			</Text>
		</>
	);
};

/**
 * Enhanced RadioItem with comprehensive feature parity and proper selection management
 */
export const RadioItems = () => {
	const [ theme, setTheme ] = React.useState( 'system' );
	const [ language, setLanguage ] = React.useState( 'english' );

	return (
		<>
			<Dropdown.Root trigger={ <Button>Radio Selection</Button> }>
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
							secondaryLabel="Better for night use"
							icon={ <BiCog /> }
							showIcon
						/>
						<Dropdown.RadioItem
							value="system"
							label="System Preference"
							secondaryLabel="Follows OS setting"
							showBadge
							badgeVariant="blue"
							badgeText="Auto"
						/>
						<Dropdown.RadioItem 
							value="high-contrast" 
							label="High Contrast" 
							secondaryLabel="Accessibility mode"
							showBadge
							badgeVariant="green"
							badgeText="A11y"
						/>
					</Dropdown.RadioGroup>
				</Dropdown.Group>

				<Dropdown.Group label="Language & Region" separator>
					<Dropdown.RadioGroup value={ language } onValueChange={ setLanguage }>
						<Dropdown.RadioItem 
							value="english" 
							label="English" 
							secondaryLabel="Default language" 
						/>
						<Dropdown.RadioItem
							value="spanish"
							label="Español"
							secondaryLabel="Beta version"
							showBadge
							badgeVariant="blue"
							badgeText="Beta"
						/>
						<Dropdown.RadioItem
							value="french"
							label="Français"
							secondaryLabel="Premium feature"
							icon={ <BiStar /> }
							showIcon
							showBadge
							badgeVariant="gold"
							badgeText="Pro"
						/>
						<Dropdown.RadioItem 
							value="disabled" 
							label="German" 
							secondaryLabel="Coming soon"
							state="disabled" 
						/>
					</Dropdown.RadioGroup>
				</Dropdown.Group>
			</Dropdown.Root>

			<Text sx={ { mt: 3 } }>
				Enhanced RadioItem with persistent radio button icons and proper RadioGroup selection management. 
				Current selections: Theme="{ theme }", Language="{ language }". Notice how disabled items are properly styled.
			</Text>
		</>
	);
};

/**
 * Demonstrates proper group structure with labels and separators matching Figma design
 */
export const GroupStructure = () => (
	<>
		<Dropdown.Root trigger={ <Button>Group Organization</Button> }>
			<Dropdown.Group label="Quick Actions">
				<Dropdown.Item label="New Document" icon={ <BiFile /> } showIcon />
				<Dropdown.Item label="Open Recent" icon={ <BiDownload /> } showIcon />
			</Dropdown.Group>

			<Dropdown.Group label="Edit Operations" separator>
				<Dropdown.Item label="Cut" />
				<Dropdown.Item label="Copy" isSelected />
				<Dropdown.Item label="Paste" state="disabled" />
			</Dropdown.Group>

			<Dropdown.Group label="Advanced" separator>
				<Dropdown.Item 
					label="Find & Replace" 
					secondaryLabel="Ctrl+H"
					showBadge 
					badgeVariant="blue" 
					badgeText="Power" 
				/>
				<Dropdown.Item 
					label="Developer Tools" 
					secondaryLabel="F12"
					icon={ <BiCog /> } 
					showIcon 
					showBadge 
					badgeVariant="orange" 
					badgeText="Debug" 
				/>
			</Dropdown.Group>

			<Dropdown.Group separator>
				<Dropdown.Item label="No Label Group" />
				<Dropdown.Item label="Still Separated" />
			</Dropdown.Group>
		</Dropdown.Root>

		<Text sx={ { mt: 3 } }>
			Proper group structure with DropdownLabel components (12px semibold, uppercase, letter-spacing) 
			and DropdownSeparator components. Groups can have labels, separators, or both.
		</Text>
	</>
);

/**
 * Sub-menu functionality with nested dropdowns
 */
export const SubMenus = () => (
	<>
		<Dropdown.Root trigger={ <Button>Sub-Menu Example</Button> }>
			<Dropdown.Group>
				<Dropdown.Item label="Regular Item" />
				<Dropdown.Item label="Another Item" isSelected />
			</Dropdown.Group>

			<Dropdown.Sub>
				<Dropdown.SubTrigger>
					<span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
						<BiCog />
						More Options
					</span>
				</Dropdown.SubTrigger>
				<Dropdown.SubContent sideOffset={ 2 } alignOffset={ -5 }>
					<Dropdown.Group label="Sub Actions">
						<Dropdown.Item label="Save As..." />
						<Dropdown.Item label="Export PDF" showBadge badgeVariant="blue" badgeText="New" />
						<Dropdown.Item label="Print Preview" />
					</Dropdown.Group>
					<Dropdown.Group label="Developer" separator>
						<Dropdown.Item 
							label="Inspect Element" 
							icon={ <BiCog /> } 
							showIcon 
							showBadge 
							badgeVariant="orange" 
							badgeText="Dev" 
						/>
						<Dropdown.Item label="Console" state="disabled" />
					</Dropdown.Group>
				</Dropdown.SubContent>
			</Dropdown.Sub>

			<Dropdown.Group label="Final Group" separator>
				<Dropdown.Item label="Exit" icon={ <BiTrash /> } showIcon />
			</Dropdown.Group>
		</Dropdown.Root>

		<Text sx={ { mt: 3 } }>
			Sub-menu functionality with DropdownSub, DropdownSubTrigger (with automatic chevron), and 
			DropdownSubContent. Sub-menus support all the same features as main dropdowns.
		</Text>
	</>
);

/**
 * Comprehensive example showcasing all features working together
 */
export const CompleteExample = () => {
	const [ bookmarks, setBookmarks ] = React.useState( true );
	const [ fullUrls, setFullUrls ] = React.useState( false );
	const [ person, setPerson ] = React.useState( 'john' );

	return (
		<>
			<Dropdown.Root trigger={ <Button variant="primary">Complete Feature Demo</Button> }>
				<Dropdown.Group label="File Operations">
					<Dropdown.Item 
						label="New Tab" 
						secondaryLabel="Ctrl+T"
						icon={ <BiFile /> } 
						showIcon 
					/>
					<Dropdown.Item 
						label="New Window" 
						secondaryLabel="Ctrl+N"
						icon={ <BiDownload /> } 
						showIcon 
					/>
					<Dropdown.Item 
						label="Private Window" 
						secondaryLabel="Ctrl+Shift+N"
						icon={ <BiUser /> } 
						showIcon 
						state="disabled" 
					/>
				</Dropdown.Group>

				<Dropdown.Sub>
					<Dropdown.SubTrigger>
						<span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
							<BiCog />
							Advanced Tools
						</span>
					</Dropdown.SubTrigger>
					<Dropdown.SubContent sideOffset={ 2 } alignOffset={ -5 }>
						<Dropdown.Group label="Export Options">
							<Dropdown.Item 
								label="Save Page As..." 
								showBadge 
								badgeVariant="blue" 
								badgeText="HTML" 
							/>
							<Dropdown.Item 
								label="Export to PDF" 
								showBadge 
								badgeVariant="green" 
								badgeText="New" 
							/>
						</Dropdown.Group>
						<Dropdown.Group label="Developer Tools" separator>
							<Dropdown.Item 
								label="Inspect Element" 
								icon={ <BiCog /> } 
								showIcon 
								showBadge 
								badgeVariant="orange" 
								badgeText="Dev" 
							/>
							<Dropdown.Item state="loading" />
						</Dropdown.Group>
					</Dropdown.SubContent>
				</Dropdown.Sub>

				<Dropdown.Group label="View Preferences" separator>
					<Dropdown.CheckboxItem
						label="Show Bookmarks Bar"
						secondaryLabel="Ctrl+Shift+B"
						isSelected={ bookmarks }
						onCheckedChange={ setBookmarks }
					/>
					<Dropdown.CheckboxItem
						label="Show Full URLs"
						secondaryLabel="In address bar"
						isSelected={ fullUrls }
						onCheckedChange={ setFullUrls }
						showBadge
						badgeVariant="blue"
						badgeText="Experiment"
					/>
				</Dropdown.Group>

				<Dropdown.Group label="Active Profile" separator>
					<Dropdown.RadioGroup value={ person } onValueChange={ setPerson }>
						<Dropdown.RadioItem 
							value="john" 
							label="John Doe" 
							secondaryLabel="Administrator"
							icon={ <BiUser /> } 
							showIcon 
							showBadge
							badgeVariant="gold"
							badgeText="Admin"
						/>
						<Dropdown.RadioItem
							value="jane"
							label="Jane Smith"
							secondaryLabel="Editor"
							icon={ <BiUser /> }
							showIcon
						/>
						<Dropdown.RadioItem
							value="guest"
							label="Guest User"
							secondaryLabel="Limited access"
							icon={ <BiUser /> }
							showIcon
							showBadge
							badgeVariant="yellow"
							badgeText="Guest"
						/>
					</Dropdown.RadioGroup>
				</Dropdown.Group>

				<Dropdown.Group label="System Status" separator>
					<Dropdown.Item
						label="API Health Check"
						secondaryLabel="All systems operational"
						showBadge
						badgeVariant="green"
						badgeText="Online"
						isSelected
					/>
					<Dropdown.Item
						label="Database Status"
						secondaryLabel="Connection stable"
						showBadge
						badgeVariant="green"
						badgeText="OK"
					/>
					<Dropdown.Item state="empty" />
				</Dropdown.Group>
			</Dropdown.Root>

			<Text sx={ { mt: 3 } }>
				Complete demonstration of all dropdown features: states, icons, badges, secondary labels, 
				checkboxes, radio groups, sub-menus, and proper group organization. This showcases the full 
				capability of the redesigned component with 32px item height, improved spacing, and 
				comprehensive design system token integration.
			</Text>
		</>
	);
};

/**
 * Alignment options demonstration
 */
export const Alignment = () => (
	<>
		<Flex sx={{ gap: 4, justifyContent: 'space-around', p: 4 }}>
			<div>
				<Text sx={ { mb: 2, textAlign: 'center', fontWeight: 'semiBold' } }>Align Start</Text>
				<Dropdown.Root trigger={ <Button>Align Start</Button> } contentProps={ { align: 'start' } }>
					<Dropdown.Group>
						<Dropdown.Item label="Option 1" />
						<Dropdown.Item label="Option 2" />
						<Dropdown.Item label="Option 3" />
					</Dropdown.Group>
				</Dropdown.Root>
			</div>

			<div>
				<Text sx={ { mb: 2, textAlign: 'center', fontWeight: 'semiBold' } }>Align Center</Text>
				<Dropdown.Root
					trigger={ <Button>Align Center</Button> }
					contentProps={ { align: 'center' } }
				>
					<Dropdown.Group>
						<Dropdown.Item label="Option 1" />
						<Dropdown.Item label="Option 2" />
						<Dropdown.Item label="Option 3" />
					</Dropdown.Group>
				</Dropdown.Root>
			</div>

			<div>
				<Text sx={ { mb: 2, textAlign: 'center', fontWeight: 'semiBold' } }>Align End</Text>
				<Dropdown.Root trigger={ <Button>Align End</Button> } contentProps={ { align: 'end' } }>
					<Dropdown.Group>
						<Dropdown.Item label="Option 1" />
						<Dropdown.Item label="Option 2" />
						<Dropdown.Item label="Option 3" />
					</Dropdown.Group>
				</Dropdown.Root>
			</div>
		</Flex>

		<Text sx={ { mt: 3 } }>
			Dropdown content alignment options relative to the trigger. The improved design maintains 
			consistent spacing and styling across all alignment modes.
		</Text>
	</>
);

/**
 * Backward compatibility demonstration
 */
export const BackwardCompatibility = () => (
	<>
		<Dropdown.Root trigger={ <Button variant="secondary">Legacy Support</Button> }>
			<Dropdown.Group label="Mixed API Usage">
				<Dropdown.Item>Text as children (legacy)</Dropdown.Item>
				<Dropdown.Item label="New label prop API" />
				<Dropdown.Item>
					<span style={ { display: 'flex', alignItems: 'center', gap: '8px' } }>
						<BiCog />
						Custom JSX children
					</span>
				</Dropdown.Item>
			</Dropdown.Group>
			<Dropdown.Group label="New Features" separator>
				<Dropdown.Item
					label="Modern API with all features"
					icon={ <BiStar /> }
					showIcon
					showBadge
					badgeVariant="blue"
					badgeText="New"
					secondaryLabel="Enhanced"
				/>
			</Dropdown.Group>
		</Dropdown.Root>

		<Text sx={ { mt: 3 } }>
			Backward compatibility maintained - both legacy children-based API and new prop-based API 
			work seamlessly together. The redesign preserves existing functionality while adding 
			comprehensive new features.
		</Text>
	</>
);

/**
 * Dialog integration example maintaining proper modal behavior
 */
export const WithDialog = () => {
	const [ alertOpen, setAlertOpen ] = React.useState( false );
	const [ menuOpen, setMenuOpen ] = React.useState( false );

	// eslint-disable-next-line react/prop-types
	const ConfirmDialog = ( { onConfirm, ...props } ) => (
		<NewDialog.Root
			{ ...props }
			content={
				<>
					<Text sx={{ mb: 3 }}>This action cannot be undone. Are you sure you want to proceed?</Text>
					<Flex sx={{ gap: 2, justifyContent: 'flex-end' }}>
						<Button variant="secondary" onClick={ () => props.onOpenChange?.(false) }>
							Cancel
						</Button>
						<Button variant="primary" onClick={ () => onConfirm() }>
							Confirm
						</Button>
					</Flex>
				</>
			}
		/>
	);

	return (
		<>
			<Dropdown.Root
				modal={ ! alertOpen }
				open={ menuOpen }
				onOpenChange={ setMenuOpen }
				contentProps={ { sideOffset: 5 } }
				trigger={ <Button>Menu with Dialog</Button> }
			>
				<Dropdown.Group label="Safe Actions">
					<Dropdown.Item 
						label="View Details" 
						icon={ <BiFile /> } 
						showIcon 
					/>
					<Dropdown.Item 
						label="Edit Settings" 
						icon={ <BiEdit /> } 
						showIcon 
						showBadge 
						badgeVariant="blue" 
						badgeText="Safe" 
					/>
				</Dropdown.Group>

				<Dropdown.Group label="Destructive Actions" separator>
					<ConfirmDialog
						title="Confirm Deletion"
						description="This action cannot be undone."
						open={ alertOpen }
						onOpenChange={ setAlertOpen }
						onConfirm={ () => {
							setAlertOpen( false );
							setMenuOpen( false );
							console.log('Item deleted');
						} }
						trigger={
							<Dropdown.Item
								label="Delete Item"
								secondaryLabel="Permanent action"
								icon={ <BiTrash /> }
								showIcon
								showBadge
								badgeVariant="red"
								badgeText="Danger"
								onSelect={ event => event.preventDefault() }
							/>
						}
					/>
				</Dropdown.Group>
			</Dropdown.Root>

			<Text sx={ { mt: 3 } }>
				Proper modal behavior when combining dropdowns with dialogs. The dropdown modal state 
				is managed to prevent conflicts, and dangerous actions are clearly marked with appropriate 
				badges and confirmation dialogs.
			</Text>
		</>
	);
};
