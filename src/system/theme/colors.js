/**
 * External dependencies
 */
// import hsluv from 'hsluv';

// const SCALE_STEPS = 10;
// const BRAND = '#BD9D70';

// const generateHues = base => {
// 	const baseHuman = hsluv.hexToHsluv( base );
// 	const baseHue = baseHuman[ 0 ];
// 	const primaries = [
// 		{
// 			label: 'brand',
// 			hue: 55.8,
// 		},
// 		{
// 			label: 'red',
// 			hue: 12.2,
// 		},
// 		{
// 			label: 'blue',
// 			hue: 258.6,
// 		},
// 		{
// 			label: 'green',
// 			hue: 127.7,
// 		},
// 	];
// 	return primaries.map( p => {
// 		return { ...p, hex: hsluv.hsluvToHex( [ p.hue, baseHuman[ 1 ], baseHuman[ 2 ] ] ) };
// 	} );
// };

// const generateScale = ( hue, scaleSteps ) => {
// 	const baseHuman = hsluv.hexToHsluv( hue.hex );
// 	// lightness
// 	const baseLightness = baseHuman[ 2 ];
// 	const increment = 100 / scaleSteps;
// 	const bottom = baseLightness % increment;

// 	const baseIndex = ( baseLightness - bottom ) / increment;

// 	const baseIndexToEdge = baseIndex > scaleSteps / 2 ? baseIndex : scaleSteps - baseIndex;
// 	// saturation
// 	const baseSaturation = baseHuman[ 1 ];
// 	const baseSaturationToEdge = baseSaturation > 50 ? 100 - baseSaturation : baseSaturation;

// 	// const saturationLevel = 1-(((Math.abs(50-baseSaturation))%50)/50)
// 	const saturationIncrement = baseSaturationToEdge / baseIndexToEdge;

// 	hue.scale = [];
// 	for ( let i = 0; i < scaleSteps; i++ ) {
// 		const s = bottom + i * increment;
// 		const sa = ( baseIndex - i ) * saturationIncrement + baseSaturation;
// 		hue.scale.push( hsluv.hsluvToHex( [ baseHuman[ 0 ], sa, s ] ) );
// 	}

// 	return hue;
// };

// // const baseHuman = hsluv.hexToHsluv(base);
// let hues = generateHues( BRAND );

// // add ink
// hues.push( { label: 'grey', hue: 39.9, hex: '#575351' } );

// // return hues;
// hues = hues.map( hue => generateScale( hue, SCALE_STEPS ) );

// const huesObject = hues.reduce( ( val, hue ) => {
// 	val[ hue.label ] = {};
// 	hue.scale.forEach( ( hex, index ) => {
// 		val[ hue.label ][ `${ ( index + 1 ) * 10 }` ] = hex;
// 	} );
// 	return val;
// }, {} );

// export default huesObject;

export const colors = {
	brand: {
		0: '#fcfbfa',
		10: '#f5f3f1',
		20: '#eee9e5',
		30: '#e7dbcc',
		40: '#dfc39e',
		50: '#d8a45f',
		60: '#ad7832',
		70: '#835418',
		80: '#58340b',
		90: '#2d1803',
		100: '#030100',
	},
	grey: {
		0: '#fafafa',
		10: '#f3f3f3',
		20: '#e4e4e4',
		30: '#c8c8c8',
		40: '#9d9d9d',
		50: '#666666',
		60: '#5c5c5c',
		70: '#484848',
		80: '#2A2A2A',
		90: '#202020',
		100: '#030303',
	},
	red: {
		0: '#fafafa',
		10: '#ffeded',
		20: '#ffd4d1',
		30: '#ffaca6',
		40: '#ff786f',
		50: '#f24033',
		60: '#c72316',
		70: '#971005',
		80: '#650800',
		90: '#330400',
		100: '#030000',
	},
	green: {
		0: '#f5faf7',
		10: '#e6f6eb',
		20: '#c0ebcf',
		30: '#85d7a4',
		40: '#3eb974',
		50: '#00944b',
		60: '#006b3f',
		70: '#00482f',
		80: '#002f21',
		90: '#002017',
		100: '#001a13',
	},
	blue: {
		0: '#fafbfc',
		10: '#ecf3f8',
		20: '#d7e9f0',
		30: '#b9dbe5',
		40: '#8bc9d6',
		50: '#2fb3c2',
		60: '#0693a9',
		70: '#00738a',
		80: '#005064',
		90: '#002c39',
		100: '#00090d',
	},
};

export default colors;
