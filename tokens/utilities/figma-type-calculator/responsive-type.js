const fs = require( 'fs' );

function clamp( min, preferred, max ) {
	return Math.min( Math.max( min, preferred ), max );
}

function calculateResponsiveValues(
	breakpointValues,
	breakpointNames,
	remValue,
	responsiveFontSizeValues
) {
	const result = {};

	responsiveFontSizeValues.forEach( ( styleFormula, index ) => {
		const calculatedValues = breakpointValues.map( bp => {
			const vw = bp / 100; // Convert breakpoint value to vw unit.

			// Extract the arguments of the clamp function using a regular expression
			const [ , min, preferred, max ] = styleFormula.match( /clamp\((.*),\s*(.*),\s*(.*)\)/ );

			// Evaluate the expressions by replacing vw and rem with their respective numerical values
			const minVal = eval( min.replace( /vw/g, `*${ vw }` ).replace( /rem/g, `*${ remValue }` ) );
			const preferredExpression = preferred.replace( /calc\(/g, '' ).replace( /\)/g, '' );
			const preferredVal = eval(
				preferredExpression.replace( /vw/g, `*${ vw }` ).replace( /rem/g, `*${ remValue }` )
			);
			const maxVal = eval( max.replace( /vw/g, `*${ vw }` ).replace( /rem/g, `*${ remValue }` ) );

			// Use the custom clamp function to calculate the value
			return clamp( minVal, preferredVal, maxVal ).toFixed( 2 );
		} );

		result[ index ] = {
			breakpointNames: breakpointNames,
			values: calculatedValues,
		};
	} );

	return result;
}

function updateConfigJSON( calculatedValues, config ) {
	for ( const index in calculatedValues ) {
		const fontSizeData = calculatedValues[ index ];
		const fontSizeObject = {};

		fontSizeData.breakpointNames.forEach( ( breakpointName, i ) => {
			fontSizeObject[ breakpointName ] = {
				value: fontSizeData.values[ i ],
				type: 'other',
			};
		} );

		// Add 1 to the index to start with 1 instead of 0
		config.fontSize.figma[ parseInt( index ) + 1 ] = fontSizeObject;
	}

	return config;
}

fs.readFile( '../../valet-core/valet-core.json', 'utf8', ( err, data ) => {
	if ( err ) {
		console.error( 'Error reading file:', err );
		return;
	}

	const config = JSON.parse( data );

	const remValue = config.rem.value;

	const breakpointNames = Object.keys( config.breakpoint );

	const breakpointValues = Object.values( config.breakpoint ).map( obj => obj.value );

	const responsiveFontSizeValues = Object.values( config.fontSize.responsive ).map(
		obj => obj.value
	);

	const calculatedValues = calculateResponsiveValues(
		breakpointValues,
		breakpointNames,
		remValue,
		responsiveFontSizeValues
	);

	console.log( calculatedValues );

	const updatedConfig = updateConfigJSON( calculatedValues, config );

	fs.writeFile( '../../valet-core/valet-core.json', JSON.stringify( updatedConfig, null, 2 ), err => {
		if ( err ) {
			console.error( 'Error writing file:', err );
			return;
		}
		console.log( 'Output written to valet-core.json' );
	} );
} );
