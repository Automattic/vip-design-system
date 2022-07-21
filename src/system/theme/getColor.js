/**
 * Internal dependencies
 */

import Valet from '../../generated/valet-theme.json';

export const getColor = ( color, variant = 'default' ) => {
	if ( ! Valet[ color ] ) {
		return '#000000';
	}

	return Valet[ color ][ variant ].value;
};
