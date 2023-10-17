export const baseControlBorderStyle = {
	borderWidth: '1px',
	borderStyle: 'solid',
	borderColor: 'input.border.default',
};

export const inputBaseText = 'input.text.default';
export const inputBaseBackground = 'input.background.default';
export const baseControlFocusStyle = {
	'&:focus': theme => theme.outline,
	'&:focus-visible': theme => theme.outline,
	'&:focus-within': theme => theme.outline,
};

export const baseControlStyle = {
	...baseControlBorderStyle,
	backgroundColor: inputBaseBackground,
	color: inputBaseText,
	borderRadius: 1,
	display: 'block',
	width: '100%',

	...baseControlFocusStyle,
	'&:disabled': {
		borderColor: 'input.border.disabled',
	},

	'&::placeholder': {
		color: 'input.text.placeholder',
		opacity: 1,
	},
};
