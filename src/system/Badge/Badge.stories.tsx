/**
 * External dependencies
 */
import { Badge, Link } from '..';

import type { StoryObj } from '@storybook/react-vite';

/**
 * Internal dependencies
 */

export default {
	component: Badge,
	title: 'Badge',
};

type Story = StoryObj< typeof Badge >;

export const Default: Story = {
	args: {
		children: 'Badge',
		sx: undefined,
	},
};

export const Variants: Story = {
	args: {},
	render: args => (
		<>
			<Badge { ...args } variant="blue" sx={ { m: 2 } }>
				Blue
			</Badge>
			<Badge { ...args } variant="gold" sx={ { m: 2 } }>
				Gold
			</Badge>
			<Badge { ...args } variant="gray" sx={ { m: 2 } }>
				Gray
			</Badge>
			<Badge { ...args } variant="green" sx={ { m: 2 } }>
				Green
			</Badge>
			<Badge { ...args } variant="orange" sx={ { m: 2 } }>
				Orange
			</Badge>
			<Badge { ...args } variant="red" sx={ { m: 2 } }>
				Red
			</Badge>
			<Badge { ...args } variant="salmon" sx={ { m: 2 } }>
				Salmon
			</Badge>
			<Badge { ...args } variant="yellow" sx={ { m: 2 } }>
				Yellow
			</Badge>
		</>
	),
};

export const WithLink: Story = {
	args: {},
	render: args => (
		<Badge { ...args }>
			<Link href="https://google.com">Google</Link>
		</Badge>
	),
};
