/**
 * External dependencies
 */
import React from 'react';
import type { StoryObj } from '@storybook/react';

/**
 * Internal dependencies
 */
import { Code } from '..';

export default {
	title: 'Code',
	component: Code,
};

type Story = StoryObj< typeof Code >;

export const DefaultWithTime: Story = {
	render: () => (
		<Code
			children={
				<>
					<time sx={ { color: 'logs.text.secondary' } } dateTime="2022-01-01 15:15:15">
						15:16
					</time>{ ' ' }
					Code
				</>
			}
		/>
	),
};

export const DefaultWithIcon: Story = {
	render: () => <Code showCopy={ true }>Code with Icon</Code>,
};

export const DefaultWithConsoleInfo: Story = {
	render: () => (
		// eslint-disable-next-line no-console
		<Code showCopy={ true } onCopy={ () => console.info( 'Hello world' ) }>
			Code with Icon and Click callback — console.info
		</Code>
	),
};
