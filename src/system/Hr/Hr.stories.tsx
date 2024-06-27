/**
 * External dependencies
 */
import { Hr } from './Hr';

import type { StoryObj } from '@storybook/react';

/**
 * Internal dependencies
 */

export default {
	title: 'Hr',
	component: Hr,
	parameters: {
		docs: {
			description: {
				component: `

Horizontal Line.

## Guidance

### When to use the link component

- When you want to separate sections with a horizontal line.

### When to consider something else

- When you want to display a vertical line;

## Component Properties
`,
			},
		},
	},
};

type Story = StoryObj< typeof Hr >;

export const Default: Story = {
	render: () => (
		<>
			Horizontal Line:
			<Hr />
		</>
	),
};
