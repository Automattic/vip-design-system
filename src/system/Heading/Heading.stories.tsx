/**
 * Internal dependencies
 */
import { Box, Heading } from '..';

import type { StoryObj } from '@storybook/react-vite';

export default {
	title: 'Heading',
	component: Heading,
};

type Story = StoryObj< typeof Heading >;

export const Primary: Story = {
	args: {
		variant: 'h1',
		children: 'Your Applications',
	},
};

export const Default: Story = {
	render: () => (
		<Box>
			<Heading variant="h1">Your Applications</Heading>
			<Heading variant="h2">Heading Two</Heading>
			<Heading variant="h3">Heading Three</Heading>
			<Heading variant="h4">Heading Four</Heading>
			<Heading variant="h5">Heading Five</Heading>

			<Heading variant="h3" as="h1">
				Heading One with Heading Three Styles
			</Heading>
			<Heading as="p" sx={ { variant: 'text.caps' } }>
				Paragraph with Caps Styles
			</Heading>
			<Heading as="h3" sx={ { variant: 'text.caps' } }>
				Heading Three with Caps Styles
			</Heading>
		</Box>
	),
};
