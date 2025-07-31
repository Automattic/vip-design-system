import { Theme, ThemeUIStyleObject } from 'theme-ui';

import { iconSize } from './icons';

// Temporary interface until we add types to the theme definition.
interface DropdownTheme extends Theme {
	outline?: Record< string, string >;
}

/**
 * Styles for the dropdown container
 *
 */
export const dropdownContentStyles: ThemeUIStyleObject = {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'stretch',
	justifyContent: 'flex-start',
	borderRadius: 1,
	backgroundColor: 'layer.2',
	boxShadow: 'high',
	gap: 2,
	p: 2,
};

/**
 * Styles for dropdown group container
 *
 */
export const dropdownGroupStyles: ThemeUIStyleObject = {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'stretch',
	justifyContent: 'flex-start',
	gap: 1,
	p: 0,
	m: 0,
};

/**
 * Base styles for dropdown items
 * Shared across DropdownItem, DropdownCheckboxItem, and DropdownRadioItem
 */
export const dropdownItemStyles: ThemeUIStyleObject = {
	alignItems: 'center',
	color: 'texts.secondary',
	cursor: 'pointer',
	display: 'flex',
	flexDirection: 'row',
	flexWrap: 'nowrap',
	fontFamily: 'body',
	fontSize: 2,
	fontWeight: 'regular',
	gap: '6px',
	justifyContent: 'flex-start',
	lineHeight: 5,
	m: 0,
	minHeight: '32px',
	outline: 'none',
	paddingBottom: 1,
	paddingLeft: 5,
	paddingRight: 4,
	paddingTop: 1,
	position: 'relative',
	textAlign: 'left',
	textDecoration: 'none',
	unset: 'all',
	'&:hover': {
		backgroundColor: 'input.radio-box.background.hover',
	},
	'&:focus-visible:not(:hover, [data-state="open"])': ( theme: DropdownTheme ) => theme.outline,
	'&[data-disabled]': {
		color: 'texts.disabled',
		pointerEvents: 'none',
	},
	'&[data-state="open"]': {
		background: 'input.radio-box.background.hover',
	},
};

/**
 * Styles for dropdown separators
 *
 */
export const dropdownSeparatorStyles: ThemeUIStyleObject = {
	backgroundColor: 'borders.2',
	height: '1px',
	marginLeft: 5,
	marginRight: 4,
	my: 0,
};

/**
 * Styles for dropdown group labels
 *
 */
export const dropdownGroupLabelStyles: ThemeUIStyleObject = {
	color: 'texts.secondary',
	display: 'block',
	fontFamily: 'heading',
	fontSize: 1,
	fontWeight: 'medium',
	letterSpacing: '5%', // TODO: map to design system when token available
	lineHeight: 5,
	overflow: 'hidden',
	pb: 1,
	pl: 5,
	pr: 4,
	pt: 2,
	textOverflow: 'ellipsis',
	textTransform: 'uppercase' as const,
	verticalAlign: 'bottom',
	whiteSpace: 'nowrap',
};

/**
 * Styles for dropdown item label container
 *
 */
export const dropdownItemLabelStyles: ThemeUIStyleObject = {
	alignItems: 'baseline',
	display: 'flex',
	flex: 1,
	gap: '6px',
	minWidth: 0,
	overflow: 'hidden',
};

/**
 * Styles for dropdown item primary labels
 *
 */
export const dropdownItemPrimaryLabelStyles: ThemeUIStyleObject = {
	alignSelf: 'baseline',
	flexShrink: 1,
	maxWidth: 'fit-content',
	minWidth: 0,
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	whiteSpace: 'nowrap',
};

/**
 * Styles for dropdown item secondary labels
 *
 */
export const dropdownItemSecondaryLabelStyles: ThemeUIStyleObject = {
	alignSelf: 'baseline',
	color: 'texts.helper', // Conditionally set to texts.disabled when disabled
	flexShrink: 0,
	fontFamily: 'body',
	fontSize: 1,
	fontWeight: 'regular',
	lineHeight: 5,
	maxWidth: 'fit-content',
	minWidth: 'fit-content',
};

/**
 * Styles for dropdown item icons
 *
 */
export const dropdownItemIconStyles: ThemeUIStyleObject = {
	alignItems: 'center',
	display: 'flex',
	flexShrink: 0,
	height: iconSize,
	width: iconSize,
};
