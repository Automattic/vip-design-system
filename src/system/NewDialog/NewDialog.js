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

				<DialogPrimitive.Content
					sx={ {
						backgroundColor: 'white',
						borderRadius: 6,
						boxShadow:
							'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
						position: 'fixed',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						width: '90vw',
						maxWidth: '450px',
						maxHeight: '85vh',
						padding: 25,
						paddingTop: 0,
						'&:focus': { outline: 'none' },
					} }
				>
					<DialogTitle title={ title } hidden={ ! showHeading } />
					<DialogDescription description={ description } hidden={ ! showHeading } />

					{ content }

					<DialogClose />
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
