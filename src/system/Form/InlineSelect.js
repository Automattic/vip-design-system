/** @jsx jsx */
/**
 * External dependencies
 */
import { jsx } from 'theme-ui';
import PropTypes from 'prop-types';
import React from 'react';
import { MdDone } from 'react-icons/md';
import Select, { components } from 'react-select';

/**
 * Internal dependencies
 */
import { theme as vipTheme, Box, Dialog, DialogButton, Text } from '..';
import { Option } from './SearchSelect';

const selectStyles = {
	control: provided => ( { ...provided, minWidth: 240, margin: 0, border: 0, padding: 0, boxShadow: 'none', fontSize: vipTheme.fontSizes[ 2 ] } ),
	container: provided => ( { ...provided, padding: 0 } ),
	input: provided => ( { ...provided, padding: 0 } ),
	option: provided => ( { ...provided, paddingTop: vipTheme.space[ 1 ], paddingBottom: vipTheme.space[ 1 ], paddingLeft: vipTheme.space[ 2 ] } ),
	menu: () => ( { boxShadow: 'none', borderTop: `1px solid ${ vipTheme.colors.border }` } ),
};

const InlineSelect = ( { label, value, options, noneLabel = 'All', ...props } ) => {
	let valueLabel = noneLabel;

	if ( value.label ) {
		valueLabel = value.label;
	} else if ( value.length > 1 ) {
		valueLabel = `${ value[ 0 ].label } + ${ value.length - 1 }`;
	} else if ( value.length === 1 ) {
		valueLabel = value[ 0 ].label;
	}

	const Content = (
		<Box>
			<Select
				autoFocus
				backspaceRemovesValue={ false }
				components={ { Option, DropdownIndicator: null, IndicatorSeparator: null } }
				controlShouldRenderValue={ false }
				hideSelectedOptions={ false }
				isClearable={ false }
				menuIsOpen
				options={ options }
				styles={ selectStyles }
				placeholder="Search..."
				tabSelectsValue={ false }
				value={ value }
				{...props}
				theme={ theme => ( {
					...theme,
					colors: {
						...theme.colors,
						primary25: vipTheme.colors.hover,
						primary50: vipTheme.colors.brand[ '7' ],
						primary: vipTheme.colors.heading,
					},
				} ) }
			/>
		</Box>
	);

	return (
		<Dialog
			content={Content}
			trigger={
				<DialogButton sx={ { width: '100%' } }>
					{ label &&
						<Text as="span" sx={{ mb: 0, color: 'muted', mr: 2, flex: '0 0 auto' }}>
							{label}:
						</Text>
					}
					<Text
						as="span"
						sx={ {
							mb: 0,
							flex: '1 1 auto',
							'white-space': 'nowrap',
							overflow: 'hidden',
							color: 'heading',
							'text-overflow': 'ellipsis',
						} }
					>
						{ valueLabel }
					</Text>
				</DialogButton>
			}
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
