import { ThemeUIStyleObject } from 'theme-ui';

import {
	baseControlBorderStyle,
	baseControlFocusStyle,
	inputBaseBackground,
} from '../Input.styles';

// The output willl be 16px because of the 1px border.
const CHECKBOX_SIZE = 14;

export const checkboxStyle = ( variant: string ): ThemeUIStyleObject => ( {
	all: 'unset',
	position: 'relative',
	backgroundColor: inputBaseBackground,
	...baseControlBorderStyle,
	...baseControlFocusStyle,
	width: CHECKBOX_SIZE,
	height: CHECKBOX_SIZE,
	borderRadius: 1,
	display: 'flex',
	justifyContent: 'center',
	'&[data-state=checked]': {
		backgroundColor: variant,
		color: variant,
		borderColor: variant,
	},
	svg: {
		position: 'absolute',
		top: 0,
		left: 0,
	},
} );

export const checkboxIndicatorStyle: ThemeUIStyleObject = {
	width: 14,
	height: 14,
	backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='1 1 14 14' fill='none'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M13.9259 4.9995L6.15142 12.4008L2.92603 9.33023L4.2591 7.92994L6.15142 9.73143L12.5928 3.59921L13.9259 4.9995Z' fill='white'/%3E%3C/svg%3E")`,
};
