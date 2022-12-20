/**
 * External dependencies
 */

/**
 * Internal dependencies
 */
import { baseControlBorderStyle as borderStyle } from '../Form/Input';
import { getColor } from '../theme/getColor';

export const inlineStyles = {
	display: 'grid',
	gridTemplateColumns: 'auto 1fr',
	position: 'relative',
	alignItems: 'center',
	backgroundColor: getColor( 'input', 'background' ),
	borderColor: borderStyle.borderColor,
	borderRadius: 1,
	borderWidth: borderStyle.borderWidth,
	borderStyle: borderStyle.borderStyle,
	paddingRight: 0,
	paddingLeft: 3,

	label: {
		margin: 0,
		paddingRight: 2,
		borderRightWidth: borderStyle.borderWidth,
		borderRightStyle: borderStyle.borderStyle,
		borderRightColor: borderStyle.borderColor,
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
