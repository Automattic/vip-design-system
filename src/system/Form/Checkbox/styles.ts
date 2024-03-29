import { ThemeUIStyleObject } from 'theme-ui';

import {
	baseControlBorderStyle,
	baseControlFocusStyle,
	inputBaseBackground,
	inputBaseText,
} from '../Input.styles';

// The output willl be 16px because of the 1px border.
const CHECKBOX_SIZE = 14;

export const checkboxStyle = ( variant: string ): ThemeUIStyleObject => {
	const variantColor = variant === 'disabled' ? 'input.background.disabled' : variant;

	return {
		all: 'unset',
		position: 'relative',
		backgroundColor: inputBaseBackground,
		...baseControlBorderStyle,
		...baseControlFocusStyle,
		width: CHECKBOX_SIZE,
		height: CHECKBOX_SIZE,
		borderRadius: 0,
		display: 'flex',
		justifyContent: 'center',
		'&[aria-disabled="true"]': {
			opacity: 0.7,
			cursor: 'not-allowed',
			pointerEvents: 'none',
		},
		'&[data-state=checked], &[data-state=indeterminate]': {
			backgroundColor: variantColor,
			color: variantColor,
			borderColor: variantColor,
		},
		'& ~ label': {
			fontWeight: 'regular',
			color: inputBaseText,
			m: 0,
			ml: 2,
		},
		svg: {
			position: 'absolute',
			fill: 'currentColor',
			top: 0,
			left: 0,
		},
	};
};

export const checkboxIndicatorStyle = ( variant: string ): ThemeUIStyleObject => {
	const backgroundColor = variant === 'disabled' ? 'icon.inverse-disabled' : 'icon.inverse';

	return {
		width: 14,
		height: 14,
		backgroundColor,
		maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='1 1 14 14' fill='none'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M13.9259 4.9995L6.15142 12.4008L2.92603 9.33023L4.2591 7.92994L6.15142 9.73143L12.5928 3.59921L13.9259 4.9995Z' fill='currentcolor'/%3E%3C/svg%3E")`,

		'&[data-state=indeterminate]': {
			maskImage: 'none',
			backgroundColor,
			position: 'absolute',
			top: '50%',
			width: 8,
			height: 2,
			marginTop: '-1px',
		},
	};
};
