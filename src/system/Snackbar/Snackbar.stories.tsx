/** @jsxImportSource theme-ui */
/**
 * External dependencies
 */

/**
 * Internal dependencies
 */
import React, { useState } from 'react';

import { Snackbar } from '..';

import type { StoryObj } from '@storybook/react-vite';

export default {
	title: 'Snackbar',
	component: Snackbar,
};

type Story = StoryObj< typeof Snackbar >;

export const Default: Story = {
	render: () => {
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
					variant="success"
					sx={ { mb: 4 } }
					ctaText="Preview"
					ctaOnClick={ () => {
						setVisible( false );
					} }
				>
					Success message with a long text to test the layout. Lorem ipsum dolor sit amet,
					consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna
					aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
					ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
					cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
					sunt in culpa qui officia deserunt mollit anim id est laborum.
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
	},
};
