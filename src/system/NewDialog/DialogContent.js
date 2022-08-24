/** @jsxImportSource theme-ui */

export const contentStyles = {
	background: 'dialog',
	variant: 'dialog.modal',
	borderRadius: 10,
	boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
	position: 'fixed',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '90vw',
	maxWidth: '640px',
	maxHeight: '85vh',
	padding: 32,
	'&:focus': { outline: 'none' },
	'> h1, > h2': { marginTop: '0 !important' },
};
