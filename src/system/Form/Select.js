/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
import { SearchSelect } from './SearchSelect';
import { InlineSelect } from './InlineSelect';

const Select = ( { isMulti = false, isInline, options, label, isSearch, usePortal, ...props } ) => {
	const selectRef = React.useRef();
	const portalProps = {};

	if ( usePortal !== undefined ) {
		portalProps.menuPortalTarget =
			selectRef?.current?.querySelector( '.select__control' ).parentElement;
		portalProps.styles = { menuPortal: base => ( { ...base, position: 'fixed' } ) };
	}

	const Component = isInline ? InlineSelect : SearchSelect;

	return <div ref={selectRef}><Component isMulti={isMulti} label={label} options={options} {...portalProps} {...props} /></div>;
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
