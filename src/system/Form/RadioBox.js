/**
 * External dependencies
 */
import React from 'react';
import { jsx } from 'theme-ui';
import PropTypes from 'prop-types';
import * as ReactToggleGroup from '@radix-ui/react-toggle-group';
import { Heading, Text } from '@automattic/vip-design-system';

/**
 * Internal dependencies
 */

const RadioBox = ( { onChange, value, options, ...props } ) => (
	<ReactToggleGroup.Root
		onValueChange={ onChange }
		value={ value }
		type="single"
		{ ...props }
	>
		{
			options.map( option => (
				<ReactToggleGroup.Item
					key={ option.value }
					value={ option.value }
					sx={ {
						p: 3,
						cursor: 'pointer',
						borderRadius: 2,
						textAlign: 'left',
						border: '2px solid transparent',
						bg: 'brand.3',
						'&:hover': {
							bg: 'brand.7',
						},
						'&[data-state=on]': {
							borderColor: 'primary',
						},
					} }
				>
					<Heading variant="h4" sx={ { mb: 0 } }>{ option.label }</Heading>
					<Text sx={ { color: 'muted', mb: 0, fontSize: 1 } }>{ option.description }</Text>
				</ReactToggleGroup.Item>
			) )
		}
	</ReactToggleGroup.Root>
);

RadioBox.propTypes = {
	onChange: PropTypes.func,
	options: PropTypes.array,
	value: PropTypes.string,
};

export { RadioBox };
