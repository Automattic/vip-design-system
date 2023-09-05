/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import { inlineStyles } from './FormSelectInline';

/**
 * Internal dependencies
 */

const defaultStyles = {
	position: 'relative',
	width: '100%',
	display: 'inline-flex',
	flexDirection: 'row',
	alignItems: 'center',
};

const FormSelectContent = React.forwardRef( ( { isInline, label, children }, forwardRef ) => (
	<div sx={ isInline ? inlineStyles : {} } className="vip-select-component" ref={ forwardRef }>
		{ isInline && label }

		<div sx={ defaultStyles }>{ children }</div>
	</div>
) );

FormSelectContent.propTypes = {
	isInline: PropTypes.bool,
	label: PropTypes.any,
	children: PropTypes.any,
};

FormSelectContent.displayName = 'FormSelectContent';

export { FormSelectContent };
