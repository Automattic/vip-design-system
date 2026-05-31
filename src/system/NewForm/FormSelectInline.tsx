/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */

/**
 * Internal dependencies
 */
import { ThemeUIStyleObject } from 'theme-ui';

import { baseControlBorderStyle } from '../Form/Input.styles';

export const inlineStyles: ThemeUIStyleObject = {
	display: 'flex',
	flexDirection: 'row',
	position: 'relative',
	alignItems: 'center',
	backgroundColor: 'input.background.default',
	borderRadius: 1,
	...baseControlBorderStyle,
	paddingRight: 0,
	paddingLeft: 4, // 16px

	'& label': {
		margin: 0,
		paddingRight: 2, // 8px
		borderRightWidth: baseControlBorderStyle.borderWidth,
		borderRightStyle: baseControlBorderStyle.borderStyle,
		borderRightColor: baseControlBorderStyle.borderColor,
		flexShrink: 0,
	},

	select: {
		width: '100%',
		border: 'none',
		margin: 0,
		paddingLeft: 3, // 12px
		flex: 1,
	},

	svg: {
		right: 2,
		position: 'absolute',
	},
};
