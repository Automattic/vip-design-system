/** @jsx jsx */
/**
 * External dependencies
 */
import { jsx } from 'theme-ui';
import { MdDone, MdExpandMore, MdClose } from 'react-icons/md';
import Select, { components } from 'react-select';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { theme as vipTheme, Flex, Text } from '..';

export const selectStyles = {
	control: provided => ( { ...provided, border: `1px solid ${ vipTheme.colors.border }`, margin: 0, padding: 0, boxShadow: 'none', fontSize: vipTheme.fontSizes[ 2 ] } ),
	option: provided => ( { ...provided, paddingTop: vipTheme.space[ 1 ], paddingBottom: vipTheme.space[ 1 ], paddingLeft: vipTheme.space[ 2 ] } ),
	menu: provided => ( { ...provided, boxShadow: vipTheme.shadows.low } ),
	indicatorSeparator: () => ( { display: 'none' } ),
	valueContainer: provided => ( { ...provided, paddingLeft: vipTheme.space[ 1 ], paddingRight: vipTheme.space[ 1 ] } ),
	singleValue: provided => ( { ...provided, paddingLeft: vipTheme.space[ 1 ], paddingRight: vipTheme.space[ 1 ] } ),
};

export const Option = ( { data, isSelected, ...props } ) => (
	<components.Option { ...props }>
		<Flex sx={ { alignItems: 'center' } }>
			{ isSelected &&
				<Text as="span" sx={ { mb: 0, mr: 2, color: 'green.60', svg: { display: 'block' } } }>
					<MdDone />
				</Text>
			}
			<Text as="span" sx={ { mb: 0, flex: '1 1 auto', color: 'heading' } }>{ data.label }</Text>
		</Flex>
	</components.Option>
);

Option.propTypes = {
	data: PropTypes.object,
	isSelected: PropTypes.bool,
};

export const DropdownIndicator = props => <MdExpandMore { ...props } sx={ { color: 'text', mr: 2 } } />;
const ClearIndicator = ( { innerProps: { ref, ...restInnerProps }, ...props } ) => <MdClose ref={ ref } { ...restInnerProps } { ...props } sx={ { color: 'text', mr: 2 } } />;

ClearIndicator.propTypes = {
	innerProps: PropTypes.object,
};

const SearchSelect = props => (
	<Select
		{...props}
		components={ { Option, DropdownIndicator, ClearIndicator } }
		styles={selectStyles}
		theme={ theme => ( {
			...theme,
			colors: {
				...theme.colors,
				primary25: vipTheme.colors.hover,
				primary50: vipTheme.colors.brand[ '7' ],
				primary: vipTheme.colors.heading,
				dangerLight: vipTheme.colors.red[ '10' ],
				danger: vipTheme.colors.red[ '70' ],
			},
		} ) }
	/>
);

export { SearchSelect };
