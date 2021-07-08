/** @jsx jsx */
/**
 * External dependencies
 */
import { jsx } from 'theme-ui';
import Select from 'react-select';

const vipGold = '#c29c69'; // hardcoding for now
const vipGrey2 = '#d7dee2';

const customStyles = {
	control: styles => ( {
		...styles,
		border: `1px solid ${ vipGrey2 }`,
		boxShadow: 'none',
		'&:hover': {
			border: `1px solid ${ vipGold }`,
		},
		'&:focus': {
			border: `1px solid ${ vipGold }`,
		},
	} ),
};

const MultiSelect = props => (
	<Select
		{...props}
		styles={customStyles}
	/>
);

export { MultiSelect };
