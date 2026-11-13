// `accessible-autocomplete/react` ships no types. The component takes the vendor's options as
// props (https://github.com/alphagov/accessible-autocomplete#api-documentation) and is driven
// through a class-instance ref, so the props stay loose here.
declare module 'accessible-autocomplete/react' {
	import type { ComponentClass } from 'react';

	const Autocomplete: ComponentClass< Record< string, unknown > >;

	export default Autocomplete;
}
