/**
 * Custom Style Dictionary transforms for the Valet token pipeline.
 *
 * Each transform mirrors a behavior of the legacy `token-transformer` so the
 * generated JSON stays byte-identical to the snapshot under
 * tests/fixtures/theme-snapshot/.
 */

const MATH_RE = /^[\s\d.+\-*/()]+$/;
const NUMERIC_RE = /^-?\d+(\.\d+)?$/;
// Matches a single rgba(...) call. Color arg is either a hex literal (after
// ref resolution) or a comma-separated rgb triplet (e.g. inline gradient stops
// from Figma exports like "rgba(255, 255, 255, 0)").
const RGBA_RE =
	/rgba\(\s*(?:(#[0-9a-fA-F]{3,8})|(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3}))\s*,\s*([\d.]+)\s*\)/g;
const LEADING_DOT_RE = /^-?\.\d/;

function evalMath( expr ) {
	// Restricted to digits, dot, whitespace, and arithmetic operators by MATH_RE.
	// eslint-disable-next-line no-new-func
	return Function( `"use strict"; return (${ expr });` )();
}

function hexToRgb( hex ) {
	let h = hex.replace( /^#/, '' );
	if ( h.length === 3 ) {
		h = h
			.split( '' )
			.map( c => c + c )
			.join( '' );
	}
	if ( h.length === 8 ) {
		h = h.slice( 0, 6 );
	}
	if ( h.length !== 6 ) {
		return null;
	}
	return [
		parseInt( h.slice( 0, 2 ), 16 ),
		parseInt( h.slice( 2, 4 ), 16 ),
		parseInt( h.slice( 4, 6 ), 16 ),
	];
}

function toHexByte( n ) {
	return n.toString( 16 ).padStart( 2, '0' );
}

function rgbToHex8( r, g, b, alpha ) {
	const a = Math.round( Math.max( 0, Math.min( 1, parseFloat( alpha ) ) ) * 255 );
	return `#${ toHexByte( r ) }${ toHexByte( g ) }${ toHexByte( b ) }${ toHexByte( a ) }`;
}

function rgbaCallToHex8( hexArg, rArg, gArg, bArg, alpha ) {
	if ( hexArg ) {
		const rgb = hexToRgb( hexArg );
		if ( ! rgb ) {
			return null;
		}
		return rgbToHex8( rgb[ 0 ], rgb[ 1 ], rgb[ 2 ], alpha );
	}
	return rgbToHex8( Number( rArg ), Number( gArg ), Number( bArg ), alpha );
}

function replaceRgbaInString( str ) {
	return str.replace( RGBA_RE, ( match, hex, r, g, b, a ) => {
		const replacement = rgbaCallToHex8( hex, r, g, b, a );
		return replacement ?? match;
	} );
}

function getValue( token ) {
	return token.$value !== undefined ? token.$value : token.value;
}

/**
 * Replace every `rgba(...)` substring (whether the color arg is a hex literal
 * or an `r, g, b` triplet) with an 8-char hex string. Marked transitive so it
 * runs after Style Dictionary resolves embedded `{color.x.y}` refs.
 *
 * Also handles strings that contain `rgba(...)` mixed with other content (e.g.
 * gradient definitions with multiple rgba color stops).
 */
export const rgbaToHex8Transform = {
	name: 'valet/color/rgba-to-hex8',
	type: 'value',
	transitive: true,
	filter: token => typeof getValue( token ) === 'string' && getValue( token ).includes( 'rgba(' ),
	transform: token => replaceRgbaInString( getValue( token ) ),
};

/**
 * Normalize bare-decimal strings (`.03em`, `.5rem`) to a leading-zero form
 * (`0.03em`, `0.5rem`) — matches the legacy transformer's output.
 */
export const leadingZeroTransform = {
	name: 'valet/value/leading-zero',
	type: 'value',
	transitive: true,
	filter: token =>
		typeof getValue( token ) === 'string' && LEADING_DOT_RE.test( getValue( token ) ),
	transform: token => {
		const v = getValue( token );
		return v.startsWith( '-' ) ? `-0${ v.slice( 1 ) }` : `0${ v }`;
	},
};

/**
 * Evaluate arithmetic expressions like `.875 * {rem}` after refs resolve to
 * numeric strings. Returns a JavaScript number — matches the legacy output
 * which stores font sizes as numbers rather than strings.
 */
export const evalMathTransform = {
	name: 'valet/math/eval',
	type: 'value',
	transitive: true,
	filter: token => {
		const v = getValue( token );
		return typeof v === 'string' && MATH_RE.test( v ) && /[*+\-/]/.test( v );
	},
	transform: token => {
		const v = getValue( token );
		try {
			return roundIfFractional( evalMath( v ) );
		} catch {
			return v;
		}
	},
};

/**
 * Match the legacy token-transformer's numeric rounding: integers stay exact,
 * floats are rounded to 3 decimal places. Used for both math eval results and
 * raw numeric strings inside composite values (shadow x/y/blur, etc).
 */
function roundIfFractional( n ) {
	if ( ! Number.isFinite( n ) || Number.isInteger( n ) ) {
		return n;
	}
	return Math.round( n * 1000 ) / 1000;
}

function coerceLeaf( v ) {
	if ( typeof v === 'string' ) {
		if ( NUMERIC_RE.test( v ) ) {
			return roundIfFractional( Number( v ) );
		}
		if ( MATH_RE.test( v ) && /[*+\-/]/.test( v ) ) {
			try {
				return roundIfFractional( evalMath( v ) );
			} catch {
				return v;
			}
		}
	}
	return v;
}

function coerceComposite( v ) {
	if ( v === null || typeof v !== 'object' ) {
		return coerceLeaf( v );
	}
	if ( Array.isArray( v ) ) {
		return v.map( coerceComposite );
	}
	const out = {};
	for ( const [ k, sub ] of Object.entries( v ) ) {
		out[ k ] = coerceComposite( sub );
	}
	return out;
}

/**
 * Coerce numeric-looking strings (`"0"`, `"320"`, `"16"`) to numbers — the
 * legacy transformer outputs these as numbers, not strings. Handles composite
 * values (typography, shadow) by walking object properties.
 */
export const coerceNumberTransform = {
	name: 'valet/value/coerce-number',
	type: 'value',
	transitive: true,
	filter: token => {
		const v = getValue( token );
		if ( typeof v === 'string' ) {
			return NUMERIC_RE.test( v );
		}
		return v !== null && typeof v === 'object';
	},
	transform: token => {
		const v = getValue( token );
		if ( typeof v === 'string' ) {
			return Number( v );
		}
		return coerceComposite( v );
	},
};
