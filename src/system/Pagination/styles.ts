import { ThemeUIStyleObject } from 'theme-ui';

export const containerStyles: ThemeUIStyleObject = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	gap: 3,
};

export const navigationStyles: ThemeUIStyleObject = {
	display: 'flex',
	alignItems: 'center',
	gap: 1,
};

export const pageButtonStyles: ThemeUIStyleObject = {
	minWidth: '32px',
	height: '32px',
	display: 'inline-flex',
	alignItems: 'center',
	justifyContent: 'center',
	borderRadius: 1,
	border: 'none',
	bg: 'transparent',
	color: 'heading',
	cursor: 'pointer',
	fontSize: 1,
	fontFamily: 'body',
	px: 2,
	'&:hover': {
		bg: 'hover',
	},
	'&:focus-visible': {
		outline: '2px solid',
		outlineColor: 'primary',
		outlineOffset: '-2px',
	},
};

export const activePageButtonStyles: ThemeUIStyleObject = {
	...pageButtonStyles,
	bg: 'primary',
	color: 'white',
	fontWeight: 'bold',
	'&:hover': {
		bg: 'primary',
	},
};

export const arrowButtonStyles: ThemeUIStyleObject = {
	...pageButtonStyles,
	'&:disabled, &[aria-disabled="true"]': {
		cursor: 'not-allowed',
		opacity: 0.4,
		pointerEvents: 'none',
	},
};

export const ellipsisStyles: ThemeUIStyleObject = {
	minWidth: '32px',
	height: '32px',
	display: 'inline-flex',
	alignItems: 'center',
	justifyContent: 'center',
	color: 'muted',
	fontSize: 1,
};

export const compactTextStyles: ThemeUIStyleObject = {
	display: 'inline-flex',
	alignItems: 'center',
	gap: 1,
	fontSize: 1,
	color: 'heading',
	whiteSpace: 'nowrap',
};

export const compactTriggerStyles: ThemeUIStyleObject = {
	display: 'inline-flex',
	alignItems: 'center',
	gap: 1,
	border: 'none',
	bg: 'transparent',
	color: 'heading',
	cursor: 'pointer',
	fontSize: 1,
	fontFamily: 'body',
	fontWeight: 'bold',
	px: 1,
	borderRadius: 1,
	'&:hover': {
		bg: 'hover',
	},
	'&:focus-visible': {
		outline: '2px solid',
		outlineColor: 'primary',
		outlineOffset: '-2px',
	},
};
