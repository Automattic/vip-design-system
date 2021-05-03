/** @jsx jsx */
/**
 * External dependencies
 */
import { jsx } from 'theme-ui';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const UsageChart = ( { total, max, variant = 'primary' } ) => {
	const width = ( total / max ) * 100 + '%';

	return (
		<div
			sx={ {
				height: variant === 'primary' ? 32 : 8,
				overflow: 'hidden',
				backgroundColor: variant === 'primary' ? 'border' : 'transparent',
			} }
		>
			<motion.div
				initial={ { width: 0 } }
				animate={ { width } }
				transition={ { duration: 0.7 } }
				sx={ {
					height: '100%',
					backgroundColor: variant === 'primary' ? 'primary' : 'grey.40',
				} }
			>
			</motion.div>
		</div>
	);
};

UsageChart.propTypes = {
	total: PropTypes.number,
	max: PropTypes.number,
	variant: PropTypes.string,
};

export { UsageChart };
