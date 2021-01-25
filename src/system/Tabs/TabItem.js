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

const TabItem = ( { active = false, ...props } ) => (
	<Link
		variant="h4"
		as="button"
		tabIndex="0"
		sx={ {
			cursor: 'pointer',
			background: 'none',
			color: active ? 'heading' : 'muted',
			mr: 3,
			fontSize: 2,
			px: 0,
			pb: 3,
			fontWeight: 'body',
			borderTop: 'none',
			borderLeft: 'none',
			borderRight: 'none',
			borderBottom: '2px solid',
			borderColor: active ? 'link' : 'transparent',
			transform: 'translateY(2px)',
			'&:visited': {
				color: active ? 'heading' : 'muted',
			},
			'&.active': {
				color: 'heading',
				borderColor: 'link',
			},
		} }
		{ ...props }
	/>
);

TabItem.propTypes = {
	active: PropTypes.bool,
	variant: PropTypes.string,
};

export { TabItem };
