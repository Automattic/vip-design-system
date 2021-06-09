/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import { Timeline, Grid, Box } from '..';

export default {
	title: 'Timeline',
	component: Timeline,
};

export const Default = () => (
	<React.Fragment>
		<Grid gap={ 2 } columns={ [ 2, '100px 300px' ] } sx={ { mb: "20px" } }>
			<Timeline time="7pm" />
			<Box>
				It looks like everything is recovered now. You can forget about the last event.
			</Box>
		</Grid>

		<Grid gap={ 2 } columns={ [ 2, '100px 200px' ] }>
			<Timeline time="6pm" />
			<Box>
				At this particular moment in the day, something happened with your environment.
			</Box>
		</Grid>
	</React.Fragment>
);
