import React from 'react';
import { makeDecorator } from '@storybook/addons';
import { Box, Heading } from '../../src/system';

export default makeDecorator( {
	name: 'withBoundingBox',
	parameterName: 'colorMode2',
	wrapper: ( storyFn, context ) => {
		return (
			<Box sx={ { p: 3, height: '100vh' } }>
				<Box sx={ { backgroundColor: 'backgroundMuted', p: 3, borderRadius: 2 } }>
					<Heading variant="h1" sx={ { mb: 1 } }>
						{ context.title }
					</Heading>
					<Heading variant="h2">{ context.name }</Heading>
				</Box>

				<Box sx={ { py: 3 } }>{ storyFn() }</Box>
			</Box>
		);
	},
} );
