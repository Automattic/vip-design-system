type Breakpoints = {
	[ key: string ]: number;
};

export const generateBreakpoints = ( breakpoints: Breakpoints ) => {
	const bps: string[] = [];
	const values = Object.values( breakpoints );
	const lastBpIndex = values.length - 1;

	values.forEach( ( bp, index ) => {
		const after = values?.[ index + 1 ];

		if ( index === 0 ) {
			bps.push( `@media screen and (max-width: ${ after - 1 }px)` );
		} else if ( index === lastBpIndex ) {
			bps.push( `@media screen and (min-width: ${ bp }px)` );
		} else {
			bps.push( `@media screen and (min-width: ${ bp }px) and (max-width: ${ after - 1 }px)` );
		}
	} );

	return bps;
};
