/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */

/** @deprecated Use `NewDialog` for modal and sidebar dialogs, or `Dropdown` for menus. */
const DialogMenu = props => (
	<ul role="menu" sx={ { listStyleType: 'none', m: 0, px: 0, py: 1 } } { ...props } />
);

export { DialogMenu };
