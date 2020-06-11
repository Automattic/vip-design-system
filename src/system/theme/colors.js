/**
 * External dependencies
 */
import hsluv from 'hsluv';

const SCALE_STEPS = 10;
const BRAND = '#BD9D70';

const generateHues = base => {
	const baseHuman = hsluv.hexToHsluv( base );
	const baseHue = baseHuman[ 0 ];
	const primaries = [
		{
			label: 'brand',
			hue: 55.8,
		},
		{
			label: 'red',
			hue: 12.2,
		},
		{
			label: 'blue',
			hue: 258.6,
		},
		{
			label: 'green',
			hue: 127.7,
		},
	];
	return primaries.map( p => {
		return { ...p, hex: hsluv.hsluvToHex( [ p.hue, baseHuman[ 1 ], baseHuman[ 2 ] ] ) };
	} );
};

const generateScale = ( hue, scaleSteps ) => {
	const baseHuman = hsluv.hexToHsluv( hue.hex );
	// lightness
	const baseLightness = baseHuman[ 2 ];
	const increment = 100 / scaleSteps;
	const bottom = baseLightness % increment;

	const baseIndex = ( baseLightness - bottom ) / increment;

	const baseIndexToEdge =
    baseIndex > scaleSteps / 2 ? baseIndex : scaleSteps - baseIndex;

	// saturation
	const baseSaturation = baseHuman[ 1 ];
	const baseSaturationToEdge =
    baseSaturation > 50 ? 100 - baseSaturation : baseSaturation;

	// const saturationLevel = 1-(((Math.abs(50-baseSaturation))%50)/50)
	const saturationIncrement = baseSaturationToEdge / baseIndexToEdge;

	hue.scale = [];
	for ( let i = 0; i < scaleSteps; i++ ) {
		const s = bottom + i * increment;
		const sa = ( baseIndex - i ) * saturationIncrement + baseSaturation;
		hue.scale.push( hsluv.hsluvToHex( [ baseHuman[ 0 ], sa, s ] ) );
	}

	return hue;
};

// const baseHuman = hsluv.hexToHsluv(base);
let hues = generateHues( BRAND );

// add ink
hues.push( { label: 'grey', hue: 39.9, hex: '#575351' } );

// return hues;
hues = hues.map( hue => generateScale( hue, SCALE_STEPS ) );

const huesObject = hues.reduce( ( val, hue ) => {
	val[ hue.label ] = {};
	hue.scale.forEach( ( hex, index ) => {
		val[ hue.label ][ `${ ( index + 1 ) * 10 }` ] = hex;
	} );
	return val;
}, {} );

export default huesObject;
