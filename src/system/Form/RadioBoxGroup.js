/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { MdCheckCircle } from 'react-icons/md';

/**
 * Internal dependencies
 */
import { Heading, Text } from '../';

const RadioBoxGroup = React.forwardRef(
	( { onChange, groupLabel, value, options, ...props }, forwardRef ) => (
		<RadioGroupPrimitive.Root
			onValueChange={ onChange }
			value={ value }
			aria-label={ groupLabel }
			sx={ {
				display: 'flex',
				gap: 2,
			} }
			ref={ forwardRef }
			{ ...props }
		>
			{ options.map( ( option, index ) => (
				<RadioGroupPrimitive.Item
					key={ option.value }
					value={ option.value }
					id={ `o${ index }` }
					sx={ {
						p: 3,
						background: 'none',
						cursor: 'pointer',
						borderRadius: 2,
						textAlign: 'left',
						border: '1px solid',
						borderColor: 'border',
						position: 'relative',
						'&:hover': {
							borderColor: 'grey.10',
						},
						'&[data-state=checked]': {
							borderColor: 'primary',
						},
					} }
				>
					<RadioGroupPrimitive.Indicator>
						<MdCheckCircle
							size={ 16 }
							sx={ { position: 'absolute', top: 2, right: 2, color: 'primary' } }
						/>
					</RadioGroupPrimitive.Indicator>
					<Heading variant="h4" as="label" htmlFor={ `o${ index }` } sx={ { mb: 0 } }>
						{ option.label }
					</Heading>
					<Text sx={ { color: 'muted', mb: 0, fontSize: 1 } }>{ option.description }</Text>
				</RadioGroupPrimitive.Item>
			) ) }
		</RadioGroupPrimitive.Root>
	)
);

RadioBoxGroup.displayName = 'RadioBoxGroup';

RadioBoxGroup.propTypes = {
	onChange: PropTypes.func,
	options: PropTypes.array,
	value: PropTypes.string,
	groupLabel: PropTypes.string,
};

export { RadioBoxGroup };
