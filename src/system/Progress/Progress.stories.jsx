/**
 * Internal dependencies
 */
import React, { useEffect } from 'react';
import { Progress } from '..';

export default {
	title: 'Progress',
	component: Progress,
};

const max = 3;
export const Default = () => {
	const [ counter, setCounter ] = React.useState( 0 );

	useEffect( () => {
		setTimeout( () => {
			if ( counter < max ) {
				setCounter( counter + 1 );
			}
		}, 1000 );
	}, [ counter, setCounter ] );

	return (
		<Progress
			forLabel="Update site progress"
			value={ counter }
			steps={ [ 'Downloading Data', 'Importing Data...', 'Finalizing', 'Done' ] }
			activeStep={ counter }
		/>
	);
};
