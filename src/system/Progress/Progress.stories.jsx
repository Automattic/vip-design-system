/**
 * Internal dependencies
 */
import React, { useEffect } from 'react';
import { Progress } from '..';

export default {
	title: 'Progress',
	component: Progress,
};

export const Default = () => {
	const [ counter, setCounter ] = React.useState( 0 );
	const steps = [ 'Downloading Data', 'Importing Data...', 'Finalizing', 'Done' ];

	useEffect( () => {
		setTimeout( () => {
			if ( counter < steps.length - 1 ) {
				setCounter( counter + 1 );
			}
		}, 1000 );
	}, [ counter, setCounter ] );

	return <Progress forLabel="Update site progress" steps={ steps } activeStep={ counter } />;
};
