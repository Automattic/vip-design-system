/** @jsx jsx */
/**
 * External dependencies
 */
import { jsx, Progress as ThemeProgress } from 'theme-ui';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const UsageChart = ( { total, max, variant = 'primary', ...props } ) => {
	const width = ( total / max ) * 100 + '%';
	let formattedTotal = total;

	if ( total > 1000000 ) {
		formattedTotal = `${ ( total / 1000000 ).toFixed( 2 ) }M`;
	} else if ( total > 1000 ) {
		formattedTotal = `${ ( total / 1000 ).toFixed( 2 ) }K`;
	}

	return (
		<div
			sx={{
				height: variant === 'primary' ? 32 : 8,
				overflow: 'hidden',
				backgroundColor: variant === 'primary' ? 'border' : 'transparent',
			}}
		>
			<motion.div
				initial={{ width: 0 }}
				animate={{ width }}
				transition={{ duration: 0.7 }}
				sx={{
					height: '100%',
					backgroundColor: variant === 'primary' ? 'primary' : 'grey.80',
				}}
			></motion.div>
		</div>
	);
};

UsageChart.propTypes = {
	total: PropTypes.number,
	max: PropTypes.number,
	variant: PropTypes.string,
};

export { UsageChart };
