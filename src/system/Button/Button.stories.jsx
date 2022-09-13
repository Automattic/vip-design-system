/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import { Button } from '..';

export default {
	title: 'Button',
	component: Button,
};

export const Default = () => (
	<React.Fragment>
		<Button sx={ { mr: 2 } }>Primary</Button>
		<Button variant="secondary" sx={ { ml: 2 } }>
			Secondary
		</Button>
		<Button variant="text" sx={ { ml: 2 } } as="a" href="https://google/com">
			Button link
		</Button>
	</React.Fragment>
);
