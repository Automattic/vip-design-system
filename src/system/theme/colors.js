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

export const light = {
	black: 'rgba(19, 25, 30, 1)',
	brand: {
		0: '#FEFDFB',
		3: '#FDF9F5',
		7: '#FAF3EA',
		10: '#F7EBDC',
		20: '#F2DFC8',
		30: '#EBD1AF',
		40: '#E0BD8F',
		50: '#D8A45F',
		60: '#B96B03',
		70: '#B96B03',
		80: '#AB6200',
		90: '#915300',
		100: '#2B1C08',
	},
	grey: {
		0: '#FDFDFC',
		5: '#F9F9F8',
		10: '#F3F3F2',
		20: '#EEEEEC',
		30: '#EAE8E7',
		40: '#E4E2E1',
		50: '#DCDAD8',
		60: '#C9C6C2',
		70: '#918F8D',
		80: '#706F6C',
		90: '#4E4D4B',
		100: '#1C1A19',
	},
	blue: {
		0: '#FAFEFE',
		5: '#F3FCFD',
		10: '#E9F9FB',
		20: '#DAF5F8',
		30: '#C3EEF3',
		40: '#A9E3EA',
		50: '#82D5DE',
		60: '#41C4D2',
		70: '#009FB1',
		80: '#0090A0',
		90: '#007A87',
		100: '#002B2F',
	},
	green: {
		0: '#FBFEFC',
		5: '#F2FCF7',
		10: '#E9F9F1',
		20: '#DDF2E8',
		30: '#CBEADB',
		40: '#B3DEC9',
		50: '#91CDB0',
		60: '#5BB98C',
		70: '#30A46C',
		80: '#299762',
		90: '#18794B',
		100: '#153224',
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
		0: '#FEFDFB',
		5: '#FFF9EF',
		10: '#FFF2DE',
		20: '#FFEAC8',
		30: '#FFE0B0',
		40: '#FFD28B',
		50: '#F2BB62',
		60: '#EA9F28',
		70: '#FFB031',
		80: '#FBA318',
		90: '#9C6000',
		100: '#412800',
	},
	red: {
		0: '#FFFCFC',
		5: '#FFF8F7',
		10: '#FFF0EF',
		20: '#FFE6E4',
		30: '#FED7D4',
		40: '#FDC5C1',
		50: '#F8ACA7',
		60: '#F08D86',
		70: '#F04539',
		80: '#E63B2F',
		90: '#D42B1E',
		100: '#361513',
	},
};

export const dark = {
	black: 'rgba(19, 25, 30, 1)',
	brand: {
		0: '#1A160F',
		3: '#231809',
		7: '#301F08',
		10: '#301F08',
		20: '#3A2406',
		30: '#432804',
		40: '#502E01',
		50: '#603700',
		60: '#774400',
		70: '#B96B03',
		80: '#C37A19',
		90: '#CA8529',
		100: '#FAF2E7',
	},
	grey: {
		0: '#161615',
		5: '#1C1C1B',
		10: '#242221',
		20: '#282827',
		30: '#2F2D2C',
		40: '#353431',
		50: '#3F3D3B',
		60: '#524F4C',
		70: '#726F6A',
		80: '#807D78',
		90: '#A29F9B',
		100: '#EDEDEC',
	},
	blue: {
		0: '#0B1A1C',
		5: '#062124',
		10: '#032D31',
		20: '#00353B',
		30: '#003C42',
		40: '#00444C',
		50: '#005059',
		60: '#00636E',
		70: '#009FB1',
		80: '#09BDD2',
		90: '#2AC5D7',
		100: '#E6F9FB',
	},
	green: {
		0: '#0D1913',
		5: '#0C1F16',
		10: '#0F291D',
		20: '#113122',
		30: '#133927',
		40: '#16442E',
		50: '#1B5439',
		60: '#236E4A',
		70: '#30A46C',
		80: '#3CB179',
		90: '#4CC389',
		100: '#E4FAF0',
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
		0: '#1F1300',
		5: '#261700',
		10: '#301E00',
		20: '#3B2400',
		30: '#462B00',
		40: '#553400',
		50: '#674003',
		60: '#804F00',
		70: '#FFB031',
		80: '#FFC568',
		90: '#F69E12',
		100: '#FFF2DE',
	},
	red: {
		0: '#1E1313',
		5: '#2B1311',
		10: '#3C1714',
		20: '#491915',
		30: '#561B17',
		40: '#681E19',
		50: '#832019',
		60: '#AC241A',
		70: '#F04539',
		80: '#F6574B',
		90: '#FA6459',
		100: '#FFEEED',
	},
};

export default light;
