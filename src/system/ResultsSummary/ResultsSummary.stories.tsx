/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import { useState } from 'react';

/**
 * Internal dependencies
 */
import { ResultsSummary } from './ResultsSummary';
import { Button } from '../Button';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta< typeof ResultsSummary > = {
	title: 'Data display/ResultsSummary',
	component: ResultsSummary,
	parameters: {
		docs: {
			description: {
				component: `
Displays a compact result-set summary with consistent typography and a list icon. Changes are
announced as a polite status update.

Pass complete, localized copy as children. Consumers own range calculations, entity names,
pluralization, and translations. Keep the component mounted while loading and update its children
when results arrive so assistive technology can announce the change reliably.
				`,
			},
		},
	},
};

export default meta;

type Story = StoryObj< typeof ResultsSummary >;

export const Default: Story = {
	args: {
		children: 'Showing 1–10 of 37 sandboxes',
	},
};

export const SingleResult: Story = {
	args: {
		children: '1 sandbox found',
	},
};

const LoadingToResultsExample = () => {
	const [ loading, setLoading ] = useState( true );

	return (
		<>
			<ResultsSummary>
				{ loading ? 'Loading results…' : 'Showing 1–10 of 37 sandboxes' }
			</ResultsSummary>
			<Button onClick={ () => setLoading( current => ! current ) } sx={ { mt: 3 } } type="button">
				{ loading ? 'Show results' : 'Reset loading state' }
			</Button>
		</>
	);
};

export const LoadingToResults: Story = {
	render: () => <LoadingToResultsExample />,
	parameters: {
		docs: {
			description: {
				story:
					'The same live-region element remains mounted while its content changes, allowing assistive technology to announce the result.',
			},
		},
	},
};
