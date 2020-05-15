/** @jsx jsx */
/**
 * External dependencies
 */
import { jsx } from 'theme-ui';

const Badge = props => (
	<div
		sx={{
			fontSize: 0,
			padding: 0,
			bg: 'brand.90',
			color: 'brand.10',
			py: 1,
			verticalAlign: 'middle',
			px: 2,
			display: 'inline-block',
			borderRadius: 1,
			fontWeight: 'heading',
		}}
		{...props}
	/>
);

export { Badge };
