/**
 * External dependencies
 */
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { createRef } from 'react';

/**
 * Internal dependencies
 */
import { Textarea } from './Textarea';

describe( '<Textarea />', () => {
	it( 'renders VDS props, native textarea attributes, validation, and ref', async () => {
		const ref = createRef< HTMLTextAreaElement >();

		const { container } = render(
			<Textarea
				ref={ ref }
				forLabel="textarea-notes"
				label="Notes"
				rows={ 5 }
				maxLength={ 100 }
				placeholder="Write notes"
				hasError
				required
				errorMessage={ <span>Notes are required</span> }
				sx={ { minHeight: '120px' } }
				wrapperSx={ { mb: 3 } }
			/>
		);

		const textarea = screen.getByLabelText( /Notes/ );

		expect( textarea ).toBeInstanceOf( HTMLTextAreaElement );
		expect( textarea ).toHaveAttribute( 'id', 'textarea-notes' );
		expect( textarea ).toHaveAttribute( 'rows', '5' );
		expect( textarea ).toHaveAttribute( 'maxlength', '100' );
		expect( textarea ).toHaveAttribute( 'aria-describedby', 'describe-textarea-notes-validation' );
		expect( textarea ).toBeRequired();
		expect( screen.getByText( 'Notes are required' ) ).toBeInTheDocument();
		expect( ref.current ).toBe( textarea );

		expect( await axe( container ) ).toHaveNoViolations();
	} );
} );
