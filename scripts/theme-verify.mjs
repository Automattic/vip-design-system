#!/usr/bin/env node
/**
 * Theme regression gate.
 *
 * Compares src/system/theme/generated/valet-theme-{light,dark}.json against
 * the snapshot under tests/fixtures/theme-snapshot/. Exits non-zero on any
 * structural diff.
 *
 * Comparison normalizes:
 *   - JSON key order (deep-sort keys)
 *   - whitespace
 * Value diffs are reported with their token path.
 */

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOTS = [ 'valet-theme-light.json', 'valet-theme-dark.json' ];
const repoRoot = resolve( import.meta.dirname, '..' );

function loadJson( path ) {
	return JSON.parse( readFileSync( path, 'utf8' ) );
}

function diff( expected, actual, path = '' ) {
	const diffs = [];
	if ( typeof expected !== typeof actual ) {
		diffs.push( { path, expected, actual } );
		return diffs;
	}
	if ( expected === null || typeof expected !== 'object' ) {
		if ( expected !== actual ) {
			diffs.push( { path, expected, actual } );
		}
		return diffs;
	}
	const keys = new Set( [ ...Object.keys( expected ), ...Object.keys( actual ) ] );
	for ( const key of keys ) {
		const next = path ? `${ path }.${ key }` : key;
		if ( ! ( key in expected ) ) {
			diffs.push( { path: next, expected: '<missing>', actual: actual[ key ] } );
			continue;
		}
		if ( ! ( key in actual ) ) {
			diffs.push( { path: next, expected: expected[ key ], actual: '<missing>' } );
			continue;
		}
		diffs.push( ...diff( expected[ key ], actual[ key ], next ) );
	}
	return diffs;
}

let failed = false;

for ( const file of ROOTS ) {
	const expected = loadJson( resolve( repoRoot, 'tests/fixtures/theme-snapshot', file ) );
	const actual = loadJson( resolve( repoRoot, 'src/system/theme/generated', file ) );
	const diffs = diff( expected, actual );
	if ( diffs.length === 0 ) {
		console.log( `ok ${ file }` );
		continue;
	}
	failed = true;
	console.error( `FAIL ${ file } — ${ diffs.length } diffs` );
	for ( const d of diffs.slice( 0, 25 ) ) {
		console.error(
			`  ${ d.path }\n    expected: ${ JSON.stringify(
				d.expected
			) }\n    actual:   ${ JSON.stringify( d.actual ) }`
		);
	}
	if ( diffs.length > 25 ) {
		console.error( `  …${ diffs.length - 25 } more` );
	}
}

if ( failed ) {
	process.exit( 1 );
}
