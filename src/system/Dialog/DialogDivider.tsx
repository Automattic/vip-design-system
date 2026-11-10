/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import type { ComponentPropsWithoutRef } from 'react';
import type { ThemeUIStyleObject } from 'theme-ui';

/** @deprecated Use `NewDialog` for modal and sidebar dialogs, or `Dropdown` for menus. */
export type DialogDividerProps = ComponentPropsWithoutRef< 'div' > & {
	/** Theme UI style overrides merged over the divider's own styles. */
	sx?: ThemeUIStyleObject;
};

/** @deprecated Use `NewDialog` for modal and sidebar dialogs, or `Dropdown` for menus. */
const DialogDivider = ( { sx, ...props }: DialogDividerProps ) => (
	<div sx={ { height: 1, backgroundColor: 'border', my: 1, ...sx } } { ...props } />
);

export { DialogDivider };
