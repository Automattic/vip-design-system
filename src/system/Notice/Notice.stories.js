/**
 * External dependencies
 */

/**
 * Internal dependencies
 */
import React from 'react';
import { Heading, Notice, Text } from '..';

export default {
	title: 'Notice',
	component: Notice,
};

export const Default = () => (
	<React.Fragment>
		<Notice variant="alert" sx={{ mb: 4 }}>
			<Heading variant="h4">Your site is ready to launch!</Heading>
			<Text sx={{ mb: 0 }}>
				It looks like you&lsquo;re ready to share your application with the world.
			</Text>
		</Notice>

		<Notice variant="success" sx={{ mb: 4 }}>
			It looks like you&lsquo;re ready to share your <a href="#">application with the world.</a>
		</Notice>
	</React.Fragment>
);
