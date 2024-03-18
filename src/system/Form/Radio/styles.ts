import { ThemeUIStyleObject } from 'theme-ui';

import { baseControlBorderStyle, inputBaseText } from '../Input.styles';

// The output willl be 18px because of the 1px border.
const RADIO_SIZE = 16;

export const inputStyle = ( variant: string ): ThemeUIStyleObject => ( {
	position: 'absolute',
	top: 0,
	left: 0,
	clip: 'rect(1px, 1px, 1px, 1px)',
	clipPath: 'inset(50%)',
	width: RADIO_SIZE,
	height: RADIO_SIZE,
	'&:focus ~ label:before': {
		variant: 'outline',
		content: '""',
		border: '1px solid',
		borderColor: baseControlBorderStyle.borderColor,
		left: 0,
	},
	'&:checked ~ label::after': {
		borderColor: variant,
		opacity: 1,
	},
	'&[aria-disabled="true"] ~ label::before': {
		backgroundColor: variant,
		borderColor: variant,
	},
} );

export const labelStyle = ( variant: string ): ThemeUIStyleObject => ( {
	display: 'flex',
	cursor: 'pointer',
	position: 'relative',
	marginBottom: 0,
	userSelect: 'none',
	color: inputBaseText,
	fontWeight: 'regular',
	lineHeight: 'normal',
	'&:before, &:after': {
		borderRadius: '100%',
		transition: 'all .3s ease-out',
		width: RADIO_SIZE,
		height: RADIO_SIZE,
	},
	'&::before': {
		content: '""',
		border: '1px solid',
		borderColor: baseControlBorderStyle.borderColor,
		marginRight: 2,
	},
	'&::after': {
		position: 'absolute',
		top: 0,
		left: 0,
		content: '""',
		backgroundColor: variant,
		backgroundSize: '100%',
		backgroundRepeat: 'no-repeat',
		backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='3' cy='3' r='1.25' fill='%23fff'/%3E%3C/svg%3E")`,
		border: '1px solid',
		color: 'white',
		opacity: 0,
	},
} );

export const itemStyle: ThemeUIStyleObject = {
	display: 'flex',
	alignItems: 'center',
	my: 2,
	position: 'relative',
};
