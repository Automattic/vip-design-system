/** @jsxImportSource theme-ui */

import { Box, Card } from '..';

import type { StoryObj } from '@storybook/react-vite';

export default {
	title: 'Card',
	component: Card,
};

type Story = StoryObj< typeof Card >;

export const Default: Story = {
	args: {
		children: 'Hello',
	},
};

export const WithHeader: Story = {
	args: {
		title: 'Header',
		children: 'This is a card with a header.',
	},
};

export const WithCustomHeader: Story = {
	args: {
		title: 'Screenshot of a website',
		renderHeader: title => (
			<img
				src={ `https://s0.wp.com/mshots/v1/https://google.com/` }
				sx={ { width: '100%' } }
				alt={ title }
			/>
		),
		children: 'This is a card with a customized header content.',
	},
	render: args => (
		<Box sx={ { maxWidth: 500 } }>
			<Card { ...args } />
		</Box>
	),
};

export const DefaultSecondary: Story = {
	args: {
		variant: 'secondary',
		children: 'Hello',
	},
};

export const WithHeaderSecondary: Story = {
	args: {
		title: 'Header',
		variant: 'secondary',
		children: 'This is a card with a header.',
	},
};

export const DefaultIndent: Story = {
	args: {
		variant: 'indent',
		children: 'Hello',
	},
};

export const StyledBody: Story = {
	args: {
		variant: 'indent',
		title: 'Hello world',
		bodyStyles: { p: 6, backgroundColor: 'layer.2' },
		children: 'Hello styled body.',
	},
};

/**
 * `sx` is merged over the variant rather than replacing it, so the card keeps its
 * background, radius and shadow while the custom styles are applied on top.
 */
export const WithCustomStyles: Story = {
	args: {
		title: 'Header',
		sx: { maxWidth: 400, mb: 4 },
		children: 'This card sets maxWidth and margin, and keeps the primary variant surface.',
	},
};
