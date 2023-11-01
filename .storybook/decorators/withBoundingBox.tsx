import React from 'react';
import { makeDecorator } from '@storybook/addons';
import { Box } from '../../src/system';
import { Global, css } from '@emotion/react';

export default makeDecorator( {
	name: 'withBoundingBox',
	parameterName: 'colorMode2',
	wrapper: storyFn => (
		<>
			<Global
				styles={ css`
					@font-face {
						font-family: 'recoletaregular';
						src: url( 'https://dashboard.wpvip.com/fonts/recoleta-regular-webfont.eot' );
						src: url( 'https://dashboard.wpvip.com/fonts/recoleta-regular-webfont.eot?#iefix' )
								format( 'embedded-opentype' ),
							url( 'https://dashboard.wpvip.com/fonts/recoleta-regular-webfont.woff2' )
								format( 'woff2' ),
							url( 'https://dashboard.wpvip.com/fonts/recoleta-regular-webfont.woff' )
								format( 'woff' ),
							url( 'https://dashboard.wpvip.com/fonts/recoleta-regular-webfont.ttf' )
								format( 'truetype' ),
							url( 'https://dashboard.wpvip.com/fonts/recoleta-regular-webfont.svg#recoletaregular' )
								format( 'svg' );
						font-weight: normal;
						font-style: normal;
					}
					body {
						backgroundcolor: '#fbfbfb';
					}
				` }
			/>
			<Box sx={ { p: 4 } }>{ storyFn() }</Box>
		</>
	),
} );
