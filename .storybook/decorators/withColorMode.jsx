import React, { useEffect } from 'react';
import { makeDecorator } from '@storybook/addons';
import { useColorMode } from 'theme-ui';

// These need to be updated to import VIP design tokens;
const lightBackground = '#ffffff';
const darkBackground = '#333333';

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
	const [colorMode, setColorMode] = useColorMode();
	const newColorMode = darkBackground === background ? 'dark' : 'default';

	useEffect( () => {
		setColorMode( newColorMode );
	}, [ newColorMode ] );

	return null;
};

export default makeDecorator( {
	name: 'withColorMode',
	parameterName: 'colorMode',
	wrapper: ( storyFn, context ) => {
		return (
			<>
				<ThemeChanger background={context.globals?.backgrounds?.value} />
				{storyFn()}
			</>
		);
	}
} );
