/**
 * External dependencies
 */

import React, { useEffect } from 'react';
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

// Storybook 9+ reads an `options` map and stores the selected key, not the
// colour, in the `backgrounds` global.
export const backgrounds = {
	options: {
		light: { name: 'Light', value: lightBackground },
		dark: { name: 'Dark', value: darkBackground },
	},
};

type BackgroundsGlobal = string | { value?: string } | undefined;

const getBackgroundKey = ( background: BackgroundsGlobal ) =>
	typeof background === 'string' ? background : background?.value;

function ThemeChanger( { background }: { background: BackgroundsGlobal } ) {
	const [ _, setColorMode ] = useColorMode();
	const newColorMode = getBackgroundKey( background ) === 'dark' ? 'dark' : 'light';

	useEffect( () => {
		setColorMode( newColorMode );
	}, [ newColorMode ] );

	return null;
}

const withColorMode = ( Story, context ) => {
	return (
		<>
			<ThemeChanger background={ context.globals?.backgrounds } />
			<Story />
		</>
	);
};

export default withColorMode;
