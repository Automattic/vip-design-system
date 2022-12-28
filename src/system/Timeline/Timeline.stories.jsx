/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import { Timeline } from '..';
import { Link } from '../Link';

export default {
	title: 'Deprecated/Timeline',
	component: Timeline,
};

export const Default = () => {
	return (
		<React.Fragment>
			<Timeline time="13:00" title="21:00 UTC" />
			<Timeline time={ <Link>14:00</Link> } title="22:00 UTC" />
			<Timeline time="15:00" title="23:00 UTC" />
		</React.Fragment>
	);
};
