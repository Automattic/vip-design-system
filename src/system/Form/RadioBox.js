/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import * as ReactToggleGroup from '@radix-ui/react-toggle-group';
import { Heading, Text } from '@automattic/vip-design-system';
import { MdCheckCircle } from "react-icons/md";

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
						background: 'none',
						cursor: 'pointer',
						borderRadius: 2,
						textAlign: 'left',
						border: '1px solid',
						borderColor: 'border',
						position: 'relative',
						svg: {
							display: 'none'
						},
						'&:hover': {
							borderColor: 'grey.10',
						},
						'&[data-state=on]': {
							svg: {
								display: 'block'
							},
							borderColor: 'primary',
						},
					} }
				>
					<MdCheckCircle size={ 16 } sx={ { position: 'absolute', top: 2, right: 2, color: 'primary' } } />
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
