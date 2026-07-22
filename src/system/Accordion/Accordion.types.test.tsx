/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import * as Accordion from './Accordion';

describe( '<Accordion.Root /> types', () => {
	it( 'type-checks Radix root props forwarded by VDS', () => {
		const ref = React.createRef< HTMLDivElement >();

		const examples = {
			root: (
				<Accordion.Root aria-label="Example accordion" defaultValue="one" disabled ref={ ref }>
					<Accordion.Item value="one">
						<Accordion.Trigger>One</Accordion.Trigger>
						<Accordion.Content>Content one</Accordion.Content>
					</Accordion.Item>
				</Accordion.Root>
			),
		};

		expect( Object.keys( examples ) ).toHaveLength( 1 );
	} );
} );
