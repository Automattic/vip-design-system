/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import * as DialogPrimitive from '@radix-ui/react-dialog';
/**
 * Internal dependencies
 */
import { DialogOverlay } from './DialogOverlay';
import { DialogClose } from './DialogClose';
import { DialogTitle } from './DialogTitle';
import { DialogDescription } from './DialogDescription';
import { contentStyles } from './DialogContent';

export const NewDialog = ( {
	// Deprecated
	// position = 'left'
	trigger = null,
	description,
	title,
	content = null,
	showHeading = true,
	disabled = false,
	defaultOpen = false,
	allowPinchZoom = false,
} ) => {
	if ( disabled ) {
		return;
	}

	return (
		<DialogPrimitive.Root defaultOpen={ defaultOpen } allowPinchZoom={ allowPinchZoom }>
			{ trigger && <DialogPrimitive.Trigger asChild>{ trigger }</DialogPrimitive.Trigger> }

			<DialogPrimitive.Portal>
				<DialogOverlay />

				<DialogPrimitive.Content sx={ contentStyles }>
					<DialogClose />
					<DialogTitle title={ title } hidden={ ! showHeading } />
					<DialogDescription description={ description } hidden={ ! showHeading } />

					{ content }
				</DialogPrimitive.Content>
			</DialogPrimitive.Portal>
		</DialogPrimitive.Root>
	);
};

NewDialog.propTypes = {
	trigger: PropTypes.node.isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	content: PropTypes.node,
	showHeading: PropTypes.bool,
	disabled: PropTypes.bool,

	// Radix DialogPrimitive.Root properties
	// https://www.radix-ui.com/docs/primitives/components/dialog#root
	defaultOpen: PropTypes.bool,
	allowPinchZoom: PropTypes.bool,
};
