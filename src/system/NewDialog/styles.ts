/** @jsxImportSource theme-ui */

import { ThemeUIStyleObject } from 'theme-ui';

export const contentStyles: ThemeUIStyleObject = {
	background: 'dialog',
	variant: 'dialog.modal',
	borderRadius: 2,
	boxShadow: 'medium',
	position: 'fixed',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '90vw',
	maxWidth: '640px',
	maxHeight: '85vh',
	padding: 6,
	'> h1, > h2': { marginTop: '0 !important' },
};
