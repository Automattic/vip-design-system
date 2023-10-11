import React from 'react';
import { makeDecorator } from '@storybook/addons';
import { Box, Heading } from '../../src/system';

export default makeDecorator( {
	name: 'withBoundingBox',
	parameterName: 'colorMode2',
	wrapper: storyFn => {
		return <Box sx={ { p: 3 } }>{ storyFn() }</Box>;
	},
} );
