/** @jsxImportSource theme-ui */

import PropTypes from 'prop-types';
import * as ReactToggleGroup from '@radix-ui/react-toggle-group';

const ToggleGroup = ( { onChange, value, options, ...props } ) => (
	<ReactToggleGroup.Root
		onValueChange={ onChange }
		type="single"
		{ ...props }
		sx={ {
			bg: 'backgroundSecondary',
			p: 1,
			display: 'flex',
			alignItems: 'center',
		} }
	>
		{
			options.map( option => (
				<ReactToggleGroup.Item
					key={ option.value }
					value={ option.value }
					sx={ {
						fontSize: 1,
						color: 'muted',
						background: 'none',
						border: 'none',
						cursor: 'pointer',
						borderRadius: 1,
						py: 1,
						px: 2,
						flex: '1 1 auto',
						textAlign: 'center',
						'&:hover': {
							color: 'heading',
						},
						'&[data-state=on]': {
							backgroundColor: 'card',
							boxShadow: 'low',
							color: 'heading',
						},
					} }
				>
					{ option.label }
				</ReactToggleGroup.Item>
			) )
		}
	</ReactToggleGroup.Root>
);

ToggleGroup.propTypes = {
	onChange: PropTypes.func,
	options: PropTypes.array,
	value: PropTypes.string,
};

export { ToggleGroup };
