/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
 import React from 'react';
 import PropTypes from 'prop-types';
 import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
 import { MdCheckCircle } from "react-icons/md";
 
 const ToggleGroup = ( { onChange, groupLabel, value, options, ...props } ) => (
	 <RadioGroupPrimitive.Root
		 onValueChange={ onChange }
		 value={ value }
		 aria-label={ groupLabel }
		 sx={ {
			bg: 'backgroundSecondary',
			p: 1,
			display: 'flex',
			alignItems: 'center',
		} }
		 { ...props }
	 >
		 {
			 options.map( ( option, index ) => (
				 <RadioGroupPrimitive.Item
					 key={ option.value }
					 value={ option.value }
					 id={ `o${ index }` }
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
						'&[data-state=checked]': {
							backgroundColor: 'card',
							boxShadow: 'low',
							color: 'heading',
						},
					} }
				 >
					 { option.label }
				 </RadioGroupPrimitive.Item>
			 ) )
		 }
	 </RadioGroupPrimitive.Root>
 );
 
 ToggleGroup.propTypes = {
	 onChange: PropTypes.func,
	 options: PropTypes.array,
	 value: PropTypes.string,
	 groupLabel: PropTypes.string,
 };
 
 export { ToggleGroup };
 