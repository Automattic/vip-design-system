/**
 * Internal dependencies
 */
import React, { useEffect } from 'react';

import { Progress } from '..';

import type { StoryObj } from '@storybook/react-vite';

export default {
	title: 'Progress',
	component: Progress,
};

type Story = StoryObj< typeof Progress >;

export const Default: Story = {
	args: {
		forLabel: 'Update site progress',
		steps: [ 'Downloading Data', 'Importing Data...', 'Finalizing', 'Done' ],
		activeStep: 0,
	},
	render: args => {
		const [ counter, setCounter ] = React.useState( args.activeStep );
		const steps = args.steps;

		useEffect( () => {
			setTimeout( () => {
				if ( counter < steps.length - 1 ) {
					setCounter( counter + 1 );
				}
			}, 2000 );
		}, [ counter, setCounter ] );

		return <Progress { ...args } activeStep={ counter } />;
	},
};
