/**
 * External dependencies
 */
import type { StoryObj } from '@storybook/react';

/**
 * Internal dependencies
 */
import { Badge, Link } from '..';

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

export const Variants = () => (
	<>
		<Badge variant="blue" sx={ { m: 2 } }>
			Blue
		</Badge>
		<Badge variant="gold" sx={ { m: 2 } }>
			Gold
		</Badge>
		<Badge variant="gray" sx={ { m: 2 } }>
			Gray
		</Badge>
		<Badge variant="green" sx={ { m: 2 } }>
			Green
		</Badge>
		<Badge variant="orange" sx={ { m: 2 } }>
			Orange
		</Badge>
		<Badge variant="red" sx={ { m: 2 } }>
			Red
		</Badge>
		<Badge variant="salmon" sx={ { m: 2 } }>
			Salmon
		</Badge>
		<Badge variant="yellow" sx={ { m: 2 } }>
			Yellow
		</Badge>
	</>
);

export const WithLink: Story = {
	args: {},
	render: args => <Badge children={ <Link href="https://google.com">Google</Link> } { ...args } />,
};
