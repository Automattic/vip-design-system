/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { SearchSelect } from './SearchSelect';
import { InlineSelect } from './InlineSelect';
import { AsyncSearchSelect } from './AsyncSearchSelect';

const Select = ( { isMulti = false, isInline, isAsync, options, label, isSearch, usePortal, ...props } ) => {
	let Component;
	const selectRef = React.useRef();
	const portalProps = {};

	if ( usePortal !== undefined ) {
		portalProps.menuPortalTarget =
			selectRef?.current?.querySelector( '.select__control' ).parentElement;
		portalProps.styles = { menuPortal: base => ( { ...base, position: 'fixed' } ) };
	}

	switch ( true ) {
		case isInline:
			Component = InlineSelect;
			break;
		case isAsync:
			Component = AsyncSearchSelect;
			break;
		default:
			Component = SearchSelect;
			break;
	}

	return <div ref={selectRef} className="vip-select-component"><Component isMulti={isMulti} label={label} options={options} {...portalProps} {...props} /></div>;
};

Select.propTypes = {
	isInline: PropTypes.bool,
	isMulti: PropTypes.bool,
	isAsync: PropTypes.bool,
	isSearch: PropTypes.bool,
	label: PropTypes.string,
	options: PropTypes.array,
	usePortal: PropTypes.bool,
};

export { Select };
