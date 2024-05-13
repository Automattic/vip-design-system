type Breakpoints = {
	[ key: string ]: number;
};

export const generateBreakpoints = ( breakpoints: Breakpoints ) => {
	const values = Object.values( breakpoints );

	return values.map( ( bp, index ) => {
		if ( index === 0 ) {
			return `0px`;
		}

		return `${ bp }px`;
	} );
};
