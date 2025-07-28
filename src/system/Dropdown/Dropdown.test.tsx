/**
 * External dependencies
 */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import React from 'react';
import { BiUser, BiStar } from 'react-icons/bi';

/**
 * Internal dependencies
 */
import * as Dropdown from '.';

const defaultProps = {
	trigger: <button>Open Menu</button>,
};

const getButton = () => screen.getByRole( 'button', { name: 'Open Menu' } );

describe( '<Dropdown />', () => {
	it( 'renders the Dropdown component', async () => {
		const { container } = render(
			<Dropdown.Root { ...defaultProps }>
				<Dropdown.Item>My Item</Dropdown.Item>
			</Dropdown.Root>
		);

		expect( getButton() ).toBeInTheDocument();

		// Check for accessibility issues
		expect( await axe( container ) ).toHaveNoViolations();
	} );

	it( 'renders trigger with proper ARIA attributes', () => {
		render(
			<Dropdown.Root { ...defaultProps }>
				<Dropdown.Item label="Test Item" />
			</Dropdown.Root>
		);

		const trigger = getButton();
		expect( trigger ).toHaveAttribute( 'aria-haspopup', 'menu' );
		expect( trigger ).toHaveAttribute( 'aria-expanded', 'false' );
		expect( trigger ).toHaveAttribute( 'data-state', 'closed' );
	} );

	it( 'supports controlled open state', () => {
		const onOpenChange = jest.fn();

		const { rerender } = render(
			<Dropdown.Root { ...defaultProps } open={ false } onOpenChange={ onOpenChange }>
				<Dropdown.Item label="Test Item" />
			</Dropdown.Root>
		);

		const trigger = getButton();
		expect( trigger ).toHaveAttribute( 'aria-expanded', 'false' );
		expect( trigger ).toHaveAttribute( 'data-state', 'closed' );

		rerender(
			<Dropdown.Root { ...defaultProps } open={ true } onOpenChange={ onOpenChange }>
				<Dropdown.Item label="Test Item" />
			</Dropdown.Root>
		);

		expect( trigger ).toHaveAttribute( 'aria-expanded', 'true' );
		expect( trigger ).toHaveAttribute( 'data-state', 'open' );
	} );

	it( 'supports default open state', () => {
		const { container } = render(
			<Dropdown.Root { ...defaultProps } defaultOpen={ true }>
				<Dropdown.Item label="Test Item" />
			</Dropdown.Root>
		);

		// When open, the dropdown menu should be visible
		const menu = screen.getByRole( 'menu' );
		expect( menu ).toBeInTheDocument();
		expect( menu ).toHaveAttribute( 'data-state', 'open' );

		// The trigger button should exist in the container (even if aria-hidden due to modal behavior)
		const triggerButton = container.querySelector( 'button[aria-expanded="true"]' );
		expect( triggerButton ).toBeInTheDocument();
		expect( triggerButton ).toHaveAttribute( 'data-state', 'open' );
	} );

	it( 'supports modal configuration', () => {
		const { container } = render(
			<Dropdown.Root { ...defaultProps } modal={ false }>
				<Dropdown.Item label="Test Item" />
			</Dropdown.Root>
		);

		expect( container ).toBeInTheDocument();
		expect( getButton() ).toBeInTheDocument();
	} );

	it( 'supports direction configuration', () => {
		const { container } = render(
			<Dropdown.Root { ...defaultProps } dir="rtl">
				<Dropdown.Item label="Test Item" />
			</Dropdown.Root>
		);

		expect( container ).toBeInTheDocument();
		expect( getButton() ).toBeInTheDocument();
	} );

	it( 'passes contentProps to dropdown content', () => {
		const { container } = render(
			<Dropdown.Root
				{ ...defaultProps }
				contentProps={ { align: 'end', className: 'custom-dropdown' } }
			>
				<Dropdown.Item label="Test Item" />
			</Dropdown.Root>
		);

		expect( container ).toBeInTheDocument();
		expect( getButton() ).toBeInTheDocument();
	} );

	it( 'supports portal configuration', () => {
		const { container } = render(
			<Dropdown.Root { ...defaultProps } portalProps={ { container: document.body } }>
				<Dropdown.Item label="Test Item" />
			</Dropdown.Root>
		);

		expect( container ).toBeInTheDocument();
		expect( getButton() ).toBeInTheDocument();
	} );

	describe( 'Full Dropdown Integration', () => {
		it( 'renders dropdown with basic items', async () => {
			const { container } = render(
				<Dropdown.Root { ...defaultProps }>
					<Dropdown.Group label="Basic Items">
						<Dropdown.Item label="Item 1" />
						<Dropdown.Item label="Item 2" />
						<Dropdown.Item>Item 3 as children</Dropdown.Item>
					</Dropdown.Group>
				</Dropdown.Root>
			);

			expect( getButton() ).toBeInTheDocument();
			expect( await axe( container ) ).toHaveNoViolations();
		} );

		it( 'renders dropdown with features', async () => {
			const { container } = render(
				<Dropdown.Root { ...defaultProps }>
					<Dropdown.Group label="Featured Items">
						<Dropdown.Item label="With Icon" icon={ <BiUser /> } showIcon />
						<Dropdown.Item label="With Badge" showBadge badgeVariant="blue" badgeText="New" />
						<Dropdown.Item label="With Secondary" secondaryLabel="Additional info" />
						<Dropdown.Item label="Selected Item" isSelected />
						<Dropdown.Item label="Disabled Item" state="disabled" />
					</Dropdown.Group>
				</Dropdown.Root>
			);

			expect( getButton() ).toBeInTheDocument();
			expect( await axe( container ) ).toHaveNoViolations();
		} );

		it( 'renders dropdown with checkbox items', async () => {
			const { container } = render(
				<Dropdown.Root { ...defaultProps }>
					<Dropdown.Group label="Checkbox Options">
						<Dropdown.CheckboxItem
							label="Option 1"
							isSelected={ true }
							onCheckedChange={ () => {} }
						/>
						<Dropdown.CheckboxItem
							label="Option 2"
							isSelected={ false }
							onCheckedChange={ () => {} }
						/>
						<Dropdown.CheckboxItem
							label="Premium Option"
							isSelected={ true }
							onCheckedChange={ () => {} }
							icon={ <BiStar /> }
							showIcon
							showBadge
							badgeVariant="gold"
							badgeText="Pro"
						/>
					</Dropdown.Group>
				</Dropdown.Root>
			);

			expect( getButton() ).toBeInTheDocument();
			expect( await axe( container ) ).toHaveNoViolations();
		} );

		it( 'renders dropdown with radio items', async () => {
			const { container } = render(
				<Dropdown.Root { ...defaultProps }>
					<Dropdown.Group label="Radio Options">
						<Dropdown.RadioGroup value="option1" onValueChange={ () => {} }>
							<Dropdown.RadioItem value="option1" label="Option 1" />
							<Dropdown.RadioItem value="option2" label="Option 2" />
							<Dropdown.RadioItem
								value="option3"
								label="Premium Option"
								icon={ <BiStar /> }
								showIcon
								showBadge
								badgeVariant="gold"
								badgeText="Pro"
							/>
						</Dropdown.RadioGroup>
					</Dropdown.Group>
				</Dropdown.Root>
			);

			expect( getButton() ).toBeInTheDocument();
			expect( await axe( container ) ).toHaveNoViolations();
		} );

		it( 'renders dropdown with sub-menus', async () => {
			const { container } = render(
				<Dropdown.Root { ...defaultProps }>
					<Dropdown.Group label="Main Items">
						<Dropdown.Item label="Regular Item" />
					</Dropdown.Group>

					<Dropdown.Sub>
						<Dropdown.SubTrigger>
							<span>More Options</span>
						</Dropdown.SubTrigger>
						<Dropdown.SubContent>
							<Dropdown.Group label="Sub Items">
								<Dropdown.Item label="Sub Item 1" />
								<Dropdown.Item label="Sub Item 2" />
							</Dropdown.Group>
						</Dropdown.SubContent>
					</Dropdown.Sub>
				</Dropdown.Root>
			);

			expect( getButton() ).toBeInTheDocument();
			expect( await axe( container ) ).toHaveNoViolations();
		} );

		it( 'renders dropdown with groups and separators', async () => {
			const { container } = render(
				<Dropdown.Root { ...defaultProps }>
					<Dropdown.Group label="Group 1">
						<Dropdown.Item label="Item 1" />
						<Dropdown.Item label="Item 2" />
					</Dropdown.Group>

					<Dropdown.Group label="Group 2" separator>
						<Dropdown.Item label="Item 3" />
						<Dropdown.Item label="Item 4" />
					</Dropdown.Group>

					<Dropdown.Group separator>
						<Dropdown.Item label="Item 5" />
					</Dropdown.Group>
				</Dropdown.Root>
			);

			expect( getButton() ).toBeInTheDocument();
			expect( await axe( container ) ).toHaveNoViolations();
		} );

		it( 'renders dropdown with special states', async () => {
			const { container } = render(
				<Dropdown.Root { ...defaultProps }>
					<Dropdown.Group label="Special States">
						<Dropdown.Item state="loading" />
						<Dropdown.Item state="empty" />
					</Dropdown.Group>
				</Dropdown.Root>
			);

			expect( getButton() ).toBeInTheDocument();
			expect( await axe( container ) ).toHaveNoViolations();
		} );
	} );

	describe( 'User Interactions', () => {
		it( 'handles click events on items', async () => {
			const onSelect = jest.fn();
			const user = userEvent.setup();

			render(
				<Dropdown.Root { ...defaultProps } defaultOpen>
					<Dropdown.Item label="Clickable Item" onSelect={ onSelect } />
				</Dropdown.Root>
			);

			// Item should be visible since dropdown is open by default
			const item = screen.getByText( 'Clickable Item' );
			await user.click( item );

			expect( onSelect ).toHaveBeenCalledTimes( 1 );
		} );

		it( 'handles checkbox state changes', async () => {
			const onCheckedChange = jest.fn();
			const user = userEvent.setup();

			render(
				<Dropdown.Root { ...defaultProps } defaultOpen>
					<Dropdown.CheckboxItem
						label="Checkbox Item"
						isSelected={ false }
						onCheckedChange={ onCheckedChange }
					/>
				</Dropdown.Root>
			);

			const item = screen.getByText( 'Checkbox Item' );
			await user.click( item );

			expect( onCheckedChange ).toHaveBeenCalledWith( true );
		} );

		it( 'handles radio group changes', async () => {
			const onValueChange = jest.fn();
			const user = userEvent.setup();

			render(
				<Dropdown.Root { ...defaultProps } defaultOpen>
					<Dropdown.RadioGroup value="option1" onValueChange={ onValueChange }>
						<Dropdown.RadioItem value="option1" label="Option 1" />
						<Dropdown.RadioItem value="option2" label="Option 2" />
					</Dropdown.RadioGroup>
				</Dropdown.Root>
			);

			const option2 = screen.getByText( 'Option 2' );
			await user.click( option2 );

			expect( onValueChange ).toHaveBeenCalledWith( 'option2' );
		} );
	} );

	describe( 'Accessibility', () => {
		it( 'provides proper ARIA structure for dropdown menu', () => {
			render(
				<Dropdown.Root { ...defaultProps } defaultOpen>
					<Dropdown.Group label="Test Group">
						<Dropdown.Item label="Test Item" />
					</Dropdown.Group>
				</Dropdown.Root>
			);

			// Check for proper menu structure
			const menu = screen.getByRole( 'menu' );
			expect( menu ).toBeInTheDocument();

			const menuItems = screen.getAllByRole( 'menuitem' );
			expect( menuItems.length ).toBeGreaterThan( 0 );
		} );

		it( 'provides proper ARIA attributes for checkbox items', () => {
			render(
				<Dropdown.Root { ...defaultProps } defaultOpen>
					<Dropdown.CheckboxItem
						label="Checkbox Option"
						isSelected={ true }
						onCheckedChange={ () => {} }
					/>
				</Dropdown.Root>
			);

			const checkboxItem = screen.getByRole( 'menuitemcheckbox' );
			expect( checkboxItem ).toBeInTheDocument();
			expect( checkboxItem ).toHaveAttribute( 'aria-checked', 'true' );
		} );

		it( 'provides proper ARIA attributes for radio items', () => {
			render(
				<Dropdown.Root { ...defaultProps } defaultOpen>
					<Dropdown.RadioGroup value="selected" onValueChange={ () => {} }>
						<Dropdown.RadioItem value="selected" label="Selected Option" />
						<Dropdown.RadioItem value="other" label="Other Option" />
					</Dropdown.RadioGroup>
				</Dropdown.Root>
			);

			const radioItems = screen.getAllByRole( 'menuitemradio' );
			expect( radioItems.length ).toBe( 2 );

			const selectedItem = screen
				.getByText( 'Selected Option' )
				.closest( '[role="menuitemradio"]' );
			expect( selectedItem ).toHaveAttribute( 'aria-checked', 'true' );

			const otherItem = screen.getByText( 'Other Option' ).closest( '[role="menuitemradio"]' );
			expect( otherItem ).toHaveAttribute( 'aria-checked', 'false' );
		} );

		it( 'handles disabled states properly', () => {
			render(
				<Dropdown.Root { ...defaultProps } defaultOpen>
					<Dropdown.Item label="Disabled Item" state="disabled" />
				</Dropdown.Root>
			);

			const disabledItem = screen.getByText( 'Disabled Item' );
			expect( disabledItem.closest( '[data-disabled]' ) ).toBeInTheDocument();
		} );
	} );

	describe( 'Backward Compatibility', () => {
		it( 'supports legacy children-based API', async () => {
			const { container } = render(
				<Dropdown.Root { ...defaultProps }>
					<Dropdown.Group label="Legacy API">
						<Dropdown.Item>Legacy Item 1</Dropdown.Item>
						<Dropdown.Item>Legacy Item 2</Dropdown.Item>
					</Dropdown.Group>
				</Dropdown.Root>
			);

			expect( getButton() ).toBeInTheDocument();
			expect( await axe( container ) ).toHaveNoViolations();
		} );

		it( 'supports mixing legacy and new APIs', async () => {
			const { container } = render(
				<Dropdown.Root { ...defaultProps }>
					<Dropdown.Group label="Mixed API">
						<Dropdown.Item>Legacy children</Dropdown.Item>
						<Dropdown.Item label="New label prop" />
						<Dropdown.Item
							label="Full featured new API"
							icon={ <BiStar /> }
							showIcon
							showBadge
							badgeText="New"
						/>
					</Dropdown.Group>
				</Dropdown.Root>
			);

			expect( getButton() ).toBeInTheDocument();
			expect( await axe( container ) ).toHaveNoViolations();
		} );
	} );
} );
