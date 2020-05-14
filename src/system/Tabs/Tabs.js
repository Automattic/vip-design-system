/** @jsx jsx */
import { jsx } from 'theme-ui';
import PropTypes from 'prop-types';
import { Flex } from '..';

const Tabs = ( { variant = 'primary', ...props } ) => (
	<Flex
		sx={{
			borderBottom: '2px solid',
			borderColor: 'border',
			listStyleType: 'none',
			margin: 0,
			padding: 0,
		}}
		{...props}
	/>
);

Tabs.propTypes = {
	variant: PropTypes.string,
};

export { Tabs };
