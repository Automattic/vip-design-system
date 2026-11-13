/* eslint-disable @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access -- untyped token export, see getPropValue */

/**
 * Internal dependencies
 */
import type { ValetTheme } from './getPropValue';

export default ( theme: ValetTheme ) => ( {
	...theme.color,
	grey: theme.color.gray,
} );
