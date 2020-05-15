/** @jsx jsx */
/**
 * External dependencies
 */
import { jsx } from 'theme-ui';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { Link } from '..';

const TabItem = ( { active = false, variant = 'inline', ...props } ) => (
	<Link
		variant="h4"
		as="a"
		tabIndex="0"
		sx={{
			cursor: 'pointer',
			color: active ? 'heading' : 'muted',
			mr: 3,
			fontSize: 2,
			pb: 3,
			fontWeight: 'heading',
			borderBottom: active ? '2px solid' : 'none',
			borderColor: active ? 'link' : 'none',
			transform: 'translateY(2px)',
		}}
		{...props}
	/>
);

TabItem.propTypes = {
	active: PropTypes.bool,
	variant: PropTypes.string,
};

export { TabItem };
