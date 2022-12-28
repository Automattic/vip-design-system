/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import { Time, Grid, Box } from '..';

export default {
	title: 'Deprecated/Time',
	component: Time,
};

export const Default = () => (
	<React.Fragment>
		<Grid gap={ 2 } columns={ [ 2, '100px 300px' ] } sx={ { mb: '20px' } }>
			<Time time="7pm" />
			<Box>It looks like everything is recovered now. You can forget about the last event.</Box>
		</Grid>

		<Grid gap={ 2 } columns={ [ 2, '100px 200px' ] }>
			<Time time="6pm" />
			<Box>At this particular moment in the day, something happened with your environment.</Box>
		</Grid>
	</React.Fragment>
);
