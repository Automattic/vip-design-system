/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */

/**
 * Internal dependencies
 */
import { baseControlBorderStyle } from '../Form/Input';
import { getColor } from '../theme/getColor';

export const inlineStyles = {
	display: 'grid',
	gridTemplateColumns: 'auto 1fr',
	position: 'relative',
	alignItems: 'center',
	backgroundColor: getColor( 'input', 'background' ),
	borderRadius: 1,
	...baseControlBorderStyle,
	paddingRight: 0,
	paddingLeft: 3,

	label: {
		margin: 0,
		paddingRight: 2,
		borderRightWidth: baseControlBorderStyle.borderWidth,
		borderRightStyle: baseControlBorderStyle.borderStyle,
		borderRightColor: baseControlBorderStyle.borderColor,
	},

	select: {
		width: '100%',
		border: 'none',
		margin: 0,
		paddingLeft: 2,
	},

	svg: {
		right: 2,
		position: 'absolute',
	},
};
