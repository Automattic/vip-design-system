/** @jsxImportSource theme-ui */

/**
 * Internal dependencies
 */
import { Box } from '../Box/Box';

import type { BoxProps } from '../Box/Box';

/** @deprecated Use `NewDialog` for modal and sidebar dialogs, or `Dropdown` for menus. */
export type DialogTriggerProps = BoxProps;

/** @deprecated Use `NewDialog` for modal and sidebar dialogs, or `Dropdown` for menus. */
const DialogTrigger = ( { sx, ...props }: DialogTriggerProps ) => (
	<Box sx={ { display: 'inline', ...sx } } { ...props } />
);

export { DialogTrigger };
