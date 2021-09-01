/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import Select from 'react-select';

/**
 * Internal dependencies
 */
import { theme as vipTheme, Box, Dialog, DialogButton } from '..';
import { Option } from './SearchSelect';

const InlineSelect = ( { label, value, options, noneLabel = 'All', ...props } ) => {
	let valueLabel = noneLabel;

	if ( Array.isArray( value ) && value.length ) {
		if ( value.length > 1 ) {
			valueLabel = `${ value[ 0 ].label } + ${ value.length - 1 }`;
		} else {
			valueLabel = value[ 0 ].label;
		}
	} else if ( value.label ) {
		valueLabel = value.label;
	}

	const Content = (
		<Box>
			<Select
				autoFocus
				backspaceRemovesValue={false}
				components={{ Option, DropdownIndicator: null, IndicatorSeparator: null }}
				controlShouldRenderValue={false}
				hideSelectedOptions={false}
				isClearable={false}
				menuIsOpen
				classNamePrefix={ 'select' }
				options={options}
				placeholder="Search..."
				tabSelectsValue={false}
				value={value}
				sx={ {
					'.select__control': {
						background: 'none',
						color: 'heading',
						border: `1px solid`,
						borderColor: 'border',
						margin: 0,
						padding: 0,
						boxShadow: 'none',
						fontSize: 2,
					},
					'.select__single-value': {
						color: 'heading',
						px: 1,
					},
					'.select__menu': {
						bg: 'dialog',
						boxShadow: 'medium',
					},
					'.react-select__option': {
						color: 'text',
						paddingTop: 1,
						paddingBottom: 1,
						paddingLeft: 2,
						bg: 'hover',
						'&:hover': {
							bg: 'hover',
						}
					},
					'.select__option--is-focused': {
						bg: 'hover',
					}
				} }
				{...props}
			/>
		</Box>
	);

	return (
		<Dialog
			content={Content}
			trigger={<DialogButton sx={{ width: '100%' }} label={label} value={valueLabel} />}
		/>
	);
};

InlineSelect.propTypes = {
	label: PropTypes.string,
	value: PropTypes.array,
	options: PropTypes.array,
	noneLabel: PropTypes.string,
};

export { InlineSelect };
