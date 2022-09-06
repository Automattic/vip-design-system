/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import * as DialogPrimitive from '@radix-ui/react-dialog';
/**
 * Internal dependencies
 */
import { DialogOverlay } from './DialogOverlay';
import { DialogCloseDefault as DialogClose } from './DialogClose';
import { DialogTitle } from './DialogTitle';
import { DialogDescription } from './DialogDescription';
import { contentStyles } from './DialogContent';

export const NewDialog = ( {
	trigger = null,
	description,
	title,
	content = null,
	showHeading = true,
	disabled = false,
	style: extraStyles,
	contentProps = {},
	portalProps = {},
	...props
} ) => {
	const closeRef = React.useRef( null );

	if ( disabled ) {
		return;
	}

	// if content is a function, pass in onClose
	const isContentFunction = typeof content === 'function';

	const onClose = () => {
		closeRef?.current?.click();
	};

	return (
		<DialogPrimitive.Root { ...props }>
			{ trigger && <DialogPrimitive.Trigger asChild>{ trigger }</DialogPrimitive.Trigger> }

			<DialogPrimitive.Portal { ...portalProps }>
				<DialogOverlay />

				<DialogPrimitive.Content
					className="vip-dialog-component"
					sx={ { ...contentStyles, ...extraStyles } }
					{ ...contentProps }
				>
					<DialogClose ref={ closeRef } />
					<DialogTitle title={ title } hidden={ ! showHeading } />
					<DialogDescription description={ description } hidden={ ! showHeading } />

					<div role="document">{ isContentFunction ? content( { onClose } ) : content }</div>
				</DialogPrimitive.Content>
			</DialogPrimitive.Portal>
		</DialogPrimitive.Root>
	);
};

NewDialog.propTypes = {
	trigger: PropTypes.node.isRequired,
	title: PropTypes.node.isRequired,
	description: PropTypes.node.isRequired,
	content: PropTypes.oneOfType( [ PropTypes.node, PropTypes.func ] ),
	showHeading: PropTypes.bool,
	disabled: PropTypes.bool,
	style: PropTypes.oneOfType( [ PropTypes.object, PropTypes.func ] ),

	// Content props in: https://www.radix-ui.com/docs/primitives/components/dialog#content
	contentProps: PropTypes.any,

	// Portal props in: https://www.radix-ui.com/docs/primitives/components/dialog#portal
	portalProps: PropTypes.any,

	// Radix DialogPrimitive.Root properties
	// https://www.radix-ui.com/docs/primitives/components/dialog#root
	id: PropTypes.string,
	open: PropTypes.bool,
	defaultOpen: PropTypes.bool,
	allowPinchZoom: PropTypes.bool,
	onOpenChange: PropTypes.func,
};
