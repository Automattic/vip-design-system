import { ThemeUIStyleObject } from 'theme-ui';

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
	color: 'texts.secondary', // #514e4d
	paddingLeft: 5,
	paddingRight: 4, // 16px right padding - space[4]
	paddingTop: 1, // 4px vertical padding - space[1]
	paddingBottom: 1, // 4px vertical padding - space[1]
	fontSize: 2, // 14px main text - fontSizes[2]
	fontFamily: 'body',
	fontWeight: 'regular',
	lineHeight: 5,
	gap: '6px', // 6px gap between elements (no design token available)
	'&:hover, &:focus': {
		backgroundColor: 'input.hover', // #f4f3f2
		textDecoration: 'none',
	},
	'&[data-disabled]': {
		color: 'texts.disabled', // #9b9796 - matches texts pattern
		pointerEvents: 'none',
	},
	'&[data-highlighted]': {
		backgroundColor: 'input.hover',
	},
}; 