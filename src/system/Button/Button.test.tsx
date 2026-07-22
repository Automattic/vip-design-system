/**
 * External dependencies
 */
import { fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import React from 'react';

/**
 * Internal dependencies
 */
import { Button } from './Button';

const BUTTON_TEXT = 'Button Text';

describe( '<Button />', () => {
	it( 'type-checks polymorphic usage', () => {
		const buttonRef = React.createRef< HTMLButtonElement >();
		const anchorRef = React.createRef< HTMLAnchorElement >();

		type LinkExternalProps = React.ComponentPropsWithoutRef< 'a' > & {
			newTab?: boolean;
			screenReaderText?: boolean;
			showExternalIcon?: boolean;
		};

		const LinkExternal = React.forwardRef< HTMLAnchorElement, LinkExternalProps >(
			( { children, newTab, ...props }, ref ) => (
				<a ref={ ref } target={ newTab ? '_blank' : undefined } { ...props }>
					{ children }
				</a>
			)
		);

		type NextLinkProps = React.ComponentPropsWithoutRef< 'a' > & {
			prefetch?: boolean;
		};

		const NextLink = React.forwardRef< HTMLAnchorElement, NextLinkProps >(
			( { children, ...props }, ref ) => (
				<a ref={ ref } { ...props }>
					{ children }
				</a>
			)
		);

		// @ts-expect-error href belongs to an anchor or link component, not the default button.
		const invalidHrefButton = <Button href="/dashboard">Invalid default button href</Button>;
		// @ts-expect-error default Button refs point to HTMLButtonElement.
		const invalidRefButton = <Button ref={ anchorRef }>Invalid default button ref</Button>;

		const examples = {
			defaultButton: (
				<Button
					ref={ buttonRef }
					type="button"
					onClick={ event => {
						event.currentTarget.disabled = true;
					} }
				>
					Default button
				</Button>
			),
			anchorButton: (
				<Button
					as="a"
					href="https://wpvip.com"
					target="_blank"
					rel="noreferrer"
					download
					ref={ anchorRef }
					onClick={ event => {
						event.currentTarget.href = 'https://wpvip.com/dashboard';
					} }
				>
					Anchor button
				</Button>
			),
			externalLinkButton: (
				<Button
					as={ LinkExternal }
					href="https://wpvip.com"
					newTab
					screenReaderText
					showExternalIcon
					ref={ anchorRef }
					onClick={ event => {
						event.currentTarget.href = 'https://wpvip.com/dashboard';
					} }
				>
					External link button
				</Button>
			),
			nextLinkButton: (
				<Button as={ NextLink } href="/dashboard" prefetch={ false } ref={ anchorRef }>
					Next link button
				</Button>
			),
			invalidHrefButton,
			invalidRefButton,
		};

		expect( Object.keys( examples ) ).toHaveLength( 6 );
	} );

	it( 'renders the Button component', async () => {
		const onClick = jest.fn( () => {} );
		const { container } = render( <Button onClick={ onClick }>{ BUTTON_TEXT }</Button> );
		const component = screen.getByText( BUTTON_TEXT );

		expect( component ).toBeInTheDocument();

		fireEvent.click( component );
		expect( onClick ).toHaveBeenCalledTimes( 1 );

		// Check for accessibility issues
		expect( await axe( container ) ).toHaveNoViolations();
	} );

	it( 'renders the Button with disabled prop', async () => {
		const onClick = jest.fn( () => {} );
		const { container } = render(
			<Button disabled onClick={ onClick }>
				{ BUTTON_TEXT }
			</Button>
		);

		const component = screen.getByText( BUTTON_TEXT );

		expect( component ).toBeInTheDocument();
		expect( component ).toHaveAttribute( 'disabled', '' );
		expect( component ).not.toHaveAttribute( 'aria-disabled' );

		fireEvent.click( component );
		expect( onClick ).toHaveBeenCalledTimes( 0 );

		// Check for accessibility issues
		expect( await axe( container ) ).toHaveNoViolations();
	} );

	it( 'renders the Button with aria-disabled prop', async () => {
		const onClick = jest.fn( () => {} );
		const { container } = render(
			<Button disabled preferAriaDisabled onClick={ onClick }>
				{ BUTTON_TEXT }
			</Button>
		);

		const component = screen.getByText( BUTTON_TEXT );

		expect( component ).toBeInTheDocument();
		expect( component ).toHaveAttribute( 'aria-disabled', 'true' );
		expect( component ).not.toHaveAttribute( 'disabled' );

		fireEvent.click( component );
		expect( onClick ).toHaveBeenCalledTimes( 0 );

		// Check for accessibility issues
		expect( await axe( container ) ).toHaveNoViolations();
	} );
} );
