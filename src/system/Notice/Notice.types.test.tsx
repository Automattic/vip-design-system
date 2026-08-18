/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import { Notice } from './Notice';

/**
 * Wrappers commonly re-expose the whole prop surface and spread it through, so
 * the props have to stay forwardable as one object. Splitting them into a union
 * of collapsible-or-dismissible reads well but breaks exactly this pattern.
 */
type WrapperProps = Omit< React.ComponentProps< typeof Notice >, 'title' | 'children' >;

const Wrapper = ( { ...noticeProps }: WrapperProps ) => (
	<Notice variant="warning" title="Wrapped" { ...noticeProps }>
		Content
	</Notice>
);

describe( '<Notice /> types', () => {
	it( 'stays forwardable through a wrapper that spreads its props', () => {
		const examples = {
			dismissible: <Wrapper dismissible onDismiss={ () => undefined } />,
			collapsible: <Wrapper collapsible defaultOpen />,
			// A wrapper only knows these at runtime, so they have to type-check as booleans.
			dynamic: <Wrapper collapsible={ Boolean( 1 ) } />,
		};

		expect( Object.keys( examples ) ).toHaveLength( 3 );
	} );
} );
