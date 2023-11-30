import { ThemeUIStyleObject } from 'theme-ui';

import { defaultNavItemStyles } from './primary';
import { NavProps } from '../../Nav';

// Menu Item Style <li>
export const menuItemStyles = ( orientation: NavProps[ 'orientation' ] ): ThemeUIStyleObject => ( {
	...defaultNavItemStyles( orientation ),
	mr: 0,
	border: 'none',
	height: 38,
	width: '100%',
	mb: 1,
} );

// Menu Item Link <a>
export const menuItemLinkStyles: ThemeUIStyleObject = {
	position: 'relative',
	alignItems: 'center',
	backgroundColor: 'layer.1',
	border: 'none',
	borderRadius: 1,
	color: 'text',
	display: 'inline-flex',
	fontSize: 'inherit',
	fontWeight: 'body',
	gap: 3,
	height: 38,
	mx: 0,
	mb: 0,
	pl: 5,
	pr: 3,
	py: 2,
	textDecoration: 'none',
	width: '100%',
	'&:visited': {
		color: 'text',
	},
	'&[data-active]::after': {
		position: 'absolute',
		content: "''",
		overflow: 'hidden',
		width: 3,
		backgroundColor: 'borders.accent',
		borderRadius: '90px',
		height: 26,
		top: '6px',
		left: 3,
	},
	'&[data-active]': {
		color: 'heading',
		backgroundColor: 'layer.2',
		textDecoration: 'none',
		cursor: 'default',
		svg: {
			color: 'icon.primary',
			fill: 'icon.primary',
		},
	},
	'&:focus:not(&[data-active]), &:hover:not(&[data-active])': {
		color: 'heading',
		backgroundColor: 'layer.3',
		svg: {
			color: 'icon.primary',
		},
	},
	':not(&:hover)': {
		transition: 'background-color 200ms ease-out',
	},
	svg: {
		color: 'icon.secondary',
		fill: 'icon.secondary',
		display: 'block',
	},
};

// Inverse Menu Item Link <a>
export const menuInverseItemLinkStyles: ThemeUIStyleObject = {
	...menuItemLinkStyles,
	backgroundColor: 'toolbar.background',
	borderRadius: 1,
	color: 'text',
	'&:visited': {
		color: 'text',
	},
	'&[data-active]::after': {
		backgroundColor: 'borders.accent',
		borderRadius: '90px',
	},
	'&[data-active]': {
		color: 'heading',
		backgroundColor: 'layer.2',
	},
	'&:focus:not(&[data-active]), &:hover:not(&[data-active])': {
		color: 'heading',
		backgroundColor: 'layer.3',
		svg: {
			color: 'icon.primary',
		},
	},
	':not(&:hover)': {
		transition: 'background-color 200ms ease-out',
	},
};
