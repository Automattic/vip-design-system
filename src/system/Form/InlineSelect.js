/** @jsx jsx */
/**
 * External dependencies
 */
import { jsx } from 'theme-ui';
import PropTypes from 'prop-types';
import React from 'react';
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
		fontSize: vipTheme.fontSizes[ 2 ],
	} ),
	container: provided => ( { ...provided, padding: 0 } ),
	input: provided => ( { ...provided, padding: 0 } ),
	option: provided => ( {
		...provided,
		paddingTop: vipTheme.space[ 1 ],
		paddingBottom: vipTheme.space[ 1 ],
		paddingLeft: vipTheme.space[ 2 ],
	} ),
	menu: () => ( { boxShadow: 'none', borderTop: `1px solid ${ vipTheme.colors.border }` } ),
};

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
				options={options}
				styles={selectStyles}
				placeholder="Search..."
				tabSelectsValue={false}
				value={value}
				{...props}
				theme={theme => ( {
					...theme,
					colors: {
						...theme.colors,
						primary25: vipTheme.colors.hover,
						primary50: vipTheme.colors.brand[ '7' ],
						primary: vipTheme.colors.heading,
					},
				} )}
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
