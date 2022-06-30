/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import { Text } from 'theme-ui';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const formatter = new Intl.RelativeTimeFormat( undefined, {
	numeric: 'auto',
} );

const DIVISIONS = [
	{ amount: 60, name: 'seconds' },
	{ amount: 60, name: 'minutes' },
	{ amount: 24, name: 'hours' },
	{ amount: 7, name: 'days' },
	{ amount: 12, name: 'months' },
	{ amount: Number.POSITIVE_INFINITY, name: 'years' },
];

function formatTimeAgo( date ) {
	let duration = ( date - new Date() ) / 1000;

	for ( let i = 0; i <= DIVISIONS.length; i++ ) {
		const division = DIVISIONS[ i ];
		if ( Math.abs( duration ) < division.amount ) {
			return formatter.format( Math.round( duration ), division.name );
		}
		duration /= division.amount;
	}
}

const Time = ( { time, relativeTime = false, timeOnly = false, className = null, ...props } ) => {
	let formattedTime;
	if ( relativeTime ) {
		formattedTime = formatTimeAgo( time );
	} else if ( timeOnly ) {
		formattedTime = time.toLocaleTimeString();
	} else {
		formattedTime = time.toLocaleString();
	}

	return (
		<Text
			title={ time.toLocaleString( 'sv', { timeZoneName: 'short' } ) }
			datetime={ time }
			as="time"
			className={ classNames( 'vip-time-component', className ) }
			{ ...props }
		>
			{ formattedTime }
		</Text>
	);
};

Time.propTypes = {
	time: PropTypes.oneOfType( [ PropTypes.string, PropTypes.date ] ),
	timeOnly: PropTypes.bool,
	relativeTime: PropTypes.bool,
	className: PropTypes.any,
};

export { Time };
