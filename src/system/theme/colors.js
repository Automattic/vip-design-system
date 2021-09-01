/** @jsxImportSource theme-ui */

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
	black: 'rgba(19, 25, 30, 1)',
	brand: {
		0: 'rgba(252, 250, 250, 1)',
		3: 'rgba(245, 242, 241, 1)',
		7: 'rgba(238, 234, 229, 1)',
		10: 'rgba(234, 227, 218, 1)',
		15: 'rgba(227, 208, 184, 1)',
		20: 'rgba(223, 195, 158, 1)',
		25: 'rgba(220, 180, 128, 1)',
		30: 'rgba(216, 164, 95, 1)',
		35: 'rgba(205, 155, 86, 1)',
		40: 'rgba(191, 142, 76, 1)',
		45: 'rgba(179, 131, 67, 1)',
		50: 'rgba(165, 119, 59, 1)',
		55: 'rgba(151, 106, 49, 1)',
		60: 'rgba(136, 93, 38, 1)',
		65: 'rgba(123, 82, 28, 1)',
		70: 'rgba(110, 71, 16, 1)',
		75: 'rgba(94, 57, 4, 1)',
		80: 'rgba(82, 45, 0, 1)',
		85: 'rgba(67, 34, 0, 1)',
		90: 'rgba(53, 22, 1, 1)',
		95: 'rgba(38, 8, 0, 1)',
		100: 'rgba(30, 0, 0, 1)',
	},
	grey: {
		0: 'rgba(250, 250, 250, 1)',
		5: 'rgba(238, 238, 238, 1)',
		10: 'rgba(225, 225, 225, 1)',
		15: 'rgba(213, 213, 213, 1)',
		20: 'rgba(201, 201, 201, 1)',
		25: 'rgba(189, 189, 189, 1)',
		30: 'rgba(176, 176, 176, 1)',
		35: 'rgba(164, 164, 164, 1)',
		40: 'rgba(152, 152, 152, 1)',
		45: 'rgba(140, 140, 140, 1)',
		50: 'rgba(128, 128, 128, 1)',
		55: 'rgba(115, 115, 115, 1)',
		60: 'rgba(103, 103, 103, 1)',
		65: 'rgba(91, 91, 91, 1)',
		70: 'rgba(79, 79, 79, 1)',
		75: 'rgba(66, 66, 66, 1)',
		80: 'rgba(54, 54, 54, 1)',
		85: 'rgba(42, 42, 42, 1)',
		90: 'rgba(30, 30, 30, 1)',
		95: 'rgba(17, 17, 17, 1)',
		100: 'rgba(5, 5, 5, 1)',
	},
	green: {
		0: 'rgba(245, 251, 247, 1)',
		5: 'rgba(225, 243, 231, 1)',
		10: 'rgba(198, 234, 208, 1)',
		15: 'rgba(170, 225, 183, 1)',
		20: 'rgba(137, 218, 160, 1)',
		25: 'rgba(109, 209, 139, 1)',
		30: 'rgba(77, 198, 121, 1)',
		35: 'rgba(64, 186, 111, 1)',
		40: 'rgba(48, 172, 99, 1)',
		45: 'rgba(29, 161, 88, 1)',
		50: 'rgba(1, 148, 77, 1)',
		55: 'rgba(0, 136, 64, 1)',
		60: 'rgba(0, 121, 52, 1)',
		65: 'rgba(0, 109, 41, 1)',
		70: 'rgba(0, 97, 30, 1)',
		75: 'rgba(0, 81, 15, 1)',
		80: 'rgba(0, 69, 2, 1)',
		85: 'rgba(0, 55, 0, 1)',
		90: 'rgba(1, 44, 0, 1)',
		95: 'rgba(1, 27, 0, 1)',
		100: 'rgba(1, 8, 0, 1)',
	},
	blue: {
		0: 'rgba(250, 251, 255, 1)',
		5: 'rgba(229, 240, 246, 1)',
		10: 'rgba(205, 230, 235, 1)',
		15: 'rgba(178, 221, 230, 1)',
		20: 'rgba(148, 212, 222, 1)',
		25: 'rgba(119, 202, 216, 1)',
		30: 'rgba(84, 192, 205, 1)',
		35: 'rgba(48, 181, 196, 1)',
		40: 'rgba(25, 168, 184, 1)',
		45: 'rgba(0, 155, 173, 1)',
		50: 'rgba(1, 144, 160, 1)',
		55: 'rgba(0, 130, 146, 1)',
		60: 'rgba(0, 117, 134, 1)',
		65: 'rgba(0, 105, 121, 1)',
		70: 'rgba(0, 91, 109, 1)',
		75: 'rgba(0, 77, 95, 1)',
		80: 'rgba(0, 66, 82, 1)',
		85: 'rgba(0, 51, 68, 1)',
		90: 'rgba(1, 40, 57, 1)',
		95: 'rgba(0, 28, 42, 1)',
		100: 'rgba(0, 10, 35, 1)',
	},
	pink: {
		0: 'rgba(255, 248, 246, 1)',
		5: 'rgba(255, 232, 230, 1)',
		10: 'rgba(255, 214, 210, 1)',
		15: 'rgba(255, 197, 193, 1)',
		20: 'rgba(251, 183, 180, 1)',
		25: 'rgba(239, 171, 168, 1)',
		30: 'rgba(226, 158, 157, 1)',
		35: 'rgba(212, 146, 148, 1)',
		40: 'rgba(202, 133, 136, 1)',
		45: 'rgba(188, 122, 126, 1)',
		50: 'rgba(176, 109, 116, 1)',
		55: 'rgba(163, 95, 106, 1)',
		60: 'rgba(149, 83, 93, 1)',
		65: 'rgba(137, 71, 85, 1)',
		70: 'rgba(124, 57, 74, 1)',
		75: 'rgba(109, 41, 62, 1)',
		80: 'rgba(95, 30, 52, 1)',
		85: 'rgba(83, 14, 43, 1)',
		90: 'rgba(69, 0, 31, 1)',
		95: 'rgba(53, 0, 18, 1)',
		100: 'rgba(46, 0, 3, 1)',
	},
	salmon: {
		0: 'rgba(254, 248, 248, 1)',
		5: 'rgba(254, 233, 228, 1)',
		10: 'rgba(254, 214, 206, 1)',
		15: 'rgba(254, 195, 177, 1)',
		20: 'rgba(255, 178, 150, 1)',
		25: 'rgba(255, 163, 120, 1)',
		30: 'rgba(249, 148, 94, 1)',
		35: 'rgba(237, 137, 85, 1)',
		40: 'rgba(224, 123, 77, 1)',
		45: 'rgba(210, 113, 70, 1)',
		50: 'rgba(197, 101, 63, 1)',
		55: 'rgba(181, 86, 56, 1)',
		60: 'rgba(167, 73, 48, 1)',
		65: 'rgba(153, 60, 43, 1)',
		70: 'rgba(137, 47, 38, 1)',
		75: 'rgba(124, 30, 30, 1)',
		80: 'rgba(108, 15, 23, 1)',
		85: 'rgba(94, 0, 16, 1)',
		90: 'rgba(78, 0, 0, 1)',
		95: 'rgba(62, 0, 1, 1)',
		100: 'rgba(52, 0, 2, 1)',
	},
	orange: {
		0: 'rgba(255, 249, 241, 1)',
		5: 'rgba(255, 233, 219, 1)',
		10: 'rgba(255, 215, 189, 1)',
		15: 'rgba(255, 195, 159, 1)',
		20: 'rgba(255, 178, 126, 1)',
		25: 'rgba(254, 159, 95, 1)',
		30: 'rgba(255, 139, 64, 1)',
		35: 'rgba(255, 123, 40, 1)',
		40: 'rgba(244, 110, 21, 1)',
		45: 'rgba(231, 98, 5, 1)',
		50: 'rgba(215, 80, 1, 1)',
		55: 'rgba(197, 73, 0, 1)',
		60: 'rgba(180, 60, 0, 1)',
		65: 'rgba(165, 49, 0, 1)',
		70: 'rgba(148, 38, 1, 1)',
		75: 'rgba(129, 23, 1, 1)',
		80: 'rgba(111, 8, 1, 1)',
		85: 'rgba(95, 0, 0, 1)',
		90: 'rgba(78, 0, 0, 1)',
		95: 'rgba(60, 0, 0, 1)',
		100: 'rgba(50, 0, 3, 1)',
	},
	yellow: {
		0: 'rgba(255, 249, 241, 1)',
		5: 'rgba(255, 233, 209, 1)',
		10: 'rgba(255, 216, 165, 1)',
		15: 'rgba(255, 200, 118, 1)',
		20: 'rgba(255, 184, 74, 1)',
		25: 'rgba(255, 169, 32, 1)',
		30: 'rgba(240, 157, 1, 1)',
		35: 'rgba(226, 145, 1, 1)',
		40: 'rgba(211, 133, 0, 1)',
		45: 'rgba(198, 122, 0, 1)',
		50: 'rgba(184, 110, 1, 1)',
		55: 'rgba(169, 97, 0, 1)',
		60: 'rgba(152, 86, 0, 1)',
		65: 'rgba(137, 75, 0, 1)',
		70: 'rgba(123, 63, 1, 1)',
		75: 'rgba(104, 51, 1, 1)',
		80: 'rgba(89, 40, 0, 1)',
		85: 'rgba(73, 29, 0, 1)',
		90: 'rgba(59, 18, 0, 1)',
		95: 'rgba(43, 4, 0, 1)',
		100: 'rgba(35, 0, 0, 1)',
	},
	red: {
		0: 'rgba(255, 246, 249, 1)',
		5: 'rgba(255, 231, 229, 1)',
		10: 'rgba(255, 213, 206, 1)',
		15: 'rgba(255, 195, 185, 1)',
		20: 'rgba(255, 176, 161, 1)',
		25: 'rgba(254, 157, 140, 1)',
		30: 'rgba(255, 136, 114, 1)',
		35: 'rgba(255, 116, 95, 1)',
		40: 'rgba(255, 95, 77, 1)',
		45: 'rgba(248, 77, 60, 1)',
		50: 'rgba(231, 65, 53, 1)',
		55: 'rgba(211, 55, 43, 1)',
		60: 'rgba(191, 42, 35, 1)',
		65: 'rgba(173, 34, 31, 1)',
		70: 'rgba(154, 26, 25, 1)',
		75: 'rgba(132, 11, 16, 1)',
		80: 'rgba(113, 2, 8, 1)',
		85: 'rgba(94, 0, 0, 1)',
		90: 'rgba(74, 0, 1, 1)',
		95: 'rgba(56, 0, 1, 1)',
		100: 'rgba(46, 0, 2, 1)',
	},
};

export default colors;
