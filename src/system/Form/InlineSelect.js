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

const selectStyles = {
	control: provided => ( {
		...provided,
		minWidth: 240,
		margin: 0,
		border: 0,
		padding: 0,
		boxShadow: 'none',
	} ),
	container: provided => ( { ...provided, padding: 0 } ),
	input: provided => ( { ...provided, padding: 0 } ),
	option: provided => ( {
		...provided,
		paddingTop: vipTheme.space[ 1 ],
		paddingBottom: vipTheme.space[ 1 ],
		paddingLeft: vipTheme.space[ 2 ],
	} ),
	menu: () => ( { boxShadow: 'none', borderTop: `1px solid` } ),
};

const InlineSelect = ( { label, value, options, noneLabel = 'All', position = "left", ...props } ) => {
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
				styles={selectStyles}
				classNamePrefix={ 'select' }
				options={options}
				placeholder="Search..."
				tabSelectsValue={false}
				value={value}
				sx={ {
					'.select__control': {
						background: 'none',
						color: 'heading',
					},
					'.select__single-value': {
						color: 'heading',
						px: 1,
					},
					'.react-select__option': {
						bg: 'grey.10',
						'&:hover': {
							bg: 'grey.10',
						}
					},
					'.select__option--is-focused': {
						bg: 'grey.10',
					},
					'.select__menu': {
						borderColor: 'border',
					}
				} }
				{...props}
			/>
		</Box>
	);

	return (
		<Dialog
			content={Content}
			position={ position }
			trigger={<DialogButton sx={{ width: '100%' }} label={label} value={valueLabel} />}
		/>
	);
};

InlineSelect.propTypes = {
	label: PropTypes.string,
	// https://react-select.com/props
	value: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
	]),
	options: PropTypes.array,
	position: PropTypes.string,
	noneLabel: PropTypes.string,
};

export { InlineSelect };
