import React, { useEffect } from 'react';
import { makeDecorator } from '@storybook/addons';
import { useColorMode } from 'theme-ui';
import { getColor } from '../../src/system/theme/getColor';

// These need to be updated to import VIP design tokens;
const lightBackground = getColor( 'background', 'primary' );
const darkBackground = '#1C1C1B';

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
