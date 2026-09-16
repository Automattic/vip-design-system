/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import * as Accordion from './Accordion';

describe( '<Accordion.Root /> types', () => {
	it( 'type-checks forwarded VDS and Radix props', () => {
		const ref = React.createRef< HTMLDivElement >();
		const triggerRef = React.createRef< HTMLButtonElement >();

		const examples = {
			root: (
				<Accordion.Root aria-label="Example accordion" defaultValue="one" disabled ref={ ref }>
					<Accordion.Item
						id="accordion-item-one"
						className={ [ 'accordion-item', { 'is-open': true } ] }
						sx={ { borderColor: 'borders.2' } }
						value="one"
					>
						<Accordion.Trigger id="accordion-trigger-one" ref={ triggerRef }>
							One
						</Accordion.Trigger>
						<Accordion.Content id="accordion-content-one" aria-labelledby="accordion-trigger-one">
							Content one
						</Accordion.Content>
					</Accordion.Item>
					<Accordion.Item value="two">
						<Accordion.TriggerWithIcon
							disabled
							headingVariant="h4"
							icon={ <span aria-hidden>Icon</span> }
							sx={ { color: 'texts.primary' } }
						>
							Two
						</Accordion.TriggerWithIcon>
						<Accordion.Content>Content two</Accordion.Content>
					</Accordion.Item>
				</Accordion.Root>
			),
		};

		expect( Object.keys( examples ) ).toHaveLength( 1 );
	} );
} );
