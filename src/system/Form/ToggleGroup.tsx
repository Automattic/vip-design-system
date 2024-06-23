/**
 * External dependencies
 */
import React from 'react';
import { ThemeUIStyleObject } from 'theme-ui';

/**
 * Internal dependencies
 */
import { Box } from '../Box';
import { Button } from '../Button';

interface IProps {
	value?: string;
	onChange?: ( value: string ) => void;
	options?: {
		value: string;
		label: string;
	}[];
	sx?: ThemeUIStyleObject;
}

const ToggleGroup = ( props: IProps ) => {
	const { options, value, onChange } = props;

	const handleClick = ( e: React.MouseEvent< HTMLButtonElement >, val: string ) => {
		e.preventDefault();
		onChange?.( val );
	};

	return (
		<Box
			role="group"
			dir="ltr"
			tabIndex={ 0 }
			sx={ {
				background: 'layer.3',
				p: 1,
				display: 'inline-flex',
				gap: 1,
				borderRadius: 1,
			} }
		>
			{ options?.map( option => (
				<Button
					key={ option.value }
					variant="text"
					role="radio"
					sx={ {
						background: value === option.value ? 'layer.4' : undefined,
						color: 'text',
						minHeight: '32px',
						px: 3,
						boxShadow: value === option.value ? 'low' : undefined,
						fontWeight: 400,
						fontSize: 2,
						'&:hover': {
							background: value === option.value ? 'layer.4' : 'gray.3',
						},
					} }
					onClick={ e => handleClick( e, option.value ) }
				>
					{ option.label }
				</Button>
			) ) }
		</Box>
	);
};

ToggleGroup.displayName = 'ToggleGroup';

export { ToggleGroup };
