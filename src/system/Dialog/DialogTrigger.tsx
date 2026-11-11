/** @jsxImportSource theme-ui */

/**
 * Internal dependencies
 */
import { Box } from '../Box/Box';

import type { BoxProps } from '../Box/Box';
import type { Ref } from 'react';

/** @deprecated Use `NewDialog` for modal and sidebar dialogs, or `Dropdown` for menus. */
export type DialogTriggerProps = BoxProps & { ref?: Ref< HTMLElement > };

/** @deprecated Use `NewDialog` for modal and sidebar dialogs, or `Dropdown` for menus. */
const DialogTrigger = ( { sx, ...props }: DialogTriggerProps ) => (
	<Box sx={ { display: 'inline', ...sx } } { ...props } />
);

export { DialogTrigger };
