/**
 * External dependencies
 */
import { fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

/**
 * Internal dependencies
 */
import { NewConfirmationDialog } from './NewConfirmationDialog';

const defaultProps = {
	className: 'my-custom-class',
	needsConfirm: true,
	title: 'My Custom Title',
	body: 'My Custom Text',
	label: 'Submit this!',
	trigger: <button>Trigger</button>,
};

const getDialog = () => screen.getByRole( 'dialog' );
const getButton = () => screen.getByText( 'Trigger' );
const getConfirmButton = () => screen.getByText( defaultProps.label );
const getTitle = () => screen.getByRole( 'heading', { level: 2 } );

describe( '<NewConfirmationDialog />', () => {
	it( 'renders the NewConfirmationDialog component', async () => {
		const { container } = render( <NewConfirmationDialog { ...defaultProps } /> );

		expect( getButton() ).toBeInTheDocument();

		fireEvent.click( getButton() );

		const dialog = getDialog();
		expect( dialog ).toBeInTheDocument();
		expect( dialog ).toHaveClass( 'vip-dialog-component' );
		expect( dialog ).toHaveClass( defaultProps.className );

		expect( getTitle() ).toHaveTextContent( defaultProps.title );

		expect( getConfirmButton() ).toBeInTheDocument();

		// Check for accessibility issues
		await expect( await axe( container ) ).toHaveNoViolations();
	} );

	it( 'renders rich body content as the dialog description', () => {
		render(
			<NewConfirmationDialog
				{ ...defaultProps }
				body={
					<span>
						Confirm <strong>permanent deletion</strong>
					</span>
				}
			/>
		);

		fireEvent.click( getButton() );

		expect( screen.getByText( 'permanent deletion' ) ).toBeInTheDocument();
	} );

	it( 'uses description instead of body when both are provided', () => {
		render(
			<NewConfirmationDialog
				{ ...defaultProps }
				body="Fallback body"
				description={ <span>Preferred description</span> }
			/>
		);

		fireEvent.click( getButton() );

		expect( screen.getByText( 'Preferred description' ) ).toBeInTheDocument();
		expect( screen.queryByText( 'Fallback body' ) ).not.toBeInTheDocument();
	} );
} );
