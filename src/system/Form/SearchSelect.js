/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import { MdDone, MdExpandMore, MdClose } from 'react-icons/md';
import Select, { components } from 'react-select';
import { withAsyncPaginate } from 'react-select-async-paginate';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { Flex, Text } from '..';

export const Option = ( { label, isSelected, ...props } ) => (
	<components.Option {...props}>
		<Flex sx={{ alignItems: 'center' }}>
			{isSelected && (
				<Text as="span" sx={{ mb: 0, mr: 2, color: 'green.80', svg: { display: 'block' } }}>
					<MdDone />
				</Text>
			)}
			<Text as="span" sx={{ mb: 0, flex: '1 1 auto', color: 'heading' }}>
				{ label }
			</Text>
		</Flex>
	</components.Option>
);

Option.propTypes = {
	label: PropTypes.string,
	isSelected: PropTypes.bool,
};

export const DropdownIndicator = props => <MdExpandMore {...props} sx={{ color: 'text', mr: 2 }} />;
const ClearIndicator = ( { innerProps: { ref, ...restInnerProps }, ...props } ) => (
	<MdClose ref={ref} {...restInnerProps} {...props} sx={{ color: 'text', mr: 2 }} />
);

ClearIndicator.propTypes = {
	innerProps: PropTypes.object,
};

const SearchSelect = props => (
	<Select
		{...props}
		classNamePrefix={ 'select' }
		components={{ Option, DropdownIndicator, ClearIndicator }}
		sx={ {
			'.select__control': {
				background: 'none',
				color: 'heading',
				border: '1px solid',
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
				},
			},
			'.select__option--is-focused': {
				bg: 'hover',
			},
		} }
	/>
);

// Asynchronous search select to load paginated results asynchronously
const CustomAsyncPaginate = withAsyncPaginate( SearchSelect );

const AsyncSearchSelect = ( { options, ...props } ) => (
	<CustomAsyncPaginate
		SelectComponent={ SearchSelect }
		loadOptions={ options }
		{ ...props }
	/>
);

export { SearchSelect, AsyncSearchSelect };
