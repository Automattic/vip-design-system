/** @jsx jsx */
/**
 * External dependencies
 */
import { jsx } from 'theme-ui';

const DialogMenu = props => (
	<ul
		role="menu"
		sx={{ listStyleType: 'none', m: 0, px: 0, py: 1 }}
		{...props}
	/>
);

export { DialogMenu };
