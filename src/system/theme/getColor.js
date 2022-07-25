/**
 * Internal dependencies
 */

import Valet from './valet-theme.json';

export const getColor = ( color, variant = 'default' ) => {
	if ( ! Valet[ color ] ) {
		return '#000000';
	}

	return Valet[ color ][ variant ].value;
};
