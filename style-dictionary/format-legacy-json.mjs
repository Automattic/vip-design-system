/**
 * Custom formatter that emits the legacy `{value, type, description}` JSON
 * shape consumed by src/system/theme/getPropValue.ts.
 *
 * Walks Style Dictionary's parsed token tree (DTCG fields + transformed
 * `.value`) and reconstructs nested groups with leaf objects that carry the
 * fields the runtime expects.
 */

function isStyleDictionaryLeaf( node ) {
	return (
		node !== null &&
		typeof node === 'object' &&
		! Array.isArray( node ) &&
		( Object.prototype.hasOwnProperty.call( node, '$value' ) ||
			Object.prototype.hasOwnProperty.call( node, 'value' ) )
	);
}

function leafToLegacy( leaf ) {
	const out = {
		value: leaf.$value !== undefined ? leaf.$value : leaf.value,
		type: leaf.$type ?? leaf.type,
	};
	const description = leaf.$description ?? leaf.description;
	if ( description !== undefined ) {
		out.description = description;
	}
	return out;
}

function walk( node ) {
	if ( isStyleDictionaryLeaf( node ) ) {
		return leafToLegacy( node );
	}
	if ( node === null || typeof node !== 'object' || Array.isArray( node ) ) {
		return node;
	}
	// Stable key order keeps the generated JSON deterministic across runs and
	// independent of Style Dictionary's internal merge ordering, so PR diffs
	// only reflect intentional token changes.
	const out = {};
	for ( const key of Object.keys( node ).sort() ) {
		out[ key ] = walk( node[ key ] );
	}
	return out;
}

export const legacyJsonFormat = {
	name: 'valet/legacy-json',
	format: ( { dictionary } ) => {
		return JSON.stringify( walk( dictionary.tokens ), null, 2 );
	},
};
