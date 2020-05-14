/** @jsx jsx */
import { jsx } from 'theme-ui';

import React from 'react';
import { Heading, Notice, Text } from '..';

export default {
	title: 'Notice',
	component: Notice,
};

export const Default = () => (
	<Notice variant="alert" sx={{ mb: 4 }}>
		<Heading variant="h4">Your site is ready to launch!</Heading>
		<Text sx={{ mb: 0 }}>
			It looks like you're ready to share your application with the world.
		</Text>
	</Notice>
);
