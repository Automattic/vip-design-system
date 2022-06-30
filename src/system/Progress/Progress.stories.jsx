/**
 * Internal dependencies
 */
import { Progress } from '..';

export default {
	title: 'Progress',
	component: Progress,
};

export const Default = () => (
	<Progress
		max={ 1 }
		value={ 1 / 2 }
		steps={ [ 'Downloading Data', 'Importing Data...', 'Finalizing' ] }
		activeStep={ 1 }
	/>
);
