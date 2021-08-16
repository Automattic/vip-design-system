/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import { MdExpandMore } from 'react-icons/md';

/**
* Internal dependencies
*/
import { Button, Text } from '../';

const DialogButton = ( { label, variant = 'secondary', value, children, ...props } ) => (
	<Button variant={ variant } sx={ {
		textAlign: 'left',
		display: 'inline-flex',
		py: 2,
		pl: 3,
		pr: 2,
		alignItems: 'center' } } { ...props }
	>
		{ children }
		{ label &&
			<Text as="span" sx={{ mb: 0, color: 'muted', mr: 2, flex: '0 0 auto' }}>
				{ label }:
			</Text>
		}
		{ value &&
			<Text
				as="span"
				sx={ {
					mb: 0,
					flex: '1 1 auto',
					whiteSpace: 'nowrap',
					overflow: 'hidden',
					color: 'heading',
					textOverflow: 'ellipsis',
				} }
			>
				{ value }
			</Text>
		}
		<MdExpandMore sx={ { ml: 2, top: 0, display: 'block', flex: '0 0 auto' } } />
	</Button>
);

DialogButton.propTypes = {
	children: PropTypes.array,
	label: PropTypes.string,
	value: PropTypes.string,
	variant: PropTypes.string,
};

export { DialogButton };
