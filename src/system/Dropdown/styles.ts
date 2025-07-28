import { Theme, ThemeUIStyleObject } from 'theme-ui';

// Temporary interface until we add types to the theme definition.
interface DropdownTheme extends Theme {
	outline?: Record< string, string >;
}

/**
 * Base styles for dropdown items
 * Based on Figma design specifications
 * Shared across DropdownItem, DropdownCheckboxItem, and DropdownRadioItem
 */
export const dropdownItemStyles: ThemeUIStyleObject = {
	unset: 'all',
	cursor: 'pointer',
	display: 'flex',
	alignItems: 'center',
	flexDirection: 'row',
	textAlign: 'left',
	height: '32px',
	textDecoration: 'none',
	position: 'relative',
	m: 0,
	color: 'texts.secondary',
	paddingLeft: 5,
	paddingRight: 4,
	paddingTop: 1,
	paddingBottom: 1,
	fontSize: 2,
	fontFamily: 'body',
	fontWeight: 'regular',
	lineHeight: 5,
	gap: '6px',
	'&:hover': {
		backgroundColor: 'input.radio-box.background.hover',
		textDecoration: 'none',
	},
	'&:focus-visible:not(:hover), &:focus:not(:hover)': ( theme: DropdownTheme ) => theme.outline,
	'&[data-disabled]': {
		color: 'texts.disabled', // #9b9796 - matches texts pattern
		pointerEvents: 'none',
	},
};
