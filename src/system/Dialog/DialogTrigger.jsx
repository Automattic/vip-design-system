/** @jsxImportSource theme-ui */

/**
 * Internal dependencies
 */

import { Box } from '../Box/Box';

/** @deprecated Use `NewDialog` for modal and sidebar dialogs, or `Dropdown` for menus. */
const DialogTrigger = props => <Box sx={ { display: 'inline' } } { ...props } />;

export { DialogTrigger };
