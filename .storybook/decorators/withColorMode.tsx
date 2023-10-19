/**
 * External dependencies
 */

import React, { useEffect } from 'react';
import { makeDecorator } from '@storybook/addons';
import { useColorMode } from 'theme-ui';

/**
 * Internal dependencies
 */
import ThemeBuilder from '../../src/system/theme/getPropValue';

import Valet from '../../src/system/theme/generated/valet-theme-light.json';
import ValetDark from '../../src/system/theme/generated/valet-theme-dark.json';
const { getPropValue } = ThemeBuilder( Valet );
const { getPropValue: getPropValueDark } = ThemeBuilder( ValetDark );

// These need to be updated to import VIP design tokens;
const lightBackground = getPropValue( 'background', 'primary' );
const darkBackground = getPropValueDark( 'background', 'primary' );

export const backgrounds = {
	default: 'Light',
	values: [
		{
			name: 'Light',
			value: lightBackground,
		},
		{
			name: 'Dark',
			value: darkBackground,
		},
	],
};

function ThemeChanger( { background } ) {
	const [ _, setColorMode ] = useColorMode();
	const newColorMode = darkBackground === background ? 'dark' : 'default';

	useEffect( () => {
		setColorMode( newColorMode );
	}, [ newColorMode ] );

	return null;
}

export default makeDecorator( {
	name: 'withColorMode',
	parameterName: 'colorMode',
	wrapper: ( storyFn, context ) => {
		return (
			<>
				<ThemeChanger background={ context.globals?.backgrounds?.value } />
				{ storyFn() }
			</>
		);
	},
} );
