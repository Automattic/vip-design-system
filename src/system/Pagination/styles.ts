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
	justifySelf: 'flex-end',
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
	fontSize: 2,
	fontFamily: 'body',
	px: 2,
	'&:hover': {
		bg: 'button.tertiary.background.hover',
	},
	'&:focus-visible': {
		outline: '2px solid',
		outlineColor: 'primary',
		outlineOffset: '-2px',
	},
};

export const activePageButtonStyles: ThemeUIStyleObject = {
	...pageButtonStyles,
	borderBottom: '3px solid',
	borderColor: 'button.display.background.default',
	borderRadius: 0,
	fontWeight: 'bold',
	'&:hover': {
		bg: 'button.tertiary.background.hover',
	},
};

export const arrowButtonStyles: ThemeUIStyleObject = {
	...pageButtonStyles,
	'&:disabled, &[aria-disabled="true"]': {
		bg: 'button.tertiary.background.disabled',
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
	fontSize: 2,
};

export const compactTextStyles: ThemeUIStyleObject = {
	display: 'inline-flex',
	alignItems: 'center',
	gap: 1,
	fontSize: 2,
	color: 'heading',
	whiteSpace: 'nowrap',
};

export const compactTriggerStyles: ThemeUIStyleObject = {
	display: 'inline-flex',
	alignItems: 'center',
	gap: 1,
	border: '1px solid',
	borderColor: 'button.tertiary.border.default',
	bg: 'transparent',
	color: 'heading',
	cursor: 'pointer',
	fontSize: 2,
	fontFamily: 'body',
	fontWeight: 'bold',
	px: 2,
	borderRadius: 1,
	'&:hover': {
		bg: 'button.tertiary.background.hover',
		borderColor: 'button.tertiary.background.hover',
	},
	'&:focus-visible': {
		outline: '2px solid',
		outlineColor: 'primary',
		outlineOffset: '-2px',
	},
};
