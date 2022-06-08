import React from 'react';
import { makeDecorator } from '@storybook/addons';
import { Box } from "../../src/system";

export default makeDecorator( {
	name: 'withBoundingBox',
	parameterName: 'colorMode2',
	wrapper: ( storyFn, context ) => {
		return (
			<Box sx={{ p: 4, height: "100vh" }}>
				{storyFn()}
			</Box>
		);
	}
} );
