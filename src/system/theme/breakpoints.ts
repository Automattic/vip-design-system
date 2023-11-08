type Breakpoints = {
	[ key: string ]: number;
};

export const generateBreakpoints = ( breakpoints: Breakpoints ) => {
	const values = Object.values( breakpoints );

	return values.map( bp => `${ bp }px` );
};
