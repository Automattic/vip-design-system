/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import React from 'react';
import { MdExpandMore } from 'react-icons/md';

/**
 * Internal dependencies
 */
import { Button, Text } from '../';

const DialogButton = ( { label, value, children, ...props } ) => (
	<Button variant="secondary" sx={ {
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
					'white-space': 'nowrap',
					overflow: 'hidden',
					color: 'heading',
					'text-overflow': 'ellipsis',
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
};

export { DialogButton };
