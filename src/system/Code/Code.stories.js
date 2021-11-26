/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import { Code } from '..';

export default {
	title: 'Code',
	component: Code,
};

export const Default = () => (
	<React.Fragment>
		<Code>Code</Code>
		<Code showCopy={true}>Code with Icon</Code>
		<Code showCopy={true} onCopy={ () => console.info( 'Hello world' ) }>Code with Icon and Click callback — console.info</Code>
	</React.Fragment>
);
