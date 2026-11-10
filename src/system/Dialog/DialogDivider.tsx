/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */

/** @deprecated Use `NewDialog` for modal and sidebar dialogs, or `Dropdown` for menus. */
const DialogDivider = props => (
	<div sx={ { height: 1, backgroundColor: 'border', my: 1 } } { ...props } />
);

export { DialogDivider };
