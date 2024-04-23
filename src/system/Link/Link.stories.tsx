/**
 * External dependencies
 */
import { Link } from '..';
import { Flex } from '../Flex/Flex';

import type { LinkProps } from './Link';
import type { StoryObj } from '@storybook/react';

/**
 * Internal dependencies
 */

export default {
	title: 'Navigation/Link',
	component: Link,
};

type Story = StoryObj< typeof Link >;

export const Default: Story = {
	args: {
		children: 'Hello',
		href: '#!',
	},
};

const buttonTypes: LinkProps[ 'variant' ][] = [
	'button-primary',
	'button-secondary',
	'button-tertiary',
	'button-danger',
	'button-display',
	'button-ghost',
];

export const ButtonVariants = () => (
	<Flex sx={ { gap: 2 } }>
		{ buttonTypes.map( ( variant, index ) => (
			<Link key={ index } href="#!" variant={ variant }>
				Hello
			</Link>
		) ) }
	</Flex>
);
