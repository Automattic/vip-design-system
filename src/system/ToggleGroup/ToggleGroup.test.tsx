/**
 * External dependencies
 */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { MdBlock, MdCheckCircle } from 'react-icons/md';
import { Theme, ThemeUIProvider } from 'theme-ui';

/**
 * Internal dependencies
 */
import { ToggleGroup } from './ToggleGroup';
import theme from '../theme';

const statusOptions = [
	{ value: 'enabled', label: 'Enabled', variant: 'green' as const },
	{ value: 'disabled', label: 'Disabled', variant: 'gray' as const },
	{ value: 'blocked', label: 'Blocked', variant: 'red' as const },
];

const renderToggleGroup = ( props = {} ) =>
	render( <ToggleGroup aria-label="Site status" options={ statusOptions } { ...props } /> );

describe( '<ToggleGroup />', () => {
	it( 'renders every option unselected when no value is given', async () => {
		const { container } = renderToggleGroup();

		expect( screen.getByRole( 'radiogroup', { name: 'Site status' } ) ).toBeInTheDocument();

		const options = screen.getAllByRole( 'radio' );

		expect( options.map( option => option.textContent ) ).toEqual( [
			'Enabled',
			'Disabled',
			'Blocked',
		] );
		options.forEach( option => expect( option ).toHaveAttribute( 'aria-checked', 'false' ) );

		expect( await axe( container ) ).toHaveNoViolations();
	} );

	it( 'preselects defaultValue', () => {
		renderToggleGroup( { defaultValue: 'blocked' } );

		expect( screen.getByRole( 'radio', { name: 'Blocked' } ) ).toHaveAttribute(
			'aria-checked',
			'true'
		);
	} );

	it( 'selects an option on click and reports the new value', async () => {
		const onValueChange = jest.fn();
		renderToggleGroup( { onValueChange } );

		await userEvent.click( screen.getByRole( 'radio', { name: 'Enabled' } ) );

		expect( onValueChange ).toHaveBeenCalledWith( 'enabled' );
		expect( screen.getByRole( 'radio', { name: 'Enabled' } ) ).toHaveAttribute(
			'aria-checked',
			'true'
		);
	} );

	it( 'keeps the selection when the active option is clicked again', async () => {
		const onValueChange = jest.fn();
		renderToggleGroup( { defaultValue: 'enabled', onValueChange } );

		await userEvent.click( screen.getByRole( 'radio', { name: 'Enabled' } ) );

		expect( onValueChange ).not.toHaveBeenCalled();
		expect( screen.getByRole( 'radio', { name: 'Enabled' } ) ).toHaveAttribute(
			'aria-checked',
			'true'
		);
	} );

	it( 'lets a controlled value override internal state', async () => {
		const { rerender } = render(
			<ToggleGroup aria-label="Site status" options={ statusOptions } value="enabled" />
		);

		await userEvent.click( screen.getByRole( 'radio', { name: 'Blocked' } ) );

		expect( screen.getByRole( 'radio', { name: 'Enabled' } ) ).toHaveAttribute(
			'aria-checked',
			'true'
		);

		rerender( <ToggleGroup aria-label="Site status" options={ statusOptions } value="blocked" /> );

		expect( screen.getByRole( 'radio', { name: 'Blocked' } ) ).toHaveAttribute(
			'aria-checked',
			'true'
		);
	} );

	it( 'moves the selection with arrow keys from the empty state', async () => {
		const onValueChange = jest.fn();
		renderToggleGroup( { onValueChange } );

		await userEvent.tab();

		expect( screen.getByRole( 'radio', { name: 'Enabled' } ) ).toHaveFocus();
		expect( onValueChange ).not.toHaveBeenCalled();

		await userEvent.keyboard( '{ArrowRight}' );

		expect( screen.getByRole( 'radio', { name: 'Disabled' } ) ).toHaveFocus();
		expect( onValueChange ).toHaveBeenLastCalledWith( 'disabled' );
	} );

	it.each( [
		[
			'a single disabled option',
			{ options: [ ...statusOptions.slice( 0, 2 ), { ...statusOptions[ 2 ], disabled: true } ] },
		],
		[ 'the whole group', { disabled: true } ],
	] )( 'ignores clicks when %s is disabled', async ( _label, props ) => {
		const onValueChange = jest.fn();
		renderToggleGroup( { onValueChange, ...props } );

		await userEvent.click( screen.getByRole( 'radio', { name: 'Blocked' } ) );

		expect( onValueChange ).not.toHaveBeenCalled();
		expect( screen.getByRole( 'radio', { name: 'Blocked' } ) ).toHaveAttribute(
			'aria-checked',
			'false'
		);
	} );

	it( 'resolves every style value through the theme', () => {
		render(
			<ThemeUIProvider theme={ theme as Theme }>
				<ToggleGroup aria-label="Site status" options={ statusOptions } defaultValue="enabled" />
			</ThemeUIProvider>
		);

		// Emotion injects through the CSSOM, which jsdom's getComputedStyle ignores, so read the
		// generated rules directly. Theme UI emits an unresolved lookup as its literal string
		// rather than failing, which is how `fontFamily: 'body'` silently fell back to the UA font.
		const emotionClasses = [
			screen.getByRole( 'radiogroup', { name: 'Site status' } ),
			...screen.getAllByRole( 'radio' ),
		].flatMap( element =>
			Array.from( element.classList ).filter( name => name.startsWith( 'css-' ) )
		);
		const rules = Array.from( document.styleSheets )
			.flatMap( sheet => Array.from( sheet.cssRules ) )
			.map( rule => rule.cssText )
			.filter( text => emotionClasses.some( name => text.includes( name ) ) )
			.join( '\n' );

		expect( rules ).toContain( 'var(--theme-ui-colors-tag-green-background)' );
		expect( rules ).toContain( 'var(--theme-ui-colors-layer-1)' );
		expect( rules ).toContain( 'font-family: inherit' );
		expect( rules ).not.toMatch( /: [a-z]+\.[a-z0-9.-]+;/ );
		expect( theme.colors.tag.green.background ).toBe( '#d7efdf' );
	} );

	it( 'names an icon-only option from its visually hidden label', async () => {
		const onValueChange = jest.fn();
		const { container } = render(
			<ToggleGroup
				aria-label="Site status"
				onValueChange={ onValueChange }
				options={ [
					{
						value: 'enabled',
						label: 'Enabled',
						icon: <MdCheckCircle />,
						hideLabel: true,
						variant: 'green',
					},
					{
						value: 'blocked',
						label: 'Blocked',
						icon: <MdBlock />,
						hideLabel: true,
						variant: 'red',
					},
				] }
			/>
		);

		const blocked = screen.getByRole( 'radio', { name: 'Blocked' } );

		expect( blocked.querySelector( '.screen-reader-text' ) ).toHaveTextContent( 'Blocked' );
		expect( blocked.querySelector( 'svg' ) ).toBeInTheDocument();

		await userEvent.click( blocked );

		expect( onValueChange ).toHaveBeenCalledWith( 'blocked' );
		expect( await axe( container ) ).toHaveNoViolations();
	} );

	it( 'shows an icon alongside a visible label', () => {
		render(
			<ToggleGroup
				aria-label="Site status"
				options={ [
					{ value: 'enabled', label: 'Enabled', icon: <MdCheckCircle />, variant: 'green' },
				] }
			/>
		);

		const option = screen.getByRole( 'radio', { name: 'Enabled' } );

		expect( option.querySelector( 'svg' ) ).toBeInTheDocument();
		expect( option.querySelector( '.screen-reader-text' ) ).not.toBeInTheDocument();
		expect( option ).toHaveTextContent( 'Enabled' );
	} );

	it( 'merges consumer sx and className with its own', () => {
		renderToggleGroup( { className: 'custom-class', sx: { marginTop: '10px' } } );

		const group = screen.getByRole( 'radiogroup', { name: 'Site status' } );

		expect( group ).toHaveClass( 'vip-toggle-group-component', 'custom-class' );
		expect( group ).toHaveStyle( 'margin-top: 10px' );
	} );
} );
