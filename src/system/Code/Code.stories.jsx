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
		<Code>
			<time sx={ { color: 'logs.text.secondary' } } dateTime="2022-01-01 15:15:15">
				15:16
			</time>{ ' ' }
			Code
		</Code>
		<br />
		<Code showCopy={ true }>Code with Icon</Code>
		<br />
		<Code
			showCopy={ true }
			onCopy={
				// eslint-disable-next-line no-console
				() => console.info( 'Hello world' )
			}
		>
			Code with Icon and Click callback — console.info
		</Code>
	</React.Fragment>
);
