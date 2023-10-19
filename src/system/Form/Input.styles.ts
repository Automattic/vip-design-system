import { Theme } from 'theme-ui';

export const baseControlBorderStyle = {
	borderWidth: '1px',
	borderStyle: 'solid',
	borderColor: 'input.border.default',
};
// Temporary interface until we add types to the theme definition.
interface InputTheme extends Theme {
	outline?: Record< string, string >;
}

export const inputBaseText = 'input.text.default';
export const inputBaseBackground = 'input.background.default';
export const baseControlFocusStyle = {
	'&:focus': ( theme: InputTheme ) => theme.outline,
	'&:focus-visible': ( theme: InputTheme ) => theme.outline,
	'&:focus-within': ( theme: InputTheme ) => theme.outline,
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
