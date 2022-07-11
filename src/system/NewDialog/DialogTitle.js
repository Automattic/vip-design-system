/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';

/**
 * Internal dependencies
 */

export const DialogTitle = ( { title, hidden = false } ) => {
	const titleNode = <DialogPrimitive.Title>{ title }</DialogPrimitive.Title>;

	if ( hidden ) {
		return <VisuallyHidden.Root>{ titleNode }</VisuallyHidden.Root>;
	}

	return titleNode;
};

DialogTitle.propTypes = {
	title: PropTypes.string,
	hidden: PropTypes.bool,
};
