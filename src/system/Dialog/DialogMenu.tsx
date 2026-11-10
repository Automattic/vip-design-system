/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import type { ComponentPropsWithoutRef } from 'react';
import type { ThemeUIStyleObject } from 'theme-ui';

/** @deprecated Use `NewDialog` for modal and sidebar dialogs, or `Dropdown` for menus. */
export type DialogMenuProps = ComponentPropsWithoutRef< 'ul' > & {
	/** Theme UI style overrides merged over the menu's own styles. */
	sx?: ThemeUIStyleObject;
};

/** @deprecated Use `NewDialog` for modal and sidebar dialogs, or `Dropdown` for menus. */
const DialogMenu = ( { sx, ...props }: DialogMenuProps ) => (
	<ul role="menu" sx={ { listStyleType: 'none', m: 0, px: 0, py: 1, ...sx } } { ...props } />
);

export { DialogMenu };
