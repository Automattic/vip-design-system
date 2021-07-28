/**
 * External dependencies
 */
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { Card } from '../';

const Notice = ({ variant = 'info', sx, ...props }) => (
	<Card
		sx={{
			borderLeft: '3px solid',
			boxShadow: 'none',
			backgroundColor: 'hover',
			borderTopLeftRadius: 0,
			borderBottomLeftRadius: 0,
			pl: 19,
			variant: `notice.${variant}`,
			...sx,
		}}
		{...props}
	/>
);

Notice.propTypes = {
	variant: PropTypes.string,
	sx: PropTypes.object,
};

export { Notice };
