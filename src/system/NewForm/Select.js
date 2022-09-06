/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React, { useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { MdExpandMore } from 'react-icons/md';
import { Label } from '..';

/**
 * Internal dependencies
 */

const renderOption = ( label, value ) => {
	return (
		<option key={ value } value={ value }>
			{ label }
		</option>
	);
};

const renderGroup = ( groupLabel, groupOptions ) => {
	return (
		<optgroup key={ groupLabel } label={ groupLabel }>
			{ groupOptions.map( ( { label, value } ) => renderOption( label, value ) ) }
		</optgroup>
	);
};

const Select = ( { isInline, placeholder, forLabel, options, label, ...props } ) => {
	const wrapperRef = React.useRef();
	const selectRef = React.useRef();
	const [ width, setWidth ] = useState( 0 );

	useLayoutEffect( () => {
		setWidth( selectRef.current.offsetWidth );
	}, [] );

	return (
		<>
			{ label && <Label htmlFor={ forLabel || props.id }>{ label }</Label> }
			<div
				ref={ wrapperRef }
				sx={ {
					width: `${ width }px`,
					position: 'relative',
					'&:hover select': { borderColor: 'placeholder' },
				} }
				className="vip-select-component"
			>
				<select
					ref={ selectRef }
					sx={ {
						borderRadius: '4px',
						padding: '10px 35px 10px 10px',
						borderColor: 'border',
						'&:focus': theme => theme.outline,
						'&:focus-visible': theme => theme.outline,
						'-webkit-appearance': 'none',
						'-moz-appearance': 'none',
						'&:hover': {
							borderColor: 'placeholder',
						},
					} }
					{ ...props }
				>
					{ placeholder && <option>{ placeholder }</option> }
					{ options.map( ( { label: optionLabel, value, options: groupOptions } ) =>
						value ? renderOption( optionLabel, value ) : renderGroup( optionLabel, groupOptions )
					) }
				</select>
				<MdExpandMore
					sx={ {
						color: 'text',
						pl: 2,
						position: 'absolute',
						top: '50%',
						marginTop: '-10px',
						marginRight: '10px',
						right: 0,
						borderLeftWidth: '1px',
						borderLeftStyle: 'solid',
						borderLeftColor: 'border',
						size: 20,
					} }
				/>
			</div>
		</>
	);
};

Select.propTypes = {
	id: PropTypes.string,
	isInline: PropTypes.bool,
	forLabel: PropTypes.string,
	placeholder: PropTypes.string,
	label: PropTypes.string,
	options: PropTypes.array,
};

export { Select };
