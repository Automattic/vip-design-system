/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */

/**
 * Internal dependencies
 */
import { getColor } from '../theme/getColor';

const errorColor = getColor( 'text', 'helper' );

const RequiredLabel = () => (
	<span sx={ { color: errorColor, display: 'inline-block', ml: 2, fontSize: 1 } }>(Required)</span>
);

export { RequiredLabel };
