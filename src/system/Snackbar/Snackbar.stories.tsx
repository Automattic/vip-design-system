/** @jsxImportSource theme-ui */
/**
 * External dependencies
 */

/**
 * Internal dependencies
 */
import React, { useState } from 'react';

import { Snackbar } from '..';

export default {
	title: 'Snackbar',
	component: Snackbar,
};

export const Default = () => {
	const [ visible, setVisible ] = useState( true );
	return (
		<React.Fragment>
			{ visible && (
				<Snackbar
					variant="error"
					sx={ { mb: 4 } }
					ctaText="Resolve"
					ctaOnClick={ () => {
						setVisible( false );
					} }
				>
					Error message.
				</Snackbar>
			) }

			<Snackbar
				variant="warning"
				sx={ { mb: 4 } }
				ctaText="View"
				ctaOnClick={ () => {
					setVisible( false );
				} }
			>
				Warning message.
			</Snackbar>

			<Snackbar
				variant="info"
				sx={ { mb: 4 } }
				ctaText="View"
				ctaOnClick={ () => {
					setVisible( false );
				} }
			>
				Tip or information.
			</Snackbar>

			<Snackbar
				variant="success"
				sx={ { mb: 4 } }
				ctaText="Preview"
				ctaOnClick={ () => {
					setVisible( false );
				} }
			>
				Success message.
			</Snackbar>

			<Snackbar
				loading
				variant="warning"
				sx={ { mb: 4 } }
				title="Operation in progress..."
				ctaText="Pause"
				ctaOnClick={ () => {
					setVisible( false );
				} }
			>
				Check back again in a few seconds.
			</Snackbar>

			<Snackbar variant="system" sx={ { mb: 4 } }>
				System message.
			</Snackbar>
		</React.Fragment>
	);
};
