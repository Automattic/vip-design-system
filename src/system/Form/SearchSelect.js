/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import MdDone from '~icons/mdi/done';
import MdExpandMore from '~icons/mdi/expand-more';
import MdClose from '~icons/mdi/close';
import Select, { components } from 'react-select';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { Flex, Text } from '..';

// Option component
export const Option = ( { label, isSelected, ...props } ) => (
	<components.Option { ...props }>
		<Flex sx={ { alignItems: 'center' } }>
			{ isSelected && (
				<Text as="span" sx={ { mb: 0, mr: 2, color: 'green.80', svg: { display: 'block' } } }>
					<MdDone />
				</Text>
			) }
			<Text as="span" sx={ { mb: 0, flex: '1 1 auto', color: 'heading' } }>
				{ label }
			</Text>
		</Flex>
	</components.Option>
);

Option.propTypes = {
	label: PropTypes.string,
	isSelected: PropTypes.bool,
};

// DropdownIndicator component
export const DropdownIndicator = ( {
	innerProps,
	isFocused,
	isDisabled,
	clearValue,
	cx,
	getStyles,
	getValue,
	hasValue,
	isMulti,
	isRtl,
	options,
	selectProps,
	setValue,
	selectOption,
	theme,
	...props
} ) => <MdExpandMore { ...props } sx={ { color: 'text', mr: 2 } } />;

DropdownIndicator.propTypes = {
	innerProps: PropTypes.object,
	isFocused: PropTypes.bool,
	isDisabled: PropTypes.bool,
	clearValue: PropTypes.func,
	cx: PropTypes.func,
	getStyles: PropTypes.func,
	getValue: PropTypes.func,
	hasValue: PropTypes.bool,
	isMulti: PropTypes.bool,
	isRtl: PropTypes.bool,
	options: PropTypes.array,
	selectProps: PropTypes.object,
	setValue: PropTypes.func,
	selectOption: PropTypes.func,
	theme: PropTypes.object,
};

// ClearIndicator component
const ClearIndicator = ( { innerProps: { ref, ...restInnerProps }, ...props } ) => (
	<MdClose ref={ ref } { ...restInnerProps } { ...props } sx={ { color: 'text', mr: 2 } } />
);

ClearIndicator.propTypes = {
	innerProps: PropTypes.object,
};

// Parent SearchSelect component
const SearchSelect = props => (
	<Select
		{ ...props }
		classNamePrefix={ 'select' }
		components={ { Option, DropdownIndicator, ClearIndicator } }
		sx={ {
			'.select__control': {
				background: 'none',
				color: 'input.text.default',
				border: '1px solid',
				borderColor: 'input.border',
				margin: 0,
				padding: 0,
				boxShadow: 'none',
				fontSize: 2,
			},
			'.select__placeholder': {
				color: 'input.text.placeholder',
			},
			'.select__single-value': {
				color: 'input.text.default',
				px: 1,
			},
			'.select__menu': {
				bg: 'dialog',
				boxShadow: 'medium',
			},
			'.react-select__option': {
				color: 'input.text.default',
				paddingTop: 1,
				paddingBottom: 1,
				paddingLeft: 2,
				bg: 'input.background',
				'&:hover': {
					bg: 'input.background',
				},
			},
			'.select__option--is-focused': {
				bg: 'input.background',
			},
		} }
	/>
);

export { SearchSelect };
